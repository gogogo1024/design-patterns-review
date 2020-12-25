// 扫描文件夹

//文件夹
// scan方法统一，所以可以保证不管是扫描文件夹或者文件都可以自动根据add
// 中加入类型来判定
const Folder = function (name) {
    this.name = name;
    this.parent = null;
    this.files = [];
};
Folder.prototype.add = function (file) {
    file.parent = this; //子类指向自己
    this.files.push(file);
};
Folder.prototype.scan = function () {
    console.log(`开始扫描文件夹:${this.name}`);
    for (let i = 0, file, files = this.files; file = files[i++];) {
        file.scan();
    }
};
// 移除自己
Folder.prototype.remove = function () {
    if (!this.parent) {  //保证不移除根节点，和不相关的节点
        return;
    }
    for (let files = this.parent.files, l = files.length - 1; l >= 0; l--) {
        const file = files[l];
        if (file === this) {
            files.splice(l, 1); // 从父类中删除自己
        }
    }
};
const File = function (name) {
    this.name = name;
    this.parent = null;
};
File.prototype.add = function () {
    throw new Error('不允许在文件下添加文件!');
}
File.prototype.scan = function () {
    console.log(`开始扫描文件:${this.name}`);

};
// 只移除自己
File.prototype.remove = function () {
    if (!this.parent) {  //保证不移除根节点，和不相关的节点
        return;
    }
    for (let files = this.parent.files, l = files.length - 1; l >= 0; l--) {
        const file = files[l];
        if (file === this) {
            files.splice(l, 1); // 从父类中删除自己
        }
    }
};
let folder = new Folder("学习资料");
let folder1 = new Folder("JavaScript");
let file1 = new File("JavaScript设计模式");
folder.add(folder1);
folder1.add(file1);
folder.scan();
file1.remove();
folder1.remove();
folder.scan();

