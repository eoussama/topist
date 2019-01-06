// Importing the dependancies.
const
	express = require('express'),
	router = express.Router();


// Setting topist's insertion route.
router.post('/', function (req, res, next) {

	// Rendering the index.ejs template.
	console.log('Topist created.');
});


// Setting up the topist's input route.
router.get('/new', function (req, res, next) {

	// Rendering the index.ejs template.
	res.render('topist/new');
});


// Setting up the topist's display route.
router.get('/:id', function (req, res, next) {

	// Rendering the index.ejs template.
	res.render('topist/index');
});


// Exporting the route.
module.exports = router;
