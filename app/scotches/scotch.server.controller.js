const mongoose = require('mongoose');
const Scotch = mongoose.model('Scotch');

exports.create = function(req, res) {
  const scotch = new Scotch(req.body);
  scotch.creator = req.user;

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

exports.list = function(req, res) {
  Scotch.find().sort({'distillerName': 1, 'flavor': 1, 'age': 1}).populate('creator', 'firstName lastName fullName').exec((err, scotches) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(scotches);
    }
  });
};

exports.read = function(req, res) {
  res.status(200).json(req.scotch);
};

exports.update = function(req, res) {
  const scotch = req.scotch;
  
  scotch.distillerName = req.body.distillerName;
  scotch.flavor = req.body.flavor;
  scotch.age = req.body.age;
  scotch.style = req.body.style;
  scotch.region = req.body.region;
  scotch.inStock = req.body.inStock;
  scotch.comment = req.body.comment;
  scotch.bottlingNotes = req.body.bottlingNotes;
  // scotch.added = req.body.added;
  
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


exports.delete = function(req, res) {
  const scotch = req.scotch;

  scotch.remove((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(scotch);
    }
  });
};

exports.hasAuthorization = function(req, res, next) {
  if (req.scotch.creator.id !== req.user.id) {
    return res.status(403).send({
      message: 'User is not authorized'
    });
  }
  next();
};


exports.scotchByID = function(req, res, next, id) {
  Scotch.findById(id).populate('creator', 'firstName lastName fullName').exec((err, scotch) => {
    if (err) return next(err);
    if (!scotch) return next(new Error('Failed to load scotch ' + id));

    req.scotch = scotch;
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
