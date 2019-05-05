const { some } = require("..");

describe("some method", () => {

  const object = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
  };
  const keys = Object.keys(object);

  test("some enumerates properly", () => {

    const callback = jest.fn();

    some(object, callback);

    expect(callback).toHaveBeenCalledTimes(keys.length);

    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, object[key], key);
    });

  });

  test("some passes this argument to callback", () => {

    const thisArg = [];

    const callback = jest.fn(function () {
      expect(this).toBe(thisArg);
    });

    some.call(thisArg, object, callback);

    expect(keys.length).toBeGreaterThan(0);
    expect(callback).toHaveBeenCalledTimes(keys.length);

    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, object[key], key);
    });

  });

  test("some passes extra arguments to callback", () => {

    const callback = jest.fn();
    const extra1 = {};
    const extra2 = [];

    some(object, callback, extra1, extra2);

    expect(callback).toHaveBeenCalledTimes(keys.length);

    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, object[key], key, extra1, extra2);
    });

  });

  test("some should return true if any match", () => {

    const result = some(object, (val) => {
      return val == 2;
    });

    expect(result).toBe(true);

  });

  test("some should return false if no match", () => {

    const result = some(object, (val) => {
      return val > 10;
    });

    expect(result).toBe(false);

  });

});
