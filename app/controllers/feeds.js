module.exports = function(router) {
  router.get("/feeds", function(req, res) {
    res.send({feed: []});
  });
};
