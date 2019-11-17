// Importing the dependancies.
var mongoose = require('mongoose');

// Creating an entry schema.
var entrySchema = mongoose.Schema({
  position: Number,
  title: String,
  subtitle: String,
  picture: String,
  description: String
});

// Exporting the entry model.
module.exports = mongoose.model("Entry", entrySchema);
