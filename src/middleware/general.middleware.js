const { MESSAGES, HTTP_REQUEST_CODES } = require("../../libs/constants");
const { createError } = require("../../libs/error");

const validateBody = (req, res, next, type = "some") => {
  const bodyData = req.body;
  const keys = Object.keys(bodyData);
  if (!keys.length) {
    next(
      createError(MESSAGES.INVALID_REQUEST_NO_BODY),
      HTTP_REQUEST_CODES.BAD_REQUEST
    );
  } else {
    next();
  }
};
