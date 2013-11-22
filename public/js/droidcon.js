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

    var single = new Percentage();
    new PercentageView('pi-single', single);

    var socket = io.connect(window.location.origin);
    socket.on('data', function(data){
	single.set(data.value);
    });

    Reveal.initialize({
	controls: true,
	progress: true,
	history: true,
	center: true,
	theme: 'default',
	transition: 'default'
    });
})(Reveal, io);
