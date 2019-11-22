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
		var topist = new List({ ..._topist, entries: [] });
		var index = 0;

		new Promise(function (resolve, reject) {
			async.each(_topist.entries, function (_entry) {
				var entry = new Entry({ ..._entry });

				entry.save();
				topist.entries.push(entry);
				console.log(index);
				if (++index === topist.entries.length) {
					resolve();
				}
			});
		}).then(function () {
			topist.save(function (error, data) {
				if (!error) {
					res.json({ success: true });
				} else {
					console.error(error);
					res.json({ success: false });
				}
			});
		});
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
