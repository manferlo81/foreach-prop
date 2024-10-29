import { keyOf } from '../src';
import { createObjectWithProto } from './tools/create-object';
import { UnknownFunction } from './tools/types';
import { invalidObjects } from './tools/values';

describe('keyOf method', () => {

  test('should throw on insufficient arguments', () => {
    const __keyOf = keyOf as UnknownFunction;
    const cases = [
      () => __keyOf(),
      () => __keyOf({}),
    ];
    cases.forEach((exec) => {
      expect(exec).toThrow(TypeError);
    });
  });

  test('should throw on non object', () => {
    invalidObjects.forEach((object) => {
      const exec = () => keyOf(object as never, 100);
      expect(exec).toThrow(TypeError);
    });
  });

  test('should return found key', () => {
    const object = { a: 1, b: 2, c: 3, d: 4 };
    const cases = [
      { value: 1, expectedKey: 'a' },
      { value: 2, expectedKey: 'b' },
      { value: 3, expectedKey: 'c' },
      { value: 4, expectedKey: 'd' },
    ];
    cases.forEach(({ value, expectedKey }) => {
      const key = keyOf(object, value);
      expect(key).toBe(expectedKey);
    });
  });

  test('should return first key that matches', () => {
    // IMPORTANT!
    // Because object key don't follow a specific order,
    // any key can be considered as the "first key that matches"

    const object = { a: 1, b: 1, c: 1, d: 1 };
    const key = keyOf(object, 1);

    expect(key).not.toBeNull();
    expect(Object.keys(object)).toContain(key);
  });

  test('should return null if not found', () => {
    const object = { a: 1, b: 2, c: 3, d: 2 };
    const key = keyOf(object, 'does-not-exist');
    expect(key).toBeNull();
  });

  test('should ignore prototype properties', () => {

    const ownProps = ['ownPropA', 'ownPropB'] as const;
    const protoProps = ['protoPropA', 'protoPropB'] as const;
    const object = createObjectWithProto(protoProps, ownProps);

    protoProps.forEach((protoKeyAndValue) => {
      const result = keyOf(object, protoKeyAndValue);

      expect(result).toBeNull();
      expect(object).toHaveProperty(protoKeyAndValue);
      expect(object[protoKeyAndValue]).toBe(protoKeyAndValue);
    });

  });

});
