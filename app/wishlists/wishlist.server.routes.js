const users = require('../../app/users/user.server.controller');
const wishlists = require('../../app/wishlists/wishlist.server.controller');

module.exports = function(app) {
  app.route('/api/wishlists')
    .get(wishlists.list)
//    .post(users.requiresLogin, wishlists.create);
    .post(wishlists.create);

  app.route('/api/wishlists/:wishlistId')
    .get(wishlists.read)
//    .put(users.requiresLogin, wishlists.hasAuthorization, wishlists.update)
//    .delete(users.requiresLogin, wishlists.hasAuthorization, wishlists.delete);
    .put(wishlists.update)
    .delete(wishlists.delete);
  
  app.route('/api/scotches/wishlists/:scotchId')
    // .post(users.requiresLogin, scotches.hasAuthorization, wishlists.addWishlistToScotch)
    // .put(users.requiresLogin, scotches.hasAuthorization, wishlists.updateScotchWishlist)
    // .delete(users.requiresLogin, scotches.hasAuthorization, wishlists.deleteScotchWishlist)
    .post(wishlists.addWishlistToScotch)
    //.put(wishlists.updateScotchWishlist) // pending removal
    .delete(wishlists.deleteScotchWishlist)

    app.route('/api/wishlists/byName/:wishListName')
      .get(wishlists.readByName);

  app.param('wishlistId', wishlists.wishlistByID);
  app.param('wishListName', wishlists.wishlistByName);
};