module.exports = function(router, dbconn) {
  router.get("/posts", function(req, res) {
    res.send([]);
  });

  router.post("/posts", function(req, res) {
    res.send({});
  });
};
