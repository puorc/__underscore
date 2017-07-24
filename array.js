function isAvailable(array) {
    return array.length !== undefined && array.length !== null;
}

/**
 * Returns the first element of an array. Passing n will return the first n elements of the array.
 * @param {*} array 
 * @param {*} n 
 */
function first(array, n = 1) {
    if (isAvailable(array))
        if (n === 1)
            return array[0];
        else
            return Array.prototype.slice.call(array, 0, n);
}

/**
 * Returns everything but the last entry of the array. Especially useful on the arguments object. Pass n to exclude the last n elements from the result.
 * @param {*} array 
 * @param {*} n 
 */
function initial(array, n = 1) {
    if (isAvailable(array))
        return Array.prototype.slice.call(array, 0, array.length - n);
}

/**
 * Returns the last element of an array. Passing n will return the last n elements of the array.
 * @param {*} array 
 * @param {*} n 
 */
function last(array, n = 1) {
    if (isAvailable(array))
        if (n === 1)
            return array[array.length - 1];
        else
            return Array.prototype.slice.call(array, array.length - n);
}

/**
 * Returns the rest of the elements in an array. Pass an index to return the values of the array from that index onward.
 * @param {*} array 
 * @param {*} index 
 */
function rest(array, index = 1) {
    if (isAvailable(array, n = 1))
        return Array.prototype.slice.call(array, index);
}

function compact(array) {
    if (isAvailable(array)) {
        return Array.prototype.filter.call(array, function(element) {
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
        if (!flatten.storeArray)
            flatten.storeArray = [];
        Array.prototype.forEach.call(array, function(item) {
            if (Array.isArray(item))
                flatten(item);
            else
                flatten.storeArray.push(item);
        });
        return flatten.storeArray;
    }
}

/**
 * Returns a copy of the array with all instances of the values removed.
 * @param {*} array 
 * @param {*} values 
 */
function without(array, ...values) {
    if (isAvailable(array)) {
        return Array.prototype.filter.call(array, function(item) {
            return !values.some(function(items) {
                return items === item;
            });
        });
    }
}
/**
 * Computes the union of the passed-in arrays: the list of unique items, in order, that are present in one or more of the arrays. 
 * @param {*} arrays 
 */
function union(...arrays) {
    const s = new Set();
    for (let i = 0; i < arrays.length; i++) {
        arrays[i].forEach(function(item) {
            s.add(item);
        });
    }
    return Array.from(s);
}
/**
 * Computes the list of values that are the intersection of all the arrays. Each value in the result is present in each of the arrays.
 * @param {*} arrays 
 */
function intersection(...arrays) {
    var storeArray = [],
        result = [];
    //to avoid cases like [1, 2, 2] to be misjudged
    if (arrays.length === 1)
        return arrays[0];

    storeArray = storeArray.concat(...arrays).sort();
    var tmp = storeArray[0],
        count = 0;
    for (let i = 0; i < storeArray.length; i++) {
        if (tmp === storeArray[i])
            count++;
        else {
            if (count >= arrays.length)
                result.push(tmp);
            tmp = storeArray[i];
            count = 1;
        }
    }
    if (count >= arrays.length)
        result.push(tmp);
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
    difference
};