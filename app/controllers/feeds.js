module.exports = function(router) {
  const PostModel = require("../models/post");

  router.get("/feeds/public", async function(req, res) {
    const posts = await PostModel.find();
    return res.send({
      success: true,
      response: posts
    });
  });

  router.get("/feeds/user/:id", async function(req, res) {
    const posts = await PostModel.find();
    return res.send({
      success: true,
      response: posts.reverse()
    });
  });
};
