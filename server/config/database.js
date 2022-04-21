const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const User = require('../models/User');

module.exports = config => {
  mongoose.connect(config.dbPath,{
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  const db = mongoose.connection;
  db.once('open', err => {
    if (err) { 
      return
     };
    User.seedAdminUser().then(() => {
      console.log('Database ready');
    }).catch((err) => {
      console.log('Something went wrong', err);
    });
  });
  db.on('error', err => {
    console.log(err);
  });
};