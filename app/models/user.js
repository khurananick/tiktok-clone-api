const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const encrypt = require('mongoose-encryption');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true
  },
  email: {
    type: String,
    unique: false,
    sparse: true
  },
  phone: {
    type: String,
    unique: false,
    sparse: true
  },
  authToken: {
    type: String
  }
}, { timestamps: true });

userSchema.plugin(encrypt, {
  encryptionKey: ENV.encKey,
  signingKey: ENV.sigKey,
  encryptedFields: ['authToken']
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
