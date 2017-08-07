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