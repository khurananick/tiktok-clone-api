const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  userId: String,
  type: String
}, { timestamps: true });

const PostModel = mongoose.model('Post', postSchema);

module.exports = (function() {
  const Model = require("./model")(PostModel);
  return Model;
})();
