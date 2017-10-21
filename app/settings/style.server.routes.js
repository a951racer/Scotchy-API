const users = require('../../app/users/user.server.controller');
const styles = require('../../app/settings/style.server.controller');

module.exports = function(app) {
  app.route('/api/styles')
//    .post(users.requiresLogin, wishlists.create);
    .get(styles.list)
    .post(styles.create);

  app.route('/api/styles/:styleId')
//    .put(users.requiresLogin, wishlists.hasAuthorization, wishlists.update)
//    .delete(users.requiresLogin, wishlists.hasAuthorization, wishlists.delete);
    .get(styles.read)
    .put(styles.update)
    .delete(styles.delete);
  
  app.param('styleId', styles.styleByID);
};