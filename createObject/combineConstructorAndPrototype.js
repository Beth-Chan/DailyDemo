// 组合使用构造函数和原型模式

function Person(name) {
    this.name = name;
    this.friends = ['Beth', 'Tone'];
}

// 定义方法和共享的属性
Person.prototype = {
    constructor: Person,
    sayName: function() {
        console.log(this.name);
    }
};

var person1 = new Person('cxf');
var person2 = new Person('Jason');
person1.friends.push('Cason');
console.log(person1.friends); // Array(3) ["Beth", "Tone", "Cason"]
console.log(person2.friends); // Array(2) ["Beth", "Tone"]
console.log(person1.sayName === person2.sayName); // true