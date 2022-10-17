import 'dotenv/config.js';
import { cosmiconfigSync } from 'cosmiconfig';
import process from 'node:process';
import pkg from 'pg-connection-string';
const { parse } = pkg;

const explorer = cosmiconfigSync('dbmigrator');
const config = explorer.search();

if (config && typeof config.config.db === 'string') {
  config.config.db = parse(config.config.db);
}

export default config;
