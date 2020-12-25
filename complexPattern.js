// 复杂命令模式
const closeDoorCommand = {
    execute: function () {
        console.log("关门");
    }
}

const openPcCommand = {
    execute: function () {
        console.log("打开电脑");
    }
}

const openQQCommand = {
    execute: function () {
        console.log("打开QQ");
    },
    add: function () {
        throw new Error('不允许操作!');
    }
}
const MacroCommand = function () {
    return {
        commandList: [],
        add: function (command) {
            this.commandList.push(command);
        },
        execute: function () {
            for (let i = 0, command; command = this.commandList[i++];) {
                command.execute();
            }
        }
    }
}
const macroCommand = new MacroCommand();
macroCommand.add(openQQCommand);
macroCommand.execute();
openQQCommand.add(macroCommand);






