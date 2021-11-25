//imports
const mongoose = require('mongoose')
const pjson    = require('../package.json')

//set up .env file
require('dotenv').config()

//db set up
const db = mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.uf7bv.mongodb.net/${pjson.database_name}?retryWrites=true&w=majority`,{useNewUrlParser: true})

//export module
module.exports = db