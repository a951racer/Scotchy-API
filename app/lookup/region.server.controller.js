const mongoose = require('mongoose');
const Region = mongoose.model('Region');

exports.create = function(req, res) {
  const region = new Region(req.body);

  region.save((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(region);
    }
  });
};

exports.list = function(req, res) {
  Region.find().sort({'name': 1}).exec((err, regions) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(regions);
    }
  });
};

exports.read = function(req, res) {
  res.status(200).json(req.region);
};

exports.update = function(req, res) {
  const region = req.region;

  region.name = req.body.name;
  
  region.save((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(region);
    }
  });
};


exports.delete = function(req, res) {
  const region = req.region;

  region.remove((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(region);
    }
  });
};

/*
exports.hasAuthorization = function(req, res, next) {
  if (req.region.creator.id !== req.user.id) {
    return res.status(403).send({
      message: 'User is not authorized'
    });
  }
  next();
};
*/

exports.regionByID = function(req, res, next, id) {
  Region.findById(id).exec((err, region) => {
    if (err) return next(err);
    if (!region) return next(new Error('Failed to load region ' + id));

    req.region = region;
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
