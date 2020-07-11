const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  commenterId: String,
  commenterName: String,
  postOwnerId: String,
  postId: String,
  text: String
}, { timestamps: true });

const CommentModel = mongoose.model('Comment', commentSchema);

module.exports = (function() {
  const Model = require("./model")(CommentModel);
  return Model;
})();
