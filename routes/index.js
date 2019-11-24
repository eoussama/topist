// Importing the dependancies.
var
	express = require('express'),
	List = require('./../models/List'),
	router = express.Router();


// Setting up the route.
router.get('/', function (req, res) {

	List.find({})
		.sort({ date: -1 })
		.then(function (lists) {

			// Rendering the index.ejs template.
			res.render('index', { lists });
		});
});

// Exporting the route.
module.exports = router;
