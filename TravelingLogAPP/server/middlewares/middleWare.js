// notFound middleware is used to handle 404 errors.
const notFound = (req,res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404)
    next(error);
  };
// errorHandler middleware
const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? "😁" : error.stack,// Windows key + period to get emojis
    });
  };

module.exports = {notFound, errorHandler};