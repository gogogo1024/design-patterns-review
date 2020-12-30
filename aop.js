Function.prototype.before = function (beforeFn) {
    var _self = this; // 保存原函数引用
    return function () { // 返回包含了原函数和新函数的代理函数（拦截）
        beforeFn.apply(null, arguments); // 执行新函数，修正this指向
        return _self.apply(null, arguments); //执行原函数
    }
}
// 注释区别
Function.prototype.after = function (afterFn) {
    var _self = this; // 保存原函数引用
    return function () { // 返回包含了原函数和新函数的代理函数（拦截）
        // _self.apply(this, arguments); //执行原函数
        // return afterFn.apply(this, arguments); // 执行新函数，修正this指向
        const ret = _self.apply(null, arguments); //执行原函数
        afterFn.apply(null, arguments); // 执行新函数，修正this指向
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

// 简易写法
const before = function (fn, beforeFn) {
    return function () {
        beforeFn.apply(null, arguments);
        return fn.apply(null, arguments);
    }
}


let a = before(
    function () {
        console.log(3);

    },
    function () {
        console.log(2);
    }
);
a = before(a, function () {
    console.log(1);
});
a();


let ajax = function (type ,url ,param) {
    console.log(type,url,param);
}
const getToken = function(){
    return 'Token'
}
// 利用arguments的共用特性，使用装饰器在调用原来ajax的之前，修改arguments
ajax = ajax.before(function(type,url,param){
    param.Token = getToken();
});
ajax('get','http://hao123.com',{name:'sven'});

