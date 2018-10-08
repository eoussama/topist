const
    mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose'),
    userSchema = mongoose.Schema({
        username: String,
        password: String,
        email: String,
        admin: {
            type: Boolean,
            default: false
        },
        joined: {
            type: Date,
            default: Date.now
        },
        topists: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'topists'
            }
        ],
        history: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'topists'
            }
        ]
    });

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("users", userSchema);