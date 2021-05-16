import keyOf from './key-of';
import { Anything, ImmutableObject, Key } from './types';

function includes(object: ImmutableObject<Key, Anything>, value: Anything): boolean {
  return keyOf(object, value) !== null;
}

export default includes;
