const express = require("express");
const {
  createWallet,
  getWallets,
  updateWallet,
  deleteWallet,
} = require("../controller/heroBannerController");

const Router = express.Router();

Router.route("/").get(getWallets).post(createWallet);

Router.route("/:id").patch(updateWallet).delete(deleteWallet);

module.exports = Router;
