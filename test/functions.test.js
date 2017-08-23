const functions = require("../src/functions.js");

test("func-bind", () => {
    var func = function (greeting) {
        return greeting + ': ' + this.name
    };
    func = functions.bind(func, {
        name: 'moe'
    }, 'hi');
    expect(func()).toBe('hi: moe');
})

test("func-partial", () => {
    var subtract = function (a, b) {
        return b - a;
    };
    var sub5 = functions.partial(subtract, 5);
    expect(sub5(20)).toBe(15);
})

test("func-once", () => {
    var func = function constant() {
            if (!constant.num)
                constant.num = 0;
            else
                constant.num++;
            return constant.num;
        },
        onceFunc = functions.once(func);
    expect(onceFunc()).toBe(0);
    expect(onceFunc()).toBe(0);
})

test("func-after", () => {
    var func = function constant() {
            if (constant.num == null)
                constant.num = 0;
            else
                constant.num++;
            return constant.num;
        },
        afterFunc = functions.after(2, func);
    expect(afterFunc()).toBeUndefined();
    expect(afterFunc()).toBeUndefined();
    expect(afterFunc()).toBe(0);
    expect(afterFunc()).toBe(1);
})

test("func-before", () => {
    var func = function constant() {
            if (constant.num == null)
                constant.num = 0;
            else
                constant.num++;
            return constant.num;
        },
    beforeFunc = functions.before(2, func);
    expect(beforeFunc()).toBe(0);
    expect(beforeFunc()).toBe(1);
    expect(beforeFunc()).toBe(1);
    expect(beforeFunc()).toBe(1);
})

test("func-memoize", () => {
    var fibonacci = functions.memoize(function (n) {
        return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
    });
    expect(fibonacci(3)).toBe(2);
})

test("func-memoize-hash", () => {
    var fibonacci = functions.memoize(function (n) {
        return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
    }, key => key);
    expect(fibonacci(3)).toBe(2);
})

test("func-negate", () => {
    expect(functions.negate(Boolean)(undefined)).toBeTruthy();
})

test("func-delay", done => {
    function callback(para) {
        expect(para).toBe("test");
        done();
    }
    functions.delay(callback, 10, "test");
})

test("func-defer", done => {
    function callback(para) {
        expect(para).toBe("test");
        done();
    }
    functions.defer(callback, "test");
})

test("func-compose", () => {
    var greet = function (name) {
        return "hi: " + name;
    };
    var exclaim = function (statement) {
        return statement.toUpperCase() + "!";
    };
    var welcome = functions.compose(exclaim, greet);
    expect(welcome('moe')).toBe('hi: MOE!');
})