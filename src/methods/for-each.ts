import { createMapEntryCallback } from '../tools/callbacks';
import { ensureIsObject, ensureMinLength } from '../tools/ensure';
import { getEntries } from '../tools/object-entries';
import type { UnknownArray } from '../types/helper-types';
import type { MapCallbackFromObject } from '../types/types';

export function forEach<O extends object, X extends UnknownArray, T = unknown>(
  this: T,
  object: O,
  callback: MapCallbackFromObject<O, void, X, T>,
  ...extra: X
): void;

export function forEach<O extends object, T = unknown>(
  this: T,
  object: O,
  callback: MapCallbackFromObject<O, void, UnknownArray, T>,
  ...extra: UnknownArray
): void;

export function forEach<O extends object, X extends UnknownArray, T = unknown>(
  this: T,
  object: O,
  callback: MapCallbackFromObject<O, void, X, T>,
  ...extra: X
): void {

  // throw if not enough arguments
  ensureMinLength(arguments.length, 2);

  // throw if not an object
  ensureIsObject(object);

  // create entry handler
  const entryHandler = createMapEntryCallback(this, callback, extra);

  // iterate through object entries
  getEntries(object).forEach(entryHandler);

}
