import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { SECRET_KEY } = process.env;
// eslint-disable-next-line consistent-return
exports.verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers.authorization; // Express headers are auto converted to lowercase
  if (!token) { return res.status(401).json({ status: 401, message: 'No token provided.' }); }
  // eslint-disable-next-line consistent-return
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) { return res.status(401).json({ status: 401, message: 'Failed to authenticate token.' }); }
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
};


// Generate auth token
exports.token = (id) => {
  const token = jwt.sign({ id },
    SECRET_KEY,
    { expiresIn: '24h' });

  return token;
};
