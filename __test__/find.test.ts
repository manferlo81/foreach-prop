import { find } from '../src';
import { createObjectWithProto } from './tools/create-object';
import { normalizeObject } from './tools/helpers';
import { UnknownFunction } from './tools/types';
import { invalidCallbacks, invalidObjects } from './tools/values';

describe('find method', () => {

  test('should throw on insufficient arguments', () => {
    const __find = find as UnknownFunction;
    const cases = [
      () => __find(),
      () => __find({}),
    ];
    cases.forEach((exec) => {
      expect(exec).toThrow(TypeError);
    });
  });

  test('should throw on non object', () => {
    invalidObjects.forEach((object) => {
      const exec = () => {
        find(object as never, () => null);
      };
      expect(exec).toThrow(TypeError);
    });
  });

  test('should throw on invalid predicate function', () => {
    invalidCallbacks.forEach((predicate) => {
      const exec = () => {
        find({}, predicate as never);
      };
      expect(exec).toThrow(TypeError);
    });
  });

  test('should skip prototype properties', () => {

    const ownProps = ['ownPropA', 'ownPropB'] as const;
    const protoProps = ['protoPropA', 'protoPropB'] as const;
    const instance = createObjectWithProto(protoProps, ownProps);

    const callback = jest.fn();

    find(instance, callback);

    expect(callback).toHaveBeenCalledTimes(ownProps.length);
    ownProps.forEach((ownKeyAndValue, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, ownKeyAndValue, ownKeyAndValue);
    });
    protoProps.forEach((protoKeyAndValue) => {
      expect(callback).not.toHaveBeenCalledWith(expect.anything(), protoKeyAndValue);
    });

  });

  test('should pass key and value to predicate function', () => {

    const [object, entries] = normalizeObject({ a: 1, b: 2, c: 3, d: 2 });
    const predicate = jest.fn();

    find(object, predicate);

    expect(predicate).toHaveBeenCalledTimes(entries.length);

    entries.forEach(([key, value], index) => {
      expect(predicate).toHaveBeenNthCalledWith(
        index + 1,
        value,
        key,
      );
    });

  });

  test('should pass this argument to callback', () => {

    const [object, entries] = normalizeObject({ a: 1, b: 2 });

    const thisArg = {};
    const callback = jest.fn(function (this: unknown) {
      expect(this).toBe(thisArg);
      return false;
    });

    find.call(thisArg, object, callback);

    expect(callback).toHaveBeenCalledTimes(entries.length);

  });

  test('should pass extra arguments to predicate function', () => {

    const [object, entries] = normalizeObject({ a: 1, b: 2 });

    const callback = jest.fn(() => false);

    const extra1 = {};
    const extra2: never[] = [];

    find(object, callback, extra1, extra2);

    expect(callback).toHaveBeenCalledTimes(entries.length);
    expect(callback).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(String),
      extra1,
      extra2,
    );

  });

  test('should return the found value', () => {

    const object = { a: 1, b: 2, c: 3, d: 4 };
    const expectedResult = object.b;

    const result = find(object, (val) => {
      return val === expectedResult;
    });

    expect(result).toBe(expectedResult);

  });

  test('should exit as soon as one condition is met', () => {

    const object = { a: 1, b: 1, c: 1, d: 1 };

    const predicate = jest.fn((val: number) => {
      return val === 1;
    });

    const result = find(object, predicate);

    expect(predicate).toHaveBeenCalledTimes(1);
    expect(result).not.toBeUndefined();

  });

  test('should return undefined if not found', () => {

    const object = { a: 1, b: 2, c: 3, d: 2, e: '' };

    const result = find(object, (val) => {
      return val === 'does-not-exist';
    });

    expect(result).toBeUndefined();

  });

});
