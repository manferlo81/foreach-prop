const { some } = require("..");
const { Obj, ownProps, protoProps } = require("./vintage-class");

describe("some method", () => {

  test("should iterate properly", () => {

    const object = { a: 1, b: 2, c: 3, d: 2 };
    const keys = Object.keys(object);
    const callback = jest.fn();

    some(object, callback);

    expect(callback).toHaveBeenCalledTimes(keys.length);

    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, object[key], key);
    });

  });

  test("should skip prototype properties", () => {

    const instance = new Obj();
    const callback = jest.fn();

    some(instance, callback);

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

    const thisArg = [];
    const object = { a: 1, b: 2, c: 3, d: 2 };
    const count = Object.keys(object).length;
    const callback = jest.fn(function () {
      expect(this).toBe(thisArg);
    });

    some.call(thisArg, object, callback);

    expect(callback).toHaveBeenCalledTimes(count);

  });

  test("should pass extra arguments to callback", () => {

    const object = { a: 1, b: 2, c: 3, d: 2 };
    const keys = Object.keys(object);
    const callback = jest.fn();
    const extra1 = {};
    const extra2 = [];

    some(object, callback, extra1, extra2);

    expect(callback).toHaveBeenCalledTimes(keys.length);
    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(
        index + 1,
        object[key],
        key,
        extra1,
        extra2,
      );
    });

  });

  test("should return true if any match", () => {

    const object = { a: 1, b: 2, c: 3, d: 2 };

    const result = some(object, (val) => {
      return val === 2;
    });

    expect(result).toBe(true);

  });

  test("should return false if no match", () => {

    const object = { a: 1, b: 2, c: 3, d: 2 };

    const result = some(object, (val) => {
      return val > 10;
    });

    expect(result).toBe(false);

  });

});
