require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const { PORT = '3000' } = process.env;
const { ADDRESS_DB = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

module.exports = {
  JWT_SECRET,
  PORT,
  ADDRESS_DB,
  NODE_ENV,
};
