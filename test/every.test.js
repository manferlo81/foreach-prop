const { every } = require("..");

describe("every method", () => {

  const object = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
  };
  const keys = Object.keys(object);

  test("every enumerates properly", () => {

    const callback = jest.fn(() => true);

    every(object, callback);

    expect(callback).toHaveBeenCalledTimes(keys.length);

    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, object[key], key);
    });

  });

  test("every passes extra args", () => {

    const callback = jest.fn(() => true);
    const extra1 = {};
    const extra2 = [];

    every(object, callback, extra1, extra2);

    expect(callback).toHaveBeenCalledTimes(keys.length);

    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, object[key], key, extra1, extra2);
    });

  });

  test("every passes this arg", () => {

    const thisArg = [];

    const callback = jest.fn(function () {
      expect(this).toBe(thisArg);
      return true;
    });

    every.call(thisArg, object, callback);

    expect(keys.length).toBeGreaterThan(0);
    expect(callback).toHaveBeenCalledTimes(keys.length);

    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, object[key], key);
    });

  });

  test("every should return true if all match", () => {

    const result = every(object, (val) => {
      return val > 0;
    });

    expect(result).toBe(true);

  });

  test("every should return false if some match", () => {

    const result = every(object, (val) => {
      return val > 1;
    });

    expect(result).toBe(false);

  });

  test("every should return false if no match", () => {

    const result = every(object, (val) => {
      return val > 10;
    });

    expect(result).toBe(false);

  });

});
