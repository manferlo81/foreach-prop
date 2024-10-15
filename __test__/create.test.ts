import { create } from '../src';
import type { UnknownFunction } from './tools/types';
import { invalidArrays } from './tools/values';

describe('create method', () => {

  test('should throw on insufficient arguments', () => {
    const __create = create as UnknownFunction;
    const exec = () => __create();
    expect(exec).toThrow(TypeError);
  });

  test('should throw on incorrect keys argument', () => {
    invalidArrays.forEach((invalid) => {
      const exec = () => create(invalid as never);
      expect(exec).toThrow(TypeError);
    });
  });

  test('should return an object with undefined value', () => {
    const result = create(['a', 'b', 'c']);
    expect(result).toBeInstanceOf(Object);
    expect(result).toEqual({ a: undefined, b: undefined, c: undefined });
  });

  test('should return an object with given value', () => {
    const values = [true, false, null, undefined, 1, 'string'];
    values.forEach((value) => {
      const result = create(['a', 'b', 'c'], value);
      expect(result).toBeInstanceOf(Object);
      expect(result).toEqual({ a: value, b: value, c: value });
    });
  });

});
