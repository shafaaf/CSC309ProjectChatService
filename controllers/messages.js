var uniqueId = 0;

//Todo: get proper email
var fixedEmail = "shafaaf.hossain@mail.utoronto.ca";

//------------------------------------------------------------------------------

//Send back messages page if logged in, or else alert message to log in
exports.getMessages = function (req, res) 
{
	console.log("GET request for messages page");

	//Todo: get proper email
	var email = fixedEmail;

	console.log("User's email is: " + email);	
	if(email == null){
		res.send("Need to login");
		return;
	}
	res.render('messages/messages.ejs');
}

//------------------------------------------------------------------------------

//Called from AJAX at begining
exports.getParticipants = function (req, res) {
	//Get session from req object later
	console.log("GET request for participants");

	//Todo: get proper email
	var email = fixedEmail;
	console.log("User's email is: " + email);
	if(email == null){
		res.send("Need to login");
		return;
	}

	//Get all participants for current user from database
	var mongoUtil = require( '../mongoUtil' );
	var db = mongoUtil.getDb();	
	var participantsCollection = db.collection("participants");

	participantsCollection.find({Users: email}).toArray(function(err, docs) {
		console.log("getParticipants: participantsCollection: ", docs);
		res.json(docs);
		return;
	});
}

//------------------------------------------------------------------------------

//Called from AJAX to get messages for specific user
//Happens when user clicks on a user to see messages, and then when polling 
exports.specificMessages = function (req, res) {
	console.log("POST request for specific user messages");

	//Todo: get proper email
	var email = fixedEmail;
	var participantName = req.body.participantName;
	console.log("Query messages for user: " + email + " and with participant: " + participantName);

	//Getting messages with participant from database
	var mongoUtil = require( '../mongoUtil' );
	var db = mongoUtil.getDb();

	//Get all messages between current user and specific participant passed in from database
	var messagesCollection = db.collection("messages");
	messagesCollection.find({$or:[
		{From: email, To: participantName}, {From: participantName, To: email}]
		}).toArray(function(err, docs) {
		console.log("specificMessages: messagesCollection: ", docs);
		res.json(docs);
		return;
	});
}

//---------------------------------------------------------------------------------

//Add in messages sent from user into database.
//User sends using AJAX calls when selecting a participant and writing text message and hitting enter.
exports.sendMessages = function (req, res) {

	//Todo: get proper email
	var email = fixedEmail;
	var participantName = req.body.participantName;
	var message = req.body.message;

	console.log("Recived message from:  " + email + ", to: " + participantName + ", with message: " + message);

	//Inserting message with current user and participant into database
	var mongoUtil = require( '../mongoUtil' );
	var db = mongoUtil.getDb();
	var messagesCollection = db.collection("messages");
	messagesCollection.insertOne({
		"From" : email,
		"To" : participantName,
		"Text" : message
	});

	console.log("Inserted!");
	return;
}

//---------------------------------------------------------------------------------
//Need a module to add new participant when someone gets messaged for the first time.
