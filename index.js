// Import express and routes
let express = require('express');
let twitter = require('./controller/twitter');
let bodyParser = require('body-parser');

// Initialize the app
let app = express();

// Config BodyParser
app.use(bodyParser.urlencoded({
	extended: true
})); 
app.use(bodyParser.json());

// Setting the routes
app.get('',(req, res) => res.send('Twitter Node Api is working <3'));
app.use('/twitter', twitter);

// Setup server port
var port = process.env.PORT || 8080; 

// Launch App to listen to especified port
app.listen(port, function() {
	console.log("Running Node Twitter API  port:"  + port);
});