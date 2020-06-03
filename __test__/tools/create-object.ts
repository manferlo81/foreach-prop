export const ownPropA = 'ownA';
export const ownPropB = 'ownB';

export const protoPropA = 'protoA';
export const protoPropB = 'protoB';

export const ownProps = [ownPropA, ownPropB];
export const protoProps = [protoPropA, protoPropB];

export function createObject(): Record<string, string> {
  return Object.assign<Record<string, string>, Record<string, string>>(
    Object.create({ [protoPropA]: protoPropA, [protoPropB]: protoPropB }),
    { [ownPropA]: ownPropA, [ownPropB]: ownPropB },
  );
}
