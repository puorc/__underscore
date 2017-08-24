const utility = require("../src/utility.js");

test("utility-constant", () => {
    var stooge = { name: 'moe' };
    expect(stooge === utility.constant(stooge)()).toBeTruthy();
})

test("utility-random-range", () => {
    var result = utility.random(5, 10);
    expect(result >= 5 && result <= 10).toBeTruthy();
})

test("utility-random-singleRange", () => {
    var result = utility.random(10);
    expect(result >= 0 && result <= 10).toBeTruthy();
})

test("utility-result-property", () => {
    var object = { cheese: 'crumpets', stuff: function() { return 'nonsense'; } };
    expect(utility.result(object, 'cheese')).toBe("crumpets");
})

test("utility-result-func", () => {
    var object = { cheese: 'crumpets', stuff: function() { return 'nonsense'; } };
    expect(utility.result(object, 'stuff')).toBe("nonsense");
})

test("utility-result-default", () => {
    var object = { cheese: 'crumpets', stuff: function() { return 'nonsense'; } };
    expect(utility.result(object, 'meat', 'ham')).toBe("ham");
})

test("utility-result-default-function", () => {
    var object = { cheese: 'crumpets', stuff: function() { return 'nonsense'; } };
    expect(utility.result(object, 'meat', function() { return 'nonsense'; })).toBe("nonsense");
})