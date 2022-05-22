const jwt = require('jsonwebtoken');
const USER_JWT_SECRET = process.env.USER_JWT_SECRET;

const authorize = async (req, res, next) => {
  try {
    const token = req.cookies.auth_token;
    if (!token) {
      return res.status(400).json({
        success: false,
        msg: 'Access denied! Sign in',
      });
    }
    // verify token
    const verified = jwt.verify(token, USER_JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: 'Access denied! Sign in',
    });
  }
};

module.exports = authorize;
