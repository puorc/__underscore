const functions = require("./functions.js");

var subtract = function(a, b) { return b - a; };
sub5 = functions.partial(subtract, 5);
sub5(20);