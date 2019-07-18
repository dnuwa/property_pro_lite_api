/* eslint-disable import/named */
import db from '../db';
import { currentUser, checkAdvert } from '../helpers/utility';

exports.updateAdvert = async (req, res) => {
  const {
    body: {
      status, type, state, city, address, price, imageUrl, description,
    }, params: { propertyId },
  } = req;

  const loggedinUser = await currentUser(req.userId);
  if (!loggedinUser) {
    return res.status(401).json({
      status: 401,
      error: 'Token is expired, please login again!',
    });
  }

  const advertToUpdate = await checkAdvert(propertyId);

  if (!advertToUpdate) {
    return res.status(404).json({
      status: 404,
      error: `Advert Not With ID: ${propertyId} Found`,
    });
  }

  if (loggedinUser.id !== advertToUpdate.owner) {
    return res.status(401).json({
      status: 401,
      error: `You are not authorised to edit proprty with Id: ${propertyId}`,
    });
  }


  const newStatus = status || advertToUpdate.status;
  const newDescription = description || advertToUpdate.description;
  const newtype = type || advertToUpdate.type;
  const newState = state || advertToUpdate.state;
  const newCity = city || advertToUpdate.city;
  const newAddress = address || advertToUpdate.address;
  const newPrice = price || advertToUpdate.price;
  const newImage = imageUrl || advertToUpdate.imageurl;

  const sql = 'UPDATE property SET status = $1, description = $2, type = $3, state = $4, city = $5, address = $6, price = $7, imageurl = $8 WHERE id = $9 returning *';
  const { rows } = await db.query(sql, [newStatus, newDescription, newtype, newState,
    newCity, newAddress, newPrice, newImage, propertyId]);

  return res.status(200).json({
    status: 200,
    data: rows[0],
  });
};
