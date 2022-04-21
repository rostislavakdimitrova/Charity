const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const localSignupStrategy = require('./passport').localRegister();
const localLoginStrategy = require('./passport').localLogin();
const authRoutes = require('../routes/auth');
const causeRoutes = require('../routes/cause');
const eventRoutes = require('../routes/event');


module.exports = (app) => {
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());
  app.use(cors({
    origin: 'http://localhost:4200'
  }));
  app.use(passport.initialize());
 
  passport.use('local-signup', localSignupStrategy);
  passport.use('local-login', localLoginStrategy);

  app.use('/auth', authRoutes);
  app.use('/cause', causeRoutes);
  app.use('/event', eventRoutes);
}