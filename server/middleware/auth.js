const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // read token from header
  const token = req.header('x-auth-token');

  // check if there is not a token
  if (!token) return res.status(401).json({ msg: 'Missing token' });

  // check token
  try {
    const encrypted = jwt.verify(token, process.env.SECRET_JWT);
    req.user = encrypted.user;
    next();
  } catch (error) {
    res.status(401).json({msg: 'Invalid token'});
  }

}