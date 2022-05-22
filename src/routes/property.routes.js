const propertyRouter = require("express").Router();
const { userRequired } = require("../middleware/user.middleware");
const {
  create,
  updateColumn,
  updateStatus,
} = require("../controllers/property.controller");
const { validateParam } = require("../middleware/property.middleware");

propertyRouter.param("propertyId", validateParam);
propertyRouter.post("/", userRequired, create);
propertyRouter.patch("/:propertyId", userRequired, updateColumn);
propertyRouter.patch("/:propertyId/sold", userRequired, updateStatus);

module.exports = propertyRouter;
