// File Name: index.js

// Import express and routes
let express = require('express');
let routes = require('./routes');
let mariadb = require('mariadb');
let bodyParser = require('body-parser');

// Create a db connection
const config = {
	user: "user",
	host: "localhost:1234",
	password: "1234",
	database: "db_name",
	connectionLimit: 5
};
const pool = mariadb.createPool(config);


// Initialize the app
let app = express();

// Config BodyParser
app.use(bodyParser.urlencoded({
	extended: true
})); 
app.use(bodyParser.json());

app.use('/api', routes);


// Setup server port
var port =  process.env.PORT || 8080;

// Send message for default URL 
app.get('',(req, res) => res.send('Hello World With Express'));

// Launch App to listen to especified port







app.listen(port, function() {
	console.log("Running Node Twitter API  port:"  + port);
});