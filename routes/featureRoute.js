const express = require("express");
const { uploadVideo } = require("../utils/multer");
const {
  createFeature,
  getAllFeature,
  getVideo,
  deleteFeature,
  updateFeature,
  activateFeature,
  getSingleFeature,
  getFeature,
} = require("../controller/heroBannerController");

const Router = express.Router();

Router.route("/")
  .get(getAllFeature)
  .post(uploadVideo.single("video"), createFeature);

Router.route("/active").get(getSingleFeature);

Router.route("/:id")
  .patch(uploadVideo.single("video"), updateFeature)
  .delete(deleteFeature)
  .get(getFeature);

Router.route("/video/:name").get(getVideo);

Router.route("/active/:id").patch(activateFeature);

module.exports = Router;
