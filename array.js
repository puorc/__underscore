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
function flatten(array, shallow) {
   if (isAvailable(array)) {
              
   } 
} 
module.exports = {
    first,
    initial,
    last,
    rest,
    compact
};
