const generateSuccessData = (message, data) => ({
  status: "success",
  message,
  data,
});

module.exports = {
  generateSuccessData,
};
