const { keyOf } = require("..");
const { object } = require("./constants");

describe("keyOf method", () => {

  test("should return the first found key", () => {

    const keyOf1 = keyOf(object, 2);
    const keyOf2 = keyOf(object, 3);

    expect(keyOf1).toBe("b");
    expect(keyOf2).toBe("c");

  });

  test("should return null if not found", () => {

    const result = keyOf(object, "does-not-exist");

    expect(result).toBeNull();

  });

});
