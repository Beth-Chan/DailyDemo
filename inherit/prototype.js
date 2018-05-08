/**
 * 原型链
 * 实现原型链的基本模式
 * 缺点：引用类型值的原型属性会被所有实例共享；没有办法在不影响所有对象实例的情况下，给超类型的构造函数传递参数
 */ 
function SuperType() {
    this.property = true;
}

SuperType.prototype.getSuperValue = function() {
    return this.property;
};

function SubType() {
    this.subproperty = false;
}

SubType.prototype = new SuperType(); // 原型链继承

SubType.prototype.getSubValue = function() {
    return this.subproperty;
};

var subInstance = new SubType();
console.log(subInstance.getSuperValue()); // true