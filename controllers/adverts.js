/* eslint-disable import/named */
import { currentUser } from '../helpers/utility';

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

  // State should be New/Old
  const diffStates = ['new', 'old'];
  const lowercase = state.toLowerCase();
  const isTrue = diffStates.indexOf(lowercase);
  if (isTrue < 0) {
    return res.status(400).json({
      status: 400,
      message: 'Bad request',
      error: 'State should either be NEW or OLD',
    });
  }

  // Satus should be Available/Sold
  const statuses = ['available', 'sold'];
  const satusValue = status.toLowerCase();
  const isSatusTrue = statuses.indexOf(satusValue);
  if (isSatusTrue < 0) {
    return res.status(400).json({
      status: 400,
      message: 'Bad request',
      error: 'Status should either be AVAILABLE or SOLD',
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

exports.allAdverts = async (req, res) => {
  const query = 'SELECT * FROM property';
  const { rows } = await db.query(query);
  const advertList = [];
  rows.forEach((row) => {
    const data = {
      id: row.id,
      Status: row.status,
      Description: row.description,
      Type: row.type,
      State: row.state,
      City: row.city,
      Address: row.address,
      Price: row.price,
      Image: row.imageUrl,
      created_on: row.createdon,
      created_by_staffId: row.owner,
    };
    advertList.push(data);
  });

  if (advertList.length === 0) {
    return res.status(400).json({
      status: 400,
      message: 'Adverts Not Found !',
      error: 'There are no adverts in the database currently',

    });
  }
  return res.status(200).json({
    status: 200,
    message: 'Adverts Successfully Retrieved!',
    data: advertList,
  });
};

// returns a single property advert
exports.singleAdvert = async (req, res) => {
  const { params: { propertyId } } = req;

  const query = 'SELECT * FROM property WHERE id = $1';
  const propertyAd = await db.query(query, [Number(propertyId)]);
  if (propertyAd.rows.length === 0) {
    return res.status(400).json({
      status: 400,
      message: 'Advert Not Found !',
      error: `There is no property advert with Id: ${propertyId}`,

    });
  }

  return res.status(200).json({
    status: 200,
    message: 'Advert Found !',
    data: propertyAd.rows,

  });
};
