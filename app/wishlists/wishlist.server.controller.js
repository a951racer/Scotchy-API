const mongoose = require('mongoose');
const Wishlist = mongoose.model('Wishlist');
const Scotch = mongoose.model('Scotch');

/*** Manage the catalog of wish lists **************/

exports.create = function(req, res) {
  const wishlist = new Wishlist(req.body);
  wishlist.creator = req.user;

  wishlist.save((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(wishlist);
    }
  });
};

exports.list = function(req, res) {
  Wishlist.find().sort('-name').populate('creator', 'firstName lastName fullName').exec((err, wishlists) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(wishlists);
    }
  });
};

exports.read = function(req, res) {
  let wishlist = new Object();
  wishlist.wishlist = req.wishlist;
  Scotch.find({wishLists: req.wishlist.wishListName}).sort({'distillerName': 1, 'flavor': 1, 'age': 1}).populate('creator', 'firstName lastName fullName').exec((err, scotches) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      wishlist.scotches = scotches;
      res.status(200).json(wishlist);
    }
  });
};

exports.readByName = function(req, res) {
  res.status(200).json(req.wishlist);
};

exports.update = function(req, res) {
  const wishlist = req.wishlist;

  wishlist.wishListName = req.body.wishListName;
  wishlist.description = req.body.description;
  
  wishlist.save((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(wishlist);
    }
  });
};


exports.delete = function(req, res) {
  const wishlist = req.wishlist;

  wishlist.remove((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(wishlist);
    }
  });
};

/*** Manage a scotch's list of wish lists ***************/

exports.addWishlistToScotch = function(req, res) {
  const scotch = req.scotch;
  scotch.wishLists.push(req.body.wishListName);
  scotch.save((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(scotch);
    }
  });
};

exports.deleteScotchWishlist = function(req, res) {
  var scotch = req.scotch;
  var updatedWishlist = req.body;
  var wishlists = scotch.wishLists;
  for (var i = 0; i < wishlists.length; i++) {
    if (wishlists[i] == updatedWishlist.wishListName) {
      wishlists.splice(i, 1);
    }
  }
  scotch.save((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(scotch);
    }
  });
}

/*** Authentication stuff ******************/

exports.hasAuthorization = function(req, res, next) {
  if (req.wishlist.creator.id !== req.user.id) {
    return res.status(403).send({
      message: 'User is not authorized'
    });
  }
  next();
};

/*** Utility functions **********************/

exports.wishlistByID = function(req, res, next, id) {
  Wishlist.findById(id).populate('creator', 'firstName lastName fullName').exec((err, wishlist) => {
    if (err) return next(err);
    if (!wishlist) return next(new Error('Failed to load wishlist ' + id));

    req.wishlist = wishlist;
    next();
  });
};

exports.wishlistByName = function(req, res, next, name) {
  Wishlist.findOne({wishListName: name}).populate('creator', 'firstName lastName fullName').exec((err, wishlist) => {
    if (err) return next(err);
    if (!wishlist) return next(new Error('Failed to load wishlist ' + name));

    req.wishlist = wishlist;
    next();
  });
};

function getErrorMessage (err) {
  if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return 'Unknown server error';
  }
};
