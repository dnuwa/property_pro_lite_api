import dotenv from 'dotenv';
import pool from '../config';

import { tables } from './shemas';

dotenv.config();

// Create table by running the tables query
const createTables = () => {
  pool.query(tables)
    .then()
    .catch();
};

const tearDown = () => {
  const sql = 'DROP TABLE IF EXISTS users, accounts, transactions CASCADE';

  pool.query(sql)
    .then(() => {
    })
    .catch();
};

// export pool and createTables to be accessible  from an where within the application
module.exports = {
  createTables,
  tearDown,
};

require('make-runnable');
