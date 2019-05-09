const { every } = require("..");
const { object, keys, Obj, own, proto } = require("./constants");

describe("every method", () => {

  test("should iterate properly", () => {

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

    expect(callback).toHaveBeenCalledTimes(own.length);
    expect(callback).not.toHaveBeenCalledWith(expect.any(Function), proto);
    own.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, instance[key], key);
    });

  });

  test("should pass this argument to callback", () => {

    const thisArg = [];

    every.call(thisArg, object, function () {
      expect(this).toBe(thisArg);
      return true;
    });

  });

  test("should pass extra arguments to callback", () => {

    const callback = jest.fn(() => true);
    const extra1 = {};
    const extra2 = [];

    every(object, callback, extra1, extra2);

    expect(callback).toHaveBeenCalledTimes(keys.length);
    expect(callback).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(String),
      extra1,
      extra2,
    );

  });

  test("should return true if all match", () => {

    const result = every(object, (val) => {
      return val > 0;
    });

    expect(result).toBe(true);

  });

  test("should return false if some match", () => {

    const result = every(object, (val) => {
      return val > 1;
    });

    expect(result).toBe(false);

  });

  test("should return false if no match", () => {

    const result = every(object, (val) => {
      return val > 10;
    });

    expect(result).toBe(false);

  });

});
