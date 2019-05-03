# foreach-prop

[![CircleCI](https://circleci.com/gh/manferlo81/foreach-prop.svg?style=svg)](https://circleci.com/gh/manferlo81/foreach-prop)  [![Greenkeeper badge](https://badges.greenkeeper.io/manferlo81/foreach-prop.svg)](https://greenkeeper.io/) [![npm](https://img.shields.io/npm/v/foreach-prop.svg)](https://www.npmjs.com/package/foreach-prop) [![codecov](https://codecov.io/gh/manferlo81/foreach-prop/branch/master/graph/badge.svg)](https://codecov.io/gh/manferlo81/foreach-prop) [![Known Vulnerabilities](https://snyk.io/test/github/manferlo81/foreach-prop/badge.svg?targetFile=package.json)](https://snyk.io/test/github/manferlo81/foreach-prop?targetFile=package.json) [![GitHub](https://img.shields.io/github/license/manferlo81/foreach-prop.svg)](LICENSE)

Array-like methods for objects

## Install

```sh
npm install foreach-prop
```

## Methods

#### forEach

*similar to* `Array.prototype.forEach`*. It executes the provided callback function for every value in the object. Once iniciated there is no way to stop the execution of this function, if you intend to stop the iteration at some point have a look at* [`findKey`](#findkey) *method.*

```typescript
forEach(object, function callback(value, key, ...extra) => void, ...extra): void;
```

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*...*

```javascript
forEach.call(thisParam, object, callback, ...extra);
```

#### map

*similar to* `Array.prototype.map`*. It executes the provided callback function for every value in the object and returns a new object.*

```typescript
map(object, function callback(value, key, ...extra) => any, ...extra): object;
```

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*...*

```javascript
map.call(thisParam, object, callback, ...extra);
```

#### keyOf

*similar to* `Array.prototype.indexOf`*. It returns the key of the first value that equals the provided one.*

```typescript
keyOf(object, value): string;
```

#### lastKeyOf

*similar to* `Array.prototype.lastIndexOf`*. It returns the key of the last value that equals the provided one.*

```typescript
lastKeyOf(object, value): string;
```

#### findKey

*similar to* `Array.prototype.findIndex`*. It executes the provided callback function for every value in the object and returns the key once the provided callback function return a truthy value.*

```typescript
findKey(object, function callback(value, key, ...extra) => any, ...extra): string;
```

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*...*

```javascript
findKey.call(thisParam, object, callback, ...extra);
```

#### filter

*similar to* `Array.prototype.filter`*. It executes the provided callback function for every value in the object and returns a new object containing the key-value-pairs corresponding to those where the provided callback function returned a truthy value.*

```typescript
filter(object, function callback(value, key, ...extra) => any, ...extra): object;
```

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*...*

```javascript
filter.call(thisParam, object, callback, ...extra);
```

#### reduce

*similar to* `Array.prototype.reduce` *but with a major difference: if no initial value provided it defaults to* `undefined`*.*

```typescript
reduce(object, function callback(current, value, key, ...extra) => any, initial, ...extra): any;
```

*The callback function inherits the* `this` *value from the function call, so if you want a specific* `this` *value in your callback function, you can call it using the* `call` *method of the* `Function.prototype`*...*

```javascript
reduce.call(thisParam, object, callback, initial, ...extra);
```

## License

[MIT License](LICENSE)
