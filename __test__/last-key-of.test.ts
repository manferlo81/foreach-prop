import { lastKeyOf } from '../src'
import invalidObjects from './helpers/invalid-objects'
import { Obj, protoPropA } from './helpers/vintage-class'

describe('lastKeyOf method', () => {

  test('should throw on insufficient arguments', () => {

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(() => lastKeyOf()).toThrow(TypeError)

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(() => lastKeyOf({})).toThrow(TypeError)

  })

  test('should throw on non object', () => {

    invalidObjects.forEach((object) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(() => lastKeyOf(object, 100)).toThrow(TypeError)
    })

  })

  test('should return the last found key', () => {

    const object = { a: 1, b: 2, c: 3, d: 2 }

    const keyOf1 = lastKeyOf(object, 2)
    const keyOf2 = lastKeyOf(object, 3)

    expect(keyOf1).toBe('d')
    expect(keyOf2).toBe('c')

  })

  test('should return null if not found', () => {

    const object = { a: 1, b: 2, c: 3, d: 2 }

    const result = lastKeyOf(object, 'does-not-exist')

    expect(result).toBeNull()

  })

  test('should return null if not own property', () => {

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const object = new Obj()

    const result = lastKeyOf(object, object[protoPropA])

    expect(object).toHaveProperty(protoPropA)
    expect(object[protoPropA]).toBeDefined()
    expect(result).toBeNull()

  })

})
