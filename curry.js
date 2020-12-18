const cost = (function () {
    let args = [];
    return function () {
        if (arguments.length === 0) {
            let money = 0;
            for (let i = 0; i < args.length; i++) {
                money += args[i];
            }
            return money;
        } else {
            [].push.apply(args, arguments);
        }
    }
})();
cost(12);
cost(32);
console.log(cost());
const curry = function (fn) {
    let args = [];
    return function () {
        if (arguments.length === 0) {
            // return fn.apply(null, args);
            return fn.apply(this, args);
        } else {
            [].push.apply(args, arguments);
            return arguments.callee;
            // return curry;
        }
    }
};
const toCurryCost = (function () {
    let money = 0;
    return function () {
        for (let i = 0; i < arguments.length; i++) {
            money += arguments[i];
        }
        return money;
    }
})();
const curryCost = curry(toCurryCost);
curryCost(32);
curryCost(78);

console.log(curryCost());
