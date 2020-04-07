import { notEnoughArgs, invalidObject, invalidCallback } from '../src/errors';

describe('errors', () => {

  test('should create not enough arguments error', () => {
    const error = notEnoughArgs(0, 3);
    expect(error).toBeInstanceOf(TypeError);
    expect(error.message).toBe('expected 3 arguments, got 0.');
  });

  test('should create invalid object error', () => {
    const error = invalidObject('string');
    expect(error).toBeInstanceOf(TypeError);
    expect(error.message).toBe('string is not an object.');
  });

  test('should create invalid callback error', () => {
    const error = invalidCallback('string');
    expect(error).toBeInstanceOf(TypeError);
    expect(error.message).toBe('string is not a function.');
  });

});
