const functions = require("../src/functions.js");

test("func-bind", () => {
    var func = function(greeting) { return greeting + ': ' + this.name };
    func = functions.bind(func, { name: 'moe' }, 'hi');
    expect(func()).toBe('hi: moe');
})

test("func-partial", () => {
   var subtract = function(a, b) { return b - a; };
   var sub5 = functions.partial(subtract, 5);
   expect(sub5(20)).toBe(15);
})

test("func-memoize", () => {
    var fibonacci = functions.memoize(function(n) {
        return n < 2 ? n: fibonacci(n - 1) + fibonacci(n - 2);
      });
    expect(fibonacci(3)).toBe(2);
})

test("func-compose", () => {
    var greet = function(name) { return "hi: " + name; };
    var exclaim = function(statement) { return statement.toUpperCase() + "!"; };
    var welcome = functions.compose(exclaim, greet);
    expect(welcome('moe')).toBe('hi: MOE!');
})