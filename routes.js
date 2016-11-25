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
	
	app.post('/login/signin', home.postSignin);
	
	app.get('/login/github', home.getGithub);
	
	app.get('/login/google', home.getGoogle);
	
	app.get('/callback/github', home.getCallbackGithub);
	
	app.get('/callback/google', home.getCallbackGoogle);
	
	app.get('/auth/github?', home.getAuthGithub);
	
	app.get('/auth/google?', home.getAuthGoogle);
	
	app.get('/session', home.getSession);
}
