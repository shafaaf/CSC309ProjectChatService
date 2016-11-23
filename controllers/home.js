var gh = require("github");
var rr = require("request");
var url = require("url");
var google = require("googleapis");

//Github OAuth
var oauth2Github = require('simple-oauth2')({
	clientID: '1434dc1219b6fafbded2', 
	clientSecret: '9c8a3d291c6b4a7e3c4ba51569702ab51afa5bad',
	site: 'https://github.com/login',
	tokenPath: '/oauth/access_token',
	authorizationPath: '/oauth/authorize'
});

//Github url
var authorization_uri_github = oauth2Github.authCode.authorizeURL({
	redirect_uri: 'http://127.0.0.1:3000/callback/github', 
	scope: 'user:email',
	state: '*(A&S%f'
});

//Setup Github API access
var github = new gh({
    debug: true,
    protocol: "https",
    host: "api.github.com", 
    headers: {
        "user-agent": "csc309" 
    },
    followRedirects: false, 
    timeout: 50000
});

var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(
	'731364416241-eufkgv278pcgd7l3dujr7bi1huqt9l0k.apps.googleusercontent.com',
	'3RFWTeIOOxFtT8DC5F9wkKrC',
	'http://127.0.0.1:3000/callbackGoogle'
);

var googleUrl = oauth2Client.generateAuthUrl({
	scope: 'https://www.googleapis.com/auth/userinfo.email'
});

google.options({
  auth: oauth2Client
});

const Pool = require('pg-pool');
var dbUrl = 'postgres://epkikiazzrgldn:Al1xSejfD3PTo-9yBQdk9TGHIi@ec2-23-21-193-140.compute-1.amazonaws.com:5432/dbjc363gs0d5qb';
var pgConfig = (dbUrl).split(":");
const config = {
	user: pgConfig[1].substr(2),
	password: pgConfig[2].split("@")[0],
	host: pgConfig[2].split("@")[1],
	port: pgConfig[3].split("/")[0],
	database: pgConfig[3].split("/")[1],
	ssl: true
};
var pool = new Pool(config);

exports.postUser = function(req, res) {
	//console.log(req.body);
	pool.query('INSERT INTO login VALUES ($1, $2)', [(req.body.email).toLowerCase(), req.body.password], function(err) {
		if (err) {
			res.sendStatus(400);
		}
		else {
			req.session.email = (req.body.email).toLowerCase();
			//console.log(req.session.email);
			res.sendStatus(200);
		}
	});
}

exports.postSignin = function (req, res) {
	//console.log(req.body);
	pool.query('SELECT password FROM login WHERE email=$1', [(req.body.email).toLowerCase()], function(err, result) {
		if (err || !result.rows.length) {
			res.sendStatus(400);
		}
		else if ((result.rows[0]).password != req.body.password) {
			res.sendStatus(400);
		}
		else {
			//console.log(result.rows);
			req.session.email = (req.body.email).toLowerCase();
			//console.log(req.session.email);
			res.sendStatus(200);
		}
		
	});
}

exports.getGithub = function (req, res) {
	res.send({'redirect': authorization_uri_github});
}

exports.getCallback = function (req, res) {
	var para = url.parse(req.url, true);
	var code = para.query.code;
	
	oauth2Github.authCode.getToken({
		code: code,
		redirect_uri: 'http://127.0.0.1:3000/'
	}, saveToken);

	function saveToken(error, result) {
		if (error) { console.log('Access Token Error', error.message); }
		token = oauth2Github.accessToken.create(result);
		res.redirect('/auth/' + token.token);
	}
}

exports.getAuth = function (req, res) {
	var path = (url.parse(req.url, true)).path;
	var tok = path.split('/')[2];
	
	github.authenticate({
		type: "oauth",
		token: tok
	});
	
	var headers = {"User-Agent" : "Timpan5"};
	
	rr({url : 'http://api.github.com/user/emails?' + tok, headers: headers}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			req.session.email = (JSON.parse(body)[0].email).toLowerCase();
			//console.log(req.session.email);
			res.redirect('/');
		}
	}); 
}

exports.getSession = function (req, res) {
	res.send({"session" : req.session.email});
}

exports.getGoogle = function (req, res) {
	//console.log(googleUrl);
	res.send({"redirect" : googleUrl});
}

exports.getCallbackGoogle = function (req, res) {
	oauth2Client.getToken(req.query.code, function (err, tokens) {
		if (!err) {
			oauth2Client.setCredentials(tokens);
			res.redirect('/googleA/?id=' + tokens.id_token);
		}
	});
}

exports.getGoogleAuth = function (req, res) {
	//console.log(req.query.id);
	var options = {
		url: 'https://www.googleapis.com/oauth2/v1/tokeninfo?id_token=' + req.query.id,
		method: 'POST'
	}
	rr(options, function (err, response, body) {
		if (!err && response.statusCode == 200) {
			req.session.email = ((JSON.parse(body)).email).toLowerCase();
			//console.log(req.session.email);
			res.redirect('/');
		}
	});
}