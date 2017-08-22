const utility = require("./utility.js");
const TYPE = {
    array_like: Symbol("array_like"),
    object: Symbol("object"),
    others: Symbol("others")
}

function determineType(list) {
    if (list.length !== undefined) {
        return TYPE.array_like;
    } else if (list !== null && typeof list === "object") {
        return TYPE.object;
    } else
        return TYPE.others;
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
            for (let i = 0; i < list.length; i++) {
                bindedIteratee(list[i], i, list);
            }
            break;
        case TYPE.object:
            for (let key in list) {
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
            for (let i = 0; i < list.length; i++) {
                returnArray.push(bindedIteratee(list[i], i, list));
            }
            break;
        case TYPE.object:
            for (let key in list) {
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
        result, theMemo = memo;
    if (context !== undefined) {
        bindedIteratee = iteratee.bind(context);
    }
    for (let i = 0; i < list.length; i++) {
        if (theMemo !== undefined) {

        }
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
    each(list, function (value, index, list) {
        if (bindedIteratee(value, index, list))
            result.push(value);
    });
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
            for (let i = 0; i < list.length; i++) {
                if (!predicate(list[i], i, list))
                    return false;
            }
            break;
        case TYPE.object:
            for (let key in list) {
                if (!predicate(list[key], key, list)) {
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
    switch (determineType(list)) {
        case TYPE.array_like:
            for (let i = 0; i < list.length; i++) {
                if (bindedIteratee(list[i], i, list))
                    return true;
            }
            break;
        case TYPE.object:
            for (let key in list) {
                if (bindedIteratee(list[key], key, list)) {
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
        max, maxObj;
    if (context !== undefined) {
        bindedIteratee = iteratee.bind(context);
    }
    switch (determineType(list)) {
        case TYPE.array_like:
            let isFirstTime = true;
            for (let i = 0; i < list.length; i++) {
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
            let result = [];
            for (let i = 0; i < n; i++) {
                result.push(utility.random(list.length - 1));
            }
            return result;
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
    if (list == null) return 0;
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
        otherResult = [],
        result = [];
    for (let i = 0; i < array.length; i++) {
        predicate(array[i]) ? rightResult.push(array[i]) : otherResult.push(array[i]);
    }
    result.push(rightResult);
    result.push(otherResult);
    return result;
}
module.exports = {
    each,
    map,
    filter,
    every,
    some,
    pluck,
    max,
    sample,
    toArray,
    size,
    partition
}