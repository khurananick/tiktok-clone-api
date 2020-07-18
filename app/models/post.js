const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  username: String,
  tags: Array,
  music: String,
  description: String,
  type: {
    type: String,
    default: "video"
  },
  uri: {
    type: String,
    required: true
  },
  likesCount: {
    type: Number,
    default: 0,
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: "Like"
  }],
  commentsCount: {
    type: Number,
    default: 0
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
