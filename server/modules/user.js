const mongoose = require('mongoose')
const pjson    = require('../package.json')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        minLength: 4,
        maxLength: 20,
        required: true
    },
    email:    {
        type: String,
        unique: true,
        minLength: 6,
        maxLength: 60,
        required: true
    },
    password: {
        type: String,
        minLength: 6,
        maxLength: 100,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now()
    },
    country: {
        type: String
    },
    ips: {
        type: Array
    },
    last_login: {
        type: Date
    }
});

const User = mongoose.model(pjson.database_collection_name, UserSchema)

module.exports = User