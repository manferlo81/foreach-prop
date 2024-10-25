import type { EntryKeyType, EntryValueType, MapEntryCallback, UnknownEntry } from '../types/entry-types';

type EntryPredicate<E extends UnknownEntry> = MapEntryCallback<E, unknown>;

export function findEntry<E extends UnknownEntry>(entries: E[], predicate: EntryPredicate<E>): E | null {
  const entry = entries.find(predicate);
  return entry ?? null;
}

export function findEntryKey<E extends UnknownEntry>(entries: E[], predicate: EntryPredicate<E>): EntryKeyType<E> | null {
  const entry = findEntry(entries, predicate);
  if (!entry) return null;
  const [key] = entry;
  return key;
}

export function findEntryValue<E extends UnknownEntry>(entries: E[], predicate: EntryPredicate<E>): EntryValueType<E> | undefined {
  const entry = findEntry(entries, predicate);
  if (!entry) return;
  const [, value] = entry;
  return value;
}
