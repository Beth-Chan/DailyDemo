// 稳妥构造函数模式
function Person(name) {
    var o = new Object();
    o.sayName = function() {
        console.log(name);
    };
    return o;
}

var person1 = Person('cxf');
person1.sayName(); // cxf