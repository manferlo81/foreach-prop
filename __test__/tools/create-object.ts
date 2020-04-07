export const ownPropA = 'ownA'
export const ownPropB = 'ownB'

export const protoPropA = 'protoA'
export const protoPropB = 'protoB'

export const ownProps = [ownPropA, ownPropB]
export const protoProps = [protoPropA, protoPropB]

export function createObject(): any {
  return Object.assign(
    Object.create({ [protoPropA]: protoPropA, [protoPropB]: protoPropB }),
    { [ownPropA]: ownPropA, [ownPropB]: ownPropB },
  )
}
