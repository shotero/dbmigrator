import { program } from '../main.js';
import { logger } from '../logger.js';
import { pool } from '../adapters.js';
import { config } from '../config.js';

function load() {
  program
    .command('down')
    .description('rollback migrations')
    .option('-t,--target <migration>', 'target migration')
    .action((options) => {
      console.log('rollback');
      down(options);
    });
}

function down(options) {
  console.log('revert migrations');
}

export { down, load };
