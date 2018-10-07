const
    mongoose = require('mongoose'),
    entriesSchema = mongoose.Schema({
        position: Number,
        title: String,
        subtitle: String,
        picture: String,
        description: String
    }),
    entriesModel = mongoose.model("entries", entriesSchema);

module.exports = entriesModel;