import { hashSync } from 'bcryptjs';
import middleware from '../middleware';
import db from '../db';


// create user account
exports.signup = async (req, res) => {
  const {
    email, firstName, lastName, password, phoneNumber, address,
  } = req.body;

  // hashpassword
  const hashedPassword = hashSync(password, 8);

  // Email should be unique. 1st check if user with the above email already exists
  const query = 'SELECT * FROM users WHERE email = $1';
  const { rows } = await db.query(query, [email]);
  if (rows.length > 0) {
    return res.status(409).send({
      status: 409,
      message: 'Email already exists, please try another',
    });
  }

  // Insert new user in the database
  const query2 = 'INSERT INTO users( email, firstName, lastName, password, phoneNumber, address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [email, firstName, lastName, hashedPassword, phoneNumber, address];

  const result = await db.query(query2, values);
  const row = result.rows[0];

  return res.status(201).send({
    status: 201,
    message: 'User Successfully Created',
    data: {
      token: middleware.token(row.id),
      userId: row.id,
      firstName: row.firstname
    },
  });
};
