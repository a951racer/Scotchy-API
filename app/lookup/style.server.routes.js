const users = require('../../app/users/user.server.controller');
const styles = require('../../app/lookup/style.server.controller');

module.exports = function(app) {
  app.route('/api/styles')
//    .post(users.requiresLogin, styles.create);
    .get(styles.list)
    .post(styles.create);

  app.route('/api/styles/:styleId')
//    .put(users.requiresLogin, wishlists.hasAuthorization, styles.update)
//    .delete(users.requiresLogin, wishlists.hasAuthorization, styles.delete);
    .get(styles.read)
    .put(styles.update)
    .delete(styles.delete);
  
  app.param('styleId', styles.styleByID);
};