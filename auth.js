require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const { ObjectID } = require('mongodb');
const GitHubStrategy = require('passport-github').Strategy;

module.exports = function (app, myDataBase) {
   /* passport.use(new GitHubStrategy({
      clientID:"377eb655a5babb5bf61c",
      clientSecret: "d711d44d305d20a468786c80aa0faa1ecae0a879",
      callbackURL: 'https://localhost:3000/auth/github/callback'
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
    
    }
  ));*/



  passport.use(new LocalStrategy((username, password, done) => {
   
    myDataBase.findOne({ username: username }, (err, user) => {
      console.log(`User ${username} attempted to log in.`);
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!bcrypt.compareSync(password, user.password)) { 
          return done(null, false);
      }
      return done(null, user);
    });
  }));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser((id, done) => {
    myDataBase.findOne({ _id: new ObjectID(id) }, (err, doc) => {
      done(null, doc);
    });
  });

 


};  

