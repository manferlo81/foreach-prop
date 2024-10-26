import type { EntryPredicate } from '../types/callback-types';
import type { EntryKeyType, EntryValueType, UnknownEntry } from '../types/entry-types';

export function findEntryKey<E extends UnknownEntry>(entries: E[], predicate: EntryPredicate<E>): EntryKeyType<E> | null {
  const entry = entries.find(predicate);
  return entry ? entry[0] : null;
}

export function findEntryValue<E extends UnknownEntry>(entries: E[], predicate: EntryPredicate<E>): EntryValueType<E> | undefined {
  const entry = entries.find(predicate);
  if (!entry) return;
  return entry[1];
}
