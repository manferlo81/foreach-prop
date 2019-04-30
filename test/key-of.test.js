const { keyOf } = require("..");

describe("keyOf method", () => {

  const object = {
    a: 1,
    b: 2,
    c: 3,
  };

  test("keyOf should return the found key", () => {

    const keyOf1 = keyOf(object, 1);
    const keyOf2 = keyOf(object, 2);

    expect(keyOf1).toBe("a");
    expect(keyOf2).toBe("b");

  });

  test("keyOf should return null if not found", () => {

    const result = keyOf(object, "does-not-exist");

    expect(result).toBeNull();

  });

});
