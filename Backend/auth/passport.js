const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const encrypt = require('./utils').encrypt;
const Teacher = require('../db/models').Teacher;

passport.serializeUser(function (user, done) {
    done(null, user.id)
});

passport.deserializeUser(function (teacherKey, done) {
    Teacher.findByPrimary(teacherKey).then((user) => {
        done(null, user)
    }).catch((err) => {
        done(err)
    })
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        Teacher.findOne({
            where: {
                username: encrypt(username),
                password: encrypt(password)
            }
        }).then((user) => {

            if(!user) {
                return done(null, false, {messages: 'Username or Password was wrong!'})
            }

            return done(null, user);


        }).catch((err) =>{
            done(err);
        })
    })
);

module.exports = passport;