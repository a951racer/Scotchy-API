process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const configureMongoose = require('./config/mongoose');
const configureExpress = require('./config/express');
const configurePassport = require('./config/passport');

const db = configureMongoose();
const app = configureExpress();
const passport = configurePassport();
const PORT = process.env.PORT || 4800

app.listen(PORT);
module.exports = app;

console.log(`heroku: Server running at http://localhost:${PORT}/`);
