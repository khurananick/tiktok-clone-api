module.exports = function(router) {
  const PostModel = require("../models/post")();

  router.get("/posts", async function(req, res) {
    res.send([]);
  });

  router.post("/posts", async function(req, res) {
    const post = await PostModel.save({
      type: "video"
    });
    res.send(post);
  });
};
