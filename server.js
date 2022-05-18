const express = require("express");
const cors = require("cors");
const constants = require("./libs/constants");
require("dotenv").config();

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get(`${constants.API_VERSION_ROUTE}/`, (req, res) => {
  res.json({ message: "Welcome to SideHustle Node REST API with express." });
});

require("./src/routes/user.routes.js")(app, constants.API_VERSION_ROUTE);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
