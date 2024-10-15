import isFunction from 'is-function';
import { errorNotCallback } from './errors';

export function validateFunction<T>(callback: T): Extract<T, CallableFunction> {
  if (!isFunction(callback)) throw errorNotCallback(callback);
  return callback as never;
}
