const propertyRouter = require("express").Router();
const { userRequired } = require("../middleware/user.middleware");
const {
  create,
  updateColumn,
  updateStatus,
  delete_,
  getPropertyById,
  getAllProperties,
} = require("../controllers/property.controller");
const { validateParam } = require("../middleware/property.middleware");
const { uploadFile } = require("../middleware/general.middleware");

propertyRouter.param("propertyId", validateParam);

propertyRouter.get("/", getAllProperties);
propertyRouter.get("/:propertyId", getPropertyById);

propertyRouter.post("/", userRequired, uploadFile(), create);

propertyRouter.patch("/:propertyId", userRequired, uploadFile, updateColumn);
propertyRouter.patch("/:propertyId/sold", userRequired, updateStatus);

propertyRouter.delete("/:propertyId", userRequired, delete_);

module.exports = propertyRouter;
