import { ensureIsFunction } from '../src/tools/ensure';
import { functions, invalidCallbacks } from './tools/values';

describe('ensureIsFunction private function', () => {

  it('should throw if input is not a function', () => {
    invalidCallbacks.forEach((object) => {
      const exec = () => {
        ensureIsFunction(object);
      };
      expect(exec).toThrow();
    });
  });

  it('should pass if input is a function', () => {
    functions.forEach((object) => {
      const exec = () => {
        ensureIsFunction(object);
      };
      expect(exec).not.toThrow();
    });
  });

});
