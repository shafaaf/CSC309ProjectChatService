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

exports.edit = function(req, res) {
  var userEmail = req.session.email,
      firstName = req.body.firstName,
      lastName = req.body.lastName,
      subject = req.body.subject,
      role = req.body.role;
  console.log(req.body);

  // pool.query('INSERT INTO profiles VALUES ', function(err, result) {

  // })
}
