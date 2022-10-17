import Pg from 'pg';
import test from 'ava';
import { PostgreSqlContainer } from 'testcontainers';

test.before(async (t) => {
  console.log(PostgreSqlContainer);
  const container = await new PostgreSqlContainer().start();

  const pool = new Pg.Pool({
    host: container.getHost(),
    port: container.getPort(),
    database: container.getDatabase(),
    user: container.getUsername(),
    password: container.getPassword()
  });

  t.context = {
    container: container,
    client: await pool.connect()
  };
});

test.after(async (t) => {
  await t.context.client.end();
  await t.context.container.stop();
});

test('works', async (t) => {
  const client = t.context.client;
  const result = await client.query('SELECT 1');
  t.deepEqual(result.rows[0], { '?column?': 1 });
});
