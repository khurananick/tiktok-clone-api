module.exports = function(router) {
  const UserModel = require("../models/user");

  router.post("/users/authenticate", async function(req, res) {
    if(!req.body.username || !req.body.password)
      return res.send({ error: "MISSING_USERNAME_OR_PASSWORD"});

    const user = await UserModel.findOne({ username: req.body.username });
    if(!user)
      return res.send({ error: "INVALID_AUTH"})

    const authed = await user.authenticate(req.body.password);
    if(authed.error)
      return res.send({ error: "INVALID_AUTH"});
    else
      return res.send({ success: true, authToken: user.authToken });
  });

  router.post("/users", async function(req, res) {
    const user = await UserModel.register({
        username: req.body.username,
        authToken: (
          req.body.username +
          '.' +
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15) +
          '.' +
          new Date().getTime()
        ) // wkispzrkni1yhut7yyx4q.1594505169671
      }, req.body.password)
      .catch(function(e) {
        return { error: e };
      });

    if(user.error) res.send(user)
    else res.send({ success: true, authToken: user.authToken });
  });
};
