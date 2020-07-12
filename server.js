// Required libs
const http          = require("http");
const express       = require("express");
const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser');
const multer        = require('multer');
const session       = require('express-session');
const path          = require('path');

// Global reusable vars.
ENV                 = require('dotenv').config().parsed;
FS                  = require('fs');
STATIC_DIR          = (__dirname + "/static");
AUTHEDUSER          = null;
UNAUTHEDERROR       = function(res) {
  return res.send({ error: "UNKOWN_USER" });
}

// HTTP server settings
const httpApp       = express();
const router        = express.Router();
httpApp.set('views', __dirname + "/app/views");
httpApp.set('view engine', 'pug');
httpApp.use(multer({dest:'./uploads/'}).single('file'));
httpApp.use(express.static(STATIC_DIR,{
  setHeaders: function(res, path) {
    res.setHeader('Access-Control-Allow-Headers', 'accept, authorization, content-type, x-requested-with');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Origin',  '*');
  }
}));
httpApp.use(bodyParser.json({limit: '50mb', parameterLimit: 10000}));
httpApp.use(bodyParser.urlencoded({limit: '50mb', parameterLimit: 10000, extended: true}));
httpApp.use(cookieParser());
httpApp.use(session({
  secret: 'tiktok-clone-api',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
httpApp.disable('x-powered-by');
httpApp.disable('content-length');
httpApp.disable('content-type');
httpApp.disable('etag');
httpApp.use(async function (req, res, next) {
  /* before all actions to set CORS headers */
  console.log(req.method, req.url);
  res.setHeader('Access-Control-Allow-Headers', 'accept, authorization, content-type, x-requested-with');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Origin',  '*');
  next();
});
httpApp.use(async function (req, res, next) {
  /* before all actions to authenticate user. */
  // start authentication
  const auth = req.headers.authorization;
  // keep moving if no auth is passed.
  if(!auth) return next();
  // ensure auth starts with Bearer
  if(!auth.match(/^Bearer\s/))
    return res.send({error: "INVALID_AUTH" });
  // look up token to find user
  const token = auth.split(" ")[1];
  const username = token.split(".")[0];
  const UserModel = require("./app/models/user");
  const user = await UserModel.findOne({username: username});
  // if no user found return error
  if(!user)
    return res.send({error: "INVALID_AUTH" });
  // if authToken doesn't match return error
  if(user.authToken != token)
    return res.send({error: "INVALID_AUTH" });
  // end authentication
  AUTHEDUSER = user;
  next();
});
httpApp.use('/', router);


async function loadDatabase() {
  const mongoose = require('mongoose');
  await mongoose.connect(ENV.DB_CONN, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

async function initServer() {
  await loadDatabase();

  require("./app/controllers/users")(router);
  require("./app/controllers/feeds")(router);
  require("./app/controllers/posts")(router);
  require("./app/controllers/comments")(router);

  const httpServer = http.createServer(httpApp).listen(ENV.PORT);
  console.log("Listening on port:", ENV.PORT);
}

initServer();
