var socket = io();
// var moment = require('moment');
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
console.log(name+ " joined room: " + room);


jQuery('.room-title').text(room);

socket.on('connect', function () {
	console.log('Conncted to socket.io server!');

  socket.emit('joinRoom', {
    name: name,
    room: room
  });
});

socket.on('message', function (message) {
  var momentTimeStamp = moment.utc(message.timestamp);
  var $messages = jQuery('.messages');
  var $message = jQuery('<li class="list-group-item"></li>');

	console.log('New message:');
	console.log(message.text);

  $message.append('<p><strong>'+message.name + ' ' + momentTimeStamp.local().format('h:mm a')+'</strong></p>');
  $message.append('<p>' + message.text + '</p>');
  $messages.append($message);
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
    name: name,
		text: $message.val()
	});

	$message.val('');
});
