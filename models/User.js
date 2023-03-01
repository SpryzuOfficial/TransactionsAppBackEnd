const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        bcrypt: true
    },
    categories: [],
    budget: {
        type: Number
    },
});

UserSchema.plugin(require('mongoose-bcrypt'));

module.exports = model('User', UserSchema);