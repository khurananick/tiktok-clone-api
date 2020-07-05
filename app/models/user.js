const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: String
});

const UserModel = mongoose.model('User', userSchema);

module.exports = (function() {
  const Model = require("./model")(UserModel);
  return Model;
})();
