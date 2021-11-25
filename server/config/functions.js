const mongoose = require('mongoose')
const User = require('../modules/user')

const functions = {
    retrieveOne: function(query) {
        return User.findOne(query);
    }
}

module.exports = functions;