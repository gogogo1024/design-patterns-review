var Thing = function () { };
var xiaoming = {
    senderFlower: function (target) {
        var thing = new Thing();
        target.receiveThing(thing);
    },
};
var proxyA = {
    receiveThing: function (thing) {
        proxyB.listenGoodMod(function () {
            proxyB.receiveThing(thing);
        });
    }
};
var proxyB = {
    receiveThing: function (thing) {
        console.log(`收到：${thing}`);
    },
    listenGoodMod: function (fn) {
        setTimeout(function () {
            fn();
        }, 100000)
    }
};


xiaoming.senderFlower(proxyA);
