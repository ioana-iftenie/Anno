// node-soap functionality ***********************
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

var fs = require('fs');
var mysql     = require('mysql');

// expose the routes to our app with module.exports
module.exports = function(app) {

  app.post('/api/homepage', function(req, res) {
    
    console.log(req.body.inputField);

    res.json(req.body.inputField);
  });
          
  // application -------------------------------------------------------------
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};




