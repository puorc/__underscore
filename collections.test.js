const collections = require("./collections.js");

// function each has been tested.

test("collections-map-array", () => {
    expect(collections.map([1, 2, 3], function(num) { return num * 3; })).toEqual([3, 6, 9]);
})

test("collections-map-object", () => {
    expect(collections.map({ one: 1, two: 2, three: 3 }, function(num, key) { return num * 3; })).toEqual([3, 6, 9]);
})