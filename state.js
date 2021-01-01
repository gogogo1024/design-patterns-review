// 开关状态

const State = function(){};
State.prototype.buttonWasPressed = function () {
    throw new Error('父类的buttonWasPressed方法必须被重写');
}
const OffLightState = function (light) {
    this.light = light;
}

OffLightState.prototype.buttonWasPressed = function () {
    console.log('弱光');
    this.light.setState(this.light.weakLightState);
}


const WeakLightState = function (light) {
    this.light = light;
}

WeakLightState.prototype.buttonWasPressed = function () {
    console.log('强光');
    this.light.setState(this.light.strongLightState);
}


const StrongLightState = function (light) {
    this.light = light;
}

StrongLightState.prototype.buttonWasPressed = function () {
    console.log('超强光');
    this.light.setState(this.light.superStrongLightState);
}
const SuperStrongLightState = function (light) {
    this.light = light;
}

SuperStrongLightState.prototype.buttonWasPressed = function () {
    console.log('关灯');
    this.light.setState(this.light.offLightState);
}
SuperStrongLightState.prototype = new State(); // 继承父类State
const Light = function () {
    this.offLightState = new OffLightState(this);
    this.weakLightState = new WeakLightState(this);
    this.strongLightState = new StrongLightState(this);
    this.superStrongLightState = new SuperStrongLightState(this);

    this.button = null;
}
Light.prototype.init = function () {
    const button = document.createElement('button'),
        self = this;
    this.button = document.body.appendChild(button);
    this.button.innerHTML = '开关';
    this.currState = this.weakLightState;
    this.button.onclick = function () {
        self.currState.buttonWasPressed();
    }
}
Light.prototype.setState = function (newState) {
    this.currState = newState
}

const light = new Light();
light.init();
