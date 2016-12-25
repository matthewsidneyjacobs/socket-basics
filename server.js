var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');
// var now = moment();

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
	console.log('User connected via socket.io!');

  // var timestamp = moment.utc(now.valueOf()).local().format('h:mm a');

  socket.on('message',function(message) {
    console.log('message received: ' + message.text);
    //socket.broadcast sends to everyone except sender
    //io.emit sends to everyone including sender

    message.timestamp = moment().valueOf();
    io.emit('message', message);
  });

//timestamp property -javascript timestamp milliseconds
  socket.emit('message', {
    text:'welcome to the chat application!',
    timestamp: moment().valueOf()
  });
});

http.listen(PORT, function () {
	console.log('Server started!');
});
