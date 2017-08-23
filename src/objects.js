const collections = require("./collections.js");

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
    result.push(...Object.keys(object));
    while (Object.getPrototypeOf(theObject) !== null) {
        result.push(...Object.keys(Object.getPrototypeOf(theObject)));
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
    for (let key in object)
        result.push(object[key]);
    return result;
}

/**
 * Convert an object into a list of [key, value] pairs.
 * @param {*} object 
 */
function pairs(object) {
    var result = [];
    for (let key in object) {
        let tmpArray = [];
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
    for (let key in object) {
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
    for (let key in object) {
        if (isFunction(object[key])) {
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
function extend(destination, ...sources) {
    collections.each(sources, element => {
        for (let key in element)
            destination[key] = element[key];
    });
    return destination;
}

/**
 * Return a copy of the object, filtered to only have values for the whitelisted keys (or array of valid keys). 
 * Alternatively accepts a predicate indicating which keys to pick.
 * @param {*} object 
 * @param {*} keys 
 */
function pick(object, ...keys) {
    var returnObject = {};
    for (let i = 0; i < keys.length; i++) {
        if (isString(keys[i])) {
            for (let key in object)
                if (key === keys[i])
                    returnObject[key] = object[key];
        }
        if (isFunction(keys[i])) {
            for (let key in object) {
                if (keys[i](object[key], key, object))
                    returnObject[key] = object[key];
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
function omit(object, ...keys) {
    var returnObject = {};
    for (let i = 0; i < keys.length; i++) {
        if (isString(keys[i])) {
            for (let key in object)
                if (key !== keys[i])
                    returnObject[key] = object[key];
        }
        if (isFunction(keys[i])) {
            for (let key in object) {
                if (!keys[i](object[key], key, object))
                    returnObject[key] = object[key];
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
function defaults(object, ...defaults) {
    collections.each(defaults, function (item) {
        if (isObject(item)) {
            for (let key in item) {
                if (object[key] === undefined)
                    object[key] = item[key];
            }
        }
    })
    return object;
}

function clone(object) {
    if (typeof object !== "object") return object;
    return isArray(object) ? object.slice() : extend({}, object);
}

/**
 * Returns a function that will itself return the key property of any passed-in object.
 * @param {*} key 
 */
function property(key) {
    return function (that) {
        return that[key];
    }
}

/**
 * Performs an optimized deep comparison between the two objects, 
 * to determine if they should be considered equal.
 * @param {*} object 
 * @param {*} other 
 */
function isEqual(object, other) {
    return isEq(object, other);
}

function isEq(a, b) {
    // deal with +0 != -0 case
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // a can be null or undefined
    if (a == null || b == null) return false;
    // deal with NaN
    if (a !== a) return b !== b;
    var type = typeof a;
    // No primitive type. Start compare object types.
    if (type !== "function" && type !== "object" && typeof b !== "function" && typeof b !== "object") return false;
    return deepEq(a, b);
}

function deepEq(a, b) {
    var NameOfA = Object.prototype.toString.call(a),
        NameOfB = Object.prototype.toString.call(b);
    if (NameOfA !== NameOfB) return false;
    switch (NameOfA) {
        case '[object RegExp]':
        case '[object String]':
            return '' + a === '' + b;
        case '[object Number]':
            return isEq(+a, +b);
        case '[object Date]':
        case '[object Boolean]':
            return +a === +b;
        case '[object Array]':
            if (a.length !== b.length) return false;
            for (let i = 0; i < a.length; i++) {
                if (!isEq(a[i], b[i])) return false;
            }
            return true;
        default:
            let keys = Object.getOwnPropertyNames(a);
            for (let key of keys) {
                if (!(key in b) || !isEq(a[key], b[key])) return false;
            }
            return true;
    }
}

/**
 * Tells you if the keys and values in properties are contained in object.
 * @param {*} object 
 * @param {*} properties 
 */
function isMatch(object, properties) {
    for (let key in properties) {
        if (!isEqual(object[key], properties[key]))
            return false;
    }
    return true;
}

/**
 * Returns true if an enumerable object contains no values (no enumerable own-properties). 
 * For strings and array-like objects _.isEmpty checks if the length property is 0.
 * @param {*} object 
 */
function isEmpty(object) {
    if (typeof object !== "object") return true;
    if (object.length !== undefined)
        return object.length === 0;
    else
        return Object.keys(object).length === 0;
}

/**
 * Returns true if object is an Array.
 * @param {*} object 
 */
function isArray(object) {
    return Array.isArray(object) || object instanceof Array;
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
    return typeof value === "object" && !isArray(value) && !isFunction(value);
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
    keys,
    allKeys,
    values,
    pairs,
    invert,
    functions,
    extend,
    pick,
    omit,
    defaults,
    clone,
    property,
    isEqual,
    isMatch,
    isEmpty,
    isArray,
    isFunction,
    isObject,
    isString,
    isNumber,
    isBoolean,
    isDate,
    isRegExp,
    isError,
    isNaN,
    isNull,
    isUndefine,
    isFinite
}