import fs from 'node:fs';
import path from 'node:path';
import { program } from '../main.js';
import { logger } from '../logger.js';
import { pool } from '../adapters.js';
import config from '../config.js';
import {
  apply,
  checksum,
  cut,
  ensureMigrationTable,
  getFullPath,
  getApplied,
  getMigrationTable,
  handleError
} from '../utils.js';

function load() {
  program
    .command('down')
    .description('rollback migrations')
    .argument('<migration>', 'migration to revert back to')
    .action((target) => {
      console.log('rollback');
      down(target, config, pool);
    });
}

async function down(target, config, db) {
  try {
    const settings = config.config;
    const migrationTable = getMigrationTable(settings);
    ensureMigrationTable(db, migrationTable);
    const migrations = await getApplied(db, migrationTable);
    const rollbackList = cut(
      migrations.rows.map((i) => i.filename),
      target
    );
    const statement = getQuery(rollbackList, settings);
    await apply(db, statement);
    await db.end();
    logger.success('Successfully reverted');
  } catch (e) {
    handleError(e);
  }
}

function getQuery(migrations, settings) {
  const migrationTable = getMigrationTable(settings);
  let sql = '';
  logger.log(`List of migrations being reversed:`);
  for (const migration of migrations) {
    logger.log(`${migration}`);
    const filePath = getFullPath(settings.paths.up, config.filepath);
    const content =
      fs.readFileSync(path.join(filePath, migration), 'utf8') || '';
    sql += content;
    sql += `DELETE FROM ${migrationTable} WHERE filename = '${migration}';`;
  }
  return sql;
}

export { down, load };
