const { generateSuccessData } = require("../libs");
const { MESSAGES, HTTP_REQUEST_CODES } = require("../libs/constants");
const { createError } = require("../libs/error");
const uploadImage = require("../libs/image_upload");
const Property = require("../models/property.model");

const create = async (req, res, next) => {
  const { status, price, state, city, address, type } = req.body;

  if (!status || !price || !state || !city || !address || !type || !req.file) {
    next(createError(MESSAGES.BAD_REQUEST, HTTP_REQUEST_CODES.BAD_REQUEST));
    return;
  }

  uploadImage(req.file, (err, result) => {
    if (err) {
      next(err);
    } else {
      const image_url = result.url;
      console.log(image_url);
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
          next(createError(MESSAGES.NEW_PROPERTY_ERR));
        } else {
          res.status(HTTP_REQUEST_CODES.CREATED).json(
            generateSuccessData(MESSAGES.NEW_PROPERTY_SUCCESSFUL, {
              id: data.insertId,
              ...newProperty,
            })
          );
        }
      });
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

const getAllProperties = (req, res, next) => {
  Property.getAll((err, result) => {
    if (err) {
      next(createError(MESSAGES.DATA_FETCH_ERR));
    } else {
      res
        .status(HTTP_REQUEST_CODES.OK)
        .json(generateSuccessData(MESSAGES.DATA_FETCH_SUCCESSFUL, result));
    }
  });
};

const search = (req, res, next) => {
  const { propertyType } = req.query;
  if (!propertyType) {
    next(
      createError(
        MESSAGES.INVALID_REQUEST_FIELD_MISSING,
        HTTP_REQUEST_CODES.BAD_REQUEST
      )
    );
    return;
  }
  const query = {
    sql: `SELECT * FROM properties WHERE type REGEXP ?`,
    params: [`.*${propertyType}.*`],
  };
  Property.query(query, (err, results) => {
    if (err) {
      console.log(err);
      next(
        createError(
          err.message || MESSAGES.DATA_FETCH_ERR,
          err.statusCode || HTTP_REQUEST_CODES.SERVER_ERROR
        )
      );
    } else {
      res
        .status(HTTP_REQUEST_CODES.OK)
        .json(generateSuccessData(MESSAGES.DATA_FETCH_SUCCESSFUL, results));
    }
  });
};

module.exports = {
  create,
  updateColumn,
  updateStatus,
  delete_,
  getPropertyById,
  getAllProperties,
  search,
};
