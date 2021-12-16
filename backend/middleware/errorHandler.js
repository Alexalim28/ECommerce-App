const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let error = {
    message: err.message || "Oops...Sorry, please try later!",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (err.name === "ValidationError") {
    error.message = {};
    Object.values(err.errors).forEach(
      ({ properties }) => (error.message[properties.path] = properties.message)
    );
    error.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.code && err.code === 11000) {
    error.message = `The email: ${err.keyValue.email} already exists`;
    error.statusCode = StatusCodes.UNAUTHORIZED;
  }

  return res.status(error.statusCode).json({ errors: error.message });
};

module.exports = errorHandlerMiddleware;
