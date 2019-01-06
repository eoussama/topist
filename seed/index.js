/**
 * Topist's database seed, used to pupulate the 
 * datatabse with dummy data for testing purposes.
 */


// Importing the dependancies.
const
    listGenerator = require('./list'),
    mongoose = require('mongoose'),
    List = require('../models/List'),
    Entry = require('../models/Entry');


// Connecting to the database.
mongoose.connect('mongodb://localhost:27017/topistdb', { useNewUrlParser: true }, err => {

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

        const lists = listGenerator.generateLists(count);

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
                    list.entries.forEach(entry => {

                        // Inserting each entry in the database.
                        Entry.create({
                            position: entry.position,
                            title: entry.title,
                            subtitle: entry.subtitle,
                            picture: entry.picture,
                            description: entry.description
                        }, (err, createdEntry) => {

                            if (!err) {

                                // Pushing the created entry to the list.
                                createdList.entries.push(createdEntry);

                            } else {

                                // Printing the error.
                                console.error(`[Seeding Error]: ${err}.`);
                            }
                        });
                    });

                    createdList.save();
                } else {

                    // Printing the error.
                    console.error(`[Seeding Error]: ${err}.`);
                }

                if (index + 1 === count) {

                    resolve();
                }
            });
        });
    });
}
