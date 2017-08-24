const collections = require("../src/collections.js");

test("collections-each-array", () => {
    var mockFunc = jest.fn();
    collections.each([0, 1, 2], mockFunc);
    expect(mockFunc.mock.calls.length).toBe(3);
    expect(mockFunc.mock.calls[0][0]).toBe(0);
    expect(mockFunc.mock.calls[2][1]).toBe(2);
})

test("collections-each-object", () => {
    var mockFunc = jest.fn();
    collections.each({
        a: 1,
        b: 2,
        c: 3
    }, mockFunc, null);
    expect(mockFunc.mock.calls.length).toBe(3);
    expect(mockFunc.mock.calls[0][0]).toBe(1);
    expect(mockFunc.mock.calls[2][1]).toBe('c');
})

test("collections-map-array", () => {
    expect(collections.map([1, 2, 3], function(num) {
        return num * 3;
    })).toEqual([3, 6, 9]);
})

test("collections-map-object", () => {
    expect(collections.map({
        one: 1,
        two: 2,
        three: 3
    }, function(num, key) {
        return num * 3;
    }, null)).toEqual([3, 6, 9]);
})

test("collections-reduce-array", () => {
    expect(collections.reduce([1, 2, 3], function(memo, num) { return memo + num; }, 0, null)).toBe(6);
    expect(collections.reduce([1, 2, 3], function(memo, num) { return memo + num; })).toBe(6);
})

test("collections-reduce-object", () => {
    expect(collections.reduce({ a: 1, b: 2, c: 3 }, function(memo, num) { return memo + num; }, 0)).toBe(6);
    expect(collections.reduce({ a: 1, b: 2, c: 3 }, function(memo, num) { return memo + num; })).toBe(6);
})

test("collections-contain-array", () => {
    expect(collections.contains([5, 6, 8], 6)).toBeTruthy();
    expect(collections.contains([5, 6, 8], 7)).toBeFalsy();
})

test("collections-contain-abnormal", () => {
    expect(collections.contains(7)).toBeFalsy();
})

test("collections-contain-array", () => {
    expect(collections.contains({
        a: 5,
        b: 6,
        c: 8
    }, 6)).toBeTruthy();
    expect(collections.contains({
        a: 5,
        b: 6,
        c: 8
    }, 7)).toBeFalsy();
})

test("collections-sample-array", () => {
    var nums = [8, 6, 9, 10];
    expect(collections.contains(nums, collections.sample(nums))).toBeTruthy();
    expect(collections.every(collections.sample(nums, 3), item => collections.contains(nums, item))).toBeTruthy();
})

test("collections-sample-array", () => {
    var nums = [8, 6, 9, 10];
    expect(collections.contains(nums, collections.sample(nums))).toBeTruthy();
    expect(collections.every(collections.sample(nums, 3), item => collections.contains(nums, item))).toBeTruthy();
})

test("collections-sample-object", () => {
    var nums = { a: 8, b: 6, c: 9, d: 10 };
    expect(collections.contains(nums, collections.sample(nums))).toBeTruthy();
    expect(collections.every(collections.sample(nums, 3), item => collections.contains(nums, item))).toBeTruthy();
})

test("collections-sample-abnormal", () => {
    expect(collections.sample(4)).toBeUndefined();
})

test("collections-filter", () => {
    expect(collections.filter([1, 2, 3, 4, 5, 6], function(num) {
        return num % 2 == 0;
    }, null)).toEqual([2, 4, 6]);
})

test("collections-every-false", () => {
    expect(collections.every([2, 4, 5], function(num) {
        return num % 2 == 0;
    })).toBeFalsy();
})

test("collections-every-true", () => {
    expect(collections.every([2, 4, 6], function(num) {
        return num % 2 == 0;
    })).toBeTruthy();
})

test("collections-every-false-obj", () => {
    expect(collections.every({
        a: 2,
        b: 4,
        c: 5
    }, function(num) {
        return num % 2 == 0;
    }, null)).toBeFalsy();
})

test("collections-some", () => {
    expect(collections.some([null, 0, 'yes', false], Boolean, null)).toBeTruthy();
})

test("collections-some", () => {
    expect(collections.some({
        a: null,
        b: 0,
        c: 'yes',
        d: false
    }, Boolean, null)).toBeTruthy();
})

test("collections-pluck", () => {
    var stooges = [{
            name: 'moe',
            age: 40
        }, {
            name: 'larry',
            age: 50
        }, {
            name: 'curly',
            age: 60
        },
        {
            c: "test"
        }
    ];
    expect(collections.pluck(stooges, 'name')).toEqual(["moe", "larry", "curly"]);
})

test("collections-max", () => {
    var stooges = [{
        name: 'moe',
        age: 40
    }, {
        name: 'larry',
        age: 30
    }, {
        name: 'curly',
        age: 60
    }];
    expect(collections.max(stooges, function(stooge) {
        return stooge.age;
    }, null)).toEqual({
        name: 'curly',
        age: 60
    });
})

test("collections-toArray", () => {
    expect((function() {
        return collections.toArray(arguments).slice(1);
    })(1, 2, 3, 4)).toEqual([2, 3, 4]);
})

test("collections-size-object", () => {
    expect(collections.size({
        one: 1,
        two: 2,
        three: 3
    })).toBe(3);
})

test("collections-size-array", () => {
    expect(collections.size([1, 2, 3])).toBe(3);
})

test("collections-size-abnormal", () => {
    expect(collections.size(5)).toBe(0);
})

test("collections-partition", () => {
    expect(collections.partition([0, 1, 2, 3, 4, 5], function(value) {
        return value % 2 !== 0
    })).toEqual([
        [1, 3, 5],
        [0, 2, 4]
    ]);
})

test("collections-partition-abnormal", () => {
    expect(collections.partition(5, function(value) {
        return value % 2 !== 0
    })).toEqual([]);
})