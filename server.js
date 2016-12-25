var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
	console.log('User connected via socket.io!');


  socket.on('message',function(message) {
    console.log('message received: ' + message.text);
    //socket.broadcast sends to everyone except sender
    //io.emit sends to everyone including sender
    io.emit('message', message);
  })

  socket.emit('message', {
    text:'welcome to the chat application!'
  });
});

http.listen(PORT, function () {
	console.log('Server started!');
});
