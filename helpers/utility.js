import db from '../db';

// Current user data
async function currentUser(id) {
  const query = 'SELECT * FROM users WHERE id = $1';
  const { rows } = await db.query(query, [id]);
  return rows[0];
}

export default currentUser;
