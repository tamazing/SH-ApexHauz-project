const jwt = require("jsonwebtoken");

const generateSuccessData = (message, data) => ({
  status: "success",
  message,
  data,
});

const generateToken = (data, key, expiresIn = "7d") =>
  jwt.sign(
    {
      id: data.id,
      email: data.email,
      is_admin: Boolean(data.is_admin),
    },
    key,
    { expiresIn }
  );

module.exports = {
  generateSuccessData,
  generateToken,
};
