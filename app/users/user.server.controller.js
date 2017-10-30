const User = require('mongoose').model('User');
const passport = require('passport');

exports.signup = function(req, res) {
  const user = new User(req.body);
  user.provider = 'local';

  user.save((err) => {
    if (err) {
      // addHeaders(res);
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      // Remove sensitive data before login
      user.password = undefined;
      user.salt = undefined;

      req.login(user, function(err) {
        if (err) {
          // addHeaders(res);
          res.status(400).send(err);
        } else {
          // addHeaders(res);
          res.json(user);
        }
      });
    }
  });
};

exports.signin = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err || !user) {
      res.status(400).send(info);
    } else {
      // Remove sensitive data before login
      user.password = undefined;
      user.salt = undefined;

      req.login(user, function(err) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(user);
        }
      });
    }
  }) (req, res, next);
};

exports.signout = function(req, res) {
  req.logout();
  // addHeaders(res);
  res.json({ "status": "logged out"});
};

exports.requiresLogin = function(req, res, next) {
  console.log('requires login: ' + req.isAuthenticated());
  if (!req.isAuthenticated()) {
    // addHeaders(res);
    return res.status(401).send({
      message: 'User is messed up!'
    });
  }

  return next();
};

/*
function addHeaders(res) {
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'content-type,Accept,X-Access-Token,X-Key,Origin,X-Requested-With,access-control-allow-heades,access-control-allow-origin');
}
*/

const getErrorMessage = function(err) {
  var message = '';

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    for (let errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  return message;
};
