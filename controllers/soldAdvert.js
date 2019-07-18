/* eslint-disable import/named */

import db from '../db';
import { currentUser, checkAdvert } from '../helpers/utility';

exports.markSold = async (req, res) => {
  const { body: { newStatus }, params: { propertyId } } = req;

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
      error: `There is no property with Id: ${propertyId}`,
    });
  }

  if (loggedinUser.id !== advertToUpdate.owner) {
    return res.status(401).json({
      status: 401,
      error: `You are not authorised to edit proprty Id: ${propertyId}`,
    });
  }

  const sql = 'UPDATE property SET status = $1 WHERE id = $2 returning *';
  const { rows } = await db.query(sql, [newStatus, propertyId]);


  return res.status(200).json({
    status: 200,
    message: 'Property Status Updated to Sold',
    data: rows[0],
  });
};
