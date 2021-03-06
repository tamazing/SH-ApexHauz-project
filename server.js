const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const { ROUTES, HTTP_REQUEST_CODES } = require("./src/libs/constants.js");
const userRouter = require("./src/routes/user.routes.js");
const authRouter = require("./src/routes/auth.routes.js");
const propertyRouter = require("./src/routes/property.routes.js");
const { generateError } = require("./src/libs/error.js");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger("dev"));

//API ROUTES
app.get(ROUTES.GENERAL, (req, res) => {
  res.json({ message: "Welcome to SideHustle Node REST API with express." });
});
app.use(ROUTES.USERS, userRouter);
app.use(ROUTES.AUTH, authRouter);
app.use(ROUTES.PROPERTY, propertyRouter);

app.all("*", (req, res) => {
  res.status(404).json(generateError("Request Not Found"));
});

//ERROR MIDDLEWARE
app.use((err, _, res, __) => {
  res
    .status(err.statusCode || HTTP_REQUEST_CODES.SERVER_ERROR)
    .json(generateError(err.message));
});

const start = () => {
  const PORT = process.env.PORT || 3000;
  if (require.main === module) {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}.`);
    });
  } else {
    return app;
  }
};

start();
