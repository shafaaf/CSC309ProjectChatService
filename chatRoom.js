
module.exports = function(app, http, io){
  // Connect to the mongodb database

  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect("mongodb://localhost:27017/chat", function(err, db) {
    if(err)
      throw err;
    
    else
    {
      console.log("15: We are connected to mongodb databases");  

      //After a user connects
      io.on('connection', function (socket) {
        console.log('A user connected');

        //Collection in chat database to store messages of users
        var col = db.collection("messages");


        //Need to send back first couple of messages
        //collect 100 chat messages from database
        col.find().limit(100).sort({_id:1}).toArray(function(err,res)
        {
          if (err)
            throw err;
          
          console.log("Going to emit messages from database");
          
          //emit to only that particular client using output event
          socket.emit('output',res);
        });

        //Receive message from a client
        socket.on('input',function(data) {
          console.log("Server has received: ", data);

          var name = data.name;
          var message = data.message;

          //checking to whether name or message is blank. If so, do not save in database and send back a strings
          var whitespacePattern = /^\s*$/;
          if(whitespacePattern.test(name) || (whitespacePattern.test(message)))
          {
            console.log("Invalid.");
          }
          else
          {
            console.log("Valid. So now inserting to database.");

            //Insert to database
            col.insert({name:name,message:message}, function(){
              console.log("Inserted message to database.");      

              //emit to all clients
              io.emit('output',[data]);
            });

          }

          //User disconnects
          socket.on('disconnect', function () {
            console.log('user disconnected');
          });

        });    

      });
    }

  });  
}
