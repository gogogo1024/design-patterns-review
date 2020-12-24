const Ryu = {
    attack: function () {
        console.log("attack");

    },
    jump: function () {
        console.log("jump");
    },
    defend: function () {
        console.log("defend");

    },
    crouch: function () {
        console.log("crouch");
    },
}

/**
 * 
 * @param {*} receiver 接受者
 * @param {*} state 状态
 */
const makeCommand = function(receiver, state) {
    return function(){
        receiver[state]();
    }
}
const command ={
    "119":"jump",
    "115":"crouch",
    "97":"defend",
    "100":"attack",
};
let commandStack = [];
document.onkeypress =function(evt){
    const keyCode = evt.keyCode,
    command =  makeCommand(Ryu, command[keyCode]);
    if (command) {
        command();
        commandStack.push(command);
    }
};
// 回放
document.getElementById('replay').onclick  =function(){
    let command;
    while(command = commandStack.shift()){
        command();
    }
}

