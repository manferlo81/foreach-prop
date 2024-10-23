import { createObject } from '../tools/create-object';
import { ensureIsObject, ensureMinLength } from '../tools/ensure';
import type { EntryKeyTypeFromObject, MapEntryValueFromObject, ObjectTypeFromEntry } from '../types/entry-types';
import type { Anything } from '../types/helper-types';

export function fill<O extends object, V = Anything>(object: O, value: V): ObjectTypeFromEntry<MapEntryValueFromObject<O, V>> {

  // throw if not enough arguments
  ensureMinLength(arguments.length, 2);

  // throw if not an object
  ensureIsObject(object);

  // get keys from input object
  const keys = Object.keys(object) as Array<EntryKeyTypeFromObject<O>>;

  // return new object with input object keys filled with provided value
  return createObject(keys, value);

}
