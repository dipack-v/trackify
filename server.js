var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
	socket.on('message', function(message){
            console.log('message: ' + message+' connections:'+io.engine.clientsCount);
            ip = socket.request.connection.remoteAddress;
            url = message;
            io.emit('pageview', { 'connections': io.engine.clientsCount, 'ip': '***.***.***.' + ip.substring(ip.lastIndexOf('.') + 1), 'url': url, 'xdomain': socket.handshake.xdomain, 'timestamp': new Date()});
	});

	socket.on('disconnect', function () {
            console.log("User disconnected:"+io.engine.clientsCount);
            io.emit('pageview', { 'connections': io.engine.clientsCount-1});
        });

});

http.listen(port, function(){
    console.log('listening on *:'+port);
});