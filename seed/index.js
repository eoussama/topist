/**
 * Topist's database seed, used to pupulate the 
 * datatabse with dummy data for testing purposes.
 */

// Importing the dependancies.
var
	async = require('async'),
	mongoose = require('mongoose'),
	listGenerator = require('./list'),
	List = require('../models/List'),
	Entry = require('../models/Entry');


// Connecting to the database.
mongoose.connect('mongodb://mongo:27017/topistdb', { useNewUrlParser: true }, function () {

	// Logging a message.
	console.log("[Seed]: Seeding the database...");

	// Seeding lists.
	seedDB(2).then(() => {

		// Logging a message.
		console.log('[Seed]: Seeding has successfully finished.');

		// Exeting the process.
		// process.exit(0);
	});
});

/**
 * Inserts the generated lists in the database.
 */
function seedDB(count) {
	return new Promise((resolve, reject) => {

		// Generating data
		var lists = listGenerator(count);

		// Preparing the iterator
		var index = 0;

		// Looping through the lists
		async.each(lists, function (list) {

			// Inserting each list in the database.
			List.create({
				title: list.title,
				description: list.description,
				date: list.date,
				user: list.user,
				upvotes: list.upvotes,
				downvotes: list.downvotes,
				views: list.views
			}, function (err, list) {

				if (!err) {

					// Looping through each list's entries.
					async.each(list.entries, function (_entry) {

						// Inserting each entry in the database.
						// entry = new Entry({
						// 	position: _entry.position,
						// 	title: _entry.title,
						// 	subtitle: _entry.subtitle,
						// 	picture: _entry.picture,
						// 	description: _entry.description
						// });
						console.log({ _entry });
						// Saving each entry to the database.
						// entry.save();

						// Pushing the created entry to the list.
						// list.entries.push(entry);
					});

					// Saving the lists with the updated entries.
					console.log('[Seed]: List ' + (index + 1) + ' inserted.');
					// list.save();
				} else {

					// Outputing the error.
					console.error('[Seed]: ' + err);
				}
			});
		});

		// Resolving the seed
		resolve();
	});
}
