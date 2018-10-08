const
    mongoose = require('mongoose'),
    topistSchema = mongoose.Schema({
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
                ref: 'entries'
            }
        ]
    }),
    topistModel = mongoose.model("topists", topistSchema);

module.exports = topistModel;