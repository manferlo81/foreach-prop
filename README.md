# foreach-prop

[![CircleCI](https://circleci.com/gh/manferlo81/foreach-prop.svg?style=svg)](https://circleci.com/gh/manferlo81/foreach-prop) [![Greenkeeper badge](https://badges.greenkeeper.io/manferlo81/foreach-prop.svg)](https://greenkeeper.io/) [![npm](https://img.shields.io/npm/v/foreach-prop.svg)](https://www.npmjs.com/package/foreach-prop) [![dependencies Status](https://david-dm.org/manferlo81/foreach-prop/status.svg)](https://david-dm.org/manferlo81/foreach-prop) [![devDependencies Status](https://david-dm.org/manferlo81/foreach-prop/dev-status.svg)](https://david-dm.org/manferlo81/foreach-prop?type=dev) [![install size](https://packagephobia.now.sh/badge?p=foreach-prop)](https://packagephobia.now.sh/result?p=foreach-prop) [![npm bundle size](https://img.shields.io/bundlephobia/min/foreach-prop.svg)](https://bundlephobia.com/result?p=foreach-prop) [![codecov](https://codecov.io/gh/manferlo81/foreach-prop/branch/master/graph/badge.svg)](https://codecov.io/gh/manferlo81/foreach-prop) [![Known Vulnerabilities](https://snyk.io/test/github/manferlo81/foreach-prop/badge.svg?targetFile=package.json)](https://snyk.io/test/github/manferlo81/foreach-prop?targetFile=package.json) [![GitHub](https://img.shields.io/github/license/manferlo81/foreach-prop.svg)](LICENSE)

Array-like methods for objects

## Install

#### npm

```sh
npm install foreach-prop
```

#### jsDelivr
*[www.jsdelivr.com](https://www.jsdelivr.com/)*

```html
<script src="https://cdn.jsdelivr.net/npm/foreach-prop@1/dist/each-prop.umd.js"></script>
```

*[more options on jsDelivr website...](https://www.jsdelivr.com/package/npm/foreach-prop)*

#### UNPKG
*[unpkg.com](https://unpkg.com)*

```html
<script src="https://unpkg.com/foreach-prop@1/dist/each-prop.umd.js"></script>
```

## Methods

#### forEach

*similar to* `Array.prototype.forEach`*. It executes the provided callback function for every key-value-pair in the object. Once iniciated there is no way to stop the execution of this function, if you intend to stop the iteration at some point have a look at* [`findKey`](#findkey) *method.*

```typescript
forEach(object, function callback(value, key, ...extra) => void, ...extra): void;
```

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```javascript
forEach.call(thisArg, object, callback, ...extra);
```

#### map

*similar to* `Array.prototype.map`*. It executes the provided callback function for every key-value-pair in the object and returns a new object.*

```typescript
map(object, function callback(value, key, ...extra) => any, ...extra): object;
```

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```javascript
map.call(thisArg, object, callback, ...extra);
```

#### keyOf

*similar to* `Array.prototype.indexOf`*. It returns the key of the first value that equals the provided one, or* `null` *if not found.*

```typescript
keyOf(object, value): string | null;
```

#### lastKeyOf

*similar to* `Array.prototype.lastIndexOf`*. It returns the key of the last value that equals the provided one, or* `null` *if not found.*

```typescript
lastKeyOf(object, value): string | null;
```

#### includes

*similar to* `Array.prototype.includes`*. It returns whether or not a value is present in an object.*

```typescript
includes(object, value): boolean;
```

#### findKey

*similar to* `Array.prototype.findIndex`*. It executes the provided callback function for every key-value-pair in the object and returns the key once the provided callback function return a truthy value. It returns* `null` *if nothing found.*

```typescript
findKey(object, function callback(value, key, ...extra) => any, ...extra): string | null;
```

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```javascript
findKey.call(thisArg, object, callback, ...extra);
```

#### find

*similar to* `Array.prototype.find`*. It executes the provided callback function for every key-value-pair in the object and returns the value once the provided callback function return a truthy value. It returns* `undefined` *if nothing found.*

```typescript
find(object, function callback(value, key, ...extra) => any, ...extra): any;
```

*Note that the returned value may be* `undefined` *even if the condition is met and the value is* `undefined`*.*

```javascript
const something; // something is undefined
const value = find({ something }, (val, key) => (key === "something"));
console.log(value); // it logs undefined because something is undefined
```

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```javascript
find.call(thisArg, object, callback, ...extra);
```

#### filter

*similar to* `Array.prototype.filter`*. It executes the provided callback function for every key-value-pair in the object and returns a new object containing the key-value-pairs corresponding to those where the provided callback function returned a truthy value.*

```typescript
filter(object, function callback(value, key, ...extra) => any, ...extra): object;
```

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```javascript
filter.call(thisArg, object, callback, ...extra);
```

#### reduce

*similar to* `Array.prototype.reduce` *but with a major difference: if no initial value provided it defaults to* `undefined`*.*

```typescript
reduce(object, function callback(current, value, key, ...extra) => any, initial?, ...extra): any;
```

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```javascript
reduce.call(thisArg, object, callback, initial?, ...extra);
```

#### some

*similar to* `Array.prototype.some`*. It returns whether at least one of the key-value-pairs satisfy the provided callback function.*

```javascript
some(object, function callback(value, key, ...extra) => any, ...extra): boolean;
```

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```javascript
some.call(thisrArg, object, callback, ...extra): boolean;
```

#### every

*similar to* `Array.prototype.every`*. It returns whether all key-value-pairs satisfy the provided callback function.*

```javascript
every(object, function callback(value, key, ...extra) => any, ...extra): boolean;
```

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*.*

```javascript
every.call(thisrArg, object, callback, ...extra): boolean;
```

## License

[MIT](LICENSE) &copy; Manuel Fernández
