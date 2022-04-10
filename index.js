const path = require("path");
const express = require("express");
const cors = require("cors");
const heroBannerRoutes = require("./routes/heroBannerRoute");
const walletRoutes = require("./routes/walletRoute");
const featureRoutes = require("./routes/featureRoute");

const app = express();

//  middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/hero-banner", heroBannerRoutes);
app.use("/api/wallets", walletRoutes);
app.use("/api/features", featureRoutes);

app.route("/").get((req, res) => {
  res.send("From server side");
});

module.exports = app;
