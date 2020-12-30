function Player(name, teamColor) {
    this.name = name;
    this.teamColor = teamColor;
    this.state = 'alive';
}

Player.prototype.win = function () {
    console.log(`${this.name} won`);
}
Player.prototype.lose = function () {
    console.log(`${this.name} lose`);
}

Player.prototype.die = function () {
    this.state = 'dead';
    playerDirector.receiveMessage('playerDead', this);
}

Player.prototype.remove = function () {
    playerDirector.receiveMessage('removePlayer', this);
}

Player.prototype.changeTeam = function (color) {
    playerDirector.receiveMessage('changeTeam', this, color);
}
const playerFactory = function (name, teamColor) {
    const newPlayer = new Player(name, teamColor);
    playerDirector.receiveMessage('addPlayer', newPlayer);
    return newPlayer;
}
// 这里没有采用发布订阅模式，nodejs中如果有太多的listener会导致系统延迟，有系统警告提示
// 玩家中介只暴露出接受指令的方法，具体游戏规则是中介内部实现，玩家不需要关心
const playerDirector = (function () {
    const players = {},
        operations = {};

    // 根据玩家颜色加入对应的队伍中
    operations.addPlayer = function (player) {
        const teamColor = player.teamColor;
        players[teamColor] = players[teamColor] || [];

        players[teamColor].push(player); // 把玩家添加进以颜色区分的队伍中
    };
    // 从队伍中移除玩家
    operations.removePlayer = function (player) {
        const teamColor = player.teamColor,
            teamPlayers = players[teamColor] || [];
        for (let i = teamPlayers.length - 1; i >= 0; i--) {
            if (teamPlayers[i] === player) {
                teamPlayers.splice(i, 1);
            }
        }
    };

    operations.changeTeam = function (player, newTeamColor) {
        operations.removePlayer(player);
        player.teamColor = newTeamColor;
        operations.addPlayer(player);
    };
    operations.playerDead = function (player) {
        const teamColor = player.teamColor,
            teamPlayers = players[teamColor] || [];
        let all_dead = true;
        for (let index = 0, player; player = teamPlayers[index++];) {
            if (player.state !== 'dead') {
                all_dead = false;
                break;
            }
        }
        if (all_dead === true) {
            for (let index = 0, player; player = teamPlayers[index++];) {
                player.lose();
            }
            for (const color in players) {
                if (color !== teamColor) {
                    for (let index = 0, player; player = teamPlayers[index++];) {
                        player.win();
                    }
                }

            }
        }
    };
    const receiveMessage = function () {
        const message = Array.prototype.shift.call(arguments);
        operations[message].apply(this, arguments);
    }
    return {
        receiveMessage: receiveMessage,
    }
})();

const playFactory = function (name, teamColor) {
    const newPlayer = new Player(name, teamColor);
    playerDirector.receiveMessage('addPlayer',newPlayer);
    return newPlayer;
}
const player1 = playFactory('1', 'red');
const player2 = playFactory('2', 'red');
const player3 = playFactory('3', 'red');
const player4 = playFactory('4', 'red');

const player6 = playFactory('6', 'blue');
const player7 = playFactory('7', 'blue');
const player8 = playFactory('8', 'blue');
const player9 = playFactory('9', 'blue');


player1.die();
player2.die();
player3.die();
player4.die();

// 购买商品中介模式 800/801是CPU型号
const goods = {
    "red|32G|800":3,
    "red|16G":0,
    "blue|32G":1,
    "blue|16G":6,
}
const mediator = (function(){
    const nextBtn  = document.getElementById('nextBtn'),
    colorSelect = document.getElementById('colorSelect'),
    memorySelect= document.getElementById('memorySelect'),
    numberInput = document.getElementById('numberInput'),
    colorInfo = document.getElementById('colorInfo'),
    memoryInfo = document.getElementById('memoryInfo'),
    numberInfo = document.getElementById('numberInfo'),
    cpuSelect = document.getElementById('cpuSelect'),
    cpuInfo = document.getElementById('cpuSelect');

    return {
        changed : function(obj){ // 改变只通过change来处理，把自身当成参数（obj）传入中介者
            const  stock = goods[color+'|'+memory + '|'+ cpu], 
            color = colorSelect.value,
            memory = memorySelect.value,
            number = numberInput.value,
            cpu = cpuSelect.value;
            if (obj == colorSelect) {
                colorInfo.innerHTML  =color;
            }else if(obj == memorySelect){
                memoryInfo.innerHTML =memory;
            }else if(obj == numberInput){
                numberInfo.innerHTML =number;
            }else if (obj === cpuSelect) {
                cpuInfo.innerHTML = cpu;
            }
            if (!color) {
                nextBtn.disabled = true;
                nextBtn.innerHTML = "请选择手机颜色";
                return;
            }
            if (!memory) {
                nextBtn.disabled = true;
                nextBtn.innerHTML = "请选择内存大小";
                return;
            }
            if (!cpu) {
                nextBtn.disabled = true;
                nextBtn.innerHTML = "请选择CPU型号";
                return;
            }
            if (((number-0)|0) !==number - 0 && stock < number) { // 判断输入是否为正数以及输入和库存大小比较
                nextBtn.disabled = true;
                nextBtn.innerHTML = "请输入正确的购买数量";
                return;
            }
           
            nextBtn.innerHTML = false;
            nextBtn.innerHTML = '放入购物车';
        }
    }
})();
colorSelect.onchange = function(){
    mediator.changed(this)
};

memorySelect.onselect = function(){
    mediator.changed(this)
};
numberInput.oninput = function(){
    mediator.changed(this)
};