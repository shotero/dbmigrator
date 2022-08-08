import { program } from '../main.js';
import { logger } from '../logger.js';
import { pool } from '../adapters.js';
import { config } from '../config.js';

function load() {
  program
    .command('up')
    .description('run migrations')
    .option('-t,--target <migration>', 'target migration')
    .action((options) => {
      logger.success('migrate');
      up(options);
    });
}

function up(options) {
  console.log('run migrations');
}

export { up, load };
