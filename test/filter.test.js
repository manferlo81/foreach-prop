const { filter } = require("..");
const { object, keys, Obj, own, proto } = require("./constants");

describe("filter method", () => {

  test("should iterate properly", () => {

    const callback = jest.fn();

    filter(object, callback);

    expect(callback).toHaveBeenCalledTimes(keys.length);

    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, object[key], key);
    });

  });

  test("should skip prototype properties", () => {

    const instance = new Obj();
    const callback = jest.fn();

    filter(instance, callback);

    expect(callback).toHaveBeenCalledTimes(own.length);
    expect(callback).not.toHaveBeenCalledWith(
      expect.any(Function),
      proto
    );
    own.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, instance[key], key);
    });

  });

  test("should pass this argument to callback", () => {

    const thisArg = [];

    filter.call(thisArg, object, function () {
      expect(this).toBe(thisArg);
    });

  });

  test("should pass extra arguments to callback", () => {

    const callback = jest.fn();
    const extra1 = {};
    const extra2 = [];

    filter(object, callback, extra1, extra2);

    expect(callback).toHaveBeenCalledTimes(keys.length);
    expect(callback).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(String),
      extra1,
      extra2,
    );

  });

  test("should return a new object", () => {

    const result = filter(object, () => true);

    expect(typeof result).toBe("object");
    expect(result).toEqual(object);
    expect(result).not.toBe(object);

  });

  test("should return a filtered object", () => {

    const result = filter(object, (val) => {
      return val >= 2 && val <= 3;
    });

    expect(result).toEqual({
      b: 2,
      c: 3,
      d: 2,
    });

  });

});
