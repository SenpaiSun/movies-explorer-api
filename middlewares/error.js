// eslint-disable-next-line no-unused-vars
module.exports = ((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.statusCode === 500 ? 'Ошибка на сервере' : err.message;
  res.status(status).json({ message });
});
