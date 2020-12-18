/**
 * simple bind
 * @param {*} context this to binding object
 */
Function.prototype.simpleBind = function (context) {
    const self = this;
    return function () {
        return self.apply(context, arguments);
    }
}
const obj = {
    name: 'gogogo1024'
}
const func = function () {
    console.log(this.name);
}.bind(obj);
func();


/**
 * complexBind
 */
Function.prototype.complexBind = function () {
    const self = this;
    const context = [].shift.call(arguments); // this to binding object
    const args = [].slice.call(arguments); // argument
    return function () {
        return self.apply(context, [].concat.call(args, [].slice.call(arguments)));
    }
}
const complexObj = {
    name: 'gogogo1024'
};
const complexFun = function (a, b, c, d) {
    console.log(this.name);
    console.log([a, b, c, d])
}.complexBind(obj, 1, 2);
complexFun(3, 4);
var objArr = {};
Array.prototype.push.call(objArr, 'first');
console.log(objArr.length);




