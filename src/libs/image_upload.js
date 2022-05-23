const { uploader } = require("../config/cloudinary.config");
const { MESSAGES } = require("./constants");
const { createError } = require("./error");

const uploadImage = (
  file,
  callBack,
  folder = "/images/apex-hauz/properties/"
) => {
  try {
    uploader
      .upload_stream({ folder }, (err, result) => {
        if (err) {
          console.log(`Error Uploading Image: ${err.message}`);
          callBack(createError(MESSAGES.IMAGE_UPLOAD_ERR));
        } else {
          callBack(null, result);
        }
      })
      .end(file.buffer);
  } catch (err) {
    console.log(`Error Uploading Image: ${err.message}`);
    callBack(createError(MESSAGES.IMAGE_UPLOAD_ERR));
  }
};

module.exports = uploadImage;
