const object = exports.object = {
  a: 1,
  b: 2,
  c: 3,
  d: 2,
};

exports.keys = Object.keys(object);

exports.Obj = class Obj {

  constructor() {
    this.a = 1;
    this.method = function () {
      return this;
    };
  }

  protoMethod() {
    return this;
  }

};

exports.own = ["a", "method"];
exports.proto = "protoMethod";
