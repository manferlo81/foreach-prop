export function isObject(target: unknown): target is object {
  if (!target) return false
  return typeof target === 'object'
}
