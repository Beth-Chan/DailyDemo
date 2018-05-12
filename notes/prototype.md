Javascript 语言特性中，有很多方面和我们接触的其他编程语言不太一样，比如说，javascript语言实现继承机制的核心就是Prototype ，而不是Java语言那样的类式继承。Javascript 解析引擎在读取一个Object的属性的值时，会沿着 原型链 向上寻找，如果最终没有找到，则该属性值为 undefined； 如果最终找到该属性的值，则返回结果。与这个过程不同的是，当javascript解析引擎执行“给一个Object的某个属性赋值”的时候，如果当前Object存在该属性，则改写该属性的值，如果当前的Object本身并不存在该属性，则赋值该属性的值 。


javascript对象的几种创建方式
参考答案
1. 工厂模式
2. 构造函数模式
3. 原型模式
4. 混合构造函数和原型模式
5. 动态原型模式
6. 寄生构造函数模式
7. 稳妥构造函数模式 

javascript继承的 6 种方法
参考答案
1. 原型链继承
2. 借用构造函数继承
3. 组合继承(原型+借用构造)
4. 原型式继承 （浅复制）
5. 寄生式继承
6. 寄生组合式继承

JavaScript 原型，原型链 ? 有什么特点？
参考答案
1. 原型对象也是普通的对象，是对象一个自带隐式的 __proto__ 属性，原型也有可能有自己的原型，如果一个原型对象的原型不为 null 的话，我们就称之为原型链
2. 原型链是由一些用来继承和共享属性的对象组成的（有限的）对象链


JS对象中有一个[[prototype]]属性，是其他对象的引用。几乎所有对象在创建时[[prototype]]都会是非空，除非用Object.create(null)的方式创建对象，因为它的__proto__（即[[prototype]]）链接为空。

当某个属性不在当前实例中，就需要使用对象的原型链了，直到找到匹配的属性名或者查找完整的原型链。
所有普通的原型链最终都会指向内置的Object.prototype

writable必须是默认的true才会屏蔽属性，标记为只读（writable: false）的话就无法修改已有属性或者在实例上创建屏蔽属性。原型链上的属性只有setter的情况下也不会屏蔽属性。

为构造函数设置一个prototype属性。
这个属性包含一个对象（以下简称"prototype对象"），所有实例对象需要共享的属性和方法，都放在这个对象里面；那些不需要共享的属性和方法，就放在构造函数里面。

实例对象一旦创建，将自动引用prototype对象的属性和方法。也就是说，实例对象的属性和方法，分成两种，一种是本地的，另一种是引用的。

由于所有的实例对象共享同一个prototype对象，那么从外界看起来，prototype对象就好像是实例对象的原型，而实例对象则好像"继承"了prototype对象一样。

对象是属性和方法的集合

实现继承：
主要依靠原型链
其基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。
构造函数、原型和实例的关系 ：每个构造函数都有一个原型对象，原型对象都包含一个纸箱构造函数的指针，而实例都包含一个指向原型对象的内部指针。
让原型对象等于另一个类型的实例时，原型对象将包含一个指向另一个原型的指针，另一个原型也包含着一个指向另一个构造函数的指针。另一个原型又是另一个类型的实例，层层递进，就构成了实例与原型的链条，也就是原型链。

每个对象都有一个私有（内部）属性（称之为 [[Prototype]]），它指向它的原型对象（prototype）。
该 prototype 对象又具有一个自己的 prototype ，层层向上直到一个对象的原型为 null。
根据定义，null 没有原型，并作为这个原型链中的最后一个环节。
几乎所有 JavaScript 中的对象都是位于原型链顶端的Object的实例。 ** instanceof Object; // true
当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。
遵循ECMAScript标准，someObject.[[Prototype]] 符号是用于指向 someObject的原型。从 ECMAScript 6 开始，[[Prototype]] 可以通过Object.getPrototypeOf()和Object.setPrototypeOf()访问器来访问。这个等同于 JavaScript 的非标准但许多浏览器实现的属性 __proto__。
但它不应该与构造函数 func 的 prototype 属性相混淆。被构造函数创建的实例对象的 [[prototype]] 指向 func 的 prototype 属性。Object.prototype 属性表示Object的原型对象。
在 JavaScript 里，任何函数都可以添加到对象上作为对象的属性。函数的继承与其他的属性继承没有差别，包括上面的“属性遮蔽”（这种情况相当于其他语言的方法重写）

