import db from '../db';

exports.searchAdvert = async (req, res) => {
  const { params: { type } } = req;

  const query = 'SELECT * FROM property WHERE type = $1';
  const propertyAd = await db.query(query, [type]);
  if (propertyAd.rows.length === 0) {
    return res.status(404).json({
      status: 404,
      error: `Adverts of Type: ${type} Not Found !`,

    });
  }

  return res.status(200).json({
    status: 200,
    data: propertyAd.rows,
  });
};
