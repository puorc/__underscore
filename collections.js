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
                returnArray.push(bindedIteratee(list[i]));
            }
            break;
        case TYPE.object:
            for (let key in list) {
                returnArray.push(bindedIteratee(list[key]));
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

}
module.exports = {
    each,
    map
}