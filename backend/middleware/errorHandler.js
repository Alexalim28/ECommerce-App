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

  if (err.name === "CastError") {
    error.message = `No Product matches the id: ${err.value}`;
    error.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.name === "JsonWebTokenError") {
    error.message =
      "You must be logged in or create an account to have access to your cart";
    error.statusCode = StatusCodes.BAD_REQUEST;
  }

  res.status(error.statusCode).json({ errors: error.message });
};

module.exports = errorHandlerMiddleware;
