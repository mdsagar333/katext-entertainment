const fs = require("fs");
const path = require("path");
const { ObjectId, MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://ayan:KZuASguNQ9rCZfh2@cluster0.tcz9h.mongodb.net/akacoin?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client
  .connect()
  .then(() => {
    console.log("DB connectted successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

const Banner = client.db("akacoin").collection("heroBanner");
const Wallets = client.db("akacoin").collection("wallets");
const Features = client.db("akacoin").collection("features");

//----------------------------------------------------------
// ================ heroBanner controllers ===================
// ---------------------------------------------------------

module.exports.getHeroBanners = async (req, res, next) => {
  try {
    const banners = await Banner.find({}).toArray();
    console.log(banners);
    res.status(200).json({
      status: "success",
      data: banners,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getAheroBanner = async (req, res, next) => {
  try {
    console.log("banner");
    const banner = await Banner.findOne({ active: true });
    console.log(banner);
    res.status(200).json({
      status: "success",
      banner,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getBannerSingle = async (req, res, next) => {
  try {
    const id = ObjectId(req.params.id);
    const heroBanner = await Banner.findOne({ _id: id });

    res.status(200).json({
      status: "success",
      data: heroBanner,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.createHeroBanner = async (req, res) => {
  try {
    const imagePath = `${req.protocol}://${req.headers.host}/images/${req.file.filename}`;
    req.body.image = imagePath;
    const banner = await Banner.insertOne({ ...req.body, active: false });

    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.updateHeroBanner = async (req, res) => {
  try {
    const id = ObjectId(req.params.id);

    if (req.file) {
      const fileNameArr = req.body.prevImage.split("/");
      const fileName = fileNameArr[fileNameArr.length - 1];
      delete req.body.prevImage;
      req.body.image = `${req.protocol}://${req.headers.host}/images/${req.file.filename}`;
      const location = path.join(`${__dirname}`, "../public/images", fileName);
      fs.unlink(location, (err) => {});
    }

    delete req.body.iamge;
    const updateBanner = await Banner.updateOne(
      { _id: id },
      { $set: req.body }
    );

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.deleteHeroBanner = async (req, res) => {
  try {
    const id = ObjectId(req.params.id);
    const deleteBanner = await Banner.deleteOne({ _id: id });

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.activateHeroBanner = async (req, res, next) => {
  try {
    const id = ObjectId(req.params.id);
    const deActivateBanner = await Banner.updateMany(
      {},
      { $set: { active: false } }
    );
    const activateBanner = await Banner.updateOne(
      { _id: id },
      { $set: { active: true } }
    );

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
};

//--------------------------------------------------------
// ================ wallet controllers ===================
// -------------------------------------------------------

module.exports.createWallet = async (req, res, next) => {
  try {
    console.log(req.body);
    const newWallet = await Wallets.insertOne({ ...req.body, active: false });

    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getWallets = async (req, res, next) => {
  try {
    const wallets = await Wallets.find({}).toArray();

    res.status(200).json({
      status: "success",
      data: wallets,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getWalletSingle = async (req, res, next) => {
  try {
    const id = ObjectId(req.params.id);
    const wallet = await Wallets.findOne({ _id: id });

    res.status(200).json({
      status: "success",
      data: wallet,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.updateWallet = async (req, res) => {
  try {
    const id = ObjectId(req.params.id);
    console.log(req.body);
    // const {title, description} = req.body
    const updateWallet = await Wallets.updateOne(
      { _id: id },
      { $set: req.body }
    );
    console.log(updateWallet);
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.deleteWallet = async (req, res) => {
  try {
    const id = ObjectId(req.params.id);
    console.log(id);
    const deleteWallet = await Wallets.deleteOne({ _id: id });

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.activateWallet = async (req, res, next) => {
  try {
    const id = ObjectId(req.params.id);
    const deActivateWallets = await Wallets.updateMany(
      {},
      { $set: { active: false } }
    );
    const activateWallets = await Wallets.updateOne(
      { _id: id },
      { $set: { active: true } }
    );

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
};

//----------------------------------------------------------
// ================ features controllers ===================
// ---------------------------------------------------------

module.exports.createFeature = async (req, res, next) => {
  try {
    console.log(req.file);
    console.log(req.body);

    req.body.video = req.file.filename;
    const newFeature = await Features.insertOne({ ...req.body, active: false });

    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getAllFeature = async (req, res, next) => {
  try {
    const getAllFeatures = await Features.find({}).toArray();

    res.status(200).json({
      status: "success",
      data: getAllFeatures,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getSingleFeature = async (req, res, next) => {
  try {
    const feature = await Features.findOne({ active: true });
    console.log(feature);
    res.status(200).json({
      status: "success",
      data: feature,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getFeature = async (req, res, next) => {
  try {
    const id = ObjectId(req.params.id);
    const feature = await Features.findOne({ _id: id });
    res.status(200).json({
      status: "success",
      data: feature,
    });
  } catch (err) {
    console.log(err);
  }
};

// send video streaming API endpoint

module.exports.getVideo = async (req, res, next) => {
  try {
    const fileName = req.params.name;
    const location = path.join(`${__dirname}`, "../public/videos", fileName);
    console.log(fileName);
    const range = req.headers.range;
    if (!range) {
      res.status(400).send("Requires Range header");
    }

    const videoSize = fs.statSync(
      path.join(`${__dirname}`, "../public/videos", fileName)
    ).size;
    console.log(videoSize);
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/webm",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(location, { start, end });
    videoStream.pipe(res);
  } catch (err) {
    console.log(err);
  }
};

module.exports.updateFeature = async (req, res, next) => {
  try {
    const id = ObjectId(req.params.id);

    if (req.file) {
      const fileName = req.body.prevVideo;
      console.log(fileName);
      req.body.video = req.file.fileName;
      const location = path.join(`${__dirname}`, "../public/videos", fileName);
      fs.unlink(location, (err) => {});
    }

    const updateFeature = await Features.updateOne(
      { _id: id },
      { $set: req.body }
    );
    res.status(200).json({
      status: "success",
    });

    console.log(id);
  } catch (err) {
    console.log(err);
  }
};

module.exports.deleteFeature = async (req, res, next) => {
  try {
    const id = ObjectId(req.params.id);
    const deletedFeature = await Features.deleteOne({ _id: id });

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.activateFeature = async (req, res, next) => {
  try {
    const id = ObjectId(req.params.id);
    const deActivateFeatures = await Features.updateMany(
      {},
      { $set: { active: false } }
    );
    const activateFeatures = await Features.updateOne(
      { _id: id },
      { $set: { active: true } }
    );

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
};
