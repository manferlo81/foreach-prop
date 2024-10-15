import type { Entry, ImmutableObject, InputEntry, Key } from '../types/private-types';

type ObjectGetEntries = <V>(object: ImmutableObject<Key, V>) => Array<Entry<V>>;
type ObjectFromEntries = <V, K extends Key>(entries: ReadonlyArray<InputEntry<V, K>>) => Record<K, V>;

interface EnhancedObjectConstructor extends ObjectConstructor {
  entries: ObjectGetEntries;
  fromEntries: ObjectFromEntries;
}

export const { entries: getEntries, fromEntries } = Object as EnhancedObjectConstructor;
