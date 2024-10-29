type ProtoEntry<T extends string> = [key: T, value: T];
type DescriptorEntry<T extends string> = [key: T, value: PropertyDescriptor & { value: T }];

type ObjectWithProps<P extends string> = {
  readonly [K in P]: K
};

export function createObjectWithProto<P extends string, O extends string>(protoProps: readonly P[], ownProps: readonly O[]): ObjectWithProps<O | P> {
  const protoEntries = protoProps.map((prop): ProtoEntry<P> => [prop, prop]);
  const proto = Object.fromEntries(protoEntries);

  const ownDescriptorEntries = ownProps.map((propName): DescriptorEntry<O> => [propName, { value: propName, enumerable: true }]);
  const ownDescriptors = Object.fromEntries(ownDescriptorEntries);

  return Object.create(proto, ownDescriptors) as ObjectWithProps<O | P>;
}
