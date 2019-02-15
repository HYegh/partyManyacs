const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');

const User = mongoose.model('users');

module.exports = function(passport){
  passport.use(
    new FacebookStrategy({
      clientID: keys.facebook.ClientID,
      clientSecret:keys.facebook.ClientSecret,
      callbackURL:'/auth/facebook/callback',
      proxy: true,
      profileFields: ['id', 'displayName', 'emails', 'photos']
    },(accessToken, refreshToken, profile, done) => {
      // console.log(accessToken);
      // console.log(profile);

      // console.log(profile.gender)
      const image = 'https://graph.facebook.com/' + profile.id +'/picture?type=large' ; 
      // const image = profile.photos[0].value;
      // console.log(image);

      
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