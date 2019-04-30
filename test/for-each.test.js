const { forEach } = require("..");

describe("forEach", () => {

  const object = {
    a: 1,
    b: 2,
    c: 3,
  };
  const keys = Object.keys(object);

  test("forEach enumerates properly", () => {

    const callback = jest.fn();

    forEach(object, callback);

    expect(callback).toHaveBeenCalledTimes(keys.length);

    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, object[key], key);
    });

  });

  test("forEach should return void", () => {

    const result = forEach(object, (val, key) => {
      if (val === 2 && key === "b") {
        return true;
      }
    });

    expect(result).toBeUndefined();

  });

});
