// Importing the dependancies.
var
	express = require('express'),
	List = require('./../models/List'),
	tabulator = require('./../helpers/tabulator.ts'),
	router = express.Router();

// Setting up the route.
router.get('/', function (req, res) {

	// Getting the sorting optionq
	const tab = tabulator(req);

	List.find({})
		.sort(tab.opts)
		.then(function (lists) {

			// Rendering the index.ejs template.
			res.render('index', { lists, type: tab.type });
		});
});

// Exporting the route.
module.exports = router;
