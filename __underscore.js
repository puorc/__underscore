"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function isAvailable(array) {
    return array.length !== undefined && array.length !== null;
}

/**
 * Returns the first element of an array. Passing n will return the first n elements of the array.
 * @param {*} array 
 * @param {*} n 
 */
function first(array) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    if (isAvailable(array)) if (n === 1) return array[0];else return Array.prototype.slice.call(array, 0, n);
}

/**
 * Returns everything but the last entry of the array. Especially useful on the arguments object. Pass n to exclude the last n elements from the result.
 * @param {*} array 
 * @param {*} n 
 */
function initial(array) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    if (isAvailable(array)) return Array.prototype.slice.call(array, 0, array.length - n);
}

/**
 * Returns the last element of an array. Passing n will return the last n elements of the array.
 * @param {*} array 
 * @param {*} n 
 */
function last(array) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    if (isAvailable(array)) if (n === 1) return array[array.length - 1];else return Array.prototype.slice.call(array, array.length - n);
}

/**
 * Returns the rest of the elements in an array. Pass an index to return the values of the array from that index onward.
 * @param {*} array 
 * @param {*} index 
 */
function rest(array) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    if (isAvailable(array, n = 1)) return Array.prototype.slice.call(array, index);
}

function compact(array) {
    if (isAvailable(array)) {
        return Array.prototype.filter.call(array, function (element) {
            return Boolean(element);
        });
    }
}
/**
 * Flattens a nested array (the nesting can be to any depth). If you pass shallow, the array will only be flattened a single level.
 * @param {*} array 
 * @param {*} shallow 
 */
function flatten(array) {
    if (isAvailable(array)) {
        if (!flatten.storeArray) flatten.storeArray = [];
        Array.prototype.forEach.call(array, function (item) {
            if (Array.isArray(item)) flatten(item);else flatten.storeArray.push(item);
        });
        return flatten.storeArray;
    }
}

/**
 * Returns a copy of the array with all instances of the values removed.
 * @param {*} array 
 * @param {*} values 
 */
function without(array) {
    for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        values[_key - 1] = arguments[_key];
    }

    if (isAvailable(array)) {
        return Array.prototype.filter.call(array, function (item) {
            return !values.some(function (items) {
                return items === item;
            });
        });
    }
}
/**
 * Computes the union of the passed-in arrays: the list of unique items, in order, that are present in one or more of the arrays. 
 * @param {*} arrays 
 */
function union() {
    var s = new Set();

    for (var _len2 = arguments.length, arrays = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        arrays[_key2] = arguments[_key2];
    }

    for (var i = 0; i < arrays.length; i++) {
        arrays[i].forEach(function (item) {
            s.add(item);
        });
    }
    return Array.from(s);
}
/**
 * Computes the list of values that are the intersection of all the arrays. Each value in the result is present in each of the arrays.
 * @param {*} arrays 
 */
function intersection() {
    var _storeArray;

    var storeArray = [],
        result = [];
    //to avoid cases like [1, 2, 2] to be misjudged
    if (arguments.length === 1) return arguments.length <= 0 ? undefined : arguments[0];

    storeArray = (_storeArray = storeArray).concat.apply(_storeArray, arguments).sort();
    var tmp = storeArray[0],
        count = 0;
    for (var i = 0; i < storeArray.length; i++) {
        if (tmp === storeArray[i]) count++;else {
            if (count >= arguments.length) result.push(tmp);
            tmp = storeArray[i];
            count = 1;
        }
    }
    if (count >= arguments.length) result.push(tmp);
    return result;
}

/**
 * Similar to without, but returns the values from array that are not present in the other arrays.
 * @param {*} array 
 * @param {*} others 
 */
function difference(array) {
    var others = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    return without.apply(undefined, [array].concat(_toConsumableArray(others)));
}

/**
 * Remain to be done, need some algorithms background to accomplish.
 * uniq_.uniq(array, [isSorted], [iteratee]) Alias: unique 
 * Produces a duplicate-free version of the array, using === to test object equality.
 * In particular only the first occurence of each value is kept. If you know in advance that the array is sorted, 
 * passing true for isSorted will run a much faster algorithm. If you want to compute unique items based on a transformation, 
 * pass an iteratee function.
 */

