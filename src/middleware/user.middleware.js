const { MESSAGES, HTTP_REQUEST_CODES } = require("../../libs/constants");
const { createError } = require("../../libs/error");
const jwt = require("jsonwebtoken");

const userRequired = (req, _, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    next(
      createError(
        MESSAGES.INVALID_TOKEN,
        HTTP_REQUEST_CODES.BAD_REQUEST,
        null,
        "create"
      )
    );
    return;
  }
  const token = auth.split(" ")[1] || "";
  try {
    const key = process.env.JWT_SECRET_KEY || "";
    const userData = jwt.verify(token, key);

    req.is_admin = userData.is_admin;
    req.user_id = userData.id;
    req.user_email = userData.email;
  } catch (err) {
    console.log(`Toke Error: ${err.message}`);
    next(
      createError(
        MESSAGES.INVALID_TOKEN,
        HTTP_REQUEST_CODES.BAD_REQUEST,
        null,
        "create"
      )
    );
    return;
  }
  next();
};

const adminRequired = (req, _, next) => {
  if (!req.is_admin) {
    next(
      createError(
        MESSAGES.ADMIN_REQUIRED,
        HTTP_REQUEST_CODES.BAD_REQUEST,
        null,
        "create"
      )
    );

    return;
  }
  next();
};

module.exports = {
  userRequired,
  adminRequired,
};
