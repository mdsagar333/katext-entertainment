const express = require("express");
const { uploadImage } = require("../utils/multer");
const heroBannerController = require("../controller/heroBannerController");

const Router = express.Router();

Router.route("/")
  .get(heroBannerController.getHeroBanners)
  .post(uploadImage.single("image"), heroBannerController.createHeroBanner);

Router.route("/:id")
  .patch(uploadImage.single("image"), heroBannerController.updateHeroBanner)
  .delete(heroBannerController.deleteHeroBanner);

module.exports = Router;
