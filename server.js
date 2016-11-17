//Using MVC model for project folder structure
//See this link to understand logic: http://stackoverflow.com/questions/5178334/folder-structure-for-a-node-js-project

//Adding in dependencies

var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http)

//-----------------------------------------------------------------------

//Setup application

app.use(express.static('public'));	//to use public folder for js, css stuff
app.set('views', path.join(__dirname, 'views')); //add in views folder to find ejs files
app.set('view engine', 'ejs'); // set up ejs for as templating engine

//app.set('controllers', path.join(__dirname, 'controllers')); //add in views folder to find ejs files

//-----------------------------------------------------------------------

//Controllers

/* Team: If want to add in a feature, add it in like the example below.
Pass in the app, etc objects to the file needed and add in route in the routes folder.
There should not be any controller/logic code here as it would get messy
*/

//All routing logic
require('./routes.js')(app);

//Chat room logic

//If get error here its because mongodb not installed on your machin, so comment out this line.
require('./controllers/chatRoom.js')(app, http, io);  

//...more features here

//-----------------------------------------------------------------------

//Listen for connections on port 3000

http.listen(3000, function(){
  console.log('listening on port 3000...');
});
