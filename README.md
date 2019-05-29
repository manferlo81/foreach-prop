# foreach-prop

[![CircleCI](https://circleci.com/gh/manferlo81/foreach-prop.svg?style=svg)](https://circleci.com/gh/manferlo81/foreach-prop) [![Greenkeeper badge](https://badges.greenkeeper.io/manferlo81/foreach-prop.svg)](https://greenkeeper.io/) [![npm](https://img.shields.io/npm/v/foreach-prop.svg)](https://www.npmjs.com/package/foreach-prop) [![jsdelivr](https://data.jsdelivr.com/v1/package/npm/foreach-prop/badge?style=rounded)](https://www.jsdelivr.com/package/npm/foreach-prop) [![dependencies Status](https://david-dm.org/manferlo81/foreach-prop/status.svg)](https://david-dm.org/manferlo81/foreach-prop) [![devDependencies Status](https://david-dm.org/manferlo81/foreach-prop/dev-status.svg)](https://david-dm.org/manferlo81/foreach-prop?type=dev) [![install size](https://packagephobia.now.sh/badge?p=foreach-prop)](https://packagephobia.now.sh/result?p=foreach-prop) [![npm bundle size](https://img.shields.io/bundlephobia/min/foreach-prop.svg)](https://bundlephobia.com/result?p=foreach-prop) [![npm type definitions](https://img.shields.io/npm/types/foreach-prop.svg)](https://github.com/microsoft/typescript) [![codecov](https://codecov.io/gh/manferlo81/foreach-prop/branch/master/graph/badge.svg)](https://codecov.io/gh/manferlo81/foreach-prop) [![Known Vulnerabilities](https://snyk.io/test/github/manferlo81/foreach-prop/badge.svg?targetFile=package.json)](https://snyk.io/test/github/manferlo81/foreach-prop?targetFile=package.json) [![GitHub](https://img.shields.io/github/license/manferlo81/foreach-prop.svg)](LICENSE)

Array-like methods for objects

> :warning: *Some javascript implementations don't respect the object key order. Keep that in mind when you use* `keyOf`*,* `lastKeyOf`*,* `findKey` *and* `find` *methods.*

## Install

```bash
npm i foreach-prop
```

## CDN

### jsDelivr

*[www.jsdelivr.com](https://www.jsdelivr.com)*

```html
<script src="https://cdn.jsdelivr.net/npm/foreach-prop/dist/each-prop.umd.js"></script>
```

##### for production

```html
<script src="https://cdn.jsdelivr.net/npm/foreach-prop/dist/each-prop.umd.min.js"></script>
```

*[more options...](https://www.jsdelivr.com/package/npm/foreach-prop)*

### unpkg

*[unpkg.com](https://unpkg.com)*

```html
<script src="https://unpkg.com/foreach-prop/dist/each-prop.umd.js"></script>
```

*[more options...](https://unpkg.com/foreach-prop/)*

## Usage

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

## API

### forEach

*Similar to* `Array.prototype.forEach`*. It executes the provided callback function for every key-value-pair in the object. Once iniciated there is no way to stop the execution of this function, if you intend to stop the iteration at some point have a look at* [`findKey`](#findkey) *method.*

```typescript
forEach(object, function callback(value, key, ...extra) => void, ...extra): void;
```

*Any* `extra` *arguments will be passed to the callback function.*

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```javascript
forEach.call(thisArg, object, callback, ...extra);
```

### map

*Similar to* `Array.prototype.map`*. It executes the provided callback function for every key-value-pair in the object and returns a new object.*

```typescript
map(object, function callback(value, key, ...extra) => any, ...extra): object;
```

*Any* `extra` *arguments will be passed to the callback function.*

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```javascript
map.call(thisArg, object, callback, ...extra);
```

### keyOf

*Similar to* `Array.prototype.indexOf`*. It returns the key of the first value that equals the provided one, or* `null` *if not found.*

```typescript
keyOf(object, value): string | null;
```

### lastKeyOf

*Similar to* `Array.prototype.lastIndexOf`*. It returns the key of the last value that equals the provided one, or* `null` *if not found.*

```typescript
lastKeyOf(object, value): string | null;
```

### includes

*Similar to* `Array.prototype.includes`*. It returns whether or not a value is present in an object.*

```typescript
includes(object, value): boolean;
```

### findKey

*Similar to* `Array.prototype.findIndex`*. It executes the provided callback function for every key-value-pair in the object and returns the key once the provided callback function return a truthy value. It returns* `null` *if nothing found.*

```typescript
findKey(object, function callback(value, key, ...extra) => any, ...extra): string | null;
```

*Any* `extra` *arguments will be passed to the callback function.*

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```javascript
findKey.call(thisArg, object, callback, ...extra);
```

### find

*Similar to* `Array.prototype.find`*. It executes the provided callback function for every key-value-pair in the object and returns the value once the provided callback function return a truthy value. It returns* `undefined` *if nothing found.*

```typescript
find(object, function callback(value, key, ...extra) => any, ...extra): any;
```

> *Note that the returned value may be* `undefined` *even if the condition is met and the value is* `undefined`*.*

###### example

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

*Any* `extra` *arguments will be passed to the callback function.*

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```javascript
find.call(thisArg, object, callback, ...extra);
```

### filter

*Similar to* `Array.prototype.filter`*. It executes the provided callback function for every key-value-pair in the object and returns a new object containing the key-value-pairs corresponding to those where the provided callback function returned a truthy value.*

```typescript
filter(object, function callback(value, key, ...extra) => any, ...extra): object;
```

*Any* `extra` *arguments will be passed to the callback function.*

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```javascript
filter.call(thisArg, object, callback, ...extra);
```

### reduce

*Similar to* `Array.prototype.reduce` *but with a major difference: if no initial value provided it defaults to* `undefined`*.*

```typescript
reduce(object, function callback(current, value, key, ...extra) => any, initial?, ...extra): any;
```

*Any* `extra` *arguments will be passed to the callback function.*

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```javascript
reduce.call(thisArg, object, callback, initial?, ...extra);
```

### some

*Similar to* `Array.prototype.some`*. It returns whether at least one of the key-value-pairs satisfy the provided callback function.*

```javascript
some(object, function callback(value, key, ...extra) => any, ...extra): boolean;
```

*Any* `extra` *arguments will be passed to the callback function.*

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```javascript
some.call(thisrArg, object, callback, ...extra): boolean;
```

### every

*Similar to* `Array.prototype.every`*. It returns whether all key-value-pairs satisfy the provided callback function.*

```javascript
every(object, function callback(value, key, ...extra) => any, ...extra): boolean;
```

*Any* `extra` *arguments will be passed to the callback function.*

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```javascript
every.call(thisrArg, object, callback, ...extra): boolean;
```

## License

[MIT](LICENSE) &copy; Manuel Fernández
