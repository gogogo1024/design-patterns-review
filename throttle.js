const throttle = function(fn,interval) {
    let _self = fn,
    timer,
    firstTime= true;
    return function() {
        const _me = this,
        args = arguments;
        if (firstTime) {
            _self.apply(_me,args);
            firstTime = false;
            return;
        }
        if (timer) {
            return;
        }
        timer = setTimeout(function () {
            clearTimeout(timer);
            timer = null;
            _self.apply(_me,args);
        },interval || 500);
    };
};
window.onresize = throttle(function () {
    console.log('onresize');
}, 10000);