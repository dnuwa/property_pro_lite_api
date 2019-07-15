import currentUser from '../helpers/utility';
import db from '../db';

exports.createAdvert = async (req, res) => {
  const {
    status, type, state, city, address, price, imageUrl, description,
  } = req.body;


  // Getting the current user object
  const user = await currentUser(req.userId);
  if (!user) {
    return res.status(401).json({
      status: 401,
      error: 'Token expired please login again',
    });
  }

  const queryDescripption = 'SELECT * FROM property WHERE description = $1';
  const propertyarray = await db.query(queryDescripption, [description]);
  if (propertyarray.rows.length > 0) {
    return res.status(409).send({
      status: 409,
      message: 'An advert with this description already exists',
    });
  }

  const query = 'INSERT INTO property(status, description, type, state, city, address, price, imageUrl, owner) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
  const values = [status, description, type, state, city, address, price, imageUrl, user.id];

  const { rows } = await db.query(query, values);


  // advert  response
  return res.status(201).json({
    status: 201,
    message: 'Advert Successfully created',
    data: {
      id: rows[0].id,
      Status: status,
      Description: description,
      Type: type,
      State: state,
      City: city,
      Address: address,
      Price: price,
      Image: imageUrl,
      created_on: rows[0].createdon,
      created_by_staffId: rows[0].owner,
      created_by_staffName: user.firstname,
    },
  });
};
