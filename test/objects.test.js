const objects = require("../src/objects.js");

test("objects-keys", () => {
    expect(objects.keys({
        one: 1,
        two: 2,
        three: 3
    })).toEqual(["one", "two", "three"]);
})

test("object-allKeys", () => {
    function Stooge(name) {
        this.name = name;
    }
    Stooge.prototype.silly = true;
    expect(objects.allKeys(new Stooge("Moe"))).toEqual(["name", "silly"]);
})

test("objects-values", () => {
    expect(objects.values({
        one: 1,
        two: 2,
        three: 3
    })).toEqual([1, 2, 3]);
})

test("objects-pairs", () => {
    expect(objects.pairs({
        one: 1,
        two: 2,
        three: 3
    })).toEqual([
        ["one", 1],
        ["two", 2],
        ["three", 3]
    ]);
})

test("objects-invert", () => {
    expect(objects.invert({
        Moe: "Moses",
        Larry: "Louis",
        Curly: "Jerome"
    })).toEqual({
        Moses: "Moe",
        Louis: "Larry",
        Jerome: "Curly"
    });
})

test("objects-functions", () => {
    expect(objects.functions({
        a: objects.clone,
        b: "aa"
    })).toEqual(['a'])
});

test("objects-extend", () => {
    expect(objects.extend({
        name: 'moe'
    }, {
        age: 50
    })).toEqual({
        name: 'moe',
        age: 50
    });
})

test("object-pick", () => {
    expect(objects.pick({
        name: 'moe',
        age: 50,
        userid: 'moe1'
    }, 'name', 'age')).toEqual({
        name: 'moe',
        age: 50
    });
})

test("object-pick-func", () => {
    expect(objects.pick({
        name: 'moe',
        age: 50,
        userid: 'moe1'
    }, function(value, key, object) {
        return typeof value === "number";
    })).toEqual({
        age: 50
    })
})

test("object-omit", () => {
    expect(objects.omit({
        name: 'moe',
        age: 50,
        userid: 'moe1'
    }, 'userid')).toEqual({
        name: 'moe',
        age: 50
    });
})

test("object-pick-func", () => {
    expect(objects.omit({
        name: 'moe',
        age: 50,
        userid: 'moe1'
    }, function(value, key, object) {
        return typeof value === "number";
    })).toEqual({
        name: 'moe',
        userid: 'moe1'
    })
})

test("defaults-test", () => {
    var iceCream = {
        flavor: "chocolate"
    };
    expect(objects.defaults(iceCream, {
        flavor: "vanilla",
        sprinkles: "lots"
    }, 8)).toEqual({
        flavor: "chocolate",
        sprinkles: "lots"
    });
})

test("object-clone", () => {
    expect(objects.clone({
        name: 'moe'
    })).toEqual({
        name: 'moe'
    });
})

test("object-clone-not-object", () => {
    expect(objects.clone(5)).toBe(5)
})

test("object-clone-array", () => {
    expect(objects.clone([5, 8, 6])).toEqual([5, 8, 6]);
})

test("test-property", () => {
    var stooge = {
        name: 'moe'
    };
    expect(objects.property('name')(stooge)).toBe('moe');
})

test("object-isEqual-object", () => {
    var stooge = {
        name: 'moe',
        luckyNumbers: [13, 27, [5, 8]]
    };
    var clone = {
        name: 'moe',
        luckyNumbers: [13, 27, [5, 8]]
    };
    expect(objects.isEqual(stooge, clone)).toBeTruthy();
})

test("object-isEqual-zero", () => {
    expect(objects.isEqual(+0, -0)).toBeFalsy();
})

test("object-isEqual-null", () => {
    expect(objects.isEqual(null, undefined)).toBeFalsy();
})

test("object-isEqual-NaN", () => {
    expect(objects.isEqual(NaN, NaN)).toBeTruthy();
})

test("object-isEqual-notEqual", () => {
    expect(objects.isEqual(5, "c")).toBeFalsy();
})