/**
 * Merges together the values of each of the arrays with the values at the corresponding position. 
 * Useful when you have separate data sources that are coordinated through matching array indexes.
 * @param {*} arrays 
 */
function zip() {
    for (var _len3 = arguments.length, arrays = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        arrays[_key3] = arguments[_key3];
    }

    var result = [];
    if (arrays.length === 0) return null;
    if (arrays.length === 1) return arrays[0];
    if (!arrays.every(function (item) {
        return item.length === arrays[0].length;
    })) {
        return null;
    } else {
        for (var i = 0; i < arrays[0].length; i++) {
            var tmpArray = [];
            for (var j = 0; j < arrays.length; j++) {
                tmpArray.push(arrays[j][i]);
            }
            result.push(tmpArray);
        }
    }
    return result;
}

/**
 * The opposite of zip. Given an array of arrays, returns a series of new arrays, 
 * the first of which contains all of the first elements in the input arrays, the second of which contains all of the second elements, and so on.
 * @param {*} array 
 */
function unzip(arrays) {
    return zip.apply(undefined, _toConsumableArray(arrays));
}
/**
 * Converts arrays into objects. 
 * Pass either a single list of [key, value] pairs, or a list of keys, and a list of values. If duplicate keys exist, the last value wins.
 * @param {*} list 
 * @param {*} values 
 */
function object(list, values) {
    var returnObject = {};
    if (Array.isArray(list) && Array.isArray(values)) {
        list.forEach(function (item, index) {
            returnObject[item] = values[index];
        });
    }
    return returnObject;
}

/**
 * A function to create flexibly-numbered lists of integers, handy for each and map loops. start, if omitted, defaults to 0; step defaults to 1. 
 * Returns a list of integers from start (inclusive) to stop (exclusive), incremented (or decremented) by step, exclusive. Note that ranges 
 * that stop before they start are considered to be zero-length instead of negative — if you'd like a negative range, use a negative step. 
 * @param {*} start 
 * @param {*} stop 
 * @param {*} step 
 */
function range() {
    var resultArray = [],
        start = 0,
        step = 1,
        stop = 0;
    switch (arguments.length) {
        case 1:
            stop = arguments[0];
            break;
        case 2:
            start = arguments[0];
            stop = arguments[1];
            break;
        case 3:
            start = arguments[0];
            stop = arguments[1];
            step = arguments[2];
            break;
        default:
            return;
            break;
    }
    // abs function deals with the negative condition, to make sure the loop can run correctly.
    for (var i = start; Math.abs(i) < Math.abs(stop); i += step) {
        resultArray.push(i);
    }
    return resultArray;
}
module.exports = {
    first: first,
    initial: initial,
    last: last,
    rest: rest,
    compact: compact,
    flatten: flatten,
    without: without,
    union: union,
    intersection: intersection,
    difference: difference,
    zip: zip,
    unzip: unzip,
    object: object,
    range: range
};
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var utility = require("./utility.js");
var TYPE = {
    array_like: Symbol("array_like"),
    object: Symbol("object"),
    others: Symbol("others")
};

function determineType(list) {
    if (list.length !== undefined) {
        return TYPE.array_like;
    } else if (list !== null && (typeof list === "undefined" ? "undefined" : _typeof(list)) === "object") {
        return TYPE.object;
    } else return TYPE.others;
}

/**
 * Iterates over a list of elements, yielding each in turn to an iteratee function. The iteratee is bound to the context object, if one is passed.
 * Each invocation of iteratee is called with three arguments: (element, index, list). If list is a JavaScript object, iteratee's arguments will be (value, key, list). 
 * Returns the list for chaining.
 * @param {*} list 
 * @param {*} iteratee 
 * @param {*} context 
 */
function each(list, iteratee, context) {
    var bindedIteratee = iteratee;
    if (context !== undefined) {
        bindedIteratee = iteratee.bind(context);
    }
    switch (determineType(list)) {
        case TYPE.array_like:
            for (var i = 0; i < list.length; i++) {
                bindedIteratee(list[i], i, list);
            }
            break;
        case TYPE.object:
            for (var key in list) {
                bindedIteratee(list[key], key, list);
            }
            break;
        case TYPE.others:
        default:
            return;
    }
}

