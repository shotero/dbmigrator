import { cosmiconfigSync } from 'cosmiconfig';

const explorer = cosmiconfigSync('dbmigrator');
const config = explorer.search();

export default config;
