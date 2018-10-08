const
    mongoose = require('mongoose'),
    entrySchema = mongoose.Schema({
        position: Number,
        title: String,
        subtitle: String,
        picture: String,
        description: String
    }),
    entryModel = mongoose.model("entries", entrySchema);

module.exports = entryModel;