/**
 * Produces a new array of values by mapping each value in list through a transformation function (iteratee). 
 * The iteratee is passed three arguments: the value, then the index (or key) of the iteration, and finally a reference to the entire list.
 * @param {*} list 
 * @param {*} iteratee 
 * @param {*} context 
 */
function map(list, iteratee, context) {
    var bindedIteratee = iteratee,
        returnArray = [];
    if (context !== undefined) {
        bindedIteratee = iteratee.bind(context);
    }
    switch (determineType(list)) {
        case TYPE.array_like:
            for (var i = 0; i < list.length; i++) {
                returnArray.push(bindedIteratee(list[i], i, list));
            }
            break;
        case TYPE.object:
            for (var key in list) {
                returnArray.push(bindedIteratee(list[key], key, list));
            }
            break;
        case TYPE.others:
        default:
            break;
    }
    return returnArray;
}

/**
 * Also known as inject and foldl, reduce boils down a list of values into a single value. 
 * Memo is the initial state of the reduction, and each successive step of it should be returned by iteratee. 
 * The iteratee is passed four arguments: the memo, then the value and index (or key) of the iteration, and finally a reference to the entire list.
 * If no memo is passed to the initial invocation of reduce, the iteratee is not invoked on the first element of the list. 
 * The first element is instead passed as the memo in the invocation of the iteratee on the next element in the list.
 * @param {*} list 
 * @param {*} iteratee 
 * @param {*} memo 
 * @param {*} context 
 */
function reduce(list, iteratee, memo, context) {
    var bindedIteratee = iteratee,
        result,
        theMemo = memo;
    if (context !== undefined) {
        bindedIteratee = iteratee.bind(context);
    }
    for (var i = 0; i < list.length; i++) {
        if (theMemo !== undefined) {}
    }
}

/**
 * Looks through each value in the list, returning an array of all the values that pass a truth test (predicate).
 * @param {*} list 
 * @param {*} predicate 
 * @param {*} context 
 */
function filter(list, predicate, context) {
    var bindedIteratee = predicate,
        result = [];
    if (context !== undefined) {
        bindedIteratee = predicate.bind(context);
    }
    switch (determineType(list)) {
        case TYPE.array_like:
            for (var i = 0; i < list.length; i++) {
                if (predicate(list[i])) {
                    result.push(list[i]);
                }
            }
            break;
        case TYPE.object:
            for (var key in list) {
                if (predicate(list[key])) {
                    result.push(list[key]);
                }
            }
            break;
        case TYPE.others:
        default:
            return;
    }
    return result;
}

/**
 * Returns true if all of the values in the list pass the predicate truth test.
 *  Short-circuits and stops traversing the list if a false element is found.
 * @param {*} list 
 * @param {*} predicate 
 * @param {*} context 
 */
function every(list, predicate, context) {
    var bindedIteratee = predicate;
    if (context !== undefined) {
        bindedIteratee = predicate.bind(context);
    }
    switch (determineType(list)) {
        case TYPE.array_like:
            for (var i = 0; i < list.length; i++) {
                if (!predicate(list[i])) return false;
            }
            break;
        case TYPE.object:
            for (var key in list) {
                if (!predicate(list[key])) {
                    return false;
                }
            }
            break;
        case TYPE.others:
        default:
            break;
    }
    return true;
}

/**
 * Returns true if any of the values in the list pass the predicate truth test. 
 * Short-circuits and stops traversing the list if a true element is found.
 * @param {*} list 
 * @param {*} predicate 
 * @param {*} context 
 */
function some(list, predicate, context) {
    var bindedIteratee = predicate;
    if (context !== undefined) {
        bindedIteratee = predicate.bind(context);
    }
    if (predicate === undefined) {
        predicate = Boolean;
    }
    switch (determineType(list)) {
        case TYPE.array_like:
            for (var i = 0; i < list.length; i++) {
                if (predicate(list[i])) return true;
            }
            break;
        case TYPE.object:
            for (var key in list) {
                if (predicate(list[key])) {
                    return true;
                }
            }
            break;
        case TYPE.others:
        default:
            break;
    }
    return false;
}

