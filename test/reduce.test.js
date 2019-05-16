const { reduce } = require("..");
const { Obj, ownProps, protoProps } = require("./vintage-class");

describe("reduce method", () => {

  test("should iterate properly", () => {

    const object = { a: 1, b: 2, c: 3, d: 2 };
    const keys = Object.keys(object);
    const initial = {};
    const callback = jest.fn((result) => result);

    reduce(object, callback, initial);

    expect(callback).toHaveBeenCalledTimes(keys.length);
    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, initial, object[key], key);
    });

  });

  test("should skip prototype properties", () => {

    const instance = new Obj();
    const callback = jest.fn((result) => result);
    const initial = {};

    reduce(instance, callback, initial);

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
        initial,
        instance[key],
        key,
      );
    });

  });

  test("should pass this argument to callback", () => {

    const thisArg = [];
    const object = { a: 1, b: 2, c: 3, d: 2 };
    const count = Object.keys(object).length;
    const callback = jest.fn(function (result) {
      expect(this).toBe(thisArg);
      return result;
    });
    const initial = {};

    reduce.call(thisArg, object, callback, initial);

    expect(callback).toHaveBeenCalledTimes(count);

  });

  test("should pass extra arguments to callback", () => {

    const object = { a: 1, b: 2, c: 3, d: 2 };
    const keys = Object.keys(object);
    const callback = jest.fn((result) => result);
    const initial = {};
    const extra1 = {};
    const extra2 = [];

    reduce(object, callback, initial, extra1, extra2);

    expect(callback).toHaveBeenCalledTimes(keys.length);
    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(
        index + 1,
        initial,
        object[key],
        key,
        extra1,
        extra2,
      );
    });

  });

  test("should return initial object", () => {

    const object = { a: 1, b: 2, c: 3, d: 2 };
    const initial = {};
    const result = reduce(object, (result, val, key) => {
      result[key] = val * 2;
      return result;
    }, initial);

    expect(result).toBe(initial);

  });

  test("should return reduced result", () => {

    const object = { a: 100, b: -2 };
    const expectedResult = 99;

    const result = reduce(object, (result, val) => {
      return result + val;
    }, 1);

    expect(result).toBe(expectedResult);

  });

});
