const propertyRouter = require("express").Router();
const { userRequired } = require("../middleware/user.middleware");
const {
  create,
  updateColumn,
  updateStatus,
  delete_,
} = require("../controllers/property.controller");
const { validateParam } = require("../middleware/property.middleware");

propertyRouter.param("propertyId", validateParam);
propertyRouter.post("/", userRequired, create);
propertyRouter.patch("/:propertyId", userRequired, updateColumn);
propertyRouter.patch("/:propertyId/sold", userRequired, updateStatus);
propertyRouter.delete("/:propertyId", userRequired, delete_);

module.exports = propertyRouter;
