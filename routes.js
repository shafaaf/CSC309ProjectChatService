//This file only for routes. Application logic code is in controllers folder
var path = require('path');
var home = require(path.join(__dirname, 'controllers', 'home'));

module.exports = function(app) {

	//Home Page
    app.get('/', function(req, res) {
        res.sendFile('views/home/home.html', {root: __dirname});
    });

    //Chat room page
	app.get('/chatroom', function(req, res){
	  res.render('chatRoom/chatRoom.ejs');
	});

	//Add in more routes like above...
	app.post('/register', home.postUser);
	
	app.post('/signin', home.postSignin);
	
	app.get('/github', home.getGithub);
	
	app.get('/callback/github', home.getCallback);
	
	app.get(/auth/, home.getAuth);
	
	app.get('/session', home.getSession);
	
	app.get('/google', home.getGoogle);
	
	app.get(/callbackGoogle/, home.getCallbackGoogle);
	
	app.get(/googleA/, home.getGoogleAuth);
}
