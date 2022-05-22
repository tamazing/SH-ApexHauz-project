const API_VERSION_ROUTE = "/api/v1";

const ROUTES = {
  GENERAL: `${API_VERSION_ROUTE}/`,
  AUTH: `${API_VERSION_ROUTE}/auth`,
  USERS: `${API_VERSION_ROUTE}/users`,
  PROPERTY: `${API_VERSION_ROUTE}/property`,
};

const MESSAGES = {
  NEW_PROPERTY_SUCCESSFUL: "New Property created successfully",
  NEW_PROPERTY_ERR: "An error while creating your Property. Please try again",
  PROPERTY_UPDATED_SUCCESSFUL: "Your property has been updated successfully",
  PROPERTY_UPDATED_ERR:
    "An error while updating your Property. Please try again",
  PROPERTY_DELETED_SUCCESSFUL: "Your property has been deleted successfully",
  PROPERTY_DELETED_ERR:
    "An error while deleting your Property. Please try again",
  ACCOUNT_EXIST:
    "Sorry, An account already exist with one of the details supplied",
  NEW_ACCOUNT_SUCCESSFUL: "Account created successfully",
  NEW_ACCOUNT_ERROR: "Some error occurred while creating the User account",
  LOGIN_SUCCESSFUL: "Account Logged-in successfully",
  LOGIN_ERROR: "Sorry, Your email or password is incorrect",
  NO_USER: "Sorry, We can't find the User with the supplied details",
  EMAIL_EXIST:
    "Sorry! This Email has been registered. Choose another one for your account",
  INVALID_REQUEST: "Invalid Request",
  INVALID_REQUEST_NO_BODY: "Invalid Request, body content missing",
  INVALID_REQUEST_FIELD_MISSING:
    "Invalid Request, one of the required fields is missing",
  INVALID_REQUEST_FIELD:
    "Invalid Request, one of the supplied fields is not valid",
  BAD_REQUEST: "Bad Request, please try again with valid request data",
  NO_VALID_CREDENTIALS: "No credentials supplied, Please try again",
  INVALID_CREDENTIALS: "Sorry! Invalid credentials supplied, Please try again",
  INVALID_TOKEN:
    "Invalid/expired token supplied. Please try again with a valid token",
  LOGIN_REQUIRED: "Please login first before you can access that route",
  ADMIN_REQUIRED: "Sorry! only Admin can access that route",
  NO_DATA_TO_DISPLAY: "SORRY! NO DATA AVAILABLE TO DISPLAY",
  DATA_FETCH_SUCCESSFUL: "Data fetched successfully",
  DATA_FETCH_ERR: "An error occurred while fetching the data. Please try again",
  NOT_FOUND:
    "Sorry! we can't find the data you're looking for with the details supplied",
  NO_ACCESS_TO_ROUTE: "Oops! You don't have access to this route",
  GENERAL_ERROR_MESSAGE:
    "Oops! Something went wrong with your request. please try again",
  METHOD_NOT_ALLOWED: "Sorry, Method not allowed or not yet supported",
};

const HTTP_REQUEST_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
};

module.exports = {
  API_VERSION_ROUTE,
  ROUTES,
  MESSAGES,
  HTTP_REQUEST_CODES,
};
