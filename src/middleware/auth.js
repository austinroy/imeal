import jwt from 'jsonwebtoken';
import config from '../config';

const secretKey = config.SECRET_KEY;

const auth = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.body.token;
  if (token) {
    return jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(500).json({
          message: 'Invalid token',
        });
      }
      req.decoded = decoded;
      return next();
    });
  }

  return res.status(401).json({
    message: 'No token',
  });
};

export default auth;
