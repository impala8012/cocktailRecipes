const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const crypto = require("crypto");

require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  allowedFormats: ["jpeg", "jpg", "png"],
  // filename: function (req, file, cb) {
  //   // crypto.randomBytes to create a buffer instance and we'll use two srings method to convert that into hex string
  //   // let buf = crypto.randomBytes(16);
  //   // buf = buf.toString("hex");
  //   let uniqFileName = file.originalname.replace(/\.jpeg|\.jpg|\.png/gi, "");
  //   uniqFileName += new Date().toISOString();
  //   cb(null, uniqFileName);
  // },
  params: {
    folder: "recipe",
  },
});

module.exports = {
  cloudinary, storage
}