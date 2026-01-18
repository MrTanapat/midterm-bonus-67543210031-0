// src/presentation/middlewares/errorHandler.js
function errorHandler(err, req, res, next) {
  console.error("Error:", err.message);

  let statusCode = 500;
  let message = err.message || "Internal server error";

  // TODO: Handle different error types
  // - ValidationError → 400
  if (
    message.includes("required") ||
    message.includes("Invalid") ||
    message.includes("must be") ||
    message.includes("between") ||
    message.includes("Cannot change") ||
    message.includes("Change status first")
  ) {
    statusCode = 400;
  }
  // - NotFoundError → 404
  if (message.includes("not found")) {
    statusCode = 404;
  }
  // - ConflictError → 409
  if (message.includes("UNIQUE") || message.includes("already exists")) {
    statusCode = 409;
    message = "Data conflict: Student code or email already exists";
  }
  // - Default → 500
  res.status(statusCode).json({
    error: message,
  });
}

module.exports = errorHandler;
