// Filename: api-routes.js
// Initialize Express Router

let router = require('express').Router();

// Set Default API response 
router.get('/', function (req, res) {
	res.json({
		status: 'API Its Working',
		message: 'Welcome to Twitter API crafted with love <3'
	});
});

// Export API ROUTES
module.exports = router;