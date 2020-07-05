module.exports = function(router) {
  const UserModel = require("../models/user");

  router.get("/users/:id", async function(req, res) {
    const user = await UserModel.find({ _id: req.params.id });
    res.send(posts);
  });

  router.post("/users", async function(req, res) {
    const user = await UserModel.save({
      email: "test@gmail.com"
    });
    res.send(post);
  });
};
