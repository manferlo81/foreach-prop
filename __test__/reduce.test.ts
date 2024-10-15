import { reduce } from '../src';
import { createObject, ownProps, protoProps } from './tools/create-object';
import { normalizeObject } from './tools/helpers';
import { UnknownFunction } from './tools/types';
import { invalidCallbacks, invalidObjects } from './tools/values';

describe('reduce method', () => {

  test('should throw on insufficient arguments', () => {
    const __reduce = reduce as UnknownFunction;
    const cases = [
      () => __reduce(),
      () => __reduce({}),
    ];
    cases.forEach((exec) => {
      expect(exec).toThrow(TypeError);
    });
  });

  test('should throw on non object', () => {
    invalidObjects.forEach((object) => {
      const exec = () => reduce(object as never, () => null);
      expect(exec).toThrow(TypeError);
    });
  });

  test('should throw on invalid callback function', () => {
    invalidCallbacks.forEach((callback) => {
      const exec = () => reduce({}, callback as never, 0);
      expect(exec).toThrow(TypeError);
    });
  });

  test('should skip prototype properties', () => {

    const instance = createObject();
    const callback = jest.fn<unknown, [unknown, unknown, string]>((result) => result);
    const initial = {};

    reduce(instance, callback, initial);

    expect(callback).toHaveBeenCalledTimes(ownProps.length);
    protoProps.forEach((key) => {
      expect(callback).not.toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        key,
      );
    });
    ownProps.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(
        index + 1,
        initial,
        instance[key],
        key,
      );
    });

  });

  test('should pass key and value to callback function', () => {

    const [object, entries] = normalizeObject({ a: 1, b: 2, c: 3, d: 2 });
    const callback = jest.fn<unknown, [unknown, number, string]>((result) => result);

    const initial = {};
    reduce(object, callback, initial);

    expect(callback).toHaveBeenCalledTimes(entries.length);
    entries.forEach(([key, value], index) => {
      expect(callback).toHaveBeenNthCalledWith(
        index + 1,
        initial,
        value,
        key,
      );
    });

  });

  test('should pass this argument to callback', () => {

    const [object, entries] = normalizeObject({ a: 1, b: 2, c: 3, d: 2 });

    const thisArg = {};
    const callback = jest.fn(function <T>(this: unknown, result: T): T {
      expect(this).toBe(thisArg);
      return result;
    });

    reduce.call(thisArg, object, callback, 0);

    expect(callback).toHaveBeenCalledTimes(entries.length);

  });

  test('should pass extra arguments to callback function', () => {

    const [object, entries] = normalizeObject({ a: 1, b: 2, c: 3, d: 2 });

    const callback = jest.fn<unknown, [unknown, unknown, string, unknown, unknown]>((result) => result);

    const extra1 = {};
    const extra2: never[] = [];

    reduce(object, callback, 0, extra1, extra2);

    expect(callback).toHaveBeenCalledTimes(entries.length);
    entries.forEach(([key, value], index) => {
      expect(callback).toHaveBeenNthCalledWith(
        index + 1,
        0,
        value,
        key,
        extra1,
        extra2,
      );
    });

  });

  test('should return callback result', () => {

    const object = { a: 1, b: 2, c: 3, d: 2 };
    const initial = {};

    const result = reduce(object, (acc, val, key) => {
      acc[key] = val * 2;
      return acc;
    }, initial as Record<PropertyKey, number>);

    expect(result).toBe(initial);

  });

  test('should return reduced result', () => {

    const object = { a: 100, b: -2, c: 5 };

    const result = reduce(object, (acc, val) => {
      return acc + val;
    }, 1 as number);
    const expectedResult = 104;

    expect(result).toBe(expectedResult);

  });

});
