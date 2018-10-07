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
        upvotes: Number,
        downvotes: Number,
        views: Number,
        entries: [
            {
                type: Schema.Types.ObjectId,
                ref: 'entries'
            }
        ]
    }),
    topistModel = mongoose.model("topist", topistSchema);

module.exports = topistModel;