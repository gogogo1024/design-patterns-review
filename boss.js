//模版方法模式

// 老板需要赚更多的钱只需要提供薪水，定义好赚钱步骤，具体实现交给员工
const Boss = function () { };

Boss.prototype.paySalary = function () { };
Boss.prototype.hire = function () { };
Boss.prototype.completeProject = function () { };

// 老板赚了更多的钱～
Boss.prototype.makeMoreMoney = function () { 
    this.paySalary();
    this.hire();
    this.completeProject();
};

const Employee = function () { };
Employee.prototype = new Boss();

Employee.prototype.hire = function () { 
    console.log('找到靠谱的员工');
};

Employee.prototype.completeProject = function () { 
    console.log('按工期完成项目任务');
};
const employee = new Employee();
employee.makeMoreMoney();


