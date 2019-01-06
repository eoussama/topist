// Importing the dependancies.
const mongoose = require('mongoose');

// Creating an entry schema.
const entrySchema = mongoose.Schema({
    position: Number,
    title: String,
    subtitle: String,
    picture: String,
    description: String
});

// Exporting the entry model.
module.exports = mongoose.model("Entry", entrySchema);
