import { map } from "../src";
import invalidObjects from "./helpers/invalid-objects";
import { Obj, ownProps, protoProps } from "./helpers/vintage-class";

describe("map method", () => {

  test("should throw on insufficient arguments", () => {

    // @ts-ignore
    expect(() => map()).toThrow(TypeError);

    // @ts-ignore
    expect(() => map({})).toThrow(TypeError);

  });

  test("should throw on non object", () => {

    invalidObjects.forEach((object) => {
      // @ts-ignore
      expect(() => map(object, () => null)).toThrow(TypeError);
    });

  });

  test("should iterate properly", () => {

    const object = { a: 1, b: 2, c: 3, d: 2 };
    const keys = Object.keys(object);
    const callback = jest.fn();

    map(object, callback);

    expect(callback).toHaveBeenCalledTimes(keys.length);

    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(
        index + 1,
        object[key as keyof typeof object],
        key,
      );
    });

  });

  test("should skip prototype properties", () => {

    // @ts-ignore
    const instance = new Obj();
    const callback = jest.fn();

    map(instance, callback);

    expect(callback).toHaveBeenCalledTimes(ownProps.length);
    protoProps.forEach((key) => {
      expect(callback).not.toHaveBeenCalledWith(
        expect.anything(),
        key,
      );
    });
    ownProps.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(
        index + 1,
        instance[key],
        key,
      );
    });

  });

  test("should pass this argument to callback", () => {

    const thisArg = {};
    const object = { a: 1 };
    const callback = jest.fn(function cb(this: any) {
      expect(this).toBe(thisArg);
    });

    map.call(thisArg, object, callback);

    expect(callback).toHaveBeenCalledTimes(1);

  });

  test("should pass multiple extra arguments to callback", () => {

    const value = 1;
    const key = "a";
    const object = { [key]: value };

    const callback = jest.fn(() => 0);

    const extra1 = {};
    const extra2: any[] = [];

    map(object, callback, extra1, extra2);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(
      value,
      key,
      extra1,
      extra2,
    );

  });

  test("should return a new object", () => {

    const object = { a: 1, b: 2, c: 3, d: 2 };

    const result = map(object, (val) => val);

    expect(typeof result).toBe("object");
    expect(result).toEqual(object);
    expect(result).not.toBe(object);

  });

  test("should return a mapped object", () => {

    const object = { a: 1, b: 2, c: 3, d: 2 };
    const keys = Object.keys(object);

    const result = map(object, (val) => (val * 2));

    expect(Object.keys(result)).toEqual(keys);

    keys.forEach((key) => {
      expect(
        result[key as keyof typeof object],
      ).toBe(
        object[key as keyof typeof object] * 2,
      );
    });

  });

});
