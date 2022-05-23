const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

// console.log(
//   process.cwd(),
//   process.env.CLOUDINARY_CLOUD_NAME,
//   process.env.CLOUDINARY_API_KEY,
//   process.env.CLOUDINARY_PRIVATE_KEY
// );
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_PRIVATE_KEY,
});

module.exports = {
  cloudinary,
  uploader: cloudinary.uploader,
};
