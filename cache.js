// cache result
var cache = {};
const mult = function () {

    const calculate = function () {
        var a = 1;
        for (let index = 0; l = arguments.length, index < l; index++) {
            a = a * arguments[index];
        }
        return a;
    }
    return function () {
        var args = Array.prototype.join.call(arguments, ',');
        if (cache[args]) {
            return cache[args];
        }else {
            return cache[args] = calculate.apply(null,arguments);
        }
    }

}
console.log(mult(2, 6));
console.log(mult(2, 6));