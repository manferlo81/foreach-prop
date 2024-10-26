import type { EntryTypeFromObject, UnknownEntry } from './entry-types';

export type MapEntryCallback<E extends UnknownEntry, R> = (entry: E) => R;
export type MapEntryCallbackFromObject<O extends object, R> = MapEntryCallback<EntryTypeFromObject<O>, R>;

export type EntryPredicate<E extends UnknownEntry> = MapEntryCallback<E, unknown>;

export type ReduceEntryCallback<E extends UnknownEntry, R> = (prev: R, entry: E) => R;
export type ReduceEntryCallbackFromObject<O extends object, R> = ReduceEntryCallback<EntryTypeFromObject<O>, R>;
