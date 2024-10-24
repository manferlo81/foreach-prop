import { ensureIsObject, ensureMinLength } from '../tools/ensure';
import { createResultEntryHandler } from '../tools/handle-entry';
import { getEntries } from '../tools/object-entries';
import type { Extra } from '../types/private-types';
import type { MapCallbackFromObject } from '../types/types';

export function forEach<O extends object, T = unknown>(
  this: T,
  object: O,
  callback: MapCallbackFromObject<O, void, [], T>,
): void;

export function forEach<O extends object, X extends Extra, T = unknown>(
  this: T,
  object: O,
  callback: MapCallbackFromObject<O, void, X, T>,
  ...extra: X
): void;

export function forEach<O extends object, T = unknown>(
  this: T,
  object: O,
  callback: MapCallbackFromObject<O, void, Extra, T>,
  ...extra: Extra
): void;

export function forEach<O extends object, X extends Extra, T = unknown>(
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
  const entryHandler = createResultEntryHandler(this, callback, extra);

  // iterate through object entries
  getEntries(object).forEach(entryHandler);

}
