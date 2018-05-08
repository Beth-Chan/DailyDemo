/* 一个继承的例子：封装DOM查询 */

// 构造函数 获取DOM对象
function Elem(id) {
    // new 一个对象的过程就是创建一个空对象 var obj = {}，然后把这个对象的__proto__指向构造函数的原型对象 obj.__proto=Object.prototype，最后使用新对象调用构造函数 Object.call(obj)，把this指向新实例对象，
    this.elem = document.getElementById(id);
}

// 增加一个扩展函数（类似jQuery）
Elem.prototype.html = function(val) {
    // 首先是获取DOM元素，获取DOM元素可以看构造函数的定义，this.elem是构造函数初始化就定义的了
    var elem = this.elem;
    // 有无val
    if (val) { // val为真值时充当setter
        elem.innerHTML = val;
        // 不用也可以，但是为了链式操作，要把整个DOM对象返回
        return this;
    } else { // getter
        return elem.innerHTML;
    }
};

// 扩展一个事件绑定的方法
Elem.prototype.on = function(type, fn) {
    // 首先是获取DOM元素
    var elem = this.elem;
    elem.addEventListener(type, fn);
};

var div1 = new Elem("div1"); // new一个对象
console.log(div1.html());
div1.html("<p>Beth-Chan</p>");
div1.on("click", function() {
    console.log("clicked");
});
// 有return this时就可以用链式操作
div1.html("<p>Beth-Chan</p>").on("click", function() {
    console.log("clicked");
});


// 基础例子 动物吃 与 狗吠
function Animal() {
    this.eat = function() {};
}
function Dog() {
    this.bark = function() {};
}
Dog.prototype = new Animal();
Dog.prototype = Object.create(Animal.prototype);
var hashiqi = new Dog();