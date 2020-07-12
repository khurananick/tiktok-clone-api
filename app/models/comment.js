const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  commenterId: String,
  commenterName: String,
  postOwnerId: String,
  text: String,
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post"
  }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
