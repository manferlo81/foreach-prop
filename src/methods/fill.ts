import { ensureIsObject, ensureMinLength } from '../tools/ensure';
import { fillObject } from '../tools/fill-object';
import type { Anything, ImmutableObject, Key } from '../types/private-types';

export function fill<V, K extends Key, RV = Anything>(
  object: ImmutableObject<K, V>,
  value: RV,
): Record<K, RV> {

  // throw if not enough arguments
  ensureMinLength(arguments.length, 2);

  // throw if not an object
  ensureIsObject(object);

  const keys = Object.keys(object) as K[];
  return fillObject(keys, value);

}
