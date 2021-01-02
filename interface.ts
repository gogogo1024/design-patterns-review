interface Command{
    execute:Function
}

class RefreshMenuBarCommand implements Command{
    constructor(){}
    execute(){
        console.log('刷新菜单界面');
    }
}

class AddSubMenuCommand implements Command{
    constructor(){}
    execute(){
        console.log('增加子菜单');
    }
}

// 编译器已经识别了报错
class DelSubMenuCommand implements Command{
    constructor(){}
    // execute(){
    //     console.log('增加子菜单');
    // }
}
const  refreshMenuBarCommand = new RefreshMenuBarCommand();
const  addSubMenuCommand = new AddSubMenuCommand();
const  dddSubMenuCommand = new DelSubMenuCommand();
refreshMenuBarCommand.execute();
addSubMenuCommand.execute();
delSubMenuCommand.execute();
