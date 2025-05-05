import { findLastKey } from '../src'
import { createObjectWithProto } from './tools/create-object'
import { normalizeObject } from './tools/helpers'
import { reverseArray } from './tools/reverse-array'
import { UnknownFunction } from './tools/types'
import { invalidCallbacks, invalidObjects } from './tools/values'

describe('findLastKey method', () => {

  test('should throw on insufficient arguments', () => {
    const __findLastKey = findLastKey as UnknownFunction
    const cases = [
      () => __findLastKey(),
      () => __findLastKey({}),
    ]
    cases.forEach((exec) => {
      expect(exec).toThrow(TypeError)
    })
  })

  test('should throw on non object', () => {
    invalidObjects.forEach((object) => {
      const exec = () => findLastKey(object as never, () => null)
      expect(exec).toThrow(TypeError)
    })
  })

  test('should throw on invalid predicate function', () => {
    invalidCallbacks.forEach((predicate) => {
      const exec = () => findLastKey({}, predicate as never)
      expect(exec).toThrow(TypeError)
    })
  })

  test('should skip prototype properties', () => {

    const ownProps = ['ownPropA', 'ownPropB'] as const
    const protoProps = ['protoPropA', 'protoPropB'] as const
    const object = createObjectWithProto(protoProps, ownProps)

    const callback = jest.fn()

    findLastKey(object, callback)

    expect(callback).toHaveBeenCalledTimes(ownProps.length)
    reverseArray(ownProps).forEach((ownKeyAndValue, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, ownKeyAndValue, ownKeyAndValue)
    })
    protoProps.forEach((protoKeyAndValue) => {
      expect(callback).not.toHaveBeenCalledWith(expect.anything(), protoKeyAndValue)
    })

  })

  test('should pass key and value to predicate function', () => {

    const { normalized, entries } = normalizeObject({ a: 1, b: 2, c: 3, d: 2 })

    const callback = jest.fn(() => false)

    findLastKey(normalized, callback)

    expect(callback).toHaveBeenCalledTimes(entries.length)
    reverseArray(entries).forEach(([key, value], index) => {
      expect(callback).toHaveBeenNthCalledWith(
        index + 1,
        value,
        key,
      )
    })

  })

  test('should pass this argument to callback', () => {

    const { normalized, entries } = normalizeObject({ a: 1, b: 2 })

    const thisArg = {}
    const callback = jest.fn(function (this: unknown) {
      expect(this).toBe(thisArg)
      return false
    })

    findLastKey.call(thisArg, normalized, callback)

    expect(callback).toHaveBeenCalledTimes(entries.length)

  })

  test('should pass extra arguments to predicate function', () => {

    const { normalized, entries } = normalizeObject({ a: 1, b: 2 })

    const callback = jest.fn()

    const extra1 = {}
    const extra2: never[] = []

    findLastKey(normalized, callback, extra1, extra2)

    expect(callback).toHaveBeenCalledTimes(entries.length)
    expect(callback).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(String),
      extra1,
      extra2,
    )

  })

  test('should return the found key', () => {
    const object = { a: 1, b: 2, c: 3, d: 4 }
    const cases = [
      { value: 1, expectedKey: 'a' },
      { value: 2, expectedKey: 'b' },
      { value: 3, expectedKey: 'c' },
      { value: 4, expectedKey: 'd' },
    ]
    cases.forEach(({ value, expectedKey }) => {
      const result = findLastKey(object, (val) => {
        return val === value
      })
      expect(result).toBe(expectedKey)
    })
  })

  test('should return first key that matches', () => {
    // IMPORTANT!
    // Because object key don't follow a specific order,
    // any key can be considered as the "first key that matches"

    const object = { a: 1, b: 1, c: 1, d: 1 }
    const key = findLastKey(object, (value) => value === 1)

    expect(key).not.toBeNull()
    expect(Object.keys(object)).toContain(key)
  })

  test('should return null if not found', () => {
    const object = { a: 1, b: 2, c: 3, d: 2, e: '' }
    const result = findLastKey(object, (val) => {
      return val === 'does-not-exist'
    })
    expect(result).toBeNull()
  })

})
