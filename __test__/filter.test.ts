import { filter } from '../src';
import { createObjectWithProto } from './tools/create-object';
import { normalizeObject } from './tools/helpers';
import { UnknownFunction } from './tools/types';
import { invalidCallbacks, invalidObjects } from './tools/values';

describe('filter method', () => {

  test('should throw on insufficient arguments', () => {
    const __filter = filter as UnknownFunction;
    const cases = [
      () => __filter(),
      () => __filter({}),
    ];
    cases.forEach((exec) => {
      expect(exec).toThrow(TypeError);
    });
  });

  test('should throw on non object', () => {
    invalidObjects.forEach((object) => {
      const exec = () => filter(object as never, () => null);
      expect(exec).toThrow(TypeError);
    });
  });

  test('should throw on invalid predicate function', () => {
    invalidCallbacks.forEach((predicate) => {
      const exec = () => filter({}, predicate as never);
      expect(exec).toThrow(TypeError);
    });
  });

  test('should skip prototype properties', () => {

    const ownProps = ['ownPropA', 'ownPropB'] as const;
    const protoProps = ['protoPropA', 'protoPropB'] as const;
    const instance = createObjectWithProto(protoProps, ownProps);

    const callback = jest.fn();

    filter(instance, callback);

    expect(callback).toHaveBeenCalledTimes(ownProps.length);
    ownProps.forEach((ownKeyAndValue, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, ownKeyAndValue, ownKeyAndValue);
    });
    protoProps.forEach((protoKeyAndValue) => {
      expect(callback).not.toHaveBeenCalledWith(expect.anything(), protoKeyAndValue);
    });

  });

  test('should pass key and value to predicate function', () => {

    const { normalized, entries } = normalizeObject({ a: 1, b: 2, c: 3, d: 4 });
    const predicate = jest.fn();

    filter(normalized, predicate);

    expect(predicate).toHaveBeenCalledTimes(entries.length);

    entries.forEach(([key, value], index) => {
      expect(predicate).toHaveBeenNthCalledWith(
        index + 1,
        value,
        key,
      );
    });

  });

  test('should pass this argument to predicate function', () => {

    const { normalized, entries } = normalizeObject({ a: 1 });

    const thisArg = {};
    const predicate = jest.fn(function (this: unknown) {
      expect(this).toBe(thisArg);
    });

    filter.call(thisArg, normalized, predicate);

    expect(predicate).toHaveBeenCalledTimes(entries.length);

  });

  test('should pass extra arguments to predicate function', () => {

    const { normalized, entries } = normalizeObject({ a: 1 });

    const predicate = jest.fn();

    const extra1 = {};
    const extra2: never[] = [];

    filter(normalized, predicate, extra1, extra2);

    expect(predicate).toHaveBeenCalledTimes(entries.length);
    expect(predicate).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(String),
      extra1,
      extra2,
    );

  });

  test('should return a filtered object', () => {

    const { normalized, entries } = normalizeObject({ a: 1, b: 2, c: 3, d: 4 });

    const predicate = jest.fn((val) => {
      return val >= 2 && val <= 3;
    });
    const expected = { b: 2, c: 3 };

    const result = filter(normalized, predicate);

    expect(predicate).toHaveBeenCalledTimes(entries.length);
    expect(result).toEqual(expected);

  });

  test('should return a new object', () => {

    const object = { a: 1, b: 2, c: 3, d: 4 };

    const result = filter(object, () => true);

    expect(result).toEqual(object);
    expect(result).not.toBe(object);

  });

});
