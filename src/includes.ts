import keyOf from './key-of';
import { Anything, Key } from './types';

function includes(object: Record<Key, Anything>, value: Anything): boolean {
  return keyOf(object, value) !== null;
}

export default includes;
