//This file only for routes. Application logic code is in controllers folder

module.exports = function(app) {

	//Home Page
    app.get('/', function(req, res) {
        res.send('Hello this is our web app front page!')
    });

    //Chat room page
	app.get('/chatroom', function(req, res){
	  res.render('chatRoom/chatRoom.ejs');
	});

	//Add in more routes like above...
}