/**
 * A convenient version of what is perhaps the most common use-case for map: extracting a list of property values.
 * @param {*} list 
 * @param {*} propertyName 
 */
function pluck(list, propertyName) {
    return map(list, function (item) {
        if (propertyName in item) {
            return item[propertyName];
        }
    });
}
/**
 * Returns the maximum value in list. If an iteratee function is provided, 
 * it will be used on each value to generate the criterion by which the value is ranked.
 * @param {*} list 
 * @param {*} iteratee 
 * @param {*} context 
 */
function max(list, iteratee, context) {
    var bindedIteratee = iteratee,
        max,
        maxObj;
    if (context !== undefined) {
        bindedIteratee = iteratee.bind(context);
    }
    switch (determineType(list)) {
        case TYPE.array_like:
            var isFirstTime = true;
            for (var i = 0; i < list.length; i++) {
                if (typeof bindedIteratee(list[i], i, list) === "number") {
                    if (isFirstTime) {
                        max = bindedIteratee(list[i], i, list);
                        maxObj = list[i];
                        isFirstTime = false;
                    }
                    if (bindedIteratee(list[i], i, list) > max) {
                        max = bindedIteratee(list[i], i, list);
                        maxObj = list[i];
                    }
                }
            }
            break;
        default:
            return;
    }
    return maxObj;
}

/**
 * Produce a random sample from the list. Pass a number to return n random elements from the list. 
 * Otherwise a single random item will be returned.
 * @param {*} list 
 * @param {*} n 
 */
// has been tested manually
function sample(list, n) {
    if (determineType(list) === TYPE.array_like) {
        if (n === undefined) {
            return list[utility.random(list.length - 1)];
        } else {
            var _result = [];
            for (var i = 0; i < n; i++) {
                _result.push(utility.random(list.length - 1));
            }
            return _result;
        }
    }
}

/**
 * Creates a real Array from the list (anything that can be iterated over). 
 * Useful for transmuting the arguments object.
 * @param {*} list 
 */
function toArray(list) {
    return Array.prototype.slice.call(list);
}

/**
 * Return the number of values in the list.
 * @param {*} list 
 */
function size(list) {
    switch (determineType(list)) {
        case TYPE.array_like:
            return list.length;
            break;
        case TYPE.object:
            return Object.keys(list).length;
            break;
        default:
            break;
    }
}

/**
 * Split array into two arrays: one whose elements all satisfy predicate and one whose elements all do not satisfy predicate.
 * @param {*} array 
 * @param {*} predicate 
 */
function partition(array, predicate) {
    if (!array instanceof Array) return;
    var rightResult = [],
        otherResult = [];
    result = [];
    for (var i = 0; i < array.length; i++) {
        predicate(array[i]) ? rightResult.push(array[i]) : otherResult.push(array[i]);
    }
    result.push(rightResult);
    result.push(otherResult);
    return result;
}
module.exports = {
    each: each,
    map: map,
    filter: filter,
    every: every,
    some: some,
    pluck: pluck,
    max: max,
    sample: sample,
    toArray: toArray,
    size: size,
    partition: partition
};
"use strict";

/**
 * Bind a function to an object, meaning that whenever the function is called, the value of this will be the object. 
 * Optionally, pass arguments to the function to pre-fill them, also known as partial application.
 * @param {*} func 
 * @param {*} object 
 * @param {*} args 
 */
function bind(func, object) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
    }

    return function () {
        return func.apply(object, args);
    };
}

// bugs here, remain to be solved.
function partial(func) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
    }

    return bind.apply(undefined, [func, this].concat(args));
}

//memoize(function, [hashFunction]) 

/**
 * Much like setTimeout, invokes function after wait milliseconds. 
 * If you pass the optional arguments, they will be forwarded on to the function when it is invoked.
 * @param {*} func 
 * @param {*} wait 
 * @param {*} args 
 */
function delay(func, wait) {
    for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        args[_key3 - 2] = arguments[_key3];
    }

    return setTimeout.apply(undefined, [func, wait].concat(args));
}

