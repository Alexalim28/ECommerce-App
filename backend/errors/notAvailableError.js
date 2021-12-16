const { StatusCodes } = require("http-status-codes");

class NotAvailableError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = NotAvailableError;
