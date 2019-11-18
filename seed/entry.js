/**
 * Entry seed.
 */

// Importing the dependancies.
var faker = require('faker');

/**
 * Generates and entry.
 * 
 * @param {Int} position The position of the entry in the list.
 */
function generateEntry(position) {

	// The entry to be generated.
	var entry = {
		position,
		title: faker.lorem.words(),
		subtitle: faker.lorem.words(),
		picture: faker.image.abstract(),
		description: faker.lorem.paragraph()
	};

	// Returning the generated entry.
	return entry;
}


// Exporting the entries.
module.exports = function (count) {

	// The entries to seed.
	var entries = [];

	while (count-- > 0) {

		// Adding a new generated entry to the collection.
		entries.push(generateEntry(count + 1));
	}

	// Returning the entries.
	return entries;
}
