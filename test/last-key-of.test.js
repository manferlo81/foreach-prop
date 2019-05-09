const { lastKeyOf } = require("..");
const { object } = require("./constants");

describe("lastKeyOf method", () => {

  test("should return the last found key", () => {

    const keyOf1 = lastKeyOf(object, 2);
    const keyOf2 = lastKeyOf(object, 3);

    expect(keyOf1).toBe("d");
    expect(keyOf2).toBe("c");

  });

  test("should return null if not found", () => {

    const result = lastKeyOf(object, "does-not-exist");

    expect(result).toBeNull();

  });

});
