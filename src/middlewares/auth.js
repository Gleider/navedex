const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({ Error: 'Token not provided' });
  }
  const [, token] = auth.split(' ');
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.TOKEN_SECRET);
    req.user_id = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({ Error: 'Token invalid' });
  }
};
