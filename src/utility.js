/**
 * Creates a function that returns the same value that is used as the argument of _.constant.
 * @param {*} value 
 */
function constant(value) {
    return function () {
        return value;
    }
}

/**
 * Returns a random integer between min and max, inclusive. 
 * If you only pass one argument, it will return a number between 0 and that number.
 * @param {*} min 
 * @param {*} max 
 */
function random(min, max) {
    if (max == null) {
        max = min;
        min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
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
        if (typeof defaultValue === "function") {
            return defaultValue(object);
        } else
            return defaultValue;
    } else {
        if (typeof object[property] === "function")
            return object[property](object);
        else
            return object[property];
    }
}
module.exports = {
    constant,
    random,
    result
}