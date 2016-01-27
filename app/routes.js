// node-soap functionality ***********************
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

var fs = require('fs');
var mysql     = require('mysql');


var connection = mysql.createConnection({
  host     : 'localhost',
  database : 'anno',
  user     : 'root'
});

connection.connect();

// expose the routes to our app with module.exports
module.exports = function(app) {

  app.post('/api/homepage', function(req, res) {
    
    console.log(req.body.inputField);

    res.json(req.body.inputField);
  });

  app.post('/api/login', function(req, res) {
  	console.log( req.body.username  + " efgfd " + req.body.password);
  	if(req.body.username != undefined) {

  	var loginQuery = "SELECT COUNT(USERNAME) as counter FROM user where username = ? and password = ?";
  	var loginErrorCode = 0;


  	connection.query(loginQuery, [req.body.username , req.body.password], function(err, rows, fields) {
      if (err) throw err;

      if (rows[0].counter == 1) {
      	req.session.username = req.body.username;
      	console.log(req.session.username + " sesiune");
        res.send({error: 0})
 	   }
	  else {
	  	loginErrorCode = 1;
        res.send({error: 1});
	    }
    });
  }
  else {
  		var registerQuery = "SELECT COUNT(USERNAME) as counterUsername FROM user where username = ?";
	  	var loginErrorCode = 0;

	  	var temp = {
	  		username : req.body.usernameRegister,
	  		password : req.body.passwordRegister,
	  		email : req.body.emailRegister
	  	};

	  	console.log(temp);

	  	connection.query(registerQuery, [req.body.usernameRegister], function(err, rows, fields) {
	      if (err) throw err;
	      console.log(rows[0].counterUsername)
	      console.log(rows[0]);

	      if (rows[0].counterUsername == 0) {
	      	
	  		connection.query("INSERT into user SET ?", [temp], function(err, rows) {
	  			req.session.username = temp.username;
	  			res.send({error: 0});
	  		});
	    
	 	   }
		   if (rows[0].counterUsername != 0){
			  	loginErrorCode = 3;
		        res.send({error: 3});
		    }
   		 });
  }
  })
          
  // application -------------------------------------------------------------
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};