。JavaScript 对象有一个指向一个原型对象的链。当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。
遵循ECMAScript标准，someObject.[[Prototype]] 符号是用于指向 someObject的原型。从 ECMAScript 6 开始，[[Prototype]] 可以通过Object.getPrototypeOf()和Object.setPrototypeOf()访问器来访问。这个等同于 JavaScript 的非标准但许多浏览器实现的属性 __proto__。
但它不应该与构造函数 func 的 prototype 属性相混淆。被构造函数创建的实例对象的 [[prototype]] 指向 func 的 prototype 属性。Object.prototype 属性表示Object的原型对象。
这里演示当尝试访问属性时会发生什么：
// 让我们假设我们有一个对象 o, 其有自己的属性 a 和 b：
// {a: 1, b: 2}
// o 的 [[Prototype]] 有属性 b 和 c：
// {b: 3, c: 4}
// 最后, o.[[Prototype]].[[Prototype]] 是 null.
// 这就是原型链的末尾，即 null，
// 根据定义，null 没有[[Prototype]].
// 综上，整个原型链如下: 
// {a:1, b:2} ---> {b:3, c:4} ---> null
console.log(o.a); // 1
// a是o的自身属性吗？是的，该属性的值为1
console.log(o.b); // 2
// b是o的自身属性吗？是的，该属性的值为2
// 原型上也有一个'b'属性,但是它不会被访问到.这种情况称为"属性遮蔽 (property shadowing)"
console.log(o.c); // 4
// c是o的自身属性吗？不是，那看看原型上有没有
// c是o.[[Prototype]]的属性吗？是的，该属性的值为4
console.log(o.d); // undefined
// d是o的自身属性吗？不是,那看看原型上有没有
// d是o.[[Prototype]]的属性吗？不是，那看看它的原型上有没有
// o.[[Prototype]].[[Prototype]] 为 null，停止搜索
// 没有d属性，返回undefined
 
给对象设置属性会创建自有属性。获取和设置属性的唯一限制是内置 getter 或 setter 的属性。

在 JavaScript 里，任何函数都可以添加到对象上作为对象的属性。函数的继承与其他的属性继承没有差别，包括上面的“属性遮蔽”（这种情况相当于其他语言的方法重写）。







