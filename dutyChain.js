// 职责链
// 类似于nodejs中的中间件
// 同步职责链 
const order500 = function (orderType, pay, _stock) {
    if (orderType === 1 && pay === true) {
        console.log('500元定金订购，得到100优惠券');
    } else {
        return 'nextSuccessor';
    }
};

const order200 = function (orderType, pay, _stock) {
    if (orderType === 2 && pay === true) {
        console.log('200元定金订购，得到100优惠券');
    } else {
        return 'nextSuccessor';
    }
};

const orderNormal = function (_orderType, _pay, stock) {
    if (stock > 0) {
        console.log('普通购买，没有优惠券');
    } else {
        console.log('库存不足');
    }
};
const Chain = function (fn) {
    this.fn = fn;
    this.successor = null;
}
// 定义职责函数
Chain.prototype.setNextSuccessor = function (success) {
    return this.successor = success;
}

// 传递数据给职责函数
Chain.prototype.passResult = function () {
    const ret = this.fn.apply(this, arguments);
    if (ret === 'nextSuccessor') {
        return this.successor && this.successor.passResult.apply(this.successor, arguments);
    }
    return ret;
};

//异步职责链
Chain.prototype.next = function () {
    return this.successor && this.successor.passResult.apply(this.successor, arguments);
};


const chainOrder500 = new Chain(order500);
const chainOrder200 = new Chain(order200);
const chainOrderNormal = new Chain(orderNormal);


chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);

chainOrder500.passResult(1, true, 500);
chainOrder500.passResult(2, true, 500);

chainOrder500.passResult(3, true, 500);
chainOrder500.passResult(1, false, 500);

const fn1 = new Chain(function () {
    console.log('1');
    return 'nextSuccessor';
});

const fn2 = new Chain(function () {
    console.log('2');
    const self = this;
    setTimeout(function () {
        self.next();
    }, 5000);
});

const fn3 = new Chain(function () {
    console.log('3');
});
fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
fn1.passResult()







