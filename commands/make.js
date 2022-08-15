import fs from 'node:fs';
import path from 'node:path';
import { format } from 'date-fns';
import { program } from '../main.js';
import { logger } from '../logger.js';
import config from '../config.js';

function load() {
  program
    .command('make')
    .description('create new migration')
    .argument('<name>', 'name of the migration')
    .action((name) => {
      console.log('make');
      make(name, config);
    });
}

function make(name, settings) {
  const date = Date.now();
  const timestamp = format(date, 'yyyyMMddHHmmss');

  fs.mkdirSync(settings.paths.up, { recursive: true });
  fs.mkdirSync(settings.paths.down, { recursive: true });

  const filename = timestamp + '_' + name + '.sql';

  const upFile = path.resolve(settings.paths.up, filename);
  const downFile = path.resolve(settings.paths.down, filename);

  const upTemplate = `-- Created by: ${settings.creator}
-- Created at: ${format(date, 'yyyy/MM/dd HH:mmss')};

-- Your code goes here
`;

  const downTemplate = `-- Created by: ${settings.creator}
-- Created at: ${format(date, 'yyyy/MM/dd HH:mmss')};

-- Your code goes here
`;

  logger.log(upFile);
  logger.log(downFile);

  fs.writeFileSync(upFile, upTemplate);
  fs.writeFileSync(downFile, downTemplate);
}

export { make, load };
