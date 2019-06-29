// @ts-nocheck

const ownPropA = "propA";
const ownPropB = "propB";

const protoPropA = "propC";
const protoPropB = "propD";

const ownProps = [ownPropA, ownPropB];
const protoProps = [protoPropA, protoPropB];

function Obj(this: any) {
  this[ownPropA] = "A";
  this[ownPropB] = "B";
}

Obj.prototype = {
  [protoPropA]: "C",
  [protoPropB]: "D",
};

export {
  ownPropA,
  protoPropA,
  ownPropB,
  protoPropB,
  ownProps,
  protoProps,
  Obj,
};