当继承的函数被调用时，this 指向的是当前继承的对象，而不是继承的函数所在的原型对象。
var o = {
a: 2,
m: function(){
return this.a + 1;
}
};
console.log(o.m()); // 3
// 当调用 o.m 时,'this'指向了o.
var p = Object.create(o);
// p是一个继承自 o 的对象
p.a = 4; // 创建 p 的自身属性 a
console.log(p.m()); // 5
// 调用 p.m 时, 'this'指向 p. 
// 又因为 p 继承 o 的 m 函数
// 此时的'this.a' 即 p.a，即 p 的自身属性 'a'
使用不同的方法来创建对象和生成原型链
语法结构创建的对象
var o = {a: 1};
// o 这个对象继承了Object.prototype上面的所有属性
// o 自身没有名为 hasOwnProperty 的属性
// hasOwnProperty 是 Object.prototype 的属性
// 因此 o 继承了 Object.prototype 的 hasOwnProperty
// Object.prototype 的原型为 null
// 原型链如下:
// o ---> Object.prototype ---> null
var a = ["yo", "whadup", "?"];
// 数组都继承于 Array.prototype 
// (Array.prototype 中包含 indexOf, forEach等方法)
// 原型链如下:
// a ---> Array.prototype ---> Object.prototype ---> null
function f(){
  return 2;
}
// 函数都继承于Function.prototype
// (Function.prototype 中包含 call, bind等方法)
// 原型链如下:
// f ---> Function.prototype ---> Object.prototype ---> null
构造器创建的对象
在 JavaScript 中，构造器其实就是一个普通的函数。当使用 new 操作符 来作用这个函数时，它就可以被称为构造方法（构造函数）。
function Graph() {
  this.vertices = [];
  this.edges = [];
}
Graph.prototype = {
  addVertex: function(v){
    this.vertices.push(v);
  }
};
var g = new Graph();
// g是生成的对象,他的自身属性有'vertices'和'edges'.
// 在g被实例化时,g.[[Prototype]]指向了Graph.prototype.
Object.create 创建的对象
ECMAScript 5 中引入了一个新方法：Object.create()。可以调用这个方法来创建一个新对象。新对象的原型就是调用 create 方法时传入的第一个参数：
var a = {a: 1}; 
// a ---> Object.prototype ---> null
var b = Object.create(a);
// b ---> a ---> Object.prototype ---> null
console.log(b.a); // 1 (继承而来)
var c = Object.create(b);
// c ---> b ---> a ---> Object.prototype ---> null
var d = Object.create(null);
// d ---> null
console.log(d.hasOwnProperty); // undefined, 因为d没有继承Object.prototype
class 关键字创建的对象
ECMAScript6 引入了一套新的关键字用来实现 class。使用基于类语言的开发人员会对这些结构感到熟悉，但它们是不同的。JavaScript 仍然基于原型。这些新的关键字包括 class, constructor，static，extends 和 super。
"use strict";
class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
class Square extends Polygon {
  constructor(sideLength) {
    super(sideLength, sideLength);
  }
  get area() {
    return this.height * this.width;
  }
  set sideLength(newLength) {
    this.height = newLength;
    this.width = newLength;
  }
}
var square = new Square(2);
性能
在原型链上查找属性比较耗时，对性能有副作用，这在性能要求苛刻的情况下很重要。另外，试图访问不存在的属性时会遍历整个原型链。
遍历对象的属性时，原型链上的每个可枚举属性都会被枚举出来。要检查对象是否具有自己定义的属性，而不是其原型链上的某个属性，则必须使用所有对象从Object.prototype继承的 hasOwnProperty 方法。下面给出一个具体的例子来说明它：
console.log(g.hasOwnProperty('vertices'));
// true
console.log(g.hasOwnProperty('nope'));
// false
console.log(g.hasOwnProperty('addVertex'));
// false
console.log(g.__proto__.hasOwnProperty('addVertex'));
// true
hasOwnProperty 是 JavaScript 中唯一处理属性并且不会遍历原型链的方法。
注意：检查属性是否undefined还不够。该属性可能存在，但其值恰好设置为undefined。
错误实践：扩展原生对象的原型
经常使用的一个错误实践是扩展 Object.prototype 或其他内置原型。
这种技术被称为猴子补丁并且会破坏封装。尽管一些流行的框架（如 Prototype.js）在使用该技术，但仍然没有足够好的理由使用附加的非标准方法来混入内置原型。
扩展内置原型的唯一理由是支持JavaScript 引擎的新特性，如Array.forEach。
示例
B 继承自 A：
function A(a){
  this.varA = a;
}
// 以上函数 A 的定义中，既然 A.prototype.varA 总是会被 this.varA 遮蔽，
// 那么将 varA 加入到原型（prototype）中的目的是什么？
A.prototype = {
  varA : null,  
/*
既然它没有任何作用，干嘛不将 varA 从原型（prototype）去掉 ? 
也许作为一种在隐藏类中优化分配空间的考虑 ?
https://developers.google.com/speed/articles/optimizing-javascript 
如果varA并不是在每个实例中都被初始化，那这样做将是有效果的。
*/
  doSomething : function(){
    // ...
  }
}
function B(a, b){
  A.call(this, a);
  this.varB = b;
}
B.prototype = Object.create(A.prototype, {
  varB : {
    value: null, 
    enumerable: true, 
    configurable: true, 
    writable: true 
  },
  doSomething : { 
    value: function(){ // override
      A.prototype.doSomething.apply(this, arguments); 
      // call super
      // ...
    },
    enumerable: true,
    configurable: true, 
    writable: true
  }
});
B.prototype.constructor = B;
var b = new B();
b.doSomething();
最重要的部分是：
• 类型被定义在 .prototype 中
• 用 Object.create() 来继承
prototype和Object.getPrototypeOf
对于从 Java 或 C++ 转过来的开发人员来说 JavaScript 会有点让人困惑，因为它全部都是动态的，都是运行时，而且不存在类（classes）。所有的都是实例（对象）。即使我们模拟出的 “类（classes）”，也只是一个函数对象。
你可能已经注意到我们的 function A 有一个叫做 prototype 的特殊属性。该特殊属性可与 JavaScript 的 new 操作符一起使用。对原型对象的引用被复制到新实例的内部 [[Prototype]] 属性。例如，当执行var a1 = new A()时，JavaScript（在内存中创建对象之后，和在运行函数 A() 把 this 指向对象之前）设置a1.[[Prototype]] = A.prototype。然后当您访问实例的属性时，JavaScript首先会检查它们是否直接存在于该对象上，如果不存在，则会[[Prototype]]中查找。这意味着你在prototype中定义的所有内容都可以由所有实例有效共享，你甚至可以稍后更改部分prototype，并在所有现有实例中显示更改（如果需要）。
像上面的例子中，如果你执行var a1 = new A(); var a2 = new A(); 那么 a1.doSomething事实上会指向Object.getPrototypeOf(a1).doSomething，它就是你在 A.prototype.doSomething 中定义的内容。也就是说：Object.getPrototypeOf(a1).doSomething == Object.getPrototypeOf(a2).doSomething == A.prototype.doSomething。
简而言之， prototype是用于类型的，而 Object.getPrototypeOf() 是用于实例的（instances），两者功能一致。
[[Prototype]] 看起来就像递归引用， 如a1.doSomething，Object.getPrototypeOf(a1).doSomething，Object.getPrototypeOf(Object.getPrototypeOf(a1)).doSomething 等等等， 直到它被找到或Object.getPrototypeOf返回 null。
因此，当你执行：
var o = new Foo();
JavaScript 实际上执行的是：
var o = new Object();
o.__proto__ = Foo.prototype;
Foo.call(o);
（或者类似上面这样的），然后当你执行：
o.someProp;
它检查o是否具有someProp属性。如果没有，它会查找 Object.getPrototypeOf(o).someProp，如果仍旧没有，它会继续查找 Object.getPrototypeOf(Object.getPrototypeOf(o)).someProp。
结论
在用原型继承编写复杂代码之前，了解原型继承模型非常重要。同时，要注意代码中的原型链的长度，并在必要时将其分解，以避免潜在的性能问题。此外，永远不要扩展原生对象的原型，除非是为了兼容新的JavaScript特性。



原型及原型链
	内置属性[[Prototype]]不可以直接访问，所以用Object.getPrototypeOf(实例)

		
 
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
检查一个属性是否存在：
	操作符 in（也会检查继承的属性）
	实例.hasOwnProperty('*')
	Object.keys(实例） 只是可枚举的自有属性
 













前四个懂了就可以看源码了
