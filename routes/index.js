var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'food app name' });
});

// google oauth login route
router.get('/auth/google', passport.authenticate(
  // which passport strategy is being used
  'google',
  {
    scope: ['profile', 'email'],
    // Optional - prompts user to select google account
    prompt: 'select_account'
  }
));

// google oauth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',  // <--- Come back and change this once pages setup
    failureRedirect: '/'
  }
));

// google oauth logout route
router.get('/logout', function(req, res) {
  req.logout(function() {
    res.redirect('/');
  });
});

module.exports = router;
