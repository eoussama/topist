// Importing the dependancies.
var
	express = require('express'),
	List = require('./../models/List'),
	tabulator = require('./../helpers/tabulator.ts'),
	router = express.Router();

// Setting up the route.
router.get('/', function (req, res) {

	// Getting the sorting optionq
	const opts = tabulator(req);

	List.find({})
		.sort(opts)
		.then(function (lists) {

			// Rendering the index.ejs template.
			res.render('index', { lists });
		});
});

// Exporting the route.
module.exports = router;
