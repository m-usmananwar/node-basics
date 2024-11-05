const jwt = require('jsonwebtoken');
const { errorResponse } = require('../helpers/responseHelper');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    errorResponse(res, 'Access denied, token missing!', 401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      errorResponse(res, 'Invalid token, access forbidden!', 403);
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
