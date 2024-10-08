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

> :warning: *Some javascript implementations don't follow the object key order. Keep that in mind when you use* `keyOf`*,* `lastKeyOf`*,* `findKey` *and* `find` *methods.*

## Content

* [Install](#install)
* [CDN](#cdn)
* [Usage](#usage)
* [API](#api)
  * [`forEach`](#foreach)
  * [`map`](#map)
  * [`keyOf`](#keyof)
  * [`lastKeyOf`](#lastkeyof)
  * [`includes`](#includes)
  * [`findKey`](#findkey)
  * [`find`](#find)
  * [`filter`](#filter)
  * [`reduce`](#reduce)
  * [`some`](#some)
  * [`every`](#every)
  * [`create`](#create)
  * [`fill`](#fill)

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

```javascript
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

```javascript
const { forEach } = require("foreach-prop");
forEach(object, callback);
```

### Browser

*After adding the* `script` *tag,* `eachProp` *object will be available globally, containing all methods detailed in the [API section](#api).*

```javascript
eachProp.forEach(object, callback);
```

## API

### `forEach`

*Similar to* `Array.prototype.forEach`*. It calls the provided callback function for every* `key-value-pair` *in the object. Once initiated there is no way to stop the execution of this function, if you intend to stop the iteration at some point have a look at* [`findKey`](#findkey) *method.*

```typescript
forEach(object, function callback(value, key, ...extra) => void, ...extra): void;
```

*Any* `extra` *argument will be passed down to the callback function.*

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```javascript
forEach.call(thisArg, object, callback, ...extra);
```

### `map`

*Similar to* `Array.prototype.map`*. It calls the provided callback function for every* `key-value-pair` *in the object and returns a new object with the callback* `return` *as value.*

```typescript
map(object, function callback(value, key, ...extra) => any, ...extra): object;
```

*Any* `extra` *argument will be passed down to the callback function.*

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```javascript
map.call(thisArg, object, callback, ...extra);
```

### `keyOf`

*Similar to* `Array.prototype.indexOf`*. It returns the key of the first value that equals the provided one, or* `null` *if not found.*

```typescript
keyOf(object, value): string | null;
```

### `lastKeyOf`

*Similar to* `Array.prototype.lastIndexOf`*. It returns the key of the last value that equals the provided one, or* `null` *if not found.*

```typescript
lastKeyOf(object, value): string | null;
```

### `includes`

*added in:* `v0.2.0`

*Similar to* `Array.prototype.includes`*. It returns whether or not a value is present in an object.*

```typescript
includes(object, value): boolean;
```

### `findKey`

*Similar to* `Array.prototype.findIndex`*. It calls the provided callback function for every* `key-value-pair` *in the object and returns the key once the provided callback function return a truthy value. It returns* `null` *if nothing found.*

```typescript
findKey(object, function callback(value, key, ...extra) => any, ...extra): string | null;
```

*Any* `extra` *argument will be passed down to the callback function.*

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```javascript
findKey.call(thisArg, object, callback, ...extra);
```

### `find`

*added in:* `v0.1.0`

*Similar to* `Array.prototype.find`*. It calls the provided callback function for every* `key-value-pair` *in the object and returns the value once the provided callback function return a truthy value. It returns* `undefined` *if nothing found.*

```typescript
find(object, function callback(value, key, ...extra) => any, ...extra): any;
```

> *Note that the returned value may be* `undefined` *even if the condition is met but the value is* `undefined`*.*

***example***

```javascript
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

```javascript
find.call(thisArg, object, callback, ...extra);
```

### `filter`

*Similar to* `Array.prototype.filter`*. It calls the provided callback function for every* `key-value-pair` *in the object and returns a new object containing the key-value-pairs corresponding to those where the provided callback function returned a truthy value.*

```typescript
filter(object, function callback(value, key, ...extra) => any, ...extra): object;
```

*Any* `extra` *argument will be passed down to the callback function.*

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```javascript
filter.call(thisArg, object, callback, ...extra);
```

### `reduce`

*Similar to* `Array.prototype.reduce` *but with a major difference: if no initial value provided it defaults to* `undefined`*.*

```typescript
reduce(object, function callback(current, value, key, ...extra) => any, initial?, ...extra): any;
```

*Any* `extra` *argument will be passed down to the callback function.*

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```javascript
reduce.call(thisArg, object, callback, initial?, ...extra);
```

### `some`

*added in:* `v0.2.0`

*Similar to* `Array.prototype.some`*. It returns whether at least one of the key-value-pairs satisfy the provided callback function.*

```javascript
some(object, function callback(value, key, ...extra) => any, ...extra): boolean;
```

*Any* `extra` *argument will be passed down to the callback function.*

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```javascript
some.call(thisArg, object, callback, ...extra): boolean;
```

### `every`

*added in:* `v0.2.0`

*Similar to* `Array.prototype.every`*. It returns whether all key-value-pairs satisfy the provided callback function.*

```javascript
every(object, function callback(value, key, ...extra) => any, ...extra): boolean;
```

*Any* `extra` *argument will be passed down to the callback function.*

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```javascript
every.call(thisArg, object, callback, ...extra): boolean;
```

### `create`

*added in:* `v2.1.0`

*Similar to* `new Array()`*. It creates a new object with the given keys. If a value is provided, every property will be populated with the given value or* `undefined` *otherwise.*

```typescript
create(keys: Array<string | number>, value?: any): object;
```

***example***

```typescript
const object = create(['a', 'b'], true);
console.log(object);
```

```bach
{ a: true, b: true }
```

### `fill`

*added in:* `v2.1.0`

*Similar to* `Array.prototype.fill` *with a difference, it returns a new object instead of modifying the given one. Every property in the new object will be set to the provided value.*

```typescript
fill(object, value): object;
```

## License

[MIT](LICENSE) &copy; 2019 [Manuel Fernández](https://github.com/manferlo81)
