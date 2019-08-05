/* eslint-disable import/named */
import { currentUser, advertsList } from '../helpers/utility';

import db from '../db';

exports.createAdvert = async (req, res) => {
  const {
    status, type, state, city, address, price, imageUrl, description, title, rooms
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

  const query = 'INSERT INTO property(status, title, description, type, state, city, address, price, imageUrl, rooms, owner) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';
  const values = [status, title, description, type, state, city, address, price, imageUrl, rooms, user.id];

  const { rows } = await db.query(query, values);


  // advert  response
  return res.status(201).json({
    status: 201,
    data: {
      id: rows[0].id,
      Status: status,
      Title: title,
      Description: description,
      Type: type,
      State: state,
      City: city,
      Address: address,
      Price: price,
      Image: imageUrl,
      Rooms: rooms,
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
      Title: row.title,
      Description: row.description,
      Type: row.type,
      State: row.state,
      City: row.city,
      Address: row.address,
      Price: row.price,
      Image: row.imageurl,
      Rooms: row.rooms,
      created_on: row.createdon,
      created_by_staffId: row.owner,
    };
    advertList.push(data);
  });

  if (advertList.length === 0) {
    return res.status(404).json({
      status: 404,
      error: 'Adverts Not Found !',

    });
  }
  return res.status(200).json({
    status: 200,
    data: advertList,
  });
};

// returns a single property advert
exports.singleAdvert = async (req, res) => {
  const { params: { propertyId } } = req;
  advertsList('id', propertyId, res);
};

// return all adverts poted by a single user
exports.userAds = async (req, res) =>{
  const loggedInUser = await currentUser(req.userId);
  advertsList('owner', loggedInUser.id, res);
};
