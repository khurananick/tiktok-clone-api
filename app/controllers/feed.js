module.exports = function(router, dbconn) {
  router.get("/feed", function(req, res) {
    res.send({feed: []});
  });
};
