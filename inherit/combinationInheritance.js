/**
 * 组合继承
 * 将原型链和借用构造函数的技术组合，从而发挥二者所长
 * 思路就是使用原型链实现对原型属性和方法的继承（函数复用），通过借用构造函数实现对实例属性的继承（实例自己的属性）
 */ 

function Person(name) {
    this.name = name;
    this.colors = ['red', 'blue'];
}

Person.prototype.sayName = function() {
    console.log(this.name);
};

function Student(name, className) {
    Person.call(this, name); // 借用构造函数继承属性
    this.className = className;
}

// 原型链继承共享的属性和方法
// Student.prototype = new Person(); 调用了Person构造函数，所以会有副作用

/**
 *  创建一个空的Student.prototype对象，并把新对象内部的[[prototype]]，即__proto__关联到指定的对象Person.prototype
 *  Object.create()方法和通过new关键字创建对象相比，好处是：
 *  Student.prototype是个__proto__指向Person.prototype的空对象，而不是一个具有name和age属性的对象。
 *  这样，只继承了原型链上的方法，而不用让Student的实例的__proto__也具有那些不必要的方法。
 */
Student.prototype = Object.create(Person.prototype);

/**
 * 下面不这么设置的话constructor会指向Person，如果需要使用到constructor属性可以手动修复一下
 * ES6的setPrototype可以直接修改现有的Student.prototype
 * Object.setPrototypeOf(Student.prototype, Person.prototype);
 */
// Student.prototype.constructor = Student;

Student.prototype.sayClassName = function() {
    console.log(this.className);
};

var student = new Student('cxf', 23);
student.colors.push('black');
console.log(student.colors);
student.sayName();
student.sayClassName();

var student = new Student('Beth', 24);
console.log(student.colors);
student.sayName();
student.sayClassName();