/**
 * Defers invoking the function until the current call stack has cleared, 
 * similar to using setTimeout with a delay of 0. 
 * @param {*} func 
 * @param {*} args 
 */
function defer(func) {
    for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
    }

    return delay.apply(undefined, [func].concat(args));
}

/**
 * Creates a version of the function that can only be called one time. Repeated calls to the modified function will have no effect, 
 * returning the value from the original call. 
 * Useful for initialization functions, instead of having to set a boolean flag and then check it later.
 * @param {*} func 
 */
function once(func) {
    return function newFunc() {
        if (!newFunc.isCalled) {
            newFunc.isCalled = true;
            newFunc.value = func();
        } else {
            return newFunc.value;
        }
    };
}

/**
 * Creates a version of the function that will only be run after being called count times. 
 * Useful for grouping asynchronous responses, where you want to be sure that all the async calls have finished, before proceeding.
 * @param {*} count 
 * @param {*} func 
 */
function after(count, func) {
    return function newFunc() {
        if (!newFunc.calledTimes) {
            newFunc.calledTimes = 1;
        } else if (calledTimes < count) {} else {
            return func();
        }
    };
}

/**
 * Creates a version of the function that can be called no more than count times. 
 * The result of the last function call is memoized and returned when count has been reached.
 * @param {*} count 
 * @param {*} func 
 */
function before(count, func) {
    return function newFunc() {
        if (!newFunc.calledTimes) {
            newFunc.calledTimes = 1;
            return func();
        } else if (newFunc.calledTimes < count) {
            var result = func();
            if (newFunc.calledTimes = count - 1) newFunc.value = result;
            return result;
        } else {}
    };
}

/**
 * Returns a new negated version of the predicate function.
 * @param {*} predicate 
 */
function negate(predicate) {
    return function () {
        return !predicate();
    };
}

function compose() {
    for (var _len5 = arguments.length, funcs = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        funcs[_key5] = arguments[_key5];
    }

    return function (value) {
        var tmp = funcs[0](value);
        for (var i = 1; i < funcs.length; i++) {
            tmp = funcs[i](tmp);
        }
        return tmp;
    };
}

module.exports = {
    bind: bind,
    partial: partial,
    delay: delay,
    defer: defer,
    compose: compose
};
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Retrieve all the names of the object's own enumerable properties.
 * @param {*} object 
 */
function keys(object) {
    return Object.keys(object);
}

/**
 * Retrieve all the names of object's own and inherited properties.
 * @param {*} object 
 */
function allKeys(object) {
    var result = [],
        theObject = object;
    result.push.apply(result, _toConsumableArray(Object.keys(object)));
    while (Object.getPrototypeOf(theObject) !== null) {
        result.push.apply(result, _toConsumableArray(Object.keys(Object.getPrototypeOf(theObject))));
        theObject = Object.getPrototypeOf(theObject);
    }
    return result;
}

/**
 * Return all of the values of the object's own properties.
 * @param {*} object 
 */
function values(object) {
    var result = [];
    for (var key in object) {
        result.push(object[key]);
    }return result;
}

/**
 * Convert an object into a list of [key, value] pairs.
 * @param {*} object 
 */
function pairs(object) {
    var result = [];
    for (var key in object) {
        var tmpArray = [];
        tmpArray.push(key, object[key]);
        result.push(tmpArray);
    }
    return result;
}

/**
 * Returns a copy of the object where the keys have become the values and the values the keys. 
 * For this to work, all of your object's values should be unique and string serializable.
 * @param {*} object 
 */
function invert(object) {
    var returnObject = {};
    for (var key in object) {
        returnObject[object[key]] = key;
    }
    return returnObject;
}

/**
 * Returns a sorted list of the names of every method in an object — 
 * that is to say, the name of every function property of the object.
 * @param {*} object 
 */
function functions(object) {
    var returnArray = [];
    for (var key in object) {
        if (typeof object[key] === "function") {
            returnArray.push(key);
        }
    }
    return returnArray;
}

