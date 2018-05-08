// 寄生构造函数
function Person(name) {
    var o = new Object();
    o.name = name;
    o.sayName = function() {
        console.log(this.name);
    };
    return o;
}

var person1 = new Person('cxf');
person1.sayName(); // cxf