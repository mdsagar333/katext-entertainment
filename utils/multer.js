const multer = require("multer");

// function for image storage
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const imageName = `hero-banner-${Date.now()}-${Math.round(
      Math.random() * 2000
    )}.${ext}`;

    cb(null, imageName);
  },
});

// function for video storage
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/videos");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const videoName = `feature-video_${Date.now()}_${Math.round(
      Math.random() * 2000
    )}.${ext}`;
    cb(null, videoName);
  },
});

const uploadVideo = multer({
  storage: videoStorage,
  limits: {
    fileSize: 100000000, // 10000000 Bytes = 100 MB
  },
  fileFilter(req, file, cb) {
    // upload only mp4 and mkv format
    if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
      return cb(new Error("Please upload a video"));
    }
    cb(undefined, true);
  },
});

const uploadImage = multer({ storage: imageStorage });

module.exports = { uploadImage, uploadVideo };
