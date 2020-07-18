module.exports = function(router) {
  router.get("/uploads/:filename", function(req, res) {
    const filename = req.params.filename;
    const filetype = `video/${filename.split(".")[1]}`;
    res.setHeader("Content-Type", filetype);

    const filepath = `uploads/${filename}`;
    const readStream = FS.createReadStream(filepath);

    readStream.on('open', function () {
      readStream.pipe(res);
    });
  });
};
