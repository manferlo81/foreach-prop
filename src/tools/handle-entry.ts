import type { InputEntry, ReduceEntryHandler, ResultEntryHandler } from '../types/entry-types';
import type { Extra } from '../types/private-types';
import type { MapCallback_next, ReduceCallback_next } from '../types/types';
import { ensureIsFunction } from './ensure';

export function createResultEntryHandler<V, K extends string, E extends Extra, TH, R>(
  thisArg: TH,
  callback: MapCallback_next<V, K, R, E, TH>,
  extra: E,
): ResultEntryHandler<V, R> {
  ensureIsFunction(callback);
  return ([key, value]) => callback.call(thisArg, value, key as K, ...extra);
}

export function createReduceEntryHandler<V, K extends string, E extends Extra, TH, R>(
  thisArg: TH,
  callback: ReduceCallback_next<V, K, R, E, TH>,
  extra: E,
): ReduceEntryHandler<V, R> {
  ensureIsFunction(callback);
  return (prev, [key, value]) => callback.call(thisArg, prev, value, key as K, ...extra);
}

export function createFindValueEntryHandler<V>(value: unknown): ResultEntryHandler<V, boolean> {
  return ([,entryValue]) => entryValue === value;
}

export function findEntry<V>(entries: Array<InputEntry<V>>, handler: ResultEntryHandler<V, unknown>): InputEntry<V> | null {
  const entry = entries.find(handler);
  return entry ?? null;
}

export function findEntryKey<V>(entries: Array<InputEntry<V>>, handler: ResultEntryHandler<V, unknown>): string | null {
  const entry = findEntry(entries, handler);
  if (!entry) return null;
  const [key] = entry;
  return key;
}

export function findEntryValue<V>(entries: Array<InputEntry<V>>, handler: ResultEntryHandler<V, unknown>): V | undefined {
  const entry = findEntry(entries, handler);
  if (!entry) return;
  const [,value] = entry;
  return value;
}
