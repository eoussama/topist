/**
 * List seed.
 */



// Importing the dependancies.
var
	faker = require('faker'),
	List = require('./../models/List'),
	entryGenerator = require('./entry');

/**
 * Generates a random list.
 */
function generateList() {

	// Setting up the calculation object
	var calc = {
		upvotes: faker.random.number(),
		downvotes: faker.random.number(),
		count: faker.random.number({ min: 3, max: 50 })
	};

	// The list to be generated.
	var list = new List({
		title: faker.lorem.words(),
		description: faker.lorem.paragraph(),
		date: faker.date.recent(),
		user: faker.internet.userName(),
		views: faker.random.number() + calc.upvotes + calc.downvotes,
		upvotes: calc.upvotes,
		downvotes: calc.downvotes,
		entries: entryGenerator(calc.count)
	});

	// Returning the generated list.
	return list;
}

// Exporting the lists.
module.exports = function (count) {

	// The lists to seed.
	var lists = [];

	while (count-- > 0) {

		// Adding a new generated list to the collection.
		lists.push(generateList());
	}

	// Returning the lists.
	return lists;
}
