module.exports = function(router) {
  const PostModel = require("../models/post");
  const Multer    = require('multer');
  const Upload    = Multer({ dest: "uploads/", preservePath: true});

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

  router.post("/posts", Upload.single("video"), async function(req, res) {
    if(!AUTHEDUSER) return UNAUTHEDERROR(res);

    const newfilename = `${req.file.path}.${req.file.originalname.split('.')[1]}`; // adds extension to multer file name
    const file = FS.renameSync(req.file.path, newfilename);

    const msg = new PostModel({
      username: AUTHEDUSER.username,
      tags: req.body.tags.split(","),
      uri: newfilename,
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
