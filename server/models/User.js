const { Schema, model, Types: {ObjectId}} = require('mongoose');
const encryption = require('../utils/encryption');


const userSchema = new Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    salt: { type: String, required: true },
    roles: { type: [ String ] },
    donations: { type: [ObjectId], ref: 'Cause', default: [] },
    volounteerTo: { type: [ObjectId] , ref: 'Event', default: [] }
});

userSchema.index({ email: 1}, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }                                           
});

userSchema.method({
    authenticate: function (password) {
      return encryption.generateHashedPassword(this.salt, password) === this.hashedPassword;
    }
  });


const User = model('User', userSchema);
 
User.seedAdminUser = async () => {
    try {
      let users = await User.find();
      if (users.length > 0) return;
      const salt = encryption.generateSalt();
      const hashedPassword = encryption.generateHashedPassword(salt, 'admin');
      return User.create({
        fullname: 'Rostislava Dimitrova',
        email: 'admin@admin.com',
        salt,
        hashedPassword,
        roles: ['Admin']
      });
    } catch (err) {
      console.log(err);
    }
  };

module.exports = User;