import { create } from '../src';
import { invalidArrays } from './tools/values';

describe('create method', () => {

  test('should throw on insufficient arguments', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => create()).toThrow(TypeError);
  });

  test('should throw on incorrect keys argument', () => {
    invalidArrays.forEach((invalid) => {
      expect(() => create(invalid as never)).toThrow(TypeError);
    });
  });

  test('should return an object', () => {
    const result = create(['a', 'b', 'c']);
    expect(typeof result).toBe('object');
    expect(result).toEqual({ a: undefined, b: undefined, c: undefined });
  });

  test('should return an object with given value', () => {
    const values = [true, false, null, undefined, 1, 'string'];
    values.forEach((value) => {
      const result = create(['a', 'b', 'c'], value);
      expect(typeof result).toBe('object');
      expect(result).toEqual({ a: value, b: value, c: value });
    });
  });

});
