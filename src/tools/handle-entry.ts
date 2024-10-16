import type { Extra, InputEntry, ReduceEntryHandler, ResultEntryHandler } from '../types/private-types';
import type { MapCallback, ReduceCallback } from '../types/types';
import { validateFunction } from './validate';

export function createResultEntryHandler<V, K extends string, E extends Extra, TH, R>(
  thisArg: TH,
  callback: MapCallback<V, K, E, TH, R>,
  extra: E,
): ResultEntryHandler<V, R> {
  const valid = validateFunction(callback);
  return ([key, value]) => valid.call(thisArg, value, key as K, ...extra);
}

export function createReduceEntryHandler<V, K extends string, E extends Extra, TH, R>(
  thisArg: TH,
  callback: ReduceCallback<V, K, E, TH, R>,
  extra: E,
): ReduceEntryHandler<V, R> {
  const valid = validateFunction(callback);
  return (prev, [key, value]) => valid.call(thisArg, prev, value, key as K, ...extra);
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
