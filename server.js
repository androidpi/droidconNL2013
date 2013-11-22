var express = require('express');
var app = express();
var server = require('http').createServer(app);

app.set('port', process.env.PORT || 3435);
app.use('/static', express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.redirect('/static/');
});

server.listen(app.get('port'));
console.log('server started at port %s', app.get('port'));
