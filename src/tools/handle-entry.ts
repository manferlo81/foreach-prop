import type { EntryKeyType, EntryValueType, ReduceEntryCallback, ResultEntryCallback, UnknownEntry } from '../types/entry-types';
import type { Extra } from '../types/private-types';
import type { ReduceCallbackFromEntry, ResultCallbackFromEntry } from '../types/types';
import { ensureIsFunction } from './ensure';

export function createResultEntryHandler<E extends UnknownEntry, R, X extends Extra, T>(
  thisArg: T,
  callback: ResultCallbackFromEntry<E, R, X, T>,
  extra: X,
): ResultEntryCallback<E, R> {
  ensureIsFunction(callback);
  return ([key, value]) => callback.call(thisArg, value, key, ...extra);
}

export function createReduceEntryHandler<E extends UnknownEntry, X extends Extra, T, R>(
  thisArg: T,
  callback: ReduceCallbackFromEntry<E, R, X, T>,
  extra: X,
): ReduceEntryCallback<E, R> {
  ensureIsFunction(callback);
  return (prev, [key, value]) => callback.call(thisArg, prev, value, key, ...extra);
}

export function createFindValueEntryHandler(value: unknown): ResultEntryCallback<UnknownEntry, boolean> {
  return ([, entryValue]) => entryValue === value;
}

export function findEntry<E extends UnknownEntry>(entries: E[], handler: ResultEntryCallback<E, unknown>): E | null {
  const entry = entries.find(handler);
  return entry ?? null;
}

export function findEntryKey<E extends UnknownEntry>(entries: E[], handler: ResultEntryCallback<E, unknown>): EntryKeyType<E> | null {
  const entry = findEntry(entries, handler);
  if (!entry) return null;
  const [key] = entry;
  return key;
}

export function findEntryValue<E extends UnknownEntry>(entries: E[], handler: ResultEntryCallback<E, unknown>): EntryValueType<E> | undefined {
  const entry = findEntry(entries, handler);
  if (!entry) return;
  const [, value] = entry;
  return value;
}
