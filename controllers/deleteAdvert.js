/* eslint-disable import/named */
import db from '../db';
import { currentUser, checkAdvert } from '../helpers/utility';


exports.deleteAdvert = async (req, res) => {
  const {
    params: { propertyId },
  } = req;

  const loggedinUser = await currentUser(req.userId);
  if (!loggedinUser) {
    return res.status(401).json({
      status: 401,
      error: 'Token is expired, please login again!',
    });
  }

  const advertToDelete = await checkAdvert(propertyId);


  if (!advertToDelete) {
    return res.status(404).json({
      status: 404,
      error: `Advert with ID: ${propertyId} Not Found`,
    });
  }

  // Delete only if you are the creator of the advert
  if (loggedinUser.id !== advertToDelete.owner) {
    return res.status(401).json({
      status: 401,
      error: `Unauthorised to delete proprty Id: ${propertyId}`,
    });
  }

  const sql = 'DELETE FROM property WHERE id = $1 returning *';
  await db.query(sql, [propertyId]);

  // Return adverts details
  return res.status(202).json({
    status: 202,
    data: `Advert with Id: ${propertyId} has been Successfuly deleted`,
  });
};
