import type { InputEntry, Key, KeyAsString, ObjectTypeFromEntry, ReadonlyEntry } from '../types/entry-types';
import { fromEntries } from './object-entries';

export function createObject<K extends string, V>(keys: readonly K[], value: V): ObjectTypeFromEntry<ReadonlyEntry<V, K>>;
export function createObject<K extends Key, V>(keys: readonly K[], value: V): ObjectTypeFromEntry<ReadonlyEntry<V, KeyAsString<K>>>;
export function createObject<K extends Key, V>(keys: readonly K[], value: V): ObjectTypeFromEntry<ReadonlyEntry<V, KeyAsString<K>>> {
  const entries = keys.map<InputEntry<V, K>>((key) => [key, value]);
  return fromEntries(entries);
}
