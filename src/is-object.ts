import { Anything, Key } from './types';

function isObject<K extends Key = Key, V = Anything>(param: unknown): param is Record<K, V> {
  return !!param && typeof param === 'object';
}

export default isObject;
