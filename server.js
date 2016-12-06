var express         = require('express');
var port            = process.env.PORT || 3000;
var morgan          = require('morgan');
var app             = express();

// Express Configuration
// -----------------------------------------------------

// Logging and Parsing
app.use(express.static(__dirname + '/public'));                 // sets the static files location to public
app.use('/bower_components',  express.static(__dirname + '/bower_components')); // Use BowerComponents

                                      // log with Morgan
app.get('*', (req, res) => {
	res.sendFile('index.html');
});

// Listen
// -------------------------------------------------------
app.listen(port);
console.log('App listening on port ' + port);
