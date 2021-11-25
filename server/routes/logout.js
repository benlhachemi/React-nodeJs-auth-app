//imports
const express                                 = require('express')
const router                                  = express.Router()
const { check_auth }                          = require('../config/auth_validation')
const { is_host_allowed, is_api_key_correct } = require('../config/security_validation')
const User                                    = require('../modules/user')
const passport                                = require('passport')

module.exports = router.post('/logout' ,(req, res) => {
    if(!is_host_allowed || !is_api_key_correct(req.body.api_key)) return res.json({'error': 'you don\'t have the permission to access the API'})
    
    if(!check_auth(req)) return res.json({'error': 'can\'t logout a user because there is no one authenticated'})
    console.log(console.log(`*USER ${req.user.username} IS LOGGED OUT`))
    req.logout()
    res.json({'success': 'user logged out successfully'})
})