import type { InputEntry, Key, ObjectTypeFromValueKey } from '../types/entry-types'
import { fromEntries } from './object-entries'

export function createObject<K extends Key, V>(keys: readonly K[], value: V): ObjectTypeFromValueKey<V, K> {
  const entries = keys.map<InputEntry<V, K>>((key) => [key, value])
  return fromEntries(entries)
}
