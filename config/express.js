const config = require('./config');
const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const cors = require('cors');

module.exports = function() {
  const app = express();

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  app.use(session({
    secret: config.sessionSecret,
    saveUninitialized: true,
    resave: true
  }));
  
  app.set('views', './app/views');
  app.set('view engine', 'ejs');

  app.use(flash());

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cors());

  require('../app/users/user.server.routes.js')(app);
  require('../app/scotches/scotch.server.routes.js')(app);
  require('../app/notes/note.server.routes.js')(app);
  require('../app/tastings/tasting.server.routes.js')(app);
  require('../app/wishlists/wishlist.server.routes.js')(app);

  app.use(express.static('./public'));

  return app;
}; 