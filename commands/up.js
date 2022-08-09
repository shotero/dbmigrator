import { program } from '../main.js';
import { logger } from '../logger.js';
import { pool } from '../adapters.js';
import config from '../config.js';

function load() {
  program
    .command('up')
    .description('run migrations')
    .argument('<migration>', 'migration to go up to')
    .action((migration) => {
      logger.success('migrate');
      up(migration, config, pool);
    });
}

function up(migration, settings, db) {
  // load files
  // check if migration table exists else create
  // get starting point
  // get ending point
  // on failure, revert till starting point
  console.log('apply migrations');
}

export { up, load };
