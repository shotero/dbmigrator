import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import signale from 'signale';

const logger = new signale.Signale();

function getApplied(pool, migrationTable) {
  return pool.query(`SELECT filename FROM ${migrationTable} ORDER BY id DESC`);
}

function getMigrations(path) {
  return fs.readdirSync(path);
}

function getFullPath(filepath, root) {
  if (path.isAbsolute(filepath)) {
    return filepath;
  }
  return path.join(path.dirname(root), filepath);
}

async function ensureMigrationTable(pool, settings) {
  const schema =
    (settings.migration && settings.migration.schema) || 'migration';
  const table =
    (settings.migration && settings.migration.table) || 'migrations';
  await pool.query(`CREATE SCHEMA IF NOT EXISTS ${schema}`);
  return pool.query(
    `CREATE TABLE IF NOT EXISTS ${schema}.${table} (id SERIAL PRIMARY KEY, filename TEXT NOT NULL UNIQUE, checksum TEXT NOT NULL, deployed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), deployed_by TEXT)`
  );
}

function difference(from, to) {
  return from.filter((migration) => !to.includes(migration));
}

function cut(list, target) {
  return [...list].slice(0, list.indexOf(target));
}

function getMigrationTable(settings) {
  const schema =
    (settings.migration && settings.migration.schema) || 'migration';
  const table =
    (settings.migration && settings.migration.table) || 'migrations';
  return `${schema}.${table}`;
}

function handleError(e) {
  logger.error(e);
}

function checksum(str) {
  return crypto.createHash('md5').update(str, 'utf8').digest('hex');
}

async function apply(db, statement) {
  try {
    await db.query('BEGIN');
    await db.query(statement);
    await db.query('COMMIT');
  } catch (e) {
    await db.query('ROLLBACK');
    throw e;
  }
}

export {
  apply,
  checksum,
  cut,
  difference,
  ensureMigrationTable,
  handleError,
  getFullPath,
  getMigrationTable,
  getMigrations,
  getApplied
};
