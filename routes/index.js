// Importing the dependancies.
var
	express = require('express'),
	List = require('./../models/List'),
	router = express.Router();


// Setting up the route.
router.get('/', function (req, res) {

	List.find({}, (err, lists) => {

		if (!err) {

			// Rendering the index.ejs template.
			res.render('index', { lists });
		}
	});
});

// Exporting the route.
module.exports = router;
