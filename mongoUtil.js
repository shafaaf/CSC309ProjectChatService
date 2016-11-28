var MongoClient = require( 'mongodb' ).MongoClient;
var _db;

module.exports = {

  connectToServer: function(callback) {
    MongoClient.connect( "mongodb://localhost:27017/chat", function( err, db ) {
	    if(err)
	      throw err;

	  	else
	  	 {
	  	 	 console.log("MongoUtil.js: We are connected to mongodb database");  
	     	_db = db;
	    	return callback( err );
	    }	
    });
  },

  getDb: function() {
    return _db;
  }

};