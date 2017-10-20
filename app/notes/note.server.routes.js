const users = require('../../app/users/user.server.controller');
const scotches = require('../../app/scotches/scotch.server.controller');
const notes = require('../../app/notes/note.server.controller');

module.exports = function(app) {
  app.route('/api/scotches/notes/:scotchId')
    // .post(users.requiresLogin, scotches.hasAuthorization, notes.addNote)
    // .put(users.requiresLogin, scotches.hasAuthorization, notes.updateNote)  
    // .delete(users.requiresLogin, scotches.hasAuthorization, notes.deleteNote)
    .post(notes.addNote)
    .put(notes.updateNote)  
    .delete(notes.deleteNote)
  
  app.param('scotchId', scotches.scotchByID);
};