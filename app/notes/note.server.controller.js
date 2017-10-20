const mongoose = require('mongoose');
const Scotch = mongoose.model('Scotch');

exports.addNote = function(req, res) {
  const scotch = req.scotch;
  scotch.notes.push(req.body);
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

exports.updateNote = function(req, res) {
  var scotch = req.scotch;
  var updatedNote = req.body;
  var notes = scotch.notes
  for (var i = 0; i < notes.length; i++) {
    if (notes[i]._id == updatedNote._id) {
      notes[i].note = updatedNote.note;
      notes[i].dateAdded = updatedNote.dateAdded;
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

exports.deleteNote = function(req, res) {
  var scotch = req.scotch;
  var updatedNote = req.body;
  var notes = scotch.notes
  for (var i = 0; i < notes.length; i++) {
    if (notes[i]._id == updatedNote._id) {
      notes.splice(i, 1);
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

function getErrorMessage (err) {
  if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return 'Unknown server error';
  }
};
