import fs from 'node:fs';
import path from 'node:path';
import { program } from '../main.js';
import { logger } from '../logger.js';
import { pool } from '../adapters.js';
import config from '../config.js';
import {
  apply,
  checksum,
  difference,
  ensureMigrationTable,
  getApplied,
  getFullPath,
  getMigrationTable,
  getMigrations,
  handleError
} from '../utils.js';

function load() {
  program
    .command('up')
    .description('run migrations')
    .argument('[migration]', 'migration to go up to')
    .action((target) => {
      up(target, config, pool);
    });
}

async function up(target, config, db) {
  try {
    const settings = config.config;
    const migrationTable = getMigrationTable(settings);
    await ensureMigrationTable(db, settings);
    const all = getMigrations(getFullPath(settings.paths.up, config.filepath));
    const applied = await getApplied(db, migrationTable);
    const migrations = difference(
      all,
      applied.rows.map((i) => i.filename)
    );
    if (!migrations.length) {
      logger.info('All applied. You already have the latest database.');
      return process.exit(1);
    }
    const statement = getQuery(migrations, settings);
    await apply(db, statement);
    await db.end();
    logger.success('All applied');
  } catch (e) {
    await db.end();
    handleError(e);
  }
}

function getQuery(migrations, settings) {
  const migrationTable = getMigrationTable(settings);
  let sql = '';
  logger.log(`List of migrations being applied:`);
  for (const migration of migrations) {
    logger.log(`${migration}`);
    const filePath = getFullPath(settings.paths.up, config.filepath);
    const content =
      fs.readFileSync(path.join(filePath, migration), 'utf8') || '';
    sql += content;
    sql += `INSERT INTO ${migrationTable}(filename, checksum, deployed_by) VALUES ('${migration}', '${checksum(
      content
    )}', '${settings.creator}');`;
  }
  return sql;
}

export { up, load };
