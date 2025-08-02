const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err);

  const status = err.statusCode || 500;
  const message = err.message || 'Something went wrong';

  res.status(status).json({ message });
};

module.exports = errorHandler;
