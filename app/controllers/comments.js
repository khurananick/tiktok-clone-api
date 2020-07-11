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

  router.get("/comments/:id", async function(req, res) {
    const comment = await CommentModel.find({ _id: req.params.id });
    res.send(comment);
  });

  router.post("/comments", async function(req, res) {
    const post = {};
    const comment = await CommentModel.save({
      commenterId: req.body.user_id,
      postOwnerId: post.userId,
      postId: post.id,
      text: req.body.text
    });
    res.send(comment);
  });
};
