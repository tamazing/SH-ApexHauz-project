const { generateSuccessData } = require("../../libs");
const { MESSAGES, HTTP_REQUEST_CODES } = require("../../libs/constants");
const { createError } = require("../../libs/error");
const Property = require("../models/property.model");

const create = async (req, res, next) => {
  const { status, price, state, city, address, type, image_url } = req.body;
  if (!status || !price || !state || !city || !address || !type || !image_url) {
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
      res.status(HTTP_REQUEST_CODES.CREATED).json(
        generateSuccessData(MESSAGES.NEW_PROPERTY_SUCCESSFUL, {
          id: data.insertId,
          ...newProperty,
        })
      );
    }
  });
};

const updateColumn = (req, res, next) => {
  const keys = Object.keys(req.body);
  const property = req.property;

  if (!keys.length) {
    next(
      createError(
        MESSAGES.INVALID_REQUEST_NO_BODY,
        HTTP_REQUEST_CODES.BAD_REQUEST
      )
    );
    return;
  }
  const propertyKeys = Object.keys(property);
  if (!keys.every((k) => propertyKeys.includes(k))) {
    next(
      createError(
        MESSAGES.INVALID_REQUEST_FIELD,
        HTTP_REQUEST_CODES.BAD_REQUEST
      )
    );
    return;
  }
  keys.forEach((key, i) => {
    Property.updateColumn(property, key, req.body[key], (err, _) => {
      if (err) {
        next(createError(MESSAGES.PROPERTY_UPDATED_ERR));
      } else {
        property[key] = req.body[key];
        if (i === keys.length - 1) {
          res.status(HTTP_REQUEST_CODES.OK).json(
            generateSuccessData(MESSAGES.PROPERTY_UPDATED_SUCCESSFUL, {
              property,
            })
          );
          return;
        }
      }
    });
  });
};

const updateStatus = (req, res, next) => {
  const property = req.property;
  Property.updateColumn(property, "status", "sold", (err, _) => {
    if (err) {
      next(createError(MESSAGES.PROPERTY_UPDATED_ERR));
    } else {
      res.status(HTTP_REQUEST_CODES.OK).json(
        generateSuccessData(MESSAGES.PROPERTY_UPDATED_SUCCESSFUL, {
          ...property,
          status: "sold",
        })
      );
    }
  });
};

const delete_ = (req, res, next) => {
  const property = req.property;
  Property.delete(property.id, (err, result) => {
    if (err) {
      next(createError(MESSAGES.PROPERTY_DELETED_ERR));
    } else {
      res
        .status(HTTP_REQUEST_CODES.OK)
        .json(
          generateSuccessData(MESSAGES.PROPERTY_DELETED_SUCCESSFUL, property)
        );
    }
  });
};

const getPropertyById = (req, res) => {
  res
    .status(HTTP_REQUEST_CODES.OK)
    .json(generateSuccessData(MESSAGES.DATA_FETCH_SUCCESSFUL, req.property));
};

module.exports = {
  create,
  updateColumn,
  updateStatus,
  delete_,
  getPropertyById,
};
