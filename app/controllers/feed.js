module.exports = function(router) {
  router.get("/feed", function(req, res) {
    res.send({feed: []});
  });
};
