// Importing the dependancies.
const
	express = require('express'),
	router = express.Router();

// Setting up the route.
router.get('/', function (req, res, next) {

	// Rendering the index.ejs template.
	res.render('index');
});

// Exporting the route.
module.exports = router;
