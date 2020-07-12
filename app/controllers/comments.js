module.exports = function(router) {
  const CommentModel = require("../models/comment");

  router.get("/comments/user/:id", async function(req, res) {
    const comments = await CommentModel.find({});
    res.send({
      success: true,
      response: [{
        id: "abcd1",
        commenterId: "abcd",
        commenterName: "knick",
        postOwnerId: "abcd",
        postId: "abcd",
        text: "This is a comment.",
        createdAt: "2020-07-10T17:41:07.744Z",
      },{
        id: "abcd2",
        commenterId: "abcd",
        commenterName: "knick",
        postOwnerId: "abcd",
        postId: "abcd",
        text: "This is another comment.",
        createdAt: "2020-07-11T13:41:07.744Z"
      },{
        id: "abcd3",
        commenterId: "abcd",
        commenterName: "knick",
        postOwnerId: "abcd",
        postId: "abcd",
        text: "This is one more comment.",
        createdAt: "2020-07-11T17:41:07.744Z"
      }],
    });
  });

  router.post("/comments", async function(req, res) {
    if(!AUTHEDUSER) return UNAUTHEDERROR(res);

    const PostModel = require("../models/post");
    const post = await PostModel.findOne({ _id: req.body.post_id });
    if(!post)
      return res.send('INVALID_POST');

    const msg = new CommentModel({
      text: req.body.text,
      commenter: AUTHEDUSER
    });
    const doc = await msg.save().catch(function(e) {
      return { error: e };
    });
    if(doc.error)
      return res.send(doc);

    post.commentsCount += 1;
    post.comments.push(msg);
    await post.save();

    res.send({ success: true, comment_id: doc._id });
  });
};
