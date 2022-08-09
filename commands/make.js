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

  const up = timestamp + '_up_' + name + '.sql';
  const down = timestamp + '_down_' + name + '.sql';

  const upFile = path.resolve(settings.paths.up, up);
  const downFile = path.resolve(settings.paths.down, down);

  const upTemplate = `-- Created by: ${settings.creator}
-- Created at: ${format(date, 'yyyy/MM/dd HH:mmss')};

BEGIN;

  -- your code goes here

END;
`;

  const downTemplate = `-- Created by: ${settings.creator}
-- Created at: ${format(date, 'yyyy/MM/dd HH:mmss')};

BEGIN;

  -- your code goes here

END;
`;

  logger.log(upFile);
  logger.log(downFile);

  fs.writeFileSync(upFile, upTemplate);
  fs.writeFileSync(downFile, downTemplate);
}

export { make, load };
