//imports
const express       = require('express')
const mongoose      = require('mongoose')
const db            = require('./config/db-config')
const cors          = require('cors')
const bodyParser    = require('body-parser')
const passport      = require('passport')
const session       = require('express-session')
const cookieParser  = require("cookie-parser")
const pjson         = require('./package.json')
const User          = require('./modules/user')

//defining express as main Node.js framework
const app = express()

//set up the db
db.then(console.log('*DATABASE CONNECTED SUCCESSFULY')).catch(err => console.log('(X) --- DATABASE ERROR --- ' + err))

//middlewares
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({origin: pjson.react_host,credentials: true,}))
app.use(session({secret: process.env.SESSION_SECRET_KEY,resave: true, saveUninitialized: true}))  
app.use(cookieParser(process.env.SESSION_SECRET_KEY))
app.use(passport.initialize())
app.use(passport.session())

//set up the passport strategy (local)
require('./config/auth-strategy')(passport)

//set up .env file
require('dotenv').config()

//set up the routes
app.use('/api', require('./routes/register'))
app.use('/api', require('./routes/login'))
app.use('/api', require('./routes/logout'))
app.use('/', require('./routes/auth'))

//set up the port
const PORT = process.env.PORT || 4000
app.listen(PORT, console.log('*SERVER RUNNING ON ===> http://localhost:' + PORT + ' <==='))
