const functions = require("./src/functions.js");

var func = function constant() {
    if (!constant.num)
        constant.num = 0;
    else
        constant.num++;
    return constant.num;
},
onceFunc = functions.once(func);

onceFunc();