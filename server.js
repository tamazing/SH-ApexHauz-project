const express = require("express");
const cors = require("cors");
const { ROUTES, HTTP_REQUEST_CODES } = require("./libs/constants.js");
const userRouter = require("./src/routes/user.routes.js");
const authRouter = require("./src/routes/auth.routes.js");
const { generateError } = require("./libs/error.js");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API ROUTES
app.get(ROUTES.GENERAL, (req, res) => {
  res.json({ message: "Welcome to SideHustle Node REST API with express." });
});
app.use(ROUTES.USERS, userRouter);
app.use(ROUTES.AUTH, authRouter);

//ERROR MIDDLEWARE
app.use((err, _, res, __) => {
  res
    .status(err.statusCode || HTTP_REQUEST_CODES.SERVER_ERROR)
    .json(generateError(err.message));
});

const runServer = () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
  });
};

runServer();
