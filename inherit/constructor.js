/**
 * 借用构造函数
 * 缺点：方法都在构造函数中定义，没办法函数复用
 */

function SuperType() {
    this.colors = ['red', 'blue'];
}

function SubType() {
    // 类似传统面向对象语言Java
    SuperType.call(this); // 借用构造函数
}

var subInstance1 = new SubType();
subInstance1.colors.push('black');
console.log(subInstance1.colors); // Array(3) ["red", "blue", "black"]

var subInstance2 = new SubType();
console.log(subInstance2.colors); // Array(2) ["red", "blue"]