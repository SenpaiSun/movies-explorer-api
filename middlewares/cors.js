const allowedCors = [
  'http://drow-films.nomoreparties.co',
  'https://drow-films.nomoreparties.co',
  'http://api.drow-films.nomoreparties.co',
  'https://api.drow-films.nomoreparties.co',
  'http://localhost:3000',
  'http://localhost:5000',
  'http://localhost:3001',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const corsMiddleware = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};

module.exports = { corsMiddleware };
