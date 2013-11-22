var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.set('port', process.env.PORT || 3435);
app.use('/static', express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.redirect('/static/');
});

server.listen(app.get('port'));
console.log('server started at port %s', app.get('port'));

io.sockets.on('connection', function(socket){
    console.log('socket %s connected', socket.id);

    socket.on('data', function(data){
	var max = 70;
	var value = Math.max(0, Math.min(max, data.beta));
	var percentage = 100 * value / max;
	io.sockets.emit('data', { value: percentage });
    });

})
