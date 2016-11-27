var uniqueId = 0;
//remove later and get from session
var email = "shafaaf.hossain@mail.utoronto.ca";

//------------------------------------------------------------------------------
exports.getMessages = function (req, res) {
	console.log("GET request for messages");	
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

	
	console.log("User's email is: " + email);
	if(email == null){
		res.send("Need to login");
		return;
	}

	var mongoUtil = require( '../mongoUtil' );
	var db = mongoUtil.getDb();
	
	//Participants collection
	var participantsCollection = db.collection("participants");
	participantsCollection.find({Users: "shafaaf.hossain@mail.utoronto.ca"}).toArray(function(err, docs) {
		console.log("participantsCollection: ");
		console.log(docs);
		res.json(docs);
		return;
	});
}

//------------------------------------------------------------------------------

//Todo: Called from AJAX when clicks on a user to see messages between him and selected messages
exports.specificMessages = function (req, res) {

	var participantName = req.body.participantName;
	console.log("POST request for specific user messages");
	console.log("Query messages for user: " + email + " and with participant: " + participantName);

	//Getting messages with participant from database
	var mongoUtil = require( '../mongoUtil' );
	var db = mongoUtil.getDb();

	//Participants collection
	var messagesCollection = db.collection("messages");
	messagesCollection.find({$or:[
		{From: email, To: participantName}, {From: participantName, To: email}]
		}).toArray(function(err, docs) {
		
		console.log("messagesCollection: ");
		console.log(docs);
		res.json(docs);
		return;
	});
}

//---------------------------------------------------------------------------------

//Adds in messages sent from user into database.
//User sends using AJAX calls when selecting a participant and writing text message and hitting enter.
exports.sendMessages = function (req, res) {
	var participantName = req.body.participantName;
	var message = req.body.message;
	console.log("Recived message from:  " + email + ", to: " + participantName + ", with message: " + message);

	//Inserting messages with participant into database
	var mongoUtil = require( '../mongoUtil' );
	var db = mongoUtil.getDb();

	//Messages collection
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

