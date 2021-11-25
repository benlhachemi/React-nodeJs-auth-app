//imports
const LocalStrategy = require('passport-local')
const bcrypt        = require('bcrypt')
const passport      = require('passport')
const User          = require('../modules/user')

function strategy(passport){

    //defining the stategy for the passport
    passport.use(new LocalStrategy({usernameField: 'username', passwordField: 'password'},
    (username, password, done) => {
        User.findOne({username: username }, (err, user) => {
            if (err) return done(err)
            if (!user) return done(null, false, {'error': 'user not found'})
            bcrypt.compare(password, user.password, (error, isMatch) => {
                if(error) throw error
                if(isMatch) return done(null, user)
                return done(null, false, {'error': 'password incorrect'})
            })
      })
    }   
    ))

    //serialize user
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    //deserialize user
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
}

module.exports = strategy