import test from 'ava';
import {
  apply,
  checksum,
  cut,
  difference,
  ensureMigrationTable,
  handleError,
  getMigrationTable,
  getMigrations,
  getApplied
} from '../utils.js';

test('checksum', (t) => {
  t.is(checksum('hello world'), '5eb63bbbe01eeed093cb22bb8f5acdc3');
});

test('cut', (t) => {
  t.deepEqual(cut([44, 55, 66, 77], 55), [44]);
});

test('difference', (t) => {
  t.deepEqual(difference([44, 55, 66, 77], [55]), [44, 66, 77]);
});
