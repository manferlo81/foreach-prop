import { some } from '../src';
import { createObjectWithProto } from './tools/create-object';
import { normalizeObject } from './tools/helpers';
import type { UnknownFunction } from './tools/types';
import { invalidCallbacks, invalidObjects } from './tools/values';

describe('some method', () => {

  test('should throw on insufficient arguments', () => {
    const __some = some as UnknownFunction;
    const cases = [
      () => __some(),
      () => __some({}),
    ];
    cases.forEach((exec) => {
      expect(exec).toThrow(TypeError);
    });
  });

  test('should throw on non object', () => {
    invalidObjects.forEach((object) => {
      const exec = () => some(object as never, () => null);
      expect(exec).toThrow(TypeError);
    });
  });

  test('should throw on invalid predicate function', () => {
    invalidCallbacks.forEach((predicate) => {
      const exec = () => some({}, predicate as never);
      expect(exec).toThrow(TypeError);
    });
  });

  test('should skip prototype properties', () => {

    const protoProps = ['protoPropA', 'protoPropB'] as const;
    const ownProps = ['ownPropA', 'ownPropB'] as const;
    const instance = createObjectWithProto(protoProps, ownProps);

    const callback = jest.fn();

    some(instance, callback);

    expect(callback).toHaveBeenCalledTimes(ownProps.length);
    protoProps.forEach((protoKeyAndValue) => {
      expect(callback).not.toHaveBeenCalledWith(expect.anything(), protoKeyAndValue);
    });
    ownProps.forEach((ownKeyAndValue, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, ownKeyAndValue, ownKeyAndValue);
    });

  });

  test('should pass key and value to predicate function', () => {

    const [object, entries] = normalizeObject({
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    });

    const predicate = jest.fn();

    some(object, predicate);

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

    const [object, entries] = normalizeObject({
      a: 1,
      b: 2,
      c: 3,
      d: 2,
    });

    const thisArg = {};
    const predicate = jest.fn(function (this) {
      expect(this).toBe(thisArg);
      return false;
    });

    some.call(thisArg, object, predicate);

    expect(predicate).toHaveBeenCalledTimes(entries.length);

  });

  test('should pass extra arguments to predicate function', () => {

    const [object, entries] = normalizeObject({ a: 1 });

    const predicate = jest.fn();

    const extra1 = {};
    const extra2: never[] = [];

    some(object, predicate, extra1, extra2);

    expect(predicate).toHaveBeenCalledTimes(entries.length);
    expect(predicate).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(String),
      extra1,
      extra2,
    );

  });

  test('should return true if at least one match', () => {

    const object = { a: 1, b: 2, c: 3, d: 2 };

    const result = some(object, (val) => {
      return val === 3;
    });

    expect(result).toBe(true);

  });

  test('should return false if none match', () => {

    const object = { a: 1, b: 2, c: 3, d: 2 };

    const result = some(object, (val) => {
      return val > 10;
    });

    expect(result).toBe(false);

  });

  test('should exit as soon as one condition passes', () => {

    const predicate = jest.fn((val: number) => {
      return val > 0;
    });

    const result = some({ a: 1, b: 2, c: 3, d: 4 }, predicate);

    expect(result).toBe(true);
    expect(predicate).toHaveBeenCalledTimes(1);

  });

});
