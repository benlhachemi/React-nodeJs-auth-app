const pjson = require('../package.json')

require('dotenv').config()

module.exports = {

    is_host_allowed: function() {
        const allowed_host = pjson.react_host
        const client_host = host
        if(host.includes(allowed_host) || allowed_host.includes(host)) return true
        return false
    },

    is_api_key_correct: function(api_key){
        if(!api_key) return false
        if(api_key === process.env.API_KEY) return true
        return false
    }

};