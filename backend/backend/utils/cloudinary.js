// loads the .env file and makes the environment variables available to the Node.js process.
require("dotenv").config();
//imports the cloudinary package and uses the v2 version of the package
const cloudinary = require("cloudinary").v2;
//configures the cloudinary package with the following options:
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// exports an object containing the cloudinary configuration
module.exports = { cloudinary };
