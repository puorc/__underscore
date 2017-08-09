/**
 * Bind a function to an object, meaning that whenever the function is called, the value of this will be the object. 
 * Optionally, pass arguments to the function to pre-fill them, also known as partial application.
 * @param {*} func 
 * @param {*} object 
 * @param {*} args 
 */
function bind(func, object, ...args) {
    return function() {
        return func.apply(object, args);
    }
}

// bugs here, remain to be solved.
function partial(func, ...args) {
    return bind(func, this, ...args);
}

//memoize(function, [hashFunction]) 

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
    return delay(func, ...args);
}

/**
 * Creates a version of the function that can only be called one time. Repeated calls to the modified function will have no effect, 
 * returning the value from the original call. 
 * Useful for initialization functions, instead of having to set a boolean flag and then check it later.
 * @param {*} func 
 */
function once(func) {
    return function newFunc() {
        if (!newFunc.isCalled) {
            newFunc.isCalled = true;
            newFunc.value = func();
        } else {
            return newFunc.value;
        }
    }
}

/**
 * Creates a version of the function that will only be run after being called count times. 
 * Useful for grouping asynchronous responses, where you want to be sure that all the async calls have finished, before proceeding.
 * @param {*} count 
 * @param {*} func 
 */
function after(count, func) {
    return function newFunc() {
        if (!newFunc.calledTimes) {
            newFunc.calledTimes = 1;
        } else if (calledTimes < count) {} else {
            return func();
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
    return function newFunc() {
        if (!newFunc.calledTimes) {
            newFunc.calledTimes = 1;
            return func();
        } else if (newFunc.calledTimes < count) {
            var result = func();
            if (newFunc.calledTimes = count - 1)
                newFunc.value = result;
            return result;
        } else {}
    }
}

/**
 * Returns a new negated version of the predicate function.
 * @param {*} predicate 
 */
function negate(predicate) {
    return function() {
        return !predicate();
    }
}

function compose(...funcs) {
    return function(value) {
        var tmp = funcs[0](value);
        for (let i = 1; i < funcs.length; i++) {
            tmp = funcs[i](tmp);
        }
        return tmp;
    }
}

module.exports = {
    bind,
    partial,
    delay,
    defer,
    compose
}