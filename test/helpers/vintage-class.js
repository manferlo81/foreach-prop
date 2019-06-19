// @ts-check

// old school class declaration

const ownPropName = "propA";
const ownMethodName = "methodA";

const protoPropName = "propC";
const protoMethodName = "methodB";

const ownProps = [ownPropName, ownMethodName];
const protoProps = [protoPropName, protoMethodName];

function Obj() {

  this[ownPropName] = "A";

  this[ownMethodName] = function () {
    return this[ownPropName];
  };

}

Obj.prototype = {

  [protoPropName]: "C",

  [protoMethodName]: function () {
    return this;
  },

};

module.exports = {
  ownPropName,
  protoPropName,
  ownMethodName,
  protoMethodName,
  ownProps,
  protoProps,
  Obj,
};
