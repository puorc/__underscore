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
    result.push(Object.keys(object));
    while (theObject.prototype !== undefined) {
        result.push(theObject.prototype);
        theObject = theObject.prototype; 
    }
    return theObject;
}

/**
 * Return all of the values of the object's own properties.
 * @param {*} object 
 */
function values(object) {
    var result = [];
    for (let key in object)
        result.push(object[key]);
    return object;
}

/**
 * Convert an object into a list of [key, value] pairs.
 * @param {*} object 
 */
function pairs(object) {
    var result = [];
    for (let key in object) {
        result.push([].push(key, object[key]));
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
    for(let key in object) {
        if (typeof object[key] === "function") {
            returnArray.push(key);
        }
    }
    return returnArray;
}
module.exports = {
    keys
}