test("object-isEqual-StringObject", () => {
    expect(objects.isEqual(new String("5"), new String("5"))).toBeTruthy();
})

test("object-isEqual-NumberObject", () => {
    expect(objects.isEqual(new Number(5), new Number(8))).toBeFalsy();
})

test("object-isEqual-DateObject", () => {
    expect(objects.isEqual(new Date, new Date)).toBeTruthy();
})

test("object-isEqual-notEqualLengthArray", () => {
    expect(objects.isEqual([5, 6, 8], [4, 2])).toBeFalsy();
})

test("object-isEqual-BooleanObject", () => {
    expect(objects.isEqual(new Boolean(true), new Boolean(false))).toBeFalsy();
})

test("object-isEqual-different-composed-types", () => {
    expect(objects.isEqual({}, [])).toBeFalsy();
})

test("object-isEqual-RegExpObject", () => {
    expect(objects.isEqual(/a/, /a/)).toBeTruthy();
})

test("object-isEqual-differentArray", () => {
    expect(objects.isEqual([5, 10, 8], [5, 7, 8])).toBeFalsy();
})

test("object-isEqual-differentObj", () => {
    expect(objects.isEqual({
        a: "c",
        b: "c"
    }, {
        a: "c",
        d: "c"
    })).toBeFalsy();
})

test("object-isMatch", () => {
    var stooge = {
        name: 'moe',
        age: 32
    };
    expect(objects.isMatch(stooge, {
        age: 32
    })).toBeTruthy();
})

test("object-isMatch-not", () => {
    var stooge = {
        name: 'moe',
        age: 32
    };
    expect(objects.isMatch(stooge, {
        cb: 32
    })).toBeFalsy();
})

test("object-isEmpty-arraylike", () => {
    expect(objects.isEmpty([1, 2, 3])).toBeFalsy();
})

test("object-isEmpty-abnormal", () => {
    expect(objects.isEmpty(8)).toBeTruthy();
})

test("object-isEmpty-object", () => {
    expect(objects.isEmpty({})).toBeTruthy();
})

test("object-isArray-argument", () => {
    expect((function() {
        return objects.isArray(arguments);
    })()).toBeFalsy();
})

test("object-isArray-array", () => {
    expect(objects.isArray([1, 2, 3])).toBeTruthy();
})

test("object-isFunction", () => {
    expect(objects.isFunction(console.log)).toBeTruthy();
})

test("object-isObject-true", () => {
    expect(objects.isObject({})).toBeTruthy();
})

test("object-isObject-false", () => {
    expect(objects.isObject(1)).toBeFalsy();
})

test("object-isString", () => {
    expect(objects.isString("moe")).toBeTruthy();
})

test("object-isNumber", () => {
    expect(objects.isNumber(8.4 * 5)).toBeTruthy();
})

test("object-isBoolean", () => {
    expect(objects.isBoolean(null)).toBeFalsy();
})

test("object-isDate", () => {
    expect(objects.isDate(new Date())).toBeTruthy();
})

test("object-isRegExp", () => {
    expect(objects.isRegExp(/moe/)).toBeTruthy();
})

test("object-isError", () => {
    expect(objects.isError(new Error())).toBeTruthy();
})

test("object-isNaN-true", () => {
    expect(objects.isNaN(NaN)).toBeTruthy();
})

test("object-isNaN-false", () => {
    expect(objects.isNaN(undefined)).toBeFalsy();
})

test("object-isNull-true", () => {
    expect(objects.isNull(null)).toBeTruthy();
})

test("object-isNull-false", () => {
    expect(objects.isNull(undefined)).toBeFalsy();
})

test("object-isUndefined", () => {
    expect(objects.isUndefine(window.missingVariable)).toBeTruthy();
})

test("object-isFinite-true", () => {
    expect(objects.isFinite(-101)).toBeTruthy();
})

test("object-isFinite-false", () => {
    expect(objects.isFinite(-Infinity)).toBeFalsy();
})