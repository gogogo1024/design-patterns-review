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
var myImage = (function () {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    return {
        setSrc: function (src) {
            imgNode.src = src;
        }
    }
})();
// 代理负责预加载图片
var proxyImage = (function () {
    var img = new Image();
    img.onload = function () {
        myImage.setSrc(this.src);
    }
    return {
        setSrc: function (src) {
            myImage.setSrc('file:// /c:/Users/loading.gif');
            img.src = src;
        }
    }
})();

proxyImage.setSrc("https://www.google.com/search");

let mult = function () {
    console.log('开始计算乘积');
    let a = 1;
    for (let index = 0, l = arguments.length; i < l; index++) {
        a = a * arguments[index];
    }
    return a;;
}
mult(2, 3); //  输出：6
mult(2, 3, 4); // 输出：24

const proxyMult = (function () {
    const cache = {};
    return function () {
        const args = Array.prototype.join.call(arguments, ',');
        if (args in cache) {
            return cache[args];
        }
        return cache[args] = mult.apply(this, arguments);
    }
})();

proxyMult(1,2,3,4);
proxyMult(1,2,3,4);






