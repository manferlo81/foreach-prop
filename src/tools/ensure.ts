import isFunction from 'is-function';
import { errorNotCallback, errorNotEnoughArgs, errorNotObject } from './errors';
import { isObject } from './is-object';

export function ensureMinLength(length: number, minLength: number): void {
  if (length < minLength) throw errorNotEnoughArgs(length, minLength);
}

export function ensureIsObject(object: unknown): asserts object is object {
  if (!isObject(object)) throw errorNotObject(object);
}

export function ensureIsFunction(callback: unknown): asserts callback is CallableFunction {
  if (!isFunction(callback)) throw errorNotCallback(callback);
}
