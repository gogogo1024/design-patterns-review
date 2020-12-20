// 指责分类通用单例
const getSingle = function (fn) {
    var ret;
    return function () {
        return ret || (ret = fn.apply(this, arguments));
    }
}
var getScript = getSingle(function () {
    return Object.create(null);
})
const script1 = getScript();
const script2 = getScript();
console.log(script1 === script2);

