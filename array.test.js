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

test ("compact-abnormal", () => {
    expect(array.compact(8)).toBeUndefined();
})