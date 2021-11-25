//imports
const express                                 = require('express')
const router                                  = express.Router()
const { check_auth }                          = require('../config/auth_validation')
const { is_host_allowed, is_api_key_correct } = require('../config/security_validation')
const User                                    = require('../modules/user')
const bcrypt                                  = require('bcrypt')
const { retrieveOne }                         = require('../config/functions')
const passport                                = require('passport')

module.exports = router.post('/login', async(req, res, next) => {
    if(check_auth(req)) return res.json({'error': 'can\'t login new user because there is an existing user already logged in'})
    if(!is_host_allowed || !is_api_key_correct(req.body.api_key)) return res.json({'error': 'you don\'t have the permission to access the API'})

    //user have now the permission to access the API
    //first verification : check if the required fields in the database are entered
    if(!req.body.username) return res.json({'error': 'username field is missing'})
    if(!req.body.password) return res.json({'error': 'password field is missing'})

    //second verification : check if the data length is not too long (just for security)
    if(req.body.username.length > 20 ) return res.json({'error': 'username is too long (20 characters max)' })
    if(req.body.password.length > 100) return res.json({'error': 'password is too long (100 characters max)'})

    //now we authenticate our user with passport
    passport.authenticate('local', (err, user, info) => {
        if(err) return res.json({'error': err})
        if(info) return res.json(info)
        if(user){
            req.logIn(user, (err) => {
                if(err) return res.json(err)
                else{console.log(`*USER ${user.username} IS AUTHENTICATED`);return res.json(user)}
            })
        }
    })(req, res, next)
})