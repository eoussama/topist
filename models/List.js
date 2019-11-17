// Importing the dependancies.
const mongoose = require('mongoose');

// Creating a list schema.
const listSchema = mongoose.Schema({
    topic: String,
    description: String,
    date: {
        type: Date,
        default: Date.now
    },
    user: String,
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    entries: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Entry'
        }
    ]
});

// Exporting the entry model.
module.exports = mongoose.model("List", listSchema);