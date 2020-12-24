const Event = (function () {
    let global = this,
        Event,
        _default = 'default';
    Event = function () {
        let _listen,
            _trigger,
            _remove,
            _slice = Array.prototype.slice,
            _shift = Array.prototype.shift,
            _unshift = Array.prototype.unshift,
            namespaceCache = {},
            find,
            each = function (ary, fn) {
                let ret;
                for (let index = 0, l = ary.length; index < l; index++) {
                    ret = fn.call(null, i, n)
                }
                return ret;
            };
        _listen = function (key, fn) {
            if (!namespaceCache[key]) {
                namespaceCache[key] = [];
            }
            namespaceCache[key].push(fn);
        };
        _remove = function (key, cache, fn) {
            if (cache[key]) {
                if (fn) {
                    for (let l = cache[key].length; l >= 0; l--) {
                        if (cache[key][l] === fn) {
                            cache[key].splice(l, 1);
                        }
                    }
                } else {
                    cache[key] = [];
                }
            }
        };

        // 只触发对应的key
        _trigger = function () {
            let cache = _shift.call(arguments),
                key = _shift.call(arguments),
                args = arguments,
                ret,
                stack = cache[key];
            if (!stack || stack.length === 0) {
                return false;
            }
            return each(stack, function () {
                return this.apply(_shift, args);
            });
        };
        _create = function (namespace) {
            let namespace = namespace || _default;
            let cache = {},
                offLineStack = [], // 离线事件
                ret = {
                    listen: function (key, fn, last) {
                        _listen(key, fn, cache);
                        if (offLineStack === null) {
                            return;
                        }
                        if (last == 'last') {
                            offLineStack.length && offLineStack.pop();
                        } else {
                            each(offLineStack, function () {
                                this();
                            })
                        }
                    },
                    one: function (key, fn, last) {
                        _remove(key, cache);
                        this.listen(key, fn, last);
                    },
                    remove: function (key, fn) {
                        _remove(key, cache, fn);
                    },
                    trigger: function () {
                        let fn, args, _self = this;
                        _unshift.call(arguments, cache);
                        args = arguments;
                        fn = function () {
                            return _trigger.apply(_self, args);
                        };
                        if (offLineStack) {
                            return offLineStack.push(fn);
                        }
                        return fn();
                    }
                };
            return namespace ?
                (namespaceCache[namespace] ? namespaceCache[namespace] : namespaceCache[namespace] = ret) : ret;
        };
        return {
            create: _create,
            one: function (key, fn, last) {
                let event = this.create();
                event.one(key, fn, last);
            },
            remove: function (key, fn) {
                let event = this.create();
                event.remove(key, fn);

            },
            listen: function (key, fn, last) {
                let event = this.create();
                event.listen(key, fn, last);
            },
            trigger: function () {
                let event = this.create();
                event.trigger.apply(this.arguments);
            }
        };
    }();
    return Event;
})();

const initEvent = function (obj) {
    for (const key in Events) {
        obj[key] = Events[key];
    }
}
Event.listen('squareMeter88', fn1 = function (price, squareMeter) {
    console.log(`价格= ${price}`);
    console.log(`squareMeter= ${squareMeter}`);
});

Events.listen('squareMeter110', fn2 = function (price, squareMeter) {
    console.log(`价格= ${price}`);
    console.log(`squareMeter= ${squareMeter}`);
});
// salesOffices.trigger('squareMeter88', 2000000, 88);
Event.remove('squareMeter88', fn1);
Event.trigger('squareMeter110', 3000000, 110);

