import bcrypt from 'bcryptjs';
import middleware from '../middleware';
import db from '../db';

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = $1';

  const { rows } = await db.query(query, [email]);

  if (!rows[0]) {
    return res.status(400).json({
      status: 400,
      error: 'wrong username or password',
    });
  }

  const isAuthenticated = bcrypt.compareSync(password, rows[0].password);

  if (!isAuthenticated) {
    return res.status(400).json({
      status: 400,
      error: 'wrong username or password',
    });
  }

  return res.status(200).json({
    status: 200,
    message: 'User Successfuly Logged In',
    data: {
      token: middleware.token(rows[0].id),
      userId: rows[0].id,
      firstName: rows[0].firstname
    },
  });
};
