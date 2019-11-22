// Importing the dependancies.
var
	async = require('async'),
	express = require('express'),
	List = require('../models/List'),
	Entry = require('../models/Entry'),
	router = express.Router();

// Setting topist's insertion route.
router.post('/', function (req, res) {
	if ('topist' in req.body) {
		var _topist = JSON.parse(req.body.topist);
		var topist = new List({ ..._topist });

		async.each(_topist.entries, function (_entry) {
			var entry = new Entry({ ..._entry });

			topist.entries.push(entry);
			entry.save();
		});

		topist.save();
		res.json({ success: true });
	} else {
		res.json({ success: false });
	}
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
