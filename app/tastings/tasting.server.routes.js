const users = require('../../app/users/user.server.controller');
const scotches = require('../../app/scotches/scotch.server.controller');
const tastings = require('../../app/tastings/tasting.server.controller');

module.exports = function(app) {
  app.route('/api/scotches/tastings/:scotchId')
    // .post(users.requiresLogin, scotches.hasAuthorization, tastings.addTasting)
    // .put(users.requiresLogin, scotches.hasAuthorization, tastings.updateTasting)  
    // .delete(users.requiresLogin, scotches.hasAuthorization, tastings.deleteTasting)
    .post(tastings.addTasting)
    .put(tastings.updateTasting)  
    .delete(tastings.deleteTasting);
  
  app.route('/api/tastings')
    .get(tastings.list);

  app.param('scotchId', scotches.scotchByID);
};