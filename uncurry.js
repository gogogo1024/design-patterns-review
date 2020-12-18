(function () {
    Array.prototype.push.call(arguments, 4);
    console.log(arguments);
})(1, 2, 3);

Function.prototype.unCurry = function () {
    var self = this;
    return function () {
        var obj = Array.prototype.shift.call(arguments);
        return self.apply(obj, arguments);
    };
};
const push = Array.prototype.push.unCurry();

(function () {
    push(arguments, 4);
    console.log(arguments);
})(1, 2, 3);