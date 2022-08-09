import Pg from 'pg';
import config from './config.js';

console.dir(config);

const pool = new Pg.Pool({
  user: config.db.user,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port
});

export { pool };
