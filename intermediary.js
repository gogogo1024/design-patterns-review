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