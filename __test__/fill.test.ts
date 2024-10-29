import { fill } from '../src';
import { createObjectWithProto } from './tools/create-object';
import { UnknownFunction } from './tools/types';
import { invalidObjects } from './tools/values';

describe('fill method', () => {

  test('should throw on insufficient arguments', () => {
    const __fill = fill as UnknownFunction;
    const cases = [
      () => __fill(),
      () => __fill({}),
    ];
    cases.forEach((exec) => {
      expect(exec).toThrow(TypeError);
    });
  });

  test('should throw on non object', () => {
    invalidObjects.forEach((object) => {
      const exec = () => fill(object as never, 0);
      expect(exec).toThrow(TypeError);
    });
  });

  test('should skip prototype properties', () => {

    const ownProps = ['ownPropA', 'ownPropB'] as const;
    const protoProps = ['protoPropA', 'protoPropB'] as const;
    const instance = createObjectWithProto(protoProps, ownProps);

    const result = fill(instance, 0);
    const expected = Object.fromEntries(ownProps.map((propName) => [propName, 0]));

    protoProps.forEach((protoKeyAndValue) => {
      expect(instance).toHaveProperty(protoKeyAndValue);
      expect(instance[protoKeyAndValue]).toBe(protoKeyAndValue);
    });
    expect(result).toEqual(expected);

  });

  test('should fill object with given value', () => {

    const object = { a: 0, b: 0, c: 0, d: 0 };

    const result = fill(object, true);
    const expected = Object.fromEntries(Object.entries(object).map(([key]) => [key, true]));

    expect(result).toEqual(expected);

  });

  test('should return a new object', () => {

    const object = { a: 0, b: 0, c: 0, d: 0 };

    const result = fill(object, 0);

    expect(result).toEqual(object);
    expect(result).not.toBe(object);

  });

});
