import type { MapCallbackFromEntry } from '../types/callback-types';
import type { EntryPredicate } from '../types/entry-callback-types';
import type { EntryKeyType, EntryValueType, UnknownEntry } from '../types/entry-types';
import type { UnknownArray } from '../types/helper-types';
import { createMapEntryCallback } from './callbacks';

function findEntryKey<E extends UnknownEntry>(entries: E[], predicate: EntryPredicate<E>): EntryKeyType<E> | null {
  const entry = entries.find(predicate);
  return entry ? entry[0] : null;
}

export function findEntryValue<E extends UnknownEntry>(entries: E[], predicate: EntryPredicate<E>): EntryValueType<E> | undefined {
  const entry = entries.find(predicate);
  if (!entry) return;
  return entry[1];
}

export function findEntryKeyByValue<E extends UnknownEntry>(entries: E[], value: unknown): EntryKeyType<E> | null {
  return findEntryKey(
    entries,
    ([, entryValue]) => entryValue === value,
  );
}

export function findEntryKeyByPredicate<E extends UnknownEntry, X extends UnknownArray, T>(thisArg: T, entries: E[], predicate: MapCallbackFromEntry<E, unknown, X, T>, extra: X): EntryKeyType<E> | null {
  return findEntryKey(
    entries,
    createMapEntryCallback(
      thisArg,
      predicate,
      extra,
    ),
  );
}
