const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  type: String
});

const PostModel = mongoose.model('Post', postSchema);

module.exports = function() {
  const Model = require("./model")(PostModel);
  return Model;
};
