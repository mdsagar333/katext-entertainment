const express = require("express");
const {
  createWallet,
  getWallets,
  updateWallet,
  deleteWallet,
  activateWallet,
  getWalletSingle,
} = require("../controller/heroBannerController");

const Router = express.Router();

Router.route("/").get(getWallets).post(createWallet);

Router.route("/:id")
  .patch(updateWallet)
  .delete(deleteWallet)
  .get(getWalletSingle);

// Router.route("/activate/:id").patch(activateWallet);

module.exports = Router;
