import { createObject } from '../tools/create-object';
import { ensureIsObject, ensureMinLength } from '../tools/ensure';
import type { EntryKeyTypeFromObject, FilledObject } from '../types/entry-types';

export function fill<O extends object, V>(object: O, value: V): FilledObject<O, V> {

  // throw if not enough arguments
  ensureMinLength(arguments.length, 2);

  // throw if not an object
  ensureIsObject(object);

  // get keys from input object
  const keys = Object.keys(object) as Array<EntryKeyTypeFromObject<O>>;

  // return new object with input object keys filled with provided value
  return createObject(keys, value);

}
