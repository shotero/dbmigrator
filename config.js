import { cosmiconfigSync } from 'cosmiconfig';

const explorer = cosmiconfigSync('dbmigrate');
const config = explorer.search();

export default config.config;
