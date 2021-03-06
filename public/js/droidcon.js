(function(Reveal, io){
    var Percentage = function(){
	this.observers = [];
	this.value = 0.0;
    }
    Percentage.prototype.set = function(value){
	this.value = Math.max(0, Math.min(100, Math.floor(value)));
	this.notify();
    }
    Percentage.prototype.notify = function(){
	this.observers.forEach(function(observer){
	    observer.call(this, this, this.value);
	}.bind(this));
    }
    Percentage.prototype.addListener = function(callback){
	this.observers.push(callback);
    }

    var PercentageView = function(id, percentage) {
	this.element = document.getElementById(id);
	this.percentage = percentage;
	this.percentage.addListener(this.update.bind(this));
	this.update();
    }
    PercentageView.prototype.update = function(){
	this.element.textContent = this.percentage.value;
    }

    var percentages = ['pi-single', 'pi-multi', 'pi-child'].map(function(id){
	var percentage = new Percentage();
	new PercentageView(id, percentage);
	return percentage;
    });

    var socket = io.connect(window.location.origin);
    socket.on('data', function(data){
	percentages.forEach(function(percentage){
	    percentage.set(data.value);
	});
    });

    Reveal.initialize({
	controls: true,
	progress: true,
	history: true,
	center: true,
	theme: 'default',
	transition: 'default',
	dependencies: [
	    {
		src: 'bower_components/reveal.js/plugin/highlight/highlight.js',
		async: true,
		callback: function() {
		    hljs.initHighlightingOnLoad();
		}
	    }
	]
    });
})(Reveal, io);
