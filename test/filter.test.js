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

  test("filter passes extra args", () => {

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

    const result = filter(object, (val) => {
      return val >= 2 && val <= 3;
    });

    expect(typeof result).toBe("object");

    expect(result).toMatchObject({
      b: 2,
      c: 3,
    });

  });

});
