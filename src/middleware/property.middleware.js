const { generateError } = require("../../libs/error");
const Property = require("../models/property.model");

const validateParam = (req, res, next, id) => {
  Property.findById(id, (err, property) => {
    if (err) {
      next(err);
      return;
    }
    req.property = property;
    next();
  });
};

module.exports = {
  validateParam,
};
