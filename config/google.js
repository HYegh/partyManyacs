const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');


//load models
const User = mongoose.model('users');

module.exports = function(passport){
  passport.use(
    new GoogleStrategy({
      clientID: keys.google.ClientID,
      clientSecret:keys.google.ClientSecret,
      callbackURL:'/auth/google/callback',
      proxy: true
    },(accessToken, refreshToken, profile, done) => {
      // console.log(accessToken);
      // console.log(profile);

      // console.log(profile)

      const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));
      
      const newUser = {
        ClientId: profile.id,
        fullName: profile.displayName,
        gender: "",
        phoneNumber:"",
        email: profile.emails[0].value,
        image: image,
        token: accessToken
      }

      // Check for existing user
      User.findOne({
        ClientId: profile.id
      }).then(user => {
        if(user){
          // Return user
          done(null, user);
        } else {
          // Create user
          new User(newUser)
            .save()
            .then(user => done(null, user));
        }
      })
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user));
  });
}