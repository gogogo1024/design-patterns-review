(function () {
    Array.prototype.push.call(arguments, 4);
    console.log(arguments);
})(1, 2, 3);

Function.prototype.unCurry = function () {
    var self = this; // Array.prototype.push
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
for (let index = 0, fn, ary = ['push', 'forEach', 'shift']; fn = ary[index++];) {
    Array[fn] = Array.prototype[fn].unCurry();
}
const obj = {
    "length": 3,
    "0": 1,
    "1": 2,
    "2": 3,
}
Array.push(obj, 4);
console.log(obj);
const first = Array.shift(obj);
console.log(first);
console.log(obj);
Array.forEach(obj, function (i, n) {
    console.log(n);
});

// 最简单的
const easyUncurry = function () {
    const self = this;
    return function (){
        // Function.prototype.call.apply(Array.proto.push, [obj,4])
        // Array.proto.push.call(obj,2)
        // obj.push(2)
        return Function.prototype.call.apply(self, arguments);
    }
}


