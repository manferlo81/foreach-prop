export const ownPropA = 'ownA';
export const ownPropB = 'ownB';

export const protoPropA = 'protoA';
export const protoPropB = 'protoB';

export const ownProps = [ownPropA, ownPropB] as const;
export const protoProps = [protoPropA, protoPropB] as const;

type OwnPropA = typeof ownPropA;
type OwnPropB = typeof ownPropB;
type ProtoPropA = typeof protoPropA;
type ProtoPropB = typeof protoPropB;

type OwnProps = OwnPropA | OwnPropB;
type ProtoProps = ProtoPropA | ProtoPropB;
type AllProps = OwnProps | ProtoProps;

type ProtoEntry<T extends string> = [key: T, value: T];
type DescriptorEntry<T extends string> = [key: T, value: PropertyDescriptor & { value: T }];

type TestObject__<P extends string> = {
  readonly [K in P]: K
};

type __TestObject = {
  readonly [K in AllProps]: K
};

export function createObject(): __TestObject {
  const proto = Object.fromEntries(protoProps.map((prop): ProtoEntry<typeof prop> => [prop, prop]));
  const descriptors = Object.fromEntries(ownProps.map((propName): DescriptorEntry<typeof propName> => [propName, { value: propName, enumerable: true }]));
  return Object.create(proto, descriptors) as __TestObject;
}

export function createObjectWithProto<P extends string, O extends string>(protoProps: readonly P[], ownProps: readonly O[]): TestObject__<O | P> {
  const protoEntries = protoProps.map((prop): ProtoEntry<P> => [prop, prop]);
  const proto = Object.fromEntries(protoEntries);

  const ownDescriptorEntries = ownProps.map((propName): DescriptorEntry<O> => [propName, { value: propName, enumerable: true }]);
  const ownDescriptors = Object.fromEntries(ownDescriptorEntries);

  return Object.create(proto, ownDescriptors) as TestObject__<O | P>;
}
