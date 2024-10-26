import type { EntryTypeFromArray, EntryTypeFromObject, ObjectTypeFromEntry, UnknownInputEntry } from '../types/entry-types';
import type { UnknownArray } from '../types/helper-types';

interface GetObjectEntriesFunction {
  <A extends UnknownArray>(object: A): Array<EntryTypeFromArray<A>>;
  <O extends object>(object: O): Array<EntryTypeFromObject<O>>;
}

type ObjectFromEntriesFunction = <E extends UnknownInputEntry>(entries: E[]) => ObjectTypeFromEntry<E>;

interface EnhancedObjectConstructor extends ObjectConstructor {
  entries: GetObjectEntriesFunction;
  fromEntries: ObjectFromEntriesFunction;
}

export const { entries: getEntries, fromEntries } = Object as EnhancedObjectConstructor;
