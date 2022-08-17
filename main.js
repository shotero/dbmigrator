#!/usr/bin/env node

import { Command } from 'commander';
import { loader } from './commands/index.js';

const program = new Command();
loader(program);

program.parse(process.argv);

export { program };
