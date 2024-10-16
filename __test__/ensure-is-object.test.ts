import { ensureIsObject } from '../src/tools/ensure';
import { invalidObjects, objects } from './tools/values';

describe('ensureIsObject private function', () => {

  it('should throw if input is not an object', () => {
    invalidObjects.forEach((object) => {
      const exec = () => {
        ensureIsObject(object);
      };
      expect(exec).toThrow();
    });
  });

  it('should pass if input is an object', () => {
    objects.forEach((object) => {
      const exec = () => {
        ensureIsObject(object);
      };
      expect(exec).not.toThrow();
    });
  });

});
