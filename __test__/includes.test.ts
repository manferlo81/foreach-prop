import { includes } from '../src';

describe('includes method', () => {

  test('should return true if found', () => {

    const object = { a: 1, b: 2, c: 3, d: 2 };

    const result = includes(object, 3);

    expect(result).toBe(true);

  });

  test('should return false if not found', () => {

    const object = { a: 1, b: 2, c: 3, d: 2 };

    const result = includes(object, 'does-not-exist');

    expect(result).toBe(false);

  });

});
