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

exports.advertsList = async (column, searchId, res ) => {
  const query = `SELECT * FROM property WHERE ${column} = $1`;
  const propertyAd = await db.query(query, [Number(searchId)]);
  if (propertyAd.rows.length === 0) {
    return res.status(404).json({
      status: 404,
      error: `Adverts Not Found !`,

    });
  }

  return res.status(200).json({
    status: 200,
    data: propertyAd.rows,

  });
};