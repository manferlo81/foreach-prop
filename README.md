# foreach-prop

[![CircleCI](https://circleci.com/gh/manferlo81/foreach-prop.svg?style=svg)](https://circleci.com/gh/manferlo81/foreach-prop)
[![npm](https://badgen.net/npm/v/foreach-prop)](https://www.npmjs.com/package/foreach-prop)
[![codecov](https://codecov.io/gh/manferlo81/foreach-prop/branch/main/graph/badge.svg)](https://codecov.io/gh/manferlo81/foreach-prop)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/foreach-prop/badge?style=rounded)](https://www.jsdelivr.com/package/npm/foreach-prop)
[![packagephobia](https://badgen.net/packagephobia/install/foreach-prop)](https://packagephobia.now.sh/result?p=foreach-prop)
[![bundlephobia](https://badgen.net/bundlephobia/min/foreach-prop)](https://bundlephobia.com/result?p=foreach-prop)
[![types](https://img.shields.io/npm/types/foreach-prop.svg)](https://github.com/microsoft/typescript)
[![Known Vulnerabilities](https://snyk.io/test/github/manferlo81/foreach-prop/badge.svg?targetFile=package.json)](https://snyk.io/test/github/manferlo81/foreach-prop?targetFile=package.json)
[![license](https://badgen.net/github/license/manferlo81/foreach-prop)](LICENSE)

Array-like methods for objects

> :warning: *Some javascript implementations don't follow the user object value-key order. Keep that in mind when you use* [`keyOf`](#function-keyof)*,* [`lastKeyOf`](#function-lastkeyof)*,* [`findKey`](#function-findkey), [`findLastKey`](#function-findlastkey) *and* [`find`](#function-find) *functions.*

## Content

* [Install](#install)
* [CDN](#cdn)
* [Usage](#usage)
* [API](#api)
  * function [`create`](#function-create)
  * function [`fill`](#function-fill)
  * function [`includes`](#function-includes)
  * function [`some`](#function-some)
  * function [`every`](#function-every)
  * function [`forEach`](#foreach-prop)
  * function [`map`](#function-map)
  * function [`filter`](#function-filter)
  * function [`keyOf`](#function-keyof)
  * function [`lastKeyOf`](#function-lastkeyof)
  * function [`findKey`](#function-findkey)
  * function [`findLastKey`](#function-findlastkey)
  * function [`find`](#function-find)
  * function [`reduce`](#function-reduce)

## Install

```bash
npm i foreach-prop
```

## CDN

### jsDelivr

```html
<script src="https://cdn.jsdelivr.net/npm/foreach-prop@latest/dist/umd/each-prop.umd.js"></script>
```

***for production***

```html
<script src="https://cdn.jsdelivr.net/npm/foreach-prop@latest/dist/umd/each-prop.umd.min.js"></script>
```

*[more options...](https://www.jsdelivr.com/package/npm/foreach-prop?version=latest)*

### unpkg

```html
<script src="https://unpkg.com/foreach-prop@latest/dist/umd/each-prop.umd.js"></script>
```

***for production***

```html
<script src="https://unpkg.com/foreach-prop@latest/dist/umd/each-prop.umd.min.js"></script>
```

*[more options...](https://unpkg.com/foreach-prop@latest/)*

## Usage

***example***

```typescript
import { map } from "foreach-prop";

const object = {
  key1: "str",
  key2: 1,
};

const result = map(object, (value, key, extra1) => {
  return key + extra1;
}, " $$");

console.log(result);
```

```console
{
  key1: "key1 $$",
  key2: "key2 $$",
}
```

*See the [API section](#api) for more details.*

### Node.js

```typescript
const { forEach } = require("foreach-prop");
forEach(object, callback);
```

### Browser

*After adding the* `script` *tag,* `eachProp` *object will be available globally, containing all methods detailed in the [API section](#api).*

```typescript
eachProp.forEach(object, callback);
```

## API

### function `create`

*added in:* `v2.1.0`

*Similar to* `new Array()`*. It creates a new object with the given keys. If a value is provided, every property will be populated with the given value or* `undefined` *otherwise.*

```typescript
function create(
  keys: K[],
  value?: V
): Record<K, V>;
```

***example***

```typescript
const object = create(['a', 'b'], true);
console.log(object);
```

```bash
{ a: true, b: true }
```

### function `fill`

*added in:* `v2.1.0`

*Similar to* `Array.prototype.fill` *with a difference, it returns a new object instead of modifying the given one. Every property in the new object will be set to the provided value.*

```typescript
function fill(
  object: Record<K, V> | V[],
  value: N
): Record<K, N>;
```

### function `includes`

*added in:* `v0.2.0`

*Similar to* `Array.prototype.includes`*. It returns whether or not a value is present in an object.*

```typescript
function includes(
  object: Record<string, V> | V[],
  value: unknown
): boolean;
```

### function `some`

*added in:* `v0.2.0`

*Similar to* `Array.prototype.some`*. It returns whether at least one of the key-value-pairs satisfy the provided callback function.*

```typescript
function some(
  object: Record<K, V> | V[],
  callback: (value: V, key: K, ...extra: X[]) => unknown,
  ...extra: X[]
): boolean;
```

*Any* `extra` *argument will be passed down to the callback function.*

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```typescript
some.call(thisArg, object, callback, ...extra);
```

### function `every`

*added in:* `v0.2.0`

*Similar to* `Array.prototype.every`*. It returns whether all key-value-pairs satisfy the provided callback function.*

```typescript
function every(
  object: Record<K, V> | V[],
  callback: (value: V, key: K, ...extra: X[]) => unknown,
  ...extra: X[]
): boolean;
```

*Any* `extra` *argument will be passed down to the callback function.*

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```typescript
every.call(thisArg, object, callback, ...extra);
```

### function `forEach`

*Similar to* `Array.prototype.forEach`*. It calls the provided callback function for every* `key-value-pair` *in the object. Once initiated there is no way to stop the execution of this function, if you intend to stop the iteration at some point have a look at* [`findKey`](#function-findkey) *method.*

```typescript
function forEach(
  object: Record<K, V> | V[],
  callback: (value: V, key: K, ...extra: X[]) => void,
  ...extra: X[]
): void;
```

*Any* `extra` *argument will be passed down to the callback function.*

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```typescript
forEach.call(thisArg, object, callback, ...extra);
```

### function `map`

*Similar to* `Array.prototype.map`*. It calls the provided callback function for every* `key-value-pair` *in the object and returns a new object with the callback* `return` *as value.*

```typescript
function map(
  object: Record<K, V> | V[],
  callback: (value: V, key: K, ...extra: X[]) => N,
  ...extra: X[]
): Record<K, N>;
```

*Any* `extra` *argument will be passed down to the callback function.*

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```typescript
map.call(thisArg, object, callback, ...extra);
```

### function `filter`

*Similar to* `Array.prototype.filter`*. It calls the provided callback function for every* `key-value-pair` *in the object and returns a new object containing the key-value-pairs corresponding to those where the provided callback function returned a truthy value.*

```typescript
function filter(
  object: Record<K, V> | V[],
  callback: (value: V, key: K, ...extra: X[]) => unknown,
  ...extra: X[]
): Partial<Record<K, V>>;
```

*Any* `extra` *argument will be passed down to the callback function.*

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```typescript
filter.call(thisArg, object, callback, ...extra);
```

### function `keyOf`

*Similar to* `Array.prototype.indexOf`*. It returns the key of the first value that equals the provided one, or* `null` *if not found.*

```typescript
function keyOf(
  object: Record<K, unknown>,
  value: unknown
): K | null;
```

### function `lastKeyOf`

*Similar to* `Array.prototype.lastIndexOf`*. It returns the key of the last value that equals the provided one, or* `null` *if not found.*

```typescript
function lastKeyOf(
  object: Record<K, unknown>,
  value: unknown
): K | null;
```

### function `findKey`

*Similar to* `Array.prototype.findIndex`*. It calls the provided callback function for every* `key-value-pair` *in the object and returns the key once the provided callback function return a truthy value. It returns* `null` *if nothing found.*

```typescript
function findKey(
  object: Record<K, V> | V[],
  callback: (value: V, key: K, ...extra: X[]) => unknown,
  ...extra: X[]
): K | null;
```

*Any* `extra` *argument will be passed down to the callback function.*

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```typescript
findKey.call(thisArg, object, callback, ...extra);
```

### function `findLastKey`

*added in:* `v3.0.0`

*Similar to* `Array.prototype.findLastIndex`*. It calls the provided callback function for every* `key-value-pair` *in the object in the reversed order and returns the key once the provided callback function return a truthy value. It returns* `null` *if nothing found.*

```typescript
function findLastKey(
  object: Record<K, V> | V[],
  callback: (value: V, key: K, ...extra: X[]) => unknown,
  ...extra: X[]
): K | null;
```

*Any* `extra` *argument will be passed down to the callback function.*

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```typescript
findLastKey.call(thisArg, object, callback, ...extra);
```

### function `find`

*added in:* `v0.1.0`

*Similar to* `Array.prototype.find`*. It calls the provided callback function for every* `key-value-pair` *in the object and returns the value once the provided callback function return a truthy value. It returns* `undefined` *if nothing found.*

```typescript
function find(
  object: Record<K, V> | V[],
  callback: (value: V, key: K, ...extra: X[]) => unknown,
  ...extra: X[]
): V | undefined;
```

> *Note that the returned value may be* `undefined` *even if the condition is met but the value is* `undefined`*.*

***example***

```typescript
const undef;
// undef is undefined
const object = { key1: undef };
// object.key1 is also undefined

const value = find(object, (val, key) => {
  return key === "key1"
});

console.log(value);
// it logs undefined
// because undef is undefined
```

```console
undefined
```

*Any* `extra` *argument will be passed down to the callback function.*

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```typescript
find.call(thisArg, object, callback, ...extra);
```

### function `reduce`

*Similar to* `Array.prototype.reduce` *but with a major difference: if no initial value provided it defaults to* `undefined`*.*

```typescript
function reduce(
  object: Record<K, V> | V[],
  callback: (current: R, value: V, key: K, ...extra: X[]) => R,
  initial?: R,
  ...extra: X[]
): R;
```

*Any* `extra` *argument will be passed down to the callback function.*

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```typescript
reduce.call(thisArg, object, callback, initial, ...extra);
```

## License

[MIT](LICENSE) &copy; 2019 [Manuel Fernández](https://github.com/manferlo81)
