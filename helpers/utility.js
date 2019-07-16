import db from '../db';

exports.currentUser = async (id) => {
  const query = 'SELECT * FROM users WHERE id = $1';
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

exports.checkAdvert = async (advertId) => {
  const query = 'SELECT * FROM property WHERE id = $1';
  const { rows } = await db.query(query, [advertId]);
  return rows[0];
};
