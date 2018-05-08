// 构造函数模式
function Person(name) {
    this.name = name;
    this.sayName = function() {
        console.log(this.name);
    };
}

var person1 = new Person('cxf');
person1.sayName(); // cxf