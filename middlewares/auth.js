const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

// eslint-disable-next-line consistent-return
module.exports.auth = (req, res, next) => {
  const userToken = req.cookies.jwt;
  if (!userToken) {
    throw new AuthError('Необходима авторизация');
  } else {
    let payload;
    try {
      payload = jwt.verify(userToken, 'some-secret-key');
    } catch (err) {
      throw new AuthError('Необходима авторизация');
    }
    req.user = payload;
    next();
  }
};
