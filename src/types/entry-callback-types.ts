import type { Entry, EntryKeyType, EntryTypeFromObject, UnknownEntry } from './entry-types';

export type ResultEntryCallback<E extends UnknownEntry, R> = (entry: E) => R;
export type ReduceEntryCallback<E extends UnknownEntry, R> = (current: R, entry: E) => R;

export type MapEntryCallback<E extends UnknownEntry, V> = ResultEntryCallback<E, Entry<V, EntryKeyType<E>>>;
export type MapEntryCallbackFromObject<O extends object, V> = MapEntryCallback<EntryTypeFromObject<O>, V>;

export type EntryPredicate<E extends UnknownEntry> = ResultEntryCallback<E, unknown>;
