const utility = require("./utility.js");

test("utility-constant", () => {
    var stooge = {name: 'moe'};
    expect(stooge === utility.constant(stooge)()).toBeTruthy();
})

test("utility-result-property", () => {
    var object = {cheese: 'crumpets', stuff: function(){ return 'nonsense'; }};
    expect(utility.result(object, 'cheese')).toBe("crumpets");
})

test("utility-result-func", () => {
    var object = {cheese: 'crumpets', stuff: function(){ return 'nonsense'; }};
    expect(utility.result(object, 'stuff')).toBe("nonsense");
})

test("utility-result-default", () => {
    var object = {cheese: 'crumpets', stuff: function(){ return 'nonsense'; }};
    expect((object, 'meat', 'ham')).toBe("ham");
})