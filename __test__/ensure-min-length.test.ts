import { ensureMinLength } from '../src/tools/ensure'

describe('ensureMinLength private function', () => {

  it('should throw if less than min length', () => {
    const minLength = 4
    const values = [0, 1, 2, 3]
    values.forEach((length) => {
      const exec = () => {
        ensureMinLength(length, minLength)
      }
      expect(exec).toThrow()
    })
  })

  it('should pass if equal to min length', () => {
    const values = [1, 8, 33, 14]
    values.forEach((length) => {
      const exec = () => {
        ensureMinLength(length, length)
      }
      expect(exec).not.toThrow()
    })
  })

  it('should pass if greater than min length', () => {
    const minLength = 4
    const values = [5, 6, 7, 10, 33]
    values.forEach((length) => {
      const exec = () => {
        ensureMinLength(length, minLength)
      }
      expect (exec).not.toThrow()
    })
  })

})
