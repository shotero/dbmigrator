import Pg from 'pg';
import conf from './config.js';

const config = conf.config;
if (!config || !config.db) {
  throw 'No DB configuration found. Please specify the db connection in the configuration file.';
}

const pool = new Pg.Pool({
  user: config.db.user,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port
});

export { pool };
