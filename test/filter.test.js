const { filter } = require("..");

describe("filter method", () => {

  const object = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
  };
  const keys = Object.keys(object);

  test("filter enumerates properly", () => {

    const callback = jest.fn();

    filter(object, callback);

    expect(callback).toHaveBeenCalledTimes(keys.length);

    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, object[key], key);
    });

  });

  test("filter passes this argument to callback", () => {

    const thisArg = [];

    const callback = jest.fn(function () {
      expect(this).toBe(thisArg);
    });

    filter.call(thisArg, object, callback);

    expect(keys.length).toBeGreaterThan(0);
    expect(callback).toHaveBeenCalledTimes(keys.length);

    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, object[key], key);
    });

  });

  test("filter passes extra arguments to callback", () => {

    const callback = jest.fn();
    const extra1 = {};
    const extra2 = [];

    filter(object, callback, extra1, extra2);

    expect(callback).toHaveBeenCalledTimes(keys.length);

    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, object[key], key, extra1, extra2);
    });

  });

  test("filter should return a new object", () => {

    const result = filter(object, () => true);

    expect(typeof result).toBe("object");
    expect(result).toMatchObject(object);
    expect(result).not.toBe(object);

  });

  test("filter should return a filtered object", () => {

    const result = filter(object, (val) => {
      return val >= 2 && val <= 3;
    });

    expect(result).toMatchObject({
      b: 2,
      c: 3,
    });

  });

});
