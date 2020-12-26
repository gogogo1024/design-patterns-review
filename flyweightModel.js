// 简易的享元模式
// 男女模特的共享是性别是内部状态，一般都不会改变，不同的是穿衣属于外部状态

const Model = function (sex) {
    this.sex = sex;
}

Model.prototype.takePhone = function () {
    console.log(`sex=${this.sex},underwear=${this.underwear}`);
}
const maleModel = new Model('male');
const femaleModel = new Model('female');
for (let index = 0; index < 50; index++) {
   maleModel.underwear = 'underwear'+index;
   maleModel.takePhone();
}
for (let index = 0; index < 50; index++) {
    femaleModel.underwear = 'underwear'+index;
    femaleModel.takePhone();
 }
