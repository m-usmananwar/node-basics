const jwt = require('jsonwebtoken');
const responseHelper = require('../helpers/responseHelper');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    responseHelper.error(res, 'Access denied, token missing!', 401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      responseHelper.error(res, 'Invalid token, access forbidden!', 403);
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
