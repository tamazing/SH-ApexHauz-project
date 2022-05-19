const bcryptjs = require("bcryptjs");
const User = require("../models/user.model.js");
const { MESSAGES, HTTP_REQUEST_CODES } = require("../../libs/constants");
const { createError, generateError } = require("../../libs/error.js");
const { generateSuccessData } = require("../../libs/index.js");
const jwt = require("jsonwebtoken");

exports.register = (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      console.log("here");
      createError(
        MESSAGES.INVALID_REQUEST_NO_BODY,
        HTTP_REQUEST_CODES.BAD_REQUEST
      );
      return;
    }

    const { email, first_name, last_name, password, phone_number, address } =
      req.body;

    if (
      !email ||
      !first_name ||
      !last_name ||
      !password ||
      !phone_number ||
      !address
    ) {
      createError(
        MESSAGES.INVALID_REQUEST_FIELD_MISSING,
        HTTP_REQUEST_CODES.BAD_REQUEST
      );
    }

    User.findByEmail(email, async (_, account) => {
      if (account) {
        res
          .status(HTTP_REQUEST_CODES.BAD_REQUEST)
          .json(generateError(MESSAGES.ACCOUNT_EXIST));
      } else {
        const hashPassword = await bcryptjs.hash(password, 12);
        const is_admin =
          password === process.env.ADMIN_PASS &&
          email === process.env.ADMIN_EMAIL
            ? 1
            : 0;

        const user = new User(
          email,
          first_name,
          last_name,
          hashPassword,
          phone_number,
          address,
          is_admin
        );
        User.create(user, (err, data) => {
          if (err) {
            createError(MESSAGES.NEW_ACCOUNT_ERROR);
          } else {
            const token = jwt.sign(
              {
                id: data.id,
                email: data.email,
                is_admin: Boolean(data.is_admin),
              },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "7d" }
            );
            res
              .status(200)
              .json(
                generateSuccessData(MESSAGES.NEW_ACCOUNT_SUCCESSFUL, {
                  ...data,
                  token,
                })
              );
          }
        });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
