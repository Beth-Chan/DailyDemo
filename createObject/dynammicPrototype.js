// 动态原型模式
function Person(name) {
    this.name = name;
    if(typeof this.sayName != 'function') {
        Person.prototype.sayName = function() {
            console.log(this.name);
        };
    }
}