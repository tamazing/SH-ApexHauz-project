const { generateSuccessData } = require("../../libs");
const { MESSAGES, HTTP_REQUEST_CODES } = require("../../libs/constants");
const { createError } = require("../../libs/error");
const Property = require("../models/property.model");

const create = async (req, res, next) => {
  try {
    const { status, price, state, city, address, type, image_url } = req.body;
    if (
      !status ||
      !price ||
      !state ||
      !city ||
      !address ||
      !type ||
      !image_url
    ) {
      createError(MESSAGES.BAD_REQUEST, HTTP_REQUEST_CODES.BAD_REQUEST);
      return;
    }
    const newProperty = new Property(
      req.user_id,
      status,
      price,
      state,
      city,
      address,
      type,
      image_url
    );
    Property.create(newProperty, (err, data) => {
      if (err) {
        next(createError(MESSAGES.NEW_PROPERTY_ERR, 500));
      } else {
        console.log(data);
        res.status(201).json(
          generateSuccessData(MESSAGES.NEW_PROPERTY_SUCCESSFUL, {
            id: data.insertId,
            ...newProperty,
          })
        );
      }
    });
  } catch (err) {
    next(err);
  }
};

const update = (req, res, next) => {
  try {
    console.log(req.body);
    return res
      .status(200)
      .json(
        generateSuccessData(MESSAGES.PROPERTY_UPDATED_SUCCESSFUL, {
          ...req.property,
        })
      );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  update,
};
