const { find } = require("..");

describe("find method", () => {

  const object = {
    a: 1,
    b: 2,
    c: 3,
  };
  const keys = Object.keys(object);

  test("find enumerates properly", () => {

    const callback = jest.fn();

    find(object, callback);

    expect(callback).toHaveBeenCalledTimes(keys.length);

    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, object[key], key);
    });

  });

  test("find passes extra args", () => {

    const callback = jest.fn();
    const extra1 = {};
    const extra2 = [];

    find(object, callback, extra1, extra2);

    expect(callback).toHaveBeenCalledTimes(keys.length);

    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, object[key], key, extra1, extra2);
    });

  });

  test("find should return the found key", () => {

    const result = find(object, (val, key) => {
      return val === 2 && key === "b";
    });

    expect(result).toBe(2);

  });

  test("find should return null if not found", () => {

    const result = find(object, (val, key) => {
      return key === "does-not-exist";
    });

    expect(result).toBeUndefined();

  });

});
