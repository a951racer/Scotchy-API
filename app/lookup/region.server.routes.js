const users = require('../../app/users/user.server.controller');
const regions = require('../../app/lookup/region.server.controller');

module.exports = function(app) {
  app.route('/api/regions')
//    .post(users.requiresLogin, regions.create);
    .get(regions.list)
    .post(regions.create);

  app.route('/api/regions/:regionId')
//    .put(users.requiresLogin, wishlists.hasAuthorization, regions.update)
//    .delete(users.requiresLogin, wishlists.hasAuthorization, regions.delete);
    .get(regions.read)
    .put(regions.update)
    .delete(regions.delete);
  
  app.param('regionId', regions.regionByID);
};