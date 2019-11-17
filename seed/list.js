/**
 * List seed.
 */

// Importing the dependancies.
var
	faker = require('faker'),
	entry = require('./entry');

/**
 * Generates a random list.
 */
function generateList() {

	// The list to be generated.
	var list = {
		topic: faker.lorem.words(),
		description: faker.lorem.paragraph(),
		date: faker.date.recent(),
		user: faker.internet.userName(),
		upvotes: faker.random.number(),
		downvotes: faker.random.number()
	};

	// Setting up a proper view count.
	list.views = faker.random.number() + list.upvotes + list.downvotes;

	// The entries to seed.
	var count = faker.random.number({ min: 3, max: 50 });

	// Setting up entries.
	list.entries = entry.generateEntries(count);

	// Returning the generated list.
	return list;
}


// Exporting the lists.
module.exports.generateLists = function (count) {

	// The lists to seed.
	var lists = [];

	while (count-- > 0) {

		// Adding a new generated list to the collection.
		lists.push(generateList());
	}

	// Returning the lists.
	return lists;
}
