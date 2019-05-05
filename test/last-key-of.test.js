const { lastKeyOf } = require("..");

describe("lastKeyOf method", () => {

  const object = {
    a: 1,
    b: 2,
    c: 3,
    d: 2,
  };

  test("lastKeyOf should return the last found key", () => {

    const keyOf1 = lastKeyOf(object, 2);
    const keyOf2 = lastKeyOf(object, 3);

    expect(keyOf1).toBe("d");
    expect(keyOf2).toBe("c");

  });

  test("lastKeyOf should return null if not found", () => {

    const result = lastKeyOf(object, "does-not-exist");

    expect(result).toBeNull();

  });

});
