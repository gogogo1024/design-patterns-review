// objectPoolFactory对象池工厂
// createObjFn 具体创建对象的函数
const objectPoolFactory = (function (createObjFn) {
    const objectPool = [];
    return {
        create: function () {
            const obj = objectPool.length === 0 ?
                createObjFn.call(this, arguments) : objectPool.shift();
            return obj;
        },
        recover: function (obj) {
            return objectPool.push(obj);
        }
    }
})();

