const { keyOf } = require("..");

describe("keyOf method", () => {

  const object = {
    a: 1,
    b: 2,
    c: 3,
    d: 2,
  };

  test("keyOf should return the first found key", () => {

    const keyOf1 = keyOf(object, 2);
    const keyOf2 = keyOf(object, 3);

    expect(keyOf1).toBe("b");
    expect(keyOf2).toBe("c");

  });

  test("keyOf should return null if not found", () => {

    const result = keyOf(object, "does-not-exist");

    expect(result).toBeNull();

  });

});
