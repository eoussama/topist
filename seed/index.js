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

	// Getting the input
	var input = parseInt(process.argv.slice().reverse()[0]);

	// Defining the entry count
	var count = (input && !isNaN(input)) ? input : 10;

	// Logging a message.
	console.log("[Seed]: Seeding the database...");

	// Seeding lists.
	seedDB(count).then(function () {

		// Logging a message.
		console.log('[Seed]: Seeding has successfully finished.');
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

			// Looping through each list's entries.
			async.each(list.entries, function (entry) {

				// Saving each entry to the database.
				entry.save();
			});

			// Saving the lists with the updated entries.
			console.log('[Seed]: List ' + (index++ + 1) + ' inserted.');
			list.save();

			if (count === index) {

				// Resolving the seed
				resolve();
			}
		});
	});
}
