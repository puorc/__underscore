const objects = require("./objects.js");

test("objects-keys", () => {
    expect(objects.keys({ one: 1, two: 2, three: 3 })).toEqual(["one", "two", "three"]);
})

function Stooge(name) {
    this.name = name;
}
Stooge.prototype.silly = true;

test("object-allKeys", () => {
    expect(objects.allKeys(new Stooge("Moe"))).toEqual(["name", "silly"]);
})

test("objects-values", () => {
    expect(objects.values({ one: 1, two: 2, three: 3 })).toEqual([1, 2, 3]);
})

test("objects-pairs", () => {
    expect(objects.pairs({ one: 1, two: 2, three: 3 })).toEqual([
        ["one", 1],
        ["two", 2],
        ["three", 3]
    ]);
})

test("objects-invert", () => {
    expect(objects.invert({ Moe: "Moses", Larry: "Louis", Curly: "Jerome" })).toEqual({ Moses: "Moe", Louis: "Larry", Jerome: "Curly" });
})

test("objects-functions", () => {
    expect(objects.functions(objects)).toHaveLength(Object.keys(objects).length);
})

test("objects-extend", () => {
    expect(objects.extend({ name: 'moe' }, { age: 50 })).toEqual({ name: 'moe', age: 50 });
})

test("object-pick", () => {
    expect(objects.pick({ name: 'moe', age: 50, userid: 'moe1' }, 'name', 'age')).toEqual({ name: 'moe', age: 50 });
})

test("object-pick-func", () => {
    expect(objects.pick({ name: 'moe', age: 50, userid: 'moe1' }, function(value, key, object) {
        return typeof value === "number";
    })).toEqual({ age: 50 })
})

test("object-omit", () => {
    expect(objects.omit({ name: 'moe', age: 50, userid: 'moe1' }, 'userid')).toEqual({ name: 'moe', age: 50 });
})

test("object-pick-func", () => {
    expect(objects.omit({ name: 'moe', age: 50, userid: 'moe1' }, function(value, key, object) {
        return typeof value === "number";
    })).toEqual({ name: 'moe', userid: 'moe1' })
})

var iceCream = { flavor: "chocolate" };
test("defaults-test", () => {
    expect(objects.defaults(iceCream, { flavor: "vanilla", sprinkles: "lots" })).toEqual({ flavor: "chocolate", sprinkles: "lots" });
})

test("object-clone", () => {
    expect(objects.clone({ name: 'moe' })).toEqual({ name: 'moe' });
})

test("test-property", () => {
    var stooge = { name: 'moe' };
    expect(objects.property('name')(stooge)).toBe('moe');
})