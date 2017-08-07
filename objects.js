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
function extend(destination, ...sources) {
    sources.forEach(function(element) {
        for (let key in element) {
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
function pick(object, ...keys) {
    var returnObject = {};
    for (let i = 0; i < keys.length; i++) {
        if (typeof keys[i] === "string") {
            for (let key in object)
                if (key === keys[i])
                    returnObject[key] = object[key];
        }
        if (typeof keys[i] === "function") {
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
        if (typeof keys[i] === "string") {
            for (let key in object)
                if (key !== keys[i])
                    returnObject[key] = object[key];
        }
        if (typeof keys[i] === "function") {
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
    defaults.forEach(function(item) {
        if (typeof item === "object") {
            for (let key in item) {
                if (object[key] === undefined)
                    object[key] = item[key];
            }
        }
    });
    return object;
}

function clone(object) {
    var returnObject = {};
    for (let key in object) {
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
    return function(that) {
        return that[key];
    }
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
    property
}