const timeChunk = function (arr, fn, count, time) {
    let t, obj;
    const start = function () {
        for (let i = 0; i < Math.min(count || 1, arr.length); i++) {
            obj = arr.shift();
            fn(obj);
        }
    }
    t = setInterval(function () {
        if (arr.length === 0) {
            return clearInterval(t);
        }
        start();
    }, time || 200)
}