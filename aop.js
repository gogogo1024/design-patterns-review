Function.prototype.before = function (beforeFn) {
    var _self = this; // 保存原函数引用
    return function () { // 返回包含了原函数和新函数的代理函数（拦截）
        beforeFn.apply(this, arguments); // 执行新函数，修正this指向
        return _self.apply(this, arguments); //执行原函数
    }
}
// 注释区别
Function.prototype.after = function (afterFn) {
    var _self = this; // 保存原函数引用
    return function () { // 返回包含了原函数和新函数的代理函数（拦截）
        // _self.apply(this, arguments); //执行原函数
        // return afterFn.apply(this, arguments); // 执行新函数，修正this指向
        const ret = _self.apply(this, arguments); //执行原函数
        afterFn.apply(this, arguments); // 执行新函数，修正this指向
        return ret;
    }
}
let func = function () {
    console.log(2);
};
func = func.before(function () {
    console.log(1);
}).after(function () {
    console.log(3);
})
func();