/**
 * Shallowly copy all of the properties in the source objects over to the destination object, and return the destination object. 
 * Any nested objects or arrays will be copied by reference, not duplicated. 
 * It's in-order, so the last source will override properties of the same name in previous arguments.
 * @param {*} destination 
 * @param {*} sources 
 */
function extend(destination) {
    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        sources[_key - 1] = arguments[_key];
    }

    sources.forEach(function (element) {
        for (var key in element) {
            destination[key] = element[key];
        }
    });
    return destination;
}

/**
 * Return a copy of the object, filtered to only have values for the whitelisted keys (or array of valid keys). 
 * Alternatively accepts a predicate indicating which keys to pick.
 * @param {*} object 
 * @param {*} keys 
 */
function pick(object) {
    var returnObject = {};

    for (var _len2 = arguments.length, keys = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        keys[_key2 - 1] = arguments[_key2];
    }

    for (var i = 0; i < keys.length; i++) {
        if (typeof keys[i] === "string") {
            for (var key in object) {
                if (key === keys[i]) returnObject[key] = object[key];
            }
        }
        if (typeof keys[i] === "function") {
            for (var _key3 in object) {
                if (keys[i](object[_key3], _key3, object)) returnObject[_key3] = object[_key3];
            }
        }
    }
    return returnObject;
}

/**
 * Return a copy of the object, filtered to omit the blacklisted keys (or array of keys). 
 * Alternatively accepts a predicate indicating which keys to omit.
 * @param {*} object 
 * @param {*} keys 
 */
function omit(object) {
    var returnObject = {};

    for (var _len3 = arguments.length, keys = Array(_len3 > 1 ? _len3 - 1 : 0), _key4 = 1; _key4 < _len3; _key4++) {
        keys[_key4 - 1] = arguments[_key4];
    }

    for (var i = 0; i < keys.length; i++) {
        if (typeof keys[i] === "string") {
            for (var key in object) {
                if (key !== keys[i]) returnObject[key] = object[key];
            }
        }
        if (typeof keys[i] === "function") {
            for (var _key5 in object) {
                if (!keys[i](object[_key5], _key5, object)) returnObject[_key5] = object[_key5];
            }
        }
    }
    return returnObject;
}

/**
 * Fill in undefined properties in object with the first value present in the following list of defaults objects.
 * @param {*} object 
 * @param {*} defaults 
 */
function defaults(object) {
    for (var _len4 = arguments.length, defaults = Array(_len4 > 1 ? _len4 - 1 : 0), _key6 = 1; _key6 < _len4; _key6++) {
        defaults[_key6 - 1] = arguments[_key6];
    }

    defaults.forEach(function (item) {
        if ((typeof item === "undefined" ? "undefined" : _typeof(item)) === "object") {
            for (var key in item) {
                if (object[key] === undefined) object[key] = item[key];
            }
        }
    });
    return object;
}

function clone(object) {
    var returnObject = {};
    for (var key in object) {
        returnObject[key] = object[key];
    }
    return returnObject;
}

// tap(object, interceptor)  remains to be done

/**
 * Returns a function that will itself return the key property of any passed-in object.
 * @param {*} key 
 */
function property(key) {
    return function (that) {
        return that[key];
    };
}

/**
 * Performs an optimized deep comparison between the two objects, 
 * to determine if they should be considered equal.
 * @param {*} object 
 * @param {*} other 
 */
function isEqual(object, other) {
    for (var key in object) {
        if (object[key] !== null && _typeof(object[key]) === "object") {
            return isEqual(object[key], other[key]);
        } else {
            if (object[key] !== other[key]) return false;
        }
    }
    return true;
}

/**
 * Tells you if the keys and values in properties are contained in object.
 * @param {*} object 
 * @param {*} properties 
 */
function isMatch(object, properties) {
    for (var key in properties) {
        if (!isEqual(object[key], properties[key])) return false;
    }
    return true;
}

/**
 * Returns true if an enumerable object contains no values (no enumerable own-properties). 
 * For strings and array-like objects _.isEmpty checks if the length property is 0.
 * @param {*} object 
 */
function isEmpty(object) {
    if (object.length !== undefined) return object.length === 0;else return Object.keys(object).length === 0;
}

/**
 * Returns true if object is an Array.
 * @param {*} object 
 */
