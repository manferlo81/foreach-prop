import keyOf from './key-of';
import { Key } from './types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function includes(object: Record<Key, any>, value: any): boolean {
  return keyOf(object, value) !== null;
}

export default includes;
