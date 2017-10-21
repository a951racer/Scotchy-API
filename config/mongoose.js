const config = require('./config');
const mongoose = require('mongoose');

module.exports = function() {
  const db = mongoose.connect(config.db);
  require('../app/users/user.server.model');
  require('../app/scotches/scotch.server.model');
  require('../app/wishlists/wishlist.server.model');
  require('../app/settings/style.server.model');
  
  return db;
};
