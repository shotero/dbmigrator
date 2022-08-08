import Pg from 'pg';

const pool = new Pg.Pool({
  user: 'monhary',
  host: 'localhost',
  database: 'monhary',
  password: '',
  port: 5432
});

export { pool };
