import { Key } from './types'

function isObject<K extends Key = Key, V = any>(param: unknown): param is Record<K, V> {
  return !!param && typeof param === 'object'
}

export default isObject
