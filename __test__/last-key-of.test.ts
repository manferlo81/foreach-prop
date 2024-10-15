import { lastKeyOf } from '../src';
import { invalidObjects } from './tools/values';
import { protoPropA, createObject } from './tools/create-object';
import { UnknownFunction } from './tools/types';

describe('lastKeyOf method', () => {

  test('should throw on insufficient arguments', () => {
    const __lastKeyOf = lastKeyOf as UnknownFunction;
    const cases = [
      () => __lastKeyOf(),
      () => __lastKeyOf({}),
    ];
    cases.forEach((exec) => {
      expect(exec).toThrow(TypeError);
    });
  });

  test('should throw on non object', () => {
    invalidObjects.forEach((object) => {
      const exec = () => lastKeyOf(object as never, 0);
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
      const key = lastKeyOf(object, value);
      expect(key).toBe(expectedKey);
    });
  });

  test('should return last key that matches', () => {
    // IMPORTANT!
    // Because object key don't follow a specific order,
    // any key can be considered as the "last key that matches"

    const object = { a: 1, b: 1, c: 1, d: 1 };
    const key = lastKeyOf(object, 1);

    expect(key).not.toBeNull();
    expect(Object.keys(object)).toContain(key);
  });

  test('should return null if not found', () => {
    const object = { a: 1, b: 2, c: 3, d: 4 };
    const result = lastKeyOf(object, 'does-not-exist');
    expect(result).toBeNull();
  });

  test('should ignore prototype properties', () => {
    const object = createObject();
    const protoPropValue = object[protoPropA];

    const result = lastKeyOf(object, protoPropValue);

    expect(result).toBeNull();
    expect(protoPropValue).toBeDefined();
    expect(object).toHaveProperty(protoPropA);
  });

});
