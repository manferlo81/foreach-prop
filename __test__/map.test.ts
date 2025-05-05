import { map } from '../src'
import { createObjectWithProto } from './tools/create-object'
import { normalizeObject } from './tools/helpers'
import type { UnknownFunction } from './tools/types'
import { invalidCallbacks, invalidObjects } from './tools/values'

describe('map method', () => {

  test('should throw on insufficient arguments', () => {
    const __map = map as UnknownFunction
    const cases = [
      () => __map(),
      () => __map({}),
    ]
    cases.forEach((exec) => {
      expect(exec).toThrow(TypeError)
    })
  })

  test('should throw on non object', () => {
    invalidObjects.forEach((object) => {
      const exec = () => map(object as never, () => null)
      expect(exec).toThrow(TypeError)
    })
  })

  test('should throw on invalid callback', () => {
    invalidCallbacks.forEach((callback) => {
      const exec = () => map({}, callback as never)
      expect(exec).toThrow(TypeError)
    })
  })

  test('should skip prototype properties', () => {

    const ownProps = ['ownPropA', 'ownPropB'] as const
    const protoProps = ['protoPropA', 'protoPropB'] as const
    const instance = createObjectWithProto(protoProps, ownProps)

    const callback = jest.fn()

    map(instance, callback)

    expect(callback).toHaveBeenCalledTimes(ownProps.length)
    ownProps.forEach((ownKeyAndValue, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, ownKeyAndValue, ownKeyAndValue)
    })
    protoProps.forEach((protoKeyAndValue) => {
      expect(callback).not.toHaveBeenCalledWith(expect.anything(), protoKeyAndValue)
    })

  })

  test('should pass key and value to callback function', () => {

    const { normalized, entries } = normalizeObject({ a: 1, b: 2, c: 3, d: 2 })
    const callback = jest.fn()

    map(normalized, callback)

    expect(callback).toHaveBeenCalledTimes(entries.length)

    entries.forEach(([key, value], index) => {
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
    const callback = jest.fn(function cb(this: unknown) {
      expect(this).toBe(thisArg)
    })

    map.call(thisArg, normalized, callback)

    expect(callback).toHaveBeenCalledTimes(entries.length)

  })

  test('should pass extra arguments to callback function', () => {

    const { normalized, entries } = normalizeObject({ a: 1, b: true })

    const callback = jest.fn(() => 0)

    const extra1 = {}
    const extra2: never[] = []

    map(normalized, callback, extra1, extra2)

    expect(callback).toHaveBeenCalledTimes(entries.length)
    expect(callback).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(String),
      extra1,
      extra2,
    )

  })

  test('should return a new object', () => {

    const object = { a: 1, b: 2, c: 3, d: 2 }

    const result = map(object, (val) => val)

    expect(result).toEqual(object)
    expect(result).not.toBe(object)

  })

  test('should return a mapped object', () => {

    const { normalized, entries } = normalizeObject({ a: 1, b: 2, c: 3, d: 2 })

    const doubleValue = (val: number) => val * 2

    const result = map(normalized, doubleValue)
    const expected = Object.fromEntries(entries.map(([key, value]) => [key, doubleValue(value)]))

    expect(result).toEqual(expected)

  })

})
