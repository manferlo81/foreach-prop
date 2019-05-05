const { reduce } = require("..");

describe("reduce method", () => {

  const object = {
    a: 1,
    b: 2,
    c: 3,
  };
  const keys = Object.keys(object);

  test("reduce enumerates properly", () => {

    const initial = {};
    const callback = jest.fn((result) => result);

    reduce(object, callback, initial);

    expect(callback).toHaveBeenCalledTimes(keys.length);

    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, initial, object[key], key);
    });

  });

  test("reduce passes this argument to callback", () => {

    const thisArg = [];
    const initial = {};
    const callback = jest.fn(function (result) {
      expect(this).toBe(thisArg);
      return result;
    });

    reduce.call(thisArg, object, callback, initial);

    expect(callback).toHaveBeenCalledTimes(keys.length);

    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, initial, object[key], key);
    });

  });

  test("reduce passes extra arguments to callback", () => {

    const initial = {};
    const callback = jest.fn((result) => result);
    const extra1 = {};
    const extra2 = [];

    reduce(object, callback, initial, extra1, extra2);

    expect(callback).toHaveBeenCalledTimes(keys.length);

    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, initial, object[key], key, extra1, extra2);
    });

  });

  test("reduce should return initial object", () => {

    const initial = {};
    const result = reduce(object, (result, val, key) => {
      result[key] = val * 2;
      return result;
    }, initial);

    expect(result).toBe(initial);

  });

  test("reduce should return initial object if empty object", () => {

    const initial = {};
    const result = reduce({}, (result, val, key) => {
      result[key] = val * 2;
      return result;
    }, initial);

    expect(result).toBe(initial);

  });

  test("reduce should return reduced result", () => {

    const result = reduce({ a: 100, b: -2 }, (result, val) => {
      return result + val;
    }, 1);

    expect(result).toBe(99);

  });

});
