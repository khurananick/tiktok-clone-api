module.exports = function(router) {
  const PostModel = require("../models/post");

  router.get("/posts", async function(req, res) {
    if(!AUTHEDUSER) return UNAUTHEDERROR(res);

    const posts = await PostModel.find({owner: AUTHEDUSER}).populate({
      path: "comments",
      populate: {
        path: "commenter",
        select: "username"
      }
    });
    res.send(posts);
  });

  router.post("/posts", async function(req, res) {
    if(!AUTHEDUSER) return UNAUTHEDERROR(res);

    const msg = new PostModel({
      tags: req.body.tags.split(","),
      assetUri: req.body.uri,
      type: "video",
      owner: AUTHEDUSER
    });

    const doc = await msg.save().catch(function(e) {
      return { error: e };
    });

    if(doc.error)
      return res.send(doc);

    return res.send({ success: true, id: doc.id });
  });
};
