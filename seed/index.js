/**
 * Topist's database seed, used to pupulate the 
 * datatabse with dummy data for testing purposes.
 */

// Importing the dependancies.
var
	listGenerator = require('./list'),
	mongoose = require('mongoose'),
	List = require('../models/List'),
	Entry = require('../models/Entry');


// Connecting to the database.
mongoose.connect('mongodb://localhost:27017/topistdb', { useNewUrlParser: true }, function (err) {

	// Logging a message.
	console.log("Seeding the database...");

	// Seeding lists.
	seedLists(20).then(() => {

		// Logging a message.
		console.log('Database seeded.');

		// Exeting the process.
		process.exit(0);
	});
});

/**
 * Inserts the generated lists in the database.
 */
function seedLists(count) {

	return new Promise((resolve, reject) => {

		var lists = listGenerator.generateLists(count);
		var insertedLists = 0;

		// Looping through the lists.
		lists.forEach((list, index) => {

			// Inserting each list in the database.
			List.create({
				topic: list.topic,
				description: list.description,
				date: list.date,
				user: list.user,
				upvotes: list.upvotes,
				downvotes: list.downvotes,
				views: list.views
			}, (err, createdList) => {

				if (!err) {

					// Looping through each list's entries.
					list.entries.forEach((_entry, _index) => {

						// Inserting each entry in the database.
						entry = new Entry({
							position: _entry.position,
							title: _entry.title,
							subtitle: _entry.subtitle,
							picture: _entry.picture,
							description: _entry.description
						});

						// Saving each entry to the database.
						entry.save();

						// Pushing the created entry to the list.
						createdList.entries.push(entry);
					});

					// For some reason, if nothing is printed at this point,
					// some lists with have no entries. Weird.
					console.log(`List ${index + 1} inserted!`);

					// Saving the lists with the updated entries.
					createdList.save();

					// Incrementing the inserted lists' count.
					insertedLists++;
				} else {

					// Printing the error.
					console.error(`[Seeding Error]: ${err}.`);
				}

				if (insertedLists === count) {

					resolve();
				}
			});
		});
	});
}
