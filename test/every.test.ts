import { every } from "../src";
import invalidObjects from "./helpers/invalid-objects";
import { Obj, ownProps, protoProps } from "./helpers/vintage-class";

// const { every } = require("..");
// const invalidObjects = require("./helpers/invalid-objects");
// const { Obj, ownProps, protoProps } = require("./helpers/vintage-class");

describe("every method", () => {

  test("should throw on insufficient arguments", () => {

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(() => every()).toThrow(TypeError);

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(() => every({})).toThrow(TypeError);

  });

  test("should throw on non object", () => {

    invalidObjects.forEach((object) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(() => every(object, () => true)).toThrow(TypeError);
    });

  });

  test("should iterate properly", () => {

    const object = { a: 1, b: 2, c: 3, d: 4 };
    const keys = Object.keys(object);
    const callback = jest.fn(() => true);

    every(object, callback);

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

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const instance = new Obj();
    const callback = jest.fn(() => true);

    every(instance, callback);

    expect(callback).toHaveBeenCalledTimes(ownProps.length);
    protoProps.forEach((key) => {
      expect(callback).not.toHaveBeenCalledWith(expect.anything(), key);
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

    every.call(thisArg, object, callback);

    expect(callback).toHaveBeenCalledTimes(1);

  });

  test("should pass multiple extra arguments to callback", () => {

    const value = 1;
    const key = "a";
    const object = { [key]: value };

    const callback = jest.fn();

    const extra1 = {};
    const extra2: any[] = [];

    every(object, callback, extra1, extra2);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(
      value,
      key,
      extra1,
      extra2,
    );

  });

  test("should return true if all match", () => {

    const result = every({ a: 1, b: 2, c: 3, d: 4 }, (val) => {
      return val > 0;
    });

    expect(result).toBe(true);

  });

  test("should return false if some match", () => {

    const result = every({ a: 1, b: 2, c: 3, d: 4 }, (val) => {
      return val > 1;
    });

    expect(result).toBe(false);

  });

  test("should return false if no match", () => {

    const result = every({ a: 1, b: 2, c: 3, d: 4 }, (val) => {
      return val > 10;
    });

    expect(result).toBe(false);

  });

});