function isArray(object) {
    return object instanceof Array;
}

/**
 * Returns true if object is a Function.
 * @param {*} object 
 */
function isFunction(object) {
    return typeof object === "function";
}

/**
 * Returns true if value is an Object. 
 * Note that JavaScript arrays and functions are objects, 
 * while (normal) strings and numbers are not.
 * @param {*} value 
 */
function isObject(value) {
    return (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && !isArray(value) && !isFunction(value);
}

/**
 * Returns true if object is a String.
 * @param {*} object 
 */
function isString(object) {
    return typeof object === "string";
}

/**
 * Returns true if object is a Number (including NaN).
 * @param {*} object 
 */
function isNumber(object) {
    return typeof object === "number";
}

/**
 * Returns true if object is either true or false.
 * @param {*} object 
 */
function isBoolean(object) {
    return typeof object === "boolean";
}

/**
 * Returns true if object is a Date.
 * @param {*} object 
 */
function isDate(object) {
    return Object.prototype.toString.call(object) === "[object Date]";
}

/**
 * Returns true if object is a RegExp.
 * @param {*} object 
 */
function isRegExp(object) {
    return Object.prototype.toString.call(object) === "[object RegExp]";
}

/**
 * Returns true if object inherits from an Error.
 * @param {*} object 
 */
function isError(object) {
    return Object.prototype.toString.call(object) === "[object Error]";
}

/**
 * Returns true if object is NaN.
 * @param {*} object 
 */
function isNaN(object) {
    return object !== object;
}

/**
 * Returns true if the value of object is null.
 * @param {*} object 
 */
function isNull(object) {
    return object === null;
}

/**
 * Returns true if value is undefined.
 * @param {*} value 
 */
function isUndefine(value) {
    return arguments.length === 1 && value === undefined;
}

/**
 * Returns true if object is a finite Number.
 * @param {*} object 
 */
function isFinite(object) {
    return isNumber(object) && object !== Infinity && object !== -Infinity;
}
module.exports = {
    keys: keys,
    allKeys: allKeys,
    values: values,
    pairs: pairs,
    invert: invert,
    functions: functions,
    extend: extend,
    pick: pick,
    omit: omit,
    defaults: defaults,
    clone: clone,
    property: property,
    isEqual: isEqual,
    isMatch: isMatch,
    isEmpty: isEmpty,
    isArray: isArray,
    isFunction: isFunction,
    isObject: isObject,
    isString: isString,
    isNumber: isNumber,
    isBoolean: isBoolean,
    isDate: isDate,
    isRegExp: isRegExp,
    isError: isError,
    isNaN: isNaN,
    isNull: isNull,
    isUndefine: isUndefine,
    isFinite: isFinite
};
"use strict";

/**
 * Creates a function that returns the same value that is used as the argument of _.constant.
 * @param {*} value 
 */
function constant(value) {
    return function () {
        return value;
    };
}

/**
 * Returns a random integer between min and max, inclusive. 
 * If you only pass one argument, it will return a number between 0 and that number.
 * @param {*} min 
 * @param {*} max 
 */
function random(min, max) {
    var theMin, theMax, difference;
    if (arguments.length === 2) {
        theMin = arguments[0];
        theMax = arguments[1];
    } else if (arguments.length === 1) {
        theMin = 0;
        theMax = arguments[0];
    } else return;
    difference = theMax - theMin;
    return Math.ceil(Math.random() * difference + theMin);
}

/**
 * If the value of the named property is a function then invoke it with the object as context; otherwise, return it. 
 * If a default value is provided and the property doesn't exist or is undefined then the default will be returned. 
 * If defaultValue is a function its result will be returned.
 * @param {*} object 
 * @param {*} property 
 * @param {*} defaultValue 
 */
function result(object, property, defaultValue) {
    if (object[property] === undefined) {
        if (defaultValue !== undefined) {
            if (typeof defaultValue === "function") {
                return defaultValue(object);
            } else return defaultValue;
        }
    } else {
        if (typeof object[property] === "function") return object[property](object);else return object[property];
    }
}
module.exports = {
    constant: constant,
    random: random,
    result: result
};
