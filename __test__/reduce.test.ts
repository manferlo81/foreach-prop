import { reduce } from '../src';
import { createObject, ownProps, protoProps } from './tools/create-object';
import { invalidObjects } from './tools/values';

describe('reduce method', () => {

  test('should throw on insufficient arguments', () => {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    expect(() => reduce()).toThrow(TypeError);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    expect(() => reduce({})).toThrow(TypeError);

  });

  test('should throw on non object', () => {

    invalidObjects.forEach((object) => {
      expect(() => reduce(object as never, () => null)).toThrow(TypeError);
    });

  });

  test('should iterate properly', () => {

    const object = { a: 1, b: 2, c: 3, d: 2 };
    const keys = Object.keys(object);
    const initial = {};
    const callback = jest.fn<unknown, [unknown, number, string]>((result) => result);

    reduce(object, callback, initial);

    expect(callback).toHaveBeenCalledTimes(keys.length);
    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(
        index + 1,
        initial,
        object[key as keyof typeof object],
        key,
      );
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

  test('should pass this argument to callback', () => {

    const thisArg = {};
    const object = { a: 1, b: 2, c: 3, d: 2 };
    const count = Object.keys(object).length;
    const callback = jest.fn(function <T>(this: unknown, result: T): T {
      expect(this).toBe(thisArg);
      return result;
    });
    const initial = {};

    reduce.call(thisArg, object, callback, initial);

    expect(callback).toHaveBeenCalledTimes(count);

  });

  test('should pass extra arguments to callback', () => {

    const object = { a: 1, b: 2, c: 3, d: 2 };
    const keys = Object.keys(object);
    const callback = jest.fn<unknown, [unknown, unknown, string, unknown, unknown]>((result) => result);
    const initial = {};
    const extra1 = {};
    const extra2: never[] = [];

    reduce(object, callback, initial, extra1, extra2);

    expect(callback).toHaveBeenCalledTimes(keys.length);
    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(
        index + 1,
        initial,
        object[key as keyof typeof object],
        key,
        extra1,
        extra2,
      );
    });

  });

  test('should return initial object', () => {

    const object = { a: 1, b: 2, c: 3, d: 2 };
    const initial = {};
    const result = reduce(object, (acc, val, key) => {
      acc[key] = val * 2;
      return acc;
    }, initial as Record<keyof typeof object, number>);

    expect(result).toBe(initial);

  });

  test('should return reduced result', () => {

    const object = { a: 100, b: -2 };
    const expectedResult = 99;

    const result = reduce(object, (acc, val) => {
      return acc + val;
    }, 1 as number);

    expect(result).toBe(expectedResult);

  });

});
