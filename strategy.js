// javascript
const strategies = {
    'S': function (salary) {
        return salary * 4
    },
    'A': function (salary) {
        return salary * 3
    },
    'B': function (salary) {
        return salary * 2
    },
}
const calculateBonus = function(level,salary) {
    return strategies[level](salary)
}
console.log(calculateBonus('S',200));

//oop
const Bonus = function(){
    this.salary =0;
    this.strategy = null;
}
Bonus.prototype.setSalary = function(salary){
this.salary = salary;
}
Bonus.prototype.getStrategy = function(strategy){
    this.strategy = strategy;
 }
 Bonus.prototype.getSalary = function(){
    this.salary =  this.strategy.calculate(this.salary)
 }
 var performanceS = function(){};
 performanceS.prototype.calculate = function(salary){ return salary * 4;}
 var performanceA = function(){};
 performanceA.prototype.calculate = function(salary){ return salary * 3;}
 var performanceB = function(){};
 performanceB.prototype.calculate = function(salary){ return salary * 2;}
 var performanceC = function(){};
 performanceC.prototype.calculate = function(salary){ return salary * 1;}