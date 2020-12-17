let Type = {};
for (let index = 0, type; type = ['String', 'Array', 'Number', 'Boolean'][index++];) {
    (function (type) {
        Type['is' + type] = function (obj) {
            return Object.prototype.toString.call(obj) == '[object ' + type + ']';
        }
    })(type);
};
console.log(Type.isArray([]));
console.log(Type.isString('test'));
console.log(Type.isNumber(123));
console.log(Type.isBoolean(true));


