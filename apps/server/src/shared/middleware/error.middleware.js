export const Error_middleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 400;
  const err_message = err.message || "internal server error";

  res.status(statusCode).json({
    message: err_message,
  });
};
