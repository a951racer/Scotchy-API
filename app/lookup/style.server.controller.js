const mongoose = require('mongoose');
const Style = mongoose.model('Style');

exports.create = function(req, res) {
  const style = new Style(req.body);

  style.save((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(style);
    }
  });
};

exports.list = function(req, res) {
  Style.find().sort({'name': 1}).exec((err, styles) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(styles);
    }
  });
};

exports.read = function(req, res) {
  res.status(200).json(req.style);
};

exports.update = function(req, res) {
  const style = req.style;

  style.name = req.body.name;
  
  style.save((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(style);
    }
  });
};


exports.delete = function(req, res) {
  const style = req.style;

  style.remove((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(style);
    }
  });
};

/*
exports.hasAuthorization = function(req, res, next) {
  if (req.style.creator.id !== req.user.id) {
    return res.status(403).send({
      message: 'User is not authorized'
    });
  }
  next();
};
*/

exports.styleByID = function(req, res, next, id) {
  Style.findById(id).exec((err, style) => {
    if (err) return next(err);
    if (!style) return next(new Error('Failed to load style ' + id));

    req.style = style;
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
