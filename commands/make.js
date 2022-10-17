import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { format } from 'date-fns';
import { program } from '../main.js';
import { logger } from '../logger.js';
import config from '../config.js';
import { getFullPath } from '../utils.js';

function load() {
  program
    .command('make')
    .description('create new migration')
    .argument('<name>', 'name of the migration')
    .action((name) => {
      logger.info(`make ${name}`);
      make(name, config);
    });
}

function make(name, config) {
  const date = Date.now();
  const timestamp = format(date, 'yyyyMMddHHmmss');
  const settings = config.config;

  const upPath = getFullPath(settings.paths.up, config.filepath);
  const downPath = getFullPath(settings.paths.down, config.filepath);

  fs.mkdirSync(upPath, {
    recursive: true
  });
  fs.mkdirSync(downPath, {
    recursive: true
  });

  const filename = timestamp + '_' + name + '.sql';

  const upFile = path.resolve(upPath, filename);
  const downFile = path.resolve(downPath, filename);

  const upTemplate = `-- UP SCRIPT: ${name}
-- Created by: ${settings.creator}
-- Created at: ${format(date, 'yyyy/MM/dd HH:mmss')}

-- Your code goes here
`;

  const downTemplate = `-- DOWN SCRIPT: ${name}
-- Created by: ${settings.creator}
-- Created at: ${format(date, 'yyyy/MM/dd HH:mmss')}

-- Your code goes here
`;

  logger.log(upFile);
  logger.log(downFile);

  fs.writeFileSync(upFile, upTemplate);
  fs.writeFileSync(downFile, downTemplate);

  process.exit(0);
}

export { make, load };
