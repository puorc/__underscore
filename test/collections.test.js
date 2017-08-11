const collections = require("../src/collections.js");

// function each has been tested.

test("collections-map-array", () => {
    expect(collections.map([1, 2, 3], function(num) { return num * 3; })).toEqual([3, 6, 9]);
})

test("collections-map-object", () => {
    expect(collections.map({ one: 1, two: 2, three: 3 }, function(num, key) { return num * 3; })).toEqual([3, 6, 9]);
})

test("collections-filter", () => {
    expect(collections.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; })).toEqual([2, 4, 6]);
})

test("collections-every", () => {
    expect(collections.every([2, 4, 5], function(num) { return num % 2 == 0; })).toBeFalsy();
})

test("collections-some", () => {
    expect(collections.some([null, 0, 'yes', false])).toBeTruthy();
})

test("collections-pluck", () => {
    var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
    expect(collections.pluck(stooges, 'name')).toEqual( ["moe", "larry", "curly"]);
})

test("collections-max", () => {
    var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
    expect(collections.max(stooges, function(stooge){ return stooge.age; })).toEqual({name: 'curly', age: 60});
})

test("collections-toArray", () => {
    expect((function(){ return collections.toArray(arguments).slice(1); })(1, 2, 3, 4)).toEqual([2, 3, 4]);
})

test("collections-size", () => {
    expect(collections.size({one: 1, two: 2, three: 3})).toBe(3);
})

test("collections-partition", () => {
    expect(collections.partition([0, 1, 2, 3, 4, 5], function (value) {return value % 2 !== 0})).toEqual([[1, 3, 5], [0, 2, 4]]);
})