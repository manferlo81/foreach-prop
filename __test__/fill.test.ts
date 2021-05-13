import { fill } from '../src';
import { createObject, ownPropA, ownPropB } from './tools/create-object';
import { invalidObjects } from './tools/values';

describe('fill method', () => {

  test('should throw on insufficient arguments', () => {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => fill()).toThrow(TypeError);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => fill({})).toThrow(TypeError);

  });

  test('should throw on non object', () => {

    invalidObjects.forEach((object) => {
      expect(() => fill(object as never, 0)).toThrow(TypeError);
    });

  });

  test('should skip prototype properties', () => {

    const instance = createObject();

    const result = fill(instance, 0);

    expect(result).toEqual({
      [ownPropA]: 0,
      [ownPropB]: 0,
    });

  });

  test('should return a new object', () => {

    const object = { a: 0, b: 0, c: 0, d: 0 };

    const result = fill(object, 0);

    expect(typeof result).toBe('object');
    expect(result).toEqual(object);
    expect(result).not.toBe(object);

  });

});
