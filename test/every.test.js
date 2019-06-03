const { every } = require("..");
const { Obj, ownProps, protoProps } = require("./vintage-class");

describe("every method", () => {

  test("should iterate properly", () => {

    const object = { a: 1, b: 2, c: 3, d: 4 };
    const keys = Object.keys(object);
    const callback = jest.fn(() => true);

    every(object, callback);

    expect(callback).toHaveBeenCalledTimes(keys.length);
    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, object[key], key);
    });

  });

  test("should skip prototype properties", () => {

    const instance = new Obj();
    const callback = jest.fn(() => true);

    every(instance, callback);

    expect(callback).toHaveBeenCalledTimes(ownProps.length);
    protoProps.forEach((key) => {
      expect(callback).not.toHaveBeenCalledWith(expect.anything(), key);
    });
    ownProps.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, instance[key], key);
    });

  });

  test("should pass this argument to callback", () => {

    const thisArg = [];
    const object = { a: 1, b: 2, c: 3, d: 4 };
    const count = Object.keys(object).length;
    const callback = jest.fn(function () {
      expect(this).toBe(thisArg);
      return true;
    });

    every.call(thisArg, object, callback);

    expect(callback).toHaveBeenCalledTimes(count);

  });

  test("should pass 1 extra argument to callback", () => {

    const object = { a: 1, b: 2, c: 3, d: 4 };
    const callback = jest.fn(() => false);
    const extra1 = {};

    every(object, callback, extra1);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(String),
      extra1,
    );

  });

  test("should pass multiple extra arguments to callback", () => {

    const object = { a: 1, b: 2, c: 3, d: 4 };
    const callback = jest.fn(() => false);
    const extra1 = {};
    const extra2 = [];

    every(object, callback, extra1, extra2);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(String),
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
