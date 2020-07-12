const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: String,
  commenter: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: "Like"
  }]
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
