const express = require("express");
const { uploadImage } = require("../utils/multer");
const heroBannerController = require("../controller/heroBannerController");

const Router = express.Router();

Router.route("/")
  .get(heroBannerController.getHeroBanners)
  .post(uploadImage.single("image"), heroBannerController.createHeroBanner);

Router.route("/active").get(heroBannerController.getAheroBanner);

Router.route("/:id")
  .patch(uploadImage.single("image"), heroBannerController.updateHeroBanner)
  .delete(heroBannerController.deleteHeroBanner)
  .get(heroBannerController.getBannerSingle);

Router.route("/activate/:id").patch(heroBannerController.activateHeroBanner);

module.exports = Router;
