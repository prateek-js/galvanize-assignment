import { createConnection, Connection } from 'typeorm';
import config from '../dbconfig';

module.exports = async function () {
  try {
    const conn = await createConnection(config);
    console.log('successfully connected to database');
    return conn;
  } catch (e) {
    throw e;
  }
};
