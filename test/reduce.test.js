const { reduce } = require("..");
const { object, keys, Obj, own, proto } = require("./constants");

describe("reduce method", () => {

  test("should iterate properly", () => {

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

    expect(callback).toHaveBeenCalledTimes(own.length);
    expect(callback).not.toHaveBeenCalledWith(expect.any(Function), proto);
    own.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, initial, instance[key], key);
    });

  });

  test("should pass this argument to callback", () => {

    const thisArg = [];
    const initial = {};

    reduce.call(thisArg, object, function (result) {
      expect(this).toBe(thisArg);
      return result;
    }, initial);

  });

  test("should pass extra arguments to callback", () => {

    const initial = {};
    const callback = jest.fn((result) => result);
    const extra1 = {};
    const extra2 = [];

    reduce(object, callback, initial, extra1, extra2);

    expect(callback).toHaveBeenCalledTimes(keys.length);
    expect(callback).toHaveBeenCalledWith(
      initial,
      expect.anything(),
      expect.any(String),
      extra1,
      extra2,
    );

  });

  test("should return initial object", () => {

    const initial = {};
    const result = reduce(object, (result, val, key) => {
      result[key] = val * 2;
      return result;
    }, initial);

    expect(result).toBe(initial);

  });

  test("should return reduced result", () => {

    const result = reduce({ a: 100, b: -2 }, (result, val) => {
      return result + val;
    }, 1);

    expect(result).toBe(99);

  });

});
