const propertyRouter = require("express").Router();
const { userRequired } = require("../middleware/user.middleware");
const { create, update } = require("../controllers/property.controller");
const { validateParam } = require("../middleware/property.middleware");

propertyRouter.param("propertyId", validateParam);
propertyRouter.post("/", userRequired, create);
propertyRouter.patch("/:propertyId", userRequired, update);

module.exports = propertyRouter;
