import Pg from 'pg';
import conf from './config.js';

const config = conf.config;
const pool = new Pg.Pool({
  user: config.db.user,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port
});

export { pool };
