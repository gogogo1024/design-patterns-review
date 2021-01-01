const getGuangdongCity = function () {
    const guangdongCity = [
        {
            name: 'shenzhen',
            id: 11,
        }, {
            name: 'guangzhou',
            id: 12,
        }
    ];
    return guangdongCity;
}
const render = function (fn) {
    console.log('开始渲染广东省地图');
    document.write(JSON.stringify(fn()));
};
render(getGuangdongCity);
const addressAdapter = function (oldAddressFn) {
    const address = {},
        olderAddress = oldAddressFn();
    for (let i = 0, c; c = olderAddress(i++);) {
        address[c.name] = c.id;
    }
    return function () {
        return address;
    }
}
// 不去改动render以及getGuangdongCity
// 在它们之间添加适配器
render(addressAdapter(getGuangdongCity));
