export const ownPropA = 'ownA';
export const ownPropB = 'ownB';

export const protoPropA = 'protoA';
export const protoPropB = 'protoB';

export const ownProps = [ownPropA, ownPropB];
export const protoProps = [protoPropA, protoPropB];

export function createObject(): Record<string, string> {
  const pattern = { [protoPropA]: protoPropA, [protoPropB]: protoPropB };
  return Object.assign<Record<string, string>, Record<string, string>>(
    Object.create(pattern) as typeof pattern,
    { [ownPropA]: ownPropA, [ownPropB]: ownPropB },
  );
}
