// 工厂模式
function createPerson(name) {
    var o = new Object();
    o.name = name;
    o.sayName = function() {
        console.log(this.name);
    };
    return o;
}

var person1 = createPerson('cxf');
person1.sayName(); // cxf