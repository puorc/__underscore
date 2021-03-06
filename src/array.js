const collections = require("./collections.js");
const objects = require("./objects.js");

function isArrayLike(array) {
    return array != null && array.length > 0;
}

/**
 * Returns the first element of an array. Passing n will return the first n elements of the array.
 * @param {*} array 
 * @param {*} n 
 */
function first(array, n = 1) {
    if (isArrayLike(array))
        if (n === 1)
            return array[0];
        else
            return initial(array, array.length - n);
}

/**
 * Returns everything but the last entry of the array. Especially useful on the arguments object. Pass n to exclude the last n elements from the result.
 * @param {*} array 
 * @param {*} n 
 */
// consider the case when n > length
function initial(array, n = 1) {
    if (isArrayLike(array))
        return Array.prototype.slice.call(array, 0, Math.max(0, array.length - n));
}

/**
 * Returns the last element of an array. Passing n will return the last n elements of the array.
 * @param {*} array 
 * @param {*} n 
 */
function last(array, n = 1) {
    if (isArrayLike(array))
        if (n === 1)
            return array[array.length - 1];
        else
            return rest(array, Math.max(0, array.length - n));
}

/**
 * Returns the rest of the elements in an array. Pass an index to return the values of the array from that index onward.
 * @param {*} array 
 * @param {*} index 
 */
function rest(array, index = 1) {
    if (isArrayLike(array))
        return Array.prototype.slice.call(array, index);
}

/**
 * Returns a copy of the array with all falsy values removed. In JavaScript, false, null, 0, "", undefined and NaN are all falsy.
 * @param {*} array 
 */
function compact(array) {
    if (isArrayLike(array)) {
        return collections.filter(array, Boolean);
    }
}
/**
 * Flattens a nested array (the nesting can be to any depth). If you pass shallow, the array will only be flattened a single level.
 * @param {*} array 
 */
// should not use function property to recursive. 
// It could be treat as static vars.
function flatten(array, output) {
    if (isArrayLike(array)) {
        output = output || [];
        collections.each(array, item => {
            objects.isArray(item) ? flatten(item, output) : output.push(item)
        });
        return output;
    }
    else 
        return [];
}

/**
 * Returns a copy of the array with all instances of the values removed.
 * @param {*} array 
 * @param {*} values 
 */
function without(array, ...values) {
    if (isArrayLike(array)) {
        return collections.filter(array, item => 
            !collections.some(values, theItem => theItem === item)
        );
    }
    else 
        return [];
}
/**
 * Computes the union of the passed-in arrays: the list of unique items, in order, that are present in one or more of the arrays. 
 * @param {*} arrays 
 */
function union(...arrays) {
    const s = new Set();
    arrays.forEach(array => array.forEach(item => s.add(item)));
    return Array.from(s);
}
/**
 * Computes the list of values that are the intersection of all the arrays. Each value in the result is present in each of the arrays.
 * @param {*} arrays 
 */
function intersection(...arrays) {
    var contains = (array, item) => array.some(element => element === item),
        result = [];
    for (let element of arrays[0]) {
        if (contains(result, element)) continue;
        if (arrays.every(array => contains(array, element))) result.push(element);
    }
    return result;
}

/**
 * Similar to without, but returns the values from array that are not present in the other arrays.
 * @param {*} array 
 * @param {*} others 
 */
function difference(array, others = []) {
    return without(array, ...others);
}

/**
 * Merges together the values of each of the arrays with the values at the corresponding position. 
 * Useful when you have separate data sources that are coordinated through matching array indexes.
 * @param {*} arrays 
 */
function zip(...arrays) {
    var result = [];
    if (arrays.length === 0) return null;
    if (arrays.length === 1) return arrays[0];
    if (!arrays.every(function (item) {
            return item.length === arrays[0].length;
        })) {
        return null;
    } else {
        for (let i = 0; i < arrays[0].length; i++) {
            let tmpArray = [];
            for (let j = 0; j < arrays.length; j++) {
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
    return zip(...arrays);
}
/**
 * Converts arrays into objects. 
 * Pass either a single list of [key, value] pairs, or a list of keys, and a list of values. If duplicate keys exist, the last value wins.
 * @param {*} list 
 * @param {*} values 
 */
function object(list, values) {
    var returnObject = {};
    if (objects.isArray(list) && objects.isArray(values)) {
        collections.each(list, (item, index) => {
            returnObject[item] = values[index];
        })
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
    }
    // abs function deals with the negative condition, to make sure the loop can run correctly.
    for (let i = start; Math.abs(i) < Math.abs(stop); i += step) {
        resultArray.push(i);
    }
    return resultArray;
}
module.exports = {
    first,
    initial,
    last,
    rest,
    compact,
    flatten,
    without,
    union,
    intersection,
    difference,
    zip,
    unzip,
    object,
    range
};