const mongoose = require('mongoose');
const Scotch = mongoose.model('Scotch');

exports.addPrice = function(req, res) {
  const scotch = req.scotch;
  scotch.prices.push(req.body);
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

exports.updatePrice = function(req, res) {
  var scotch = req.scotch;
  var updatedPrice = req.body;
  var prices = scotch.prices;
  for (var i = 0; i < prices.length; i++) {
    if (prices[i]._id == updatedPrice._id) {
      prices[i].dateAdded = updatedPrice.dateAdded;
      prices[i].location = updatedPrice.location;
      prices[i].price = updatedPrice.price;
      prices[i].tax = updatedPrice.tax;
      prices[i].shipping = updatedPrice.shipping;
      prices[i].total = updatedPrice.total;
      prices[i].comment = updatedPrice.comment;
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

exports.deletePrice = function(req, res) {
  var scotch = req.scotch;
  var updatedPrice = req.body;
  var prices = scotch.prices;
  for (var i = 0; i < prices.length; i++) {
    if (prices[i]._id == updatedPrice._id) {
      prices.splice(i, 1);
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

/*** Price Component stuff ********************/

exports.list = function(req, res) {
  response = new Array();
  var newPrice = new Object();
  Scotch.find().exec((err, scotches) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      scotches.forEach(scotch => {
        scotch.prices.forEach(price => {
          newPrice._id = price._id;
          newPrice.dateAdded = price.dateAdded;
          newPrice.location = price.location;
          newPrice.price = price.price;
          newPrice.tax = price.tax;
          newPrice.shipping = price.shipping;
          newPrice.total = price.total;
          newPrice.comment = price.comment;
          newPrice.scotchId = scotch._id;
          newPrice.dramName = scotch.dramName;
          response.push(newPrice);
          newPrice = {};
        });
      });
      response.sort(function(a, b) {
        if (a.dateAdded < b.dateAdded){
          return -1;
        }
        if (a.dateAdded > b.dateAdded) {
          return 1;
        }
        return 0;
      });
      res.status(200).json(response);
    }
  });
}

function getErrorMessage (err) {
  if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return 'Unknown server error';
  }
};
