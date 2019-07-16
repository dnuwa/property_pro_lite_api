import db from '../db';

exports.searchAdvert = async (req, res) => {
  const { params: { type } } = req;

  const query = 'SELECT * FROM property WHERE type = $1';
  const propertyAd = await db.query(query, [type]);
  if (propertyAd.rows.length === 0) {
    return res.status(400).json({
      status: 400,
      message: 'Adverts Not Found !',
      error: `There are no properties of type: ${type}`,

    });
  }

  return res.status(200).json({
    status: 200,
    message: 'Adverts Found !',
    data: propertyAd.rows,
  });
};
