const mongoose = require('mongoose');
const Scotch = mongoose.model('Scotch');

exports.addTasting = function(req, res) {
  const scotch = req.scotch;
  scotch.tastings.push(req.body);
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

exports.updateTasting = function(req, res) {
  var scotch = req.scotch;
  var updatedTasting = req.body;
  var tastings = scotch.tastings;
  for (var i = 0; i < tastings.length; i++) {
    if (tastings[i]._id == updatedTasting._id) {
      tastings[i].location = updatedTasting.location;
      tastings[i].rating = updatedTasting.rating;
      tastings[i].comment = updatedTasting.comment;
      tastings[i].dateAdded = updatedTasting.dateAdded;
      tastings[i].thirdParty = updatedTasting.thirdParty;
      tastings[i].nose = updatedTasting.nose;
      tastings[i].palate = updatedTasting.palate;
      tastings[i].finish = updatedTasting.finish;
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

exports.deleteTasting = function(req, res) {
  var scotch = req.scotch;
  var updatedTasting = req.body;
  var tastings = scotch.tastings;
  for (var i = 0; i < tastings.length; i++) {
    if (tastings[i]._id == updatedTasting._id) {
      tastings.splice(i, 1);
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

/*** Tasting Componenet stuff ********************/

exports.list = function(req, res) {
  response = new Array();
  Scotch.find().exec((err, scotches) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      scotches.forEach(scotch => {
        scotch.tastings.forEach(tasting => {
          tasting.scotchId = scotch._id;
          tasting.dramName = scotch.dramName;
          response.push(tasting);
          console.log(tasting.scotchId);
          console.log(tasting.dramName);
          console.log(tasting.location);
        });
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
