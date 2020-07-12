const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  tags: Array,
  description: String,
  type: {
    type: String,
    default: "video"
  },
  assetUri: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0,
  },
  likers: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  comments: {
    type: Number,
    default: 0
  },
  commenters: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
