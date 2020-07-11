module.exports = function(router) {
  router.get("/feeds/user/:id", function(req, res) {
    res.send({
      "success": true,
      "response": [
        {
          "id": 0,
          "username": "@matheuscastroweb",
          "tags": "#testvideo #reactnative #tiktok #git #development #github #clone #react",
          "music": "Introducing Chromecast. The easiest way to enjoy",
          "likes": 9444,
          "comments": 6340,
          "uri": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
        },
        {
          "id": 1,
          "username": "@matheuscastroweb",
          "tags": "#reactnative #testvideo #tiktok #git #development #github #clone #react",
          "music": "HBO GO now works with Chromecast",
          "likes": 8411,
          "comments": 2240,
          "uri": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
        }
      ]
    });
  });

  router.get("/feeds/public", function(req, res) {
    console.log(req.query);
    res.send({
      "success": true,
      "response": [
        {
          "id": 1,
          "username": "@matheuscastroweb",
          "tags": "#reactnative #testvideo #tiktok #git #development #github #clone #react",
          "music": "HBO GO now works with Chromecast",
          "likes": 8411,
          "comments": 2240,
          "uri": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
        },
        {
          "id": 0,
          "username": "@matheuscastroweb",
          "tags": "#testvideo #reactnative #tiktok #git #development #github #clone #react",
          "music": "Introducing Chromecast. The easiest way to enjoy",
          "likes": 9444,
          "comments": 6340,
          "uri": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
        }
      ]
    });
  });
};
