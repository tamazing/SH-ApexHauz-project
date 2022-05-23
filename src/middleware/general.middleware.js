const { MESSAGES, HTTP_REQUEST_CODES } = require("../libs/constants");
const { createError } = require("../libs/error");
const multer = require("multer");

const fileFilter = (req, file, cb) => {
  const mimetype = file.mimetype;
  const validMimetype = ["image/jpeg", "image/png"];
  if (!validMimetype.includes(mimetype)) {
    cb(
      createError(MESSAGES.INVALID_IMAGE_TYPE, HTTP_REQUEST_CODES.BAD_REQUEST)
    );
  } else {
    cb(null, true);
  }
};
const upload = multer({ storage: multer.memoryStorage(), fileFilter });

const validateBody = (params, type = "some") => {
  return (req, res, next) => {
    const bodyData = req.body;
    const keys = Object.keys(bodyData);
    if (!keys.length) {
      next(
        createError(
          MESSAGES.INVALID_REQUEST_NO_BODY,
          HTTP_REQUEST_CODES.BAD_REQUEST
        )
      );
    } else if ("IMPLEMENT LATER") {
      next(
        createError(
          MESSAGES.INVALID_REQUEST_FIELD_MISSING,
          HTTP_REQUEST_CODES.BAD_REQUEST
        )
      );
    } else {
      next();
    }
  };
};

const uploadFile = (fieldName = "image") => {
  return upload.single(fieldName);
};

module.exports = {
  validateBody,
  uploadFile,
};
