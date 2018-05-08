// 原型模式
function Person() {
}
Person.prototype.name = 'cxf';
Person.prototype.sayName = function() {
    console.log(this.name);
};

var person1 = new Person();
person1.sayName(); // cxf