var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http)

require('./chatRoom.js')(app, http, io);
//require('./app/routes.js')(app, sess);  //load our routes and pass in app

//to include my custom css,javascript files 
app.use(express.static('public'));

//Serve index.html page
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//Listen for connections
http.listen(3000, function(){
  console.log('listening on *:3000');
});
