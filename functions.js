/**
 * Bind a function to an object, meaning that whenever the function is called, the value of this will be the object. 
 * Optionally, pass arguments to the function to pre-fill them, also known as partial application.
 * @param {*} func 
 * @param {*} object 
 * @param {*} args 
 */
function bind(func, object, ...args) {
    return function () {
        return func.apply(object, args);
    }
}

module.exports = {
    bind
}