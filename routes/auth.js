const express = require('express');
const router = express.Router();
const passport = require('passport');
const {HOST} = require('../config/keys');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
        // console.log(req.user)
        res.redirect(`${HOST}/dashboard?token=${req.user.token}`);
    });

router.get('/facebook', passport.authenticate('facebook', { scope : ['email'] }));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect(`${HOST}/dashboard/myParties?token=${req.user.token}`);

  });

router.get('/verify', (req, res) => {
    if (!req.user) {
        res.send({})
    } 
    
    res.json(req.user);
});


router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;