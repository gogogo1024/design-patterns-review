const Plane  = function (){}

Plane.prototype.fire = function(){
    console.log('发射普通子弹');
}
const MissileDecorator = function(plane){
    this.plane = plane;
}

MissileDecorator.prototype.fire = function(){
    this.plane.fire();
    console.log('发射导弹');
}

const AtomDecorator = function(plane){
    this.plane = plane;
}

AtomDecorator.prototype.fire = function(){
    this.plane.fire();
    console.log('发射原子弹');
}
let plane1 = new Plane();
plane1 = new MissileDecorator(plane1);
plane1 = new AtomDecorator(plane1);
plane1.fire();

