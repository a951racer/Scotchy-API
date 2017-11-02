const users = require('../../app/users/user.server.controller');
const scotches = require('../../app/scotches/scotch.server.controller');
const prices = require('../../app/prices/price.server.controller');

module.exports = function(app) {
  app.route('/api/scotches/prices/:scotchId')
    // .post(users.requiresLogin, scotches.hasAuthorization, prices.addPrice)
    // .put(users.requiresLogin, scotches.hasAuthorization, prices.updatePrice)
    // .delete(users.requiresLogin, scotches.hasAuthorization, prices.deletePrice)
    .post(prices.addPrice)
    .put(prices.updatePrice)  
    .delete(prices.deletePrice);
  
  app.route('/api/prices')
    .get(prices.list);

  app.param('scotchId', scotches.scotchByID);
};