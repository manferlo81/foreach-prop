const { includes } = require("..");
const { object } = require("./constants");

describe("includes method", () => {

  test("should return true if found", () => {

    const result = includes(object, 3);

    expect(result).toBe(true);

  });

  test("should return false if not found", () => {

    const result = includes(object, "does-not-exist");

    expect(result).toBe(false);

  });

});
