const FSM ={
    off:{
        buttonWasPressed:function(){
            console.log('关灯');
            this.button.innerHTML = '下一次按我是开灯';
            this.currState = FSM.on
        }
    },
    off:{
        buttonWasPressed:function(){
            console.log('关灯');
            this.button.innerHTML = '下一次按我是关灯';
            this.currState = FSM.off
        }
    },
}


const Light = function () {
    this.currState = FSM.off;
    this.button = null;
};
Light.prototype.init = function () {
    const button = document.createElement('button'),
    self = this;
    button.innerHTML = '已关灯';
    this.button = document.body.appendChild(button);
    this.button.onclick = function (){
        self.currState.buttonWasPressed.call(self);
    }
};
const light = new Light();
light.init();
const delegate = function (client ,delegation) {
    return{
        buttonWasPressed:function(){
            return delegation.buttonWasPressed.apply(client,arguments); // 将客户的操作交给delegation委托对象
        }
    }
}