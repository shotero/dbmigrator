import { load as up } from './up.js';
import { load as down } from './down.js';
import { load as make } from './make.js';

function loader(program) {
  up();
  down();
  make();
}

export { loader };
