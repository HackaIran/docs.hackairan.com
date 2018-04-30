
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
const md5 = require('md5');

var UserSchema = new Schema({
    username: {
        type: String,
        required: true 
    },
    password: {
        type: String
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }, 
    avatar: {
        type: String
    },
    email: {
        type: String,
        required: true
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

UserSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
})

UserSchema.virtual('gravatar').get(function () {
    return 'https://www.gravatar.com/avatar/' + md5(this.email);
})

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
