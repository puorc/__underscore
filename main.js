const objects = require("./src/objects.js");
var stooge = {
    name: 'moe',
    luckyNumbers: [13, 27, [2, 3]]
};
var clone = {
    name: 'moe',
    luckyNumbers: [13, 27, [2, 3]]
};
\objects.isEqual(stooge, clone)