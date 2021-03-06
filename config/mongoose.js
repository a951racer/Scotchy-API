const config = require('./config');
const mongoose = require('mongoose');

module.exports = function() {
  const db = mongoose.connect(config.db);
  require('../app/users/user.server.model');
  require('../app/scotches/scotch.server.model');
  require('../app/wishlists/wishlist.server.model');
  // require('../app/prices/price.server.model');
  require('../app/lookup/style.server.model');
  require('../app/lookup/region.server.model');

  return db;
};
