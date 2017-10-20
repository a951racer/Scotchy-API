const users = require('../../app/users/user.server.controller');
const scotches = require('../../app/scotches/scotch.server.controller');

module.exports = function(app) {
  app.route('/api/scotches')
    .get(scotches.list)
//    .post(users.requiresLogin, scotches.create);
    .post(scotches.create);

  app.route('/api/scotches/:scotchId')
    .get(scotches.read)
//    .put(users.requiresLogin, scotches.hasAuthorization, scotches.update)
//    .delete(users.requiresLogin, scotches.hasAuthorization, scotches.delete);
    .put(scotches.update)
    .delete(scotches.delete);
  
  app.param('scotchId', scotches.scotchByID);
};