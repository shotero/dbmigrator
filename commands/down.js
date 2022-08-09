import { program } from '../main.js';
import { logger } from '../logger.js';
import { pool } from '../adapters.js';
import config from '../config.js';

function load() {
  program
    .command('down')
    .description('rollback migrations')
    .argument('<migration>', 'migration to revert back to')
    .action((migration) => {
      console.log('rollback');
      down(migration, config, pool);
    });
}

function down(migration, settings, db) {
  console.log('revert migrations');
}

export { down, load };
