const array = require("./array.js");

test("first-normal", () => {
    expect(array.first([5, 6, 8])).toBe(5);
});

test("first-part", () => {
    expect(array.first([5, 6, 8], 2)).toEqual([5, 6]);
})

test("first-all", () => {
    expect(array.first([5, 6, 8], 5)).toEqual([5, 6, 8]);
})

test("first-abnormal", () => {
    expect(array.first(8)).toBeUndefined();
})

test("initial-normal", () => {
    expect(array.initial([5, 6, 8])).toEqual([5, 6]);
})

test("initial-part", () => {
    expect(array.initial([5, 6, 8], 2)).toEqual([5]);
})

test("initial-all", () => {
    expect(array.initial([5, 6, 8], 8)).toEqual([]);
})

test("initial-abnormal", () => {
    expect(array.initial(50)).toBeUndefined();
})

test("last-normal", () => {
    expect(array.last([5, 6, 8])).toBe(8);
})

test("last-part", () => {
    expect(array.last([5, 6, 8], 2)).toEqual([6, 8]);
})

test("last-all", () => {
    expect(array.last([5, 6, 8], 10)).toEqual([5, 6, 8]);
})

test("last-abnormal", () => {
    expect(array.last(8)).toBeUndefined();
})

test("rest-normal", () => {
    expect(array.rest([5, 6, 8])).toEqual([6, 8]);
})

test("rest-part", () => {
    expect(array.rest([5, 6, 8], 2)).toEqual([8]);
})

test("rest-all", () => {
    expect(array.rest([5, 6, 8], 9)).toEqual([]);
})

test("rest-abnormal", () => {
    expect(array.rest(8)).toBeUndefined();
})

test("compact-normal", () => {
    expect(array.compact([5, 6, '', false, null, undefined, 0, NaN])).toEqual([5, 6]);
})

test("compact-abnormal", () => {
    expect(array.compact(8)).toBeUndefined();
})

test("flatten-normal", () => {
    expect(array.flatten([1, [2],
        [3, [4]]
    ])).toEqual([1, 2, 3, 4])
})

test("without-normal", () => {
    expect(array.without([1, 2, 1, 0, 3, 1, 4], 0, 1)).toEqual([2, 3, 4])
})

test("without-abnormal", () => {
    expect(array.without([1, 2, 1, 0, 3, 1, 4])).toEqual([1, 2, 1, 0, 3, 1, 4]);
})

test("union-normal", () => {
    expect(array.union([1, 2, 3], [101, 2, 1, 10], [2, 1])).toEqual([1, 2, 3, 101, 10]);
})

test("union-abnormal", () => {
    expect(array.union([1, 2, 3])).toEqual([1, 2, 3]);
})

test("intersection-normal", () => {
    expect(array.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1])).toEqual([1, 2]);
})

test("intersection-different", () => {
    expect(array.intersection([1, 2, 3], [5, 6])).toEqual([]);
})

test("intersection-one", () => {
    expect(array.intersection([1, 2, 3])).toEqual([1, 2, 3]);
})

test("difference-normal", () => {
    expect(array.difference([1, 2, 3, 4, 5], [5, 2, 10])).toEqual([1, 3, 4]);
})

test("difference-abnormal", () => {
    expect(array.difference([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
})

test("zip-normal", () => {
    expect(array.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false])).toEqual([
        ["moe", 30, true],
        ["larry", 40, false],
        ["curly", 50, false]
    ]);
})

test("zip-notEqualLen", () => {
    expect(array.zip([5, 6], [8])).toBeNull();
})

test("zip-null", () => {
    expect(array.zip()).toBeNull();
})

test("unzip-normal", () => {
    expect(array.unzip([
        ["moe", 30, true],
        ["larry", 40, false],
        ["curly", 50, false]
    ])).toEqual([
        ['moe', 'larry', 'curly'],
        [30, 40, 50],
        [true, false, false]
    ]);
})

test("object-normal", () => {
    expect(array.object(['moe', 'larry', 'curly'], [30, 40, 50])).toEqual({ moe: 30, larry: 40, curly: 50 });
})

test("object-abnormal", () => {
    expect(array.object(5, 6)).toEqual({});
})