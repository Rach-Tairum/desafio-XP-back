const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (userObj) => {
  const jwtConfig = {
    expiresIn: '8h',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: userObj }, process.env.JWT_SECRET, jwtConfig);

  return token;
}

module.exports = createToken;