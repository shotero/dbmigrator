import { program } from '../main.js';
import { logger } from '../logger.js';
import { pool } from '../adapters.js';
import { config } from '../config.js';

function load() {
  program
    .command('make')
    .description('create new migration')
    .option('-t,--title <migration>', 'title of the migration')
    .action((options) => {
      console.log('make');
      make(options);
    });
}

function make(options) {
  console.log('make migrations');
}

export { make, load };
