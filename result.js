(function() {

    // Establish the root object, `window` (`self`) in the browser, `global`
    // on the server, or `this` in some virtual machines. We use `self`
    // instead of `window` for `WebWorker` support.
    var root = typeof self == 'object' && self.self === self && self ||
        typeof global == 'object' && global.global === global && global ||
        this || {};

    // Save the previous value of the `_` variable.
    var previousUnderscore = root._;

    // Create a safe reference to the Underscore object for use below.
    var _ = function(obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    };

    // Export the Underscore object for **Node.js**, with
    // backwards-compatibility for their old module API. If we're in
    // the browser, add `_` as a global object.
    // (`nodeType` is checked to ensure that `module`
    // and `exports` are not HTML elements.)
    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }

    _.AUTHOR = "Pu Zhao";

    _.isArrayLike = function isArrayLike(array) {
        return array != null && array.length > 0;
    }

    /**
     * Returns the first element of an array. Passing n will return the first n elements of the array.
     * @param {*} array 
     * @param {*} n 
     */
    _.first = function first(array, n = 1) {
        if (_.isArrayLike(array))
            if (n === 1)
                return array[0];
            else
                return _.initial(array, array.length - n);
    }

    /**
     * Returns everything but the last entry of the array. Especially useful on the arguments object. Pass n to exclude the last n elements from the result.
     * @param {*} array 
     * @param {*} n 
     */
    // consider the case when n > length
    _.initial = function initial(array, n = 1) {
        if (_.isArrayLike(array))
            return Array.prototype.slice.call(array, 0, Math.max(0, array.length - n));
    }

    /**
     * Returns the last element of an array. Passing n will return the last n elements of the array.
     * @param {*} array 
     * @param {*} n 
     */
    _.last = function last(array, n = 1) {
        if (_.isArrayLike(array))
            if (n === 1)
                return array[array.length - 1];
            else
                return _.rest(array, Math.max(0, array.length - n));
    }

    /**
     * Returns the rest of the elements in an array. Pass an index to return the values of the array from that index onward.
     * @param {*} array 
     * @param {*} index 
     */
    _.rest = function rest(array, index = 1) {
        if (_.isArrayLike(array))
            return Array.prototype.slice.call(array, index);
    }

    /**
     * Returns a copy of the array with all falsy values removed. In JavaScript, false, null, 0, "", undefined and NaN are all falsy.
     * @param {*} array 
     */
    _.compact = function compact(array) {
            if (_.isArrayLike(array)) {
                return _.filter(array, Boolean);
            }
        }
        /**
         * Flattens a nested array (the nesting can be to any depth). If you pass shallow, the array will only be flattened a single level.
         * @param {*} array 
         */
        // should not use function property to recursive. 
        // It could be treat as static vars.
    _.flatten = function flatten(array, output) {
        if (_.isArrayLike(array)) {
            output = output || [];
            _.each(array, item => {
                _.isArray(item) ? flatten(item, output) : output.push(item)
            });
            return output;
        } else
            return [];
    }

    /**
     * Returns a copy of the array with all instances of the values removed.
     * @param {*} array 
     * @param {*} values 
     */
    _.without = function without(array, ...values) {
            if (_.isArrayLike(array)) {
                return _.filter(array, item =>
                    !_.some(values, theItem => theItem === item)
                );
            } else
                return [];
        }
        /**
         * Computes the union of the passed-in arrays: the list of unique items, in order, that are present in one or more of the arrays. 
         * @param {*} arrays 
         */
    _.union = function union(...arrays) {
            const s = new Set();
            arrays.forEach(array => array.forEach(item => s.add(item)));
            return Array.from(s);
        }
        /**
         * Computes the list of values that are the intersection of all the arrays. Each value in the result is present in each of the arrays.
         * @param {*} arrays 
         */
    _.intersection = function intersection(...arrays) {
        var contains = (array, item) => array.some(element => element === item),
            result = [];
        for (let element of arrays[0]) {
            if (contains(result, element)) continue;
            if (arrays.every(array => contains(array, element))) result.push(element);
        }
        return result;
    }

    /**
     * Similar to without, but returns the values from array that are not present in the other arrays.
     * @param {*} array 
     * @param {*} others 
     */
    _.difference = function difference(array, others = []) {
        return _.without(array, ...others);
    }

    /**
     * Merges together the values of each of the arrays with the values at the corresponding position. 
     * Useful when you have separate data sources that are coordinated through matching array indexes.
     * @param {*} arrays 
     */
    _.zip = function zip(...arrays) {
        var result = [];
        if (arrays.length === 0) return null;
        if (arrays.length === 1) return arrays[0];
        if (!arrays.every(function(item) {
                return item.length === arrays[0].length;
            })) {
            return null;
        } else {
            for (let i = 0; i < arrays[0].length; i++) {
                let tmpArray = [];
                for (let j = 0; j < arrays.length; j++) {
                    tmpArray.push(arrays[j][i]);
                }
                result.push(tmpArray);
            }
        }
        return result;
    }

    /**
     * The opposite of zip. Given an array of arrays, returns a series of new arrays, 
     * the first of which contains all of the first elements in the input arrays, the second of which contains all of the second elements, and so on.
     * @param {*} array 
     */
    _.unzip = function unzip(arrays) {
            return _.zip(...arrays);
        }
        /**
         * Converts arrays into objects. 
         * Pass either a single list of [key, value] pairs, or a list of keys, and a list of values. If duplicate keys exist, the last value wins.
         * @param {*} list 
         * @param {*} values 
         */
    _.object = function object(list, values) {
        var returnObject = {};
        if (_.isArray(list) && _.isArray(values)) {
            _.each(list, (item, index) => {
                returnObject[item] = values[index];
            })
        }
        return returnObject;
    }


    /**
     * A function to create flexibly-numbered lists of integers, handy for each and map loops. start, if omitted, defaults to 0; step defaults to 1. 
     * Returns a list of integers from start (inclusive) to stop (exclusive), incremented (or decremented) by step, exclusive. Note that ranges 
     * that stop before they start are considered to be zero-length instead of negative — if you'd like a negative range, use a negative step. 
     * @param {*} start 
     * @param {*} stop 
     * @param {*} step 
     */
    _.range = function range() {
        var resultArray = [],
            start = 0,
            step = 1,
            stop = 0;
        switch (arguments.length) {
            case 1:
                stop = arguments[0];
                break;
            case 2:
                start = arguments[0];
                stop = arguments[1];
                break;
            case 3:
                start = arguments[0];
                stop = arguments[1];
                step = arguments[2];
                break;
        }
        // abs function deals with the negative condition, to make sure the loop can run correctly.
        for (let i = start; Math.abs(i) < Math.abs(stop); i += step) {
            resultArray.push(i);
        }
        return resultArray;
    }

    /**
     * Returns true if object is a Function.
     * @param {*} object 
     */
    _.isFunction = function isFunction(object) {
        return typeof object === "function";
    }

    /**
     * Iterates over a list of elements, yielding each in turn to an iteratee function. The iteratee is bound to the context object, if one is passed.
     * Each invocation of iteratee is called with three arguments: (element, index, list). If list is a JavaScript object, iteratee's arguments will be (value, key, list). 
     * Returns the list for chaining.
     * @param {*} list 
     * @param {*} iteratee 
     * @param {*} context 
     */
    _.each = function each(list, iteratee, context) {
        var bindedIteratee = iteratee;
        if (context !== undefined) {
            bindedIteratee = iteratee.bind(context);
        }
        if (_.isObject(list)) {
            for (let key in list) {
                bindedIteratee(list[key], key, list);
            }
        }
        if (_.isArray(list)) {
            for (let i = 0; i < list.length; i++) {
                bindedIteratee(list[i], i, list);
            }
        }
    }

    /**
     * Produces a new array of values by mapping each value in list through a transformation function (iteratee). 
     * The iteratee is passed three arguments: the value, then the index (or key) of the iteration, and finally a reference to the entire list.
     * @param {*} list 
     * @param {*} iteratee 
     * @param {*} context 
     */
    _.map = function map(list, iteratee, context) {
        var bindedIteratee = iteratee,
            returnArray = [];
        if (context !== undefined) {
            bindedIteratee = iteratee.bind(context);
        }
        if (_.isArray(list)) {
            for (let i = 0; i < list.length; i++) {
                returnArray.push(bindedIteratee(list[i], i, list));
            }
        }
        if (_.isObject(list)) {
            for (let key in list) {
                returnArray.push(bindedIteratee(list[key], key, list));
            }
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
    _.reduce = function reduce(list, iteratee, memo, context) {
        var bindedIteratee = iteratee,
            keys = !_.isArray(list) && _.keys(list),
            length = (keys || list).length,
            index = 0;
        if (context !== undefined) {
            bindedIteratee = iteratee.bind(context);
        }
        if (memo === undefined) {
            memo = list[keys ? keys[index] : index];
            index++;
        }
        for (; index < length; index++) {
            let currentKey = keys ? keys[index] : index;
            memo = bindedIteratee(memo, list[currentKey], currentKey, list);
        }
        return memo;
    }

    /**
     * Looks through each value in the list, returning an array of all the values that pass a truth test (predicate).
     * @param {*} list 
     * @param {*} predicate 
     * @param {*} context 
     */
    _.filter = function filter(list, predicate, context) {
        var bindedIteratee = predicate,
            result = [];
        if (context !== undefined) {
            bindedIteratee = predicate.bind(context);
        }
        _.each(list, function(value, index, list) {
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
    _.every = function every(list, predicate, context) {
        var bindedIteratee = predicate;
        if (context !== undefined) {
            bindedIteratee = predicate.bind(context);
        }
        if (_.isArray(list)) {
            for (let i = 0; i < list.length; i++) {
                if (!bindedIteratee(list[i], i, list))
                    return false;
            }
        }
        if (_.isObject(list)) {
            for (let key in list) {
                if (!bindedIteratee(list[key], key, list)) {
                    return false;
                }
            }
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
    _.some = function some(list, predicate, context) {
        var bindedIteratee = predicate;
        if (context !== undefined) {
            bindedIteratee = predicate.bind(context);
        }
        if (_.isArray(list)) {
            for (let i = 0; i < list.length; i++) {
                if (bindedIteratee(list[i], i, list))
                    return true;
            }
        }
        if (_.isObject(list)) {
            for (let key in list) {
                if (bindedIteratee(list[key], key, list)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * A convenient version of what is perhaps the most common use-case for map: extracting a list of property values.
     * @param {*} list 
     * @param {*} propertyName 
     */
    _.pluck = function pluck(list, propertyName) {
        var resultArray = [];
        _.each(list, item => {
            if (propertyName in item) resultArray.push(item[propertyName]);
        });
        return resultArray;
    }

    /**
     * Returns the maximum value in list. If an iteratee function is provided, 
     * it will be used on each value to generate the criterion by which the value is ranked.
     * @param {*} list 
     * @param {*} iteratee 
     * @param {*} context 
     */
    _.max = function max(list, iteratee, context) {
        var maxValue = -Infinity,
            maxObj;
        _.each(list, function(item, key, list) {
            if (iteratee(item) > maxValue) {
                maxValue = iteratee(item);
                maxObj = item;
            }
        }, context);
        return maxObj;
    }

    /**
     * Produce a random sample from the list. Pass a number to return n random elements from the list. 
     * Otherwise a single random item will be returned.
     * @param {*} list 
     * @param {*} n 
     */
    _.sample = function sample(list, n = 1) {
        var theList = [],
            returnArray = [];
        if (_.isArray(list))
            theList = list;
        else if (_.isObject(list))
            theList = _.values(list);
        else
            return;
        if (n === 1)
            return theList[_.random(theList.length - 1)];
        else {
            for (let i = 0; i < n; i++) {
                returnArray.push(theList[_.random(theList.length - 1)]);
            }
            return returnArray;
        }
    }

    /**
     * Returns true if the value is present in the list.
     * @param {*} list 
     * @param {*} value 
     */
    _.contains = function contains(list, value) {
        var theList = [];
        if (_.isObject(list))
            theList = _.values(list);
        else if (_.isArray(list))
            theList = list;
        else
            return false;
        return _.some(list, item => item === value);
    }

    /**
     * Creates a real Array from the list (anything that can be iterated over). 
     * Useful for transmuting the arguments object.
     * @param {*} list 
     */
    _.toArray = function toArray(list) {
        return Array.prototype.slice.call(list);
    }

    /**
     * Return the number of values in the list.
     * @param {*} list 
     */
    _.size = function size(list) {
        if (_.isArray(list)) return list.length;
        if (_.isObject(list)) return Object.keys(list).length;
        return 0;
    }

    /**
     * Split array into two arrays: one whose elements all satisfy predicate and one whose elements all do not satisfy predicate.
     * @param {*} array 
     * @param {*} predicate 
     */
    _.partition = function partition(array, predicate) {
        if (!(array instanceof Array)) return [];
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

    /**
     * Bind a function to an object, meaning that whenever the function is called, the value of this will be the object. 
     * Optionally, pass arguments to the function to pre-fill them, also known as partial application.
     * @param {*} func 
     * @param {*} object 
     * @param {*} args 
     */
    _.bind = function bind(func, object, ...args) {
        return function(calledArgs) {
            return func.apply(object, args.concat(calledArgs));
        }
    }

    /**
     * Partially apply a function by filling in any number of its arguments, without changing its dynamic this value.
     * @param {*} func 
     * @param {*} args 
     */
    _.partial = function partial(func, ...args) {
        return _.bind(func, this, ...args);
    }

    /**
     * Memoizes a given function by caching the computed result. Useful for speeding up slow-running computations. 
     * @param {*} func 
     * @param {*} hash 
     */
    _.memoize = function memoize(func, hash) {
        var memoize = function(key) {
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
    _.delay = function delay(func, wait, ...args) {
        return setTimeout(func, wait, ...args);
    }

    /**
     * Defers invoking the function until the current call stack has cleared, 
     * similar to using setTimeout with a delay of 0. 
     * @param {*} func 
     * @param {*} args 
     */
    _.defer = function defer(func, ...args) {
        return setTimeout(func, 0, ...args);
    }

    /**
     * Creates a version of the function that can only be called one time. Repeated calls to the modified function will have no effect, 
     * returning the value from the original call. 
     * Useful for initialization functions, instead of having to set a boolean flag and then check it later.
     * @param {*} func 
     */
    _.once = function once(func) {
        var isRun = false,
            result;
        return function() {
            if (!isRun) {
                result = func(...arguments);
                isRun = true;
                return result;
            } else {
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
    _.after = function after(count, func) {
        return function() {
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
    _.before = function before(count, func) {
        var memo;
        return function() {
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
    _.negate = function negate(predicate) {
        return function() {
            return !predicate.apply(this, arguments);
        }
    }

    _.compose = function compose(...funcs) {
        return function() {
            var tmp = funcs[0].apply(this, arguments);
            for (let i = 1; i < funcs.length; i++) {
                tmp = funcs[i].call(this, tmp);
            }
            return tmp;
        }
    }

    /**
     * Retrieve all the names of the object's own enumerable properties.
     * @param {*} object 
     */
    _.keys = function keys(object) {
        return Object.keys(object);
    }

    /**
     * Retrieve all the names of object's own and inherited properties.
     * @param {*} object 
     */
    _.allKeys = function allKeys(object) {
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
    _.values = function values(object) {
        var result = [];
        for (let key in object)
            result.push(object[key]);
        return result;
    }

    /**
     * Convert an object into a list of [key, value] pairs.
     * @param {*} object 
     */
    _.pairs = function pairs(object) {
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
    _.invert = function invert(object) {
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
    _.functions = function functions(object) {
        var returnArray = [];
        for (let key in object) {
            if (_.isFunction(object[key])) {
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
    _.extend = function extend(destination, ...sources) {
        _.each(sources, element => {
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
    _.pick = function pick(object, ...keys) {
        var returnObject = {};
        for (let i = 0; i < keys.length; i++) {
            if (_.isString(keys[i])) {
                for (let key in object)
                    if (key === keys[i])
                        returnObject[key] = object[key];
            }
            if (_.isFunction(keys[i])) {
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
    _.omit = function omit(object, ...keys) {
        var returnObject = {};
        for (let i = 0; i < keys.length; i++) {
            if (_.isString(keys[i])) {
                for (let key in object)
                    if (key !== keys[i])
                        returnObject[key] = object[key];
            }
            if (_.isFunction(keys[i])) {
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
    _.defaults = function defaults(object, ...defaults) {
        _.each(defaults, function(item) {
            if (_.isObject(item)) {
                for (let key in item) {
                    if (object[key] === undefined)
                        object[key] = item[key];
                }
            }
        })
        return object;
    }

    _.clone = function clone(object) {
        if (typeof object !== "object") return object;
        return _.isArray(object) ? object.slice() : _.extend({}, object);
    }

    /**
     * Returns a function that will itself return the key property of any passed-in object.
     * @param {*} key 
     */
    _.property = function property(key) {
        return function(that) {
            return that[key];
        }
    }

    var deepEq = function deepEq(a, b) {
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

    var isEq = function isEq(a, b) {
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

    /**
     * Performs an optimized deep comparison between the two objects, 
     * to determine if they should be considered equal.
     * @param {*} object 
     * @param {*} other 
     */
    _.isEqual = function isEqual(object, other) {
        return isEq(object, other);
    }

    /**
     * Tells you if the keys and values in properties are contained in object.
     * @param {*} object 
     * @param {*} properties 
     */
    _.isMatch = function isMatch(object, properties) {
        for (let key in properties) {
            if (!_.isEqual(object[key], properties[key]))
                return false;
        }
        return true;
    }

    /**
     * Returns true if an enumerable object contains no values (no enumerable own-properties). 
     * For strings and array-like objects _.isEmpty checks if the length property is 0.
     * @param {*} object 
     */
    _.isEmpty = function isEmpty(object) {
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
    _.isArray = function isArray(object) {
        return Array.isArray(object) || object instanceof Array;
    }

    /**
     * Returns true if object is a Function.
     * @param {*} object 
     */
    _.isFunction = function isFunction(object) {
        return typeof object === "function";
    }

    /**
     * Returns true if value is an Object. 
     * Note that JavaScript arrays and functions are objects, 
     * while (normal) strings and numbers are not.
     * @param {*} value 
     */
    _.isObject = function isObject(value) {
        return typeof value === "object" && !_.isArray(value) && !_.isFunction(value);
    }

    /**
     * Returns true if object is a String.
     * @param {*} object 
     */
    _.isString = function isString(object) {
        return typeof object === "string";
    }

    /**
     * Returns true if object is a Number (including NaN).
     * @param {*} object 
     */
    _.isNumber = function isNumber(object) {
        return typeof object === "number";
    }

    /**
     * Returns true if object is either true or false.
     * @param {*} object 
     */
    _.isBoolean = function isBoolean(object) {
        return typeof object === "boolean";
    }

    /**
     * Returns true if object is a Date.
     * @param {*} object 
     */
    _.isDate = function isDate(object) {
        return Object.prototype.toString.call(object) === "[object Date]";
    }

    /**
     * Returns true if object is a RegExp.
     * @param {*} object 
     */
    _.isRegExp = function isRegExp(object) {
        return Object.prototype.toString.call(object) === "[object RegExp]";
    }

    /**
     * Returns true if object inherits from an Error.
     * @param {*} object 
     */
    _.isError = function isError(object) {
        return Object.prototype.toString.call(object) === "[object Error]";
    }

    /**
     * Returns true if object is NaN.
     * @param {*} object 
     */
    _.isNaN = function isNaN(object) {
        return object !== object;
    }

    /**
     * Returns true if the value of object is null.
     * @param {*} object 
     */
    _.isNull = function isNull(object) {
        return object === null;
    }

    /**
     * Returns true if value is undefined.
     * @param {*} value 
     */
    _.isUndefine = function isUndefine(value) {
        return arguments.length === 1 && value === undefined;
    }

    /**
     * Returns true if object is a finite Number.
     * @param {*} object 
     */
    _.isFinite = function isFinite(object) {
        return _.isNumber(object) && object !== Infinity && object !== -Infinity;
    }

    /**
     * Creates a function that returns the same value that is used as the argument of _.constant.
     * @param {*} value 
     */
    _.constant = function constant(value) {
        return function() {
            return value;
        }
    }

    /**
     * Returns a random integer between min and max, inclusive. 
     * If you only pass one argument, it will return a number between 0 and that number.
     * @param {*} min 
     * @param {*} max 
     */
    _.random = function random(min, max) {
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
    _.result = function result(object, property, defaultValue) {
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

}());