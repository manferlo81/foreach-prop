import { forEach } from '../src';
import { createObject, ownProps, protoProps } from './tools/create-object';
import { invalidObjects } from './tools/values';

describe('forEach method', () => {

  test('should throw on insufficient arguments', () => {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => forEach()).toThrow(TypeError);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => forEach({})).toThrow(TypeError);

  });

  test('should throw on non object', () => {
    invalidObjects.forEach((object) => {
      expect(() => forEach(object as never, () => null)).toThrow(TypeError);
    });
  });

  test('should iterate properly', () => {

    const object = { a: 1, b: 2, c: 3, d: 4 };
    const keys = Object.keys(object);
    const callback = jest.fn();

    forEach(object, callback);

    expect(callback).toHaveBeenCalledTimes(keys.length);

    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(
        index + 1,
        object[key as keyof typeof object],
        key,
      );
    });

  });

  test('should skip prototype properties', () => {

    const instance = createObject();
    const callback = jest.fn();

    forEach(instance, callback);

    expect(callback).toHaveBeenCalledTimes(ownProps.length);
    protoProps.forEach((key) => {
      expect(callback).not.toHaveBeenCalledWith(expect.anything(), key);
    });
    ownProps.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, instance[key], key);
    });

  });

  test('should pass this argument to callback', () => {

    const thisArg = {};
    const object = { a: 1 };
    const callback = jest.fn(function cb(this: any) {
      expect(this).toBe(thisArg);
    });

    forEach.call(thisArg, object, callback);

    expect(callback).toHaveBeenCalledTimes(1);

  });

  test('should pass multiple extra arguments to callback', () => {

    const value = 1;
    const key = 'a';
    const object = { [key]: value };

    const callback = jest.fn();

    const extra1 = {};
    const extra2: any[] = [];

    forEach(object, callback, extra1, extra2);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(
      value,
      key,
      extra1,
      extra2,
    );

  });

  test('should return void', () => {

    const object = { a: 1, b: 2, c: 3, d: 4 };
    const result = forEach(object, () => null);

    expect(result).toBeUndefined();

  });

});
