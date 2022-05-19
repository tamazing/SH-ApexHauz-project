const userRouter = require("express").Router();
const userControllers = require("../controllers/user.controller");

userRouter.get("/", userControllers.findAll);
userRouter.get("/:id", userControllers.findOne);
userRouter.put("/:id", userControllers.update);
userRouter.delete("/:id", userControllers.delete);

module.exports = userRouter;
