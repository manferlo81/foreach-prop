import keyOf from './key-of';
import { Key } from './types';

function includes(object: {}, value: any): false;
function includes(object: Record<Key, any>, value: any): boolean;

function includes(object: Record<Key, any>, value: any): boolean {
  return keyOf(object, value) !== null;
}

export default includes;
