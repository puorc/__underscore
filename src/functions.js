/**
 * Bind a function to an object, meaning that whenever the function is called, the value of this will be the object. 
 * Optionally, pass arguments to the function to pre-fill them, also known as partial application.
 * @param {*} func 
 * @param {*} object 
 * @param {*} args 
 */
function bind(func, object, ...args) {
    return function (calledArgs) {
        return func.apply(object, args.concat(calledArgs));
    }
}

/**
 * Partially apply a function by filling in any number of its arguments, without changing its dynamic this value.
 * @param {*} func 
 * @param {*} args 
 */
function partial(func, ...args) {
    return bind(func, this, ...args);
}

/**
 * Memoizes a given function by caching the computed result. Useful for speeding up slow-running computations. 
 * @param {*} func 
 * @param {*} hash 
 */
function memoize(func, hash) {
    var memoize = function (key) {
        var cache = memoize.cache;
        var addr = '' + (hash ? hash.apply(this, arguments) : key);
        if (!(addr in cache)) cache[addr] = func.apply(this, arguments);
        return cache[addr];
    };
    memoize.cache = {};
    return memoize;
}

/**
 * Much like setTimeout, invokes function after wait milliseconds. 
 * If you pass the optional arguments, they will be forwarded on to the function when it is invoked.
 * @param {*} func 
 * @param {*} wait 
 * @param {*} args 
 */
function delay(func, wait, ...args) {
    return setTimeout(func, wait, ...args);
}

/**
 * Defers invoking the function until the current call stack has cleared, 
 * similar to using setTimeout with a delay of 0. 
 * @param {*} func 
 * @param {*} args 
 */
function defer(func, ...args) {
    return setTimeout(func, 0, ...args);
}

/**
 * Creates a version of the function that can only be called one time. Repeated calls to the modified function will have no effect, 
 * returning the value from the original call. 
 * Useful for initialization functions, instead of having to set a boolean flag and then check it later.
 * @param {*} func 
 */
function once(func) {
    var isRun = false,
    result;
    return function () {
        if (!isRun) {
            result = func(...arguments);
            isRun = true;
            return result;
        }
        else {
            return result;
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
    return function () {
        if (count-- < 1) {
            return func(...Array.prototype.slice(arguments));
        }
    }
}

/**
 * Creates a version of the function that can be called no more than count times. 
 * The result of the last function call is memoized and returned when count has been reached.
 * @param {*} count 
 * @param {*} func 
 */
function before(count, func) {
    var memo;
    return function () {
        if (count-- > 0) {
            memo = func.apply(this, arguments);
        }
        return memo;
    };
}

/**
 * Returns a new negated version of the predicate function.
 * @param {*} predicate 
 */
function negate(predicate) {
    return function () {
        return !predicate.apply(this, arguments);
    }
}

function compose(...funcs) {
    return function () {
        var tmp = funcs[0].apply(this, arguments);
        for (let i = 1; i < funcs.length; i++) {
            tmp = funcs[i].call(this, tmp);
        }
        return tmp;
    }
}

module.exports = {
    bind,
    partial,
    delay,
    defer,
    compose,
    memoize,
    negate,
    once,
    after,
    before
}