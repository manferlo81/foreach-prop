import type { EntryFromInputEntry, EntryTypeFromArray, EntryTypeFromObject, ObjectTypeFromEntry, UnknownInputEntry, UnknownReadonlyEntry } from '../types/entry-types';
import type { UnknownArray } from '../types/helper-types';

interface GetObjectEntriesFunction {
  <A extends UnknownArray>(object: A): Array<EntryTypeFromArray<A>>;
  <O extends object>(object: O): Array<EntryTypeFromObject<O>>;
}

interface ObjectFromEntriesFunction {
  <E extends UnknownReadonlyEntry>(entries: E[]): ObjectTypeFromEntry<E>;
  <E extends UnknownInputEntry | UnknownReadonlyEntry>(entries: E[]): ObjectTypeFromEntry<EntryFromInputEntry<E>>;
}

interface EnhancedObjectConstructor extends ObjectConstructor {
  entries: GetObjectEntriesFunction;
  fromEntries: ObjectFromEntriesFunction;
}

export const { entries: getEntries, fromEntries } = Object as EnhancedObjectConstructor;
