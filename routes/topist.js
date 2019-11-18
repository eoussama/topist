// Importing the dependancies.
var
	express = require('express'),
	List = require('../models/List'),
	Entry = require('../models/Entry'),
	router = express.Router();


// Setting topist's insertion route.
router.post('/', function (req, res) {

	console.log('Topist created.');
});


// Setting up the topist's input route.
router.get('/new', function (req, res) {

	// Rendering the topist/new.ejs template.
	res.render('topist/new');
});


// Setting up the topist's display route.
router.get('/:id', function (req, res) {

	// Getting the id.
	const id = req.params.id;

	// Getting the list.
	List.findById(id).populate("entries").exec((err, list) => {

		if (!err && list) {

			// Rendering the topist/index.ejs template.
			res.render('topist/index', { list });
		} else {

			// Redirecting in case some error occured.
			res.redirect('/');
		}
	});
});


// Exporting the route.
module.exports = router;
