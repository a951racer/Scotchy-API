const passport = require('passport');
const mongoose = require('mongoose');

module.exports = function() {
  const User = mongoose.model('User');
  
  passport.serializeUser((user, done) => {
    console.log('serial: ' + user.id);
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log('deserial: ' + id);
    User.findOne({
      _id: id
    }, '-password -salt', (err, user) => {
      console.log('deserial user: ' + user);
      done(err, user);
    });
  });
  
require('./strategies/local.js')();

};