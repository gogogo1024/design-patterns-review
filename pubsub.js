const Events = (function () {
    let clientList = {},
        listen,
        trigger,
        remove;
    // 只订阅自己感兴趣的 key
    listen = function (key, fn) {
        if (!clientList[key]) {
            clientList[key] = [];
        }
        clientList[key].push(fn);
    },
        remove = function (key, fn) {
            const fns = clientList[key];
            if (!fns) {
                return false;
            }
            if (!fn) {
                fns && (fns.length === 0);
            } else {
                for (let l = fns.length - 1; l >= 0; l--) {
                    var _fn = fns[l];
                    if (_fn === fn) {
                        fns.splice(l, 1);
                    }
                }
            }
        };

    // 只触发对应的key
    trigger = function () {
        const key = Array.prototype.shift.call(arguments),
            fns = clientList[key];
        if (!fns || fns.length === 0) {
            return false;
        }
        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments);
        }
    };
    return {
        listen: listen,
        trigger: trigger,
        remove: remove
    }
})();

const initEvent = function (obj) {
    for (const key in Events) {
        obj[key] = Events[key];
    }
}
Events.listen('squareMeter88', fn1 = function (price, squareMeter) {
    console.log(`价格= ${price}`);
    console.log(`squareMeter= ${squareMeter}`);
});

Events.listen('squareMeter110', fn2 = function (price, squareMeter) {
    console.log(`价格= ${price}`);
    console.log(`squareMeter= ${squareMeter}`);
});
// salesOffices.trigger('squareMeter88', 2000000, 88);
Events.remove('squareMeter88', fn1);
Events.trigger('squareMeter110', 3000000, 110);

