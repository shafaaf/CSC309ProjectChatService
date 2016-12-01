//This file only for routes. Application logic code is in controllers folder
var path = require('path');
var home = require(path.join(__dirname, 'controllers', 'home'));
var messages = require(path.join(__dirname, 'controllers', 'messages'));


module.exports = function(app) {

  //Home Page
    app.get('/', function(req, res) {
        res.sendFile('views/home/home.html', {root: __dirname});
    });

    //Messaging stuff
    app.get('/messages', messages.getMessages); //send back messages page if logged in, or else alert message
    app.get('/getemail', messages.getEmail);  //send back user email
    app.get('/participants', messages.getParticipants); // get names of pariticipants at start of page

    //todo
    app.get('/addparticipant', messages.addParticipant); // add new participant. Done when adding tutor for first time.

    app.post('/specificmessages', messages.specificMessages); // get messages of specific participants
    app.post('/sendmessages', messages.sendMessages); //  receive and update database when user sends messages
    

    //Add in more routes like above...
    app.post('/register', home.postUser);
    
    app.post('/login/signin', home.postSignin);
    
    app.get('/login/github', home.getGithub);
    
    app.get('/login/google', home.getGoogle);
    
    app.get('/callback/github', home.getCallbackGithub);
    
    app.get('/callback/google', home.getCallbackGoogle);
    
    app.get('/auth/github?', home.getAuthGithub);
    
    app.get('/auth/google?', home.getAuthGoogle);
    
    app.get('/session', home.getSession);
}
