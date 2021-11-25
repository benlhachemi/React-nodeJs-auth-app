//imports
const express                                 = require('express')
const router                                  = express.Router()
const { check_auth }             = require('../config/auth_validation')
const { is_host_allowed, is_api_key_correct } = require('../config/security_validation')
const User                                    = require('../modules/user')
const { lookup }                              = require('geoip-lite')
const bcrypt                                  = require('bcrypt')
const { retrieveOne }                         = require('../config/functions')

module.exports = router.post('/register', async(req, res) => {
    if(check_auth(req)) return res.json({'error': 'can\'t register new user because there is an existing user already logged in'})
    if(!is_host_allowed || !is_api_key_correct(req.body.api_key)) return res.json({'error': 'you don\'t have the permission to access the API'})

    //user have now the permission to access the API 
    //we should do some user data verification before storing it in our databse
    //first verification : check if the required fields in the database are entered
    if(!req.body.username) return res.json({'error': 'username field is missing'})
    if(!req.body.email   ) return res.json({'error': 'email field is missing'   })
    if(!req.body.password) return res.json({'error': 'password field is missing'})
    
    //second verification : check if the data length follows the database rules
    if(req.body.username.length < 4  ) return res.json({'error': 'username is too short (4 characters min)' })
    if(req.body.username.length > 20 ) return res.json({'error': 'username is too long (20 characters max)' })
    if(req.body.email.length < 6     ) return res.json({'error': 'email is too short (6 characters min)'    })
    if(req.body.email.length > 60    ) return res.json({'error': 'email is too long (60 characters max)'    })
    if(req.body.password.length < 6  ) return res.json({'error': 'password is too short (6 characters min)' })
    if(req.body.password.length > 100) return res.json({'error': 'password is too long (100 characters max)'})

    //third verification : check if email has valid format
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (!req.body.email.match(validRegex)) return res.json({'error': 'please enter a correct email'})

    //fourth verification : check if the fields are not white spaces + only allowed characters
    //if(!(/^[a-z]+$/i.test(req.body.username) || /[0-9]/.test(req.body.username) || req.body.username.indexOf('_') > -1 || req.body.username.indexOf('-') > -1)) return res.json({'error': 'usnername can only be numbers, letters and the characters ( - ) ( _ )'})
    let char_not_allowed = false
    const pattern1 = /[_-]/
    const pattern2 = /[a-z]/i
    const pattern3 = /[0-9]/
    const username_string = req.body.username.split('')
    req.body.username.split('').map(char => {
        const has_allowed_chars = pattern1.test(char)
        const has_letters       = pattern2.test(char)
        const has_numbers       = pattern3.test(char)
        if(!has_allowed_chars && !has_letters && !has_numbers) char_not_allowed = true
    })
    if(char_not_allowed) return res.json({'error': 'usnername can only be numbers, letters and the characters ( - ) ( _ )'})
    if(!/[a-zA-Z]/.test(req.body.username)) return res.json({'error': 'usnername should at least have one letter'})

    //fifth verification : check if given username + email doesn't exist in the database
    //first let's convert username and email to lower case to have a non case sensitive variables
    const username_lower_case = req.body.username.toLowerCase()
    const email_lower_case    = req.body.email.toLowerCase()

    let username_already_exists = await retrieveOne({username: username_lower_case})
    let email_already_exists    = await retrieveOne({email   : email_lower_case   })

    if(username_already_exists) return res.json({'error': 'username already exists'})
    if(email_already_exists)    return res.json({'error': 'email already exists'   })

    //get info 1 : we want to get the ip address of the request and the country to store it in an array of ips in our database
    const user_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    const user_location_info = lookup(user_ip)

    //now everything looks good so let's save our new user in the db
    if(user_location_info == null || user_location_info == undefined){
        const user_to_save = new User({
            username: username_lower_case,
            email   : email_lower_case,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
        })
        user_to_save.save().then(saved_user => {
            if(saved_user) {console.log(`*NEW USER ${saved_user.username} REGISTRED`);return res.json({'success': 'new user registred successfully', 'user': saved_user})}
            return res.json({'error': 'db error while registring new user'})
        })
    }
    else{
        const user_to_save = new User({
            username: username_lower_case,
            email   : email_lower_case,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
            ips     : [user_ip],
            country : user_country.country
        })
        user_to_save.save().then(saved_user => {
            if(saved_user) {console.log(`*NEW USER ${saved_user.username} REGISTRED`);return res.json({'success': 'new user registred successfully', 'user': saved_user})}
            return res.json({'error': 'db error while registring new user'})
        })
    }
})
