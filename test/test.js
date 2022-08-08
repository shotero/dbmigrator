import test from 'ava';
import { BaseJumper } from '../index.js';

function binaryToHex() {
  return new BaseJumper(2, 16);
}

function hexToBinary() {
  return new BaseJumper(16, 2);
}

test('conversion', (t) => {
  const jumper = binaryToHex();
  t.is(jumper.convert(10), '2');
});

test('addition', (t) => {
  const jumper = hexToBinary();
  t.is(jumper.add(2, 1), '11');
});
