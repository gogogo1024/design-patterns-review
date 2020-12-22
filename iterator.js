const each = function (arr, cb) {
    for (var i = 0, l = arr.length; i < l; i++) {
        cb.call(null, i, arr[i]);
    }
}
each([1, 2, 3], function (i, n) {
    console.log([i, n]);
});
const Iterator = function (obj){
    let current = 0;
    let next = function () {
        current += 1;
    };
    let isDone = function () {
        return current >= obj.length;
    };
    let getCurrentItem = function () {
        return obj[current];
    };
    return{
        next: next,
        isDone: isDone,
        getCurrentItem: getCurrentItem
    }
};
const compare = function (iterator1,iterator2){
    while (!iterator1.isDone() && !iterator2.isDone()) {
        if (iterator1.getCurrentItem()!== iterator2.getCurrentItem()) {
            throw new Error('iterator1和iterator2不相等')
        }
        iterator1.next();
        iterator2.next()
    }
    console.log('iterator1和iterator2相等')
}
const iterator1 = Iterator([1,2,3]);
const iterator2 = Iterator([1,2,3]);
compare(iterator1,iterator2);

