module.exports = function(router) {
  const PostModel = require("../models/post");

  router.get("/posts", async function(req, res) {
    const posts = await PostModel.find({});
    res.send(posts);
  });

  router.get("/posts/:id", async function(req, res) {
    const post = await PostModel.find({ _id: req.params.id });
    res.send(post);
  });

  router.post("/posts", async function(req, res) {
    const post = await PostModel.save({
      type: "video"
    });
    res.send(post);
  });
};
