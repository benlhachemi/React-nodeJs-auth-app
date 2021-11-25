//imports
const express                                 = require('express')
const router                                  = express.Router()
const { check_auth }                          = require('../config/auth_validation')
const { is_host_allowed, is_api_key_correct } = require('../config/security_validation')
const User                                    = require('../modules/user')

module.exports = router.post('/auth' ,(req, res) => {
    if(!is_host_allowed || !is_api_key_correct(req.body.api_key)) return res.json({'error': 'you don\'t have the permission to access the API'})
    
    if(check_auth(req)) return res.json(req.user)
    return res.json({'error': 'no user authenticated'})
})