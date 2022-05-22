class CustomError extends Error {
  constructor(msg, statusCode = 500, data = null) {
    super(msg);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.data = data;
  }
}

const createError = (msg, statusCode = 500, data = null, type = "create") => {
  switch (type) {
    case "create":
      return new CustomError(msg, statusCode, data);

    case "throw":
      throw new CustomError(msg, statusCode, data);
  }
};
const generateError = (msg) => {
  return { status: "error", error: msg };
};

module.exports = {
  CustomError,
  createError,
  generateError,
};
