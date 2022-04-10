const express = require("express");
const { uploadVideo } = require("../utils/multer");
const {
  createFeature,
  getAllFeature,
  getVideo,
} = require("../controller/heroBannerController");

const Router = express.Router();

Router.route("/")
  .get(getAllFeature)
  .post(uploadVideo.single("video"), createFeature);

// Router.route("/:id").patch(updateWallet).delete(deleteWallet);

Router.route("/video/:name").get(getVideo);

module.exports = Router;
