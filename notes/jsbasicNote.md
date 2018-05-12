自己看了觉得值得推荐的书：
	《JavaScript高级程序设计》
	《深入理解JavaScript》
	《JavaScript面向对象精要》
	《JavaScript权威指南》类似API书，适合查漏补缺
其他参考书：
	《JavaScript语言精粹》
	《高性能JavaScript》
	《编写可维护的JavaScript》
	《JavaScript设计模式》
	《你不知道的JS（上卷）》
	《你不知道的JS（中卷）》
	《你不知道的JS（下卷）》
	

本笔记导航：
	js基础知识
	特殊的数字值
	Geolocation
	Web Workers
	单单js格式文件运行方式
	
设计模式
	事件是JavaScript与浏览器交互的主要途径。事件是一种叫做观察者的设计模式，这是一种创建松散耦合代码的技术。对象可以发布事件，用来表示在该对象生命周期中某个时刻到了，然后其他对象可以观察该对象，等待这些时刻到来并通过运行代码来响应。
	观察者模式由两类对象组成：主体和观察者。主体负责发布事件，同时观察者通过订阅这些事件来观察该主体。
	该模式的一个关键概念是主体并不知道观察者的任何事情，也就是说它可以独自存在并正常运作即使观察者不存在。
	从另一方面来说，观察者知道主体并能注册事件的回调函数（事件处理程序）。
	涉及DOM上时，DOM元素便是主体，你的事件处理代码便是观察者。
	
ES5
	开始支持：
	严格模式
	原生JSON对象
	Features include Function.prototype.bind, 
	Array methods like indexOf, forEach, map & filter, 
	Object methods like defineProperty, getPrototypeOf, getOwnPropertyDescriptor, create & keys, 
	the trim method on Strings and many more.
IE6 和 IE7 还是 ES3
	
js基础知识
	(基本数据类型)原始（primitives）类型：boolean, number, string, null, undefined，symbol(ES6，独一无二的值)
	内置对象：Number， String， Boolean ， Object，Array，Function，Argument（这个比较容易忘记），Date，  RegExp,  Math， Error，JSON（通过console.log(JSON)验证了是内置对象，注意必须是大写）
	
	Symbol 值通过Symbol函数生成。
	ES5 的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是 ES6 引入Symbol的原因。
	Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。
	let s1 = Symbol('foo');
let s2 = Symbol('bar');
	s1 // Symbol(foo)
s2 // Symbol(bar)
	s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"
	上面代码中，s1和s2是两个 Symbol 值。如果不加参数，它们在控制台的输出都是Symbol()，不利于区分。有了参数以后，就等于为它们加上了描述，输出的时候就能够分清，到底是哪一个值。
	如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值。
	const obj = {
  toString() {
    return 'abc';
  }
};
const sym = Symbol(obj);
sym // Symbol(abc)
	注意：（1）Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。
	// 没有参数的情况
let s1 = Symbol();
let s2 = Symbol();
	s1 === s2 // false
	// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');
	s1 === s2 // false
	上面代码中，s1和s2都是Symbol函数的返回值，而且参数相同，但是它们是不相等的。
	（2）Symbol 值不能与其他类型的值进行运算，会报错。
	let sym = Symbol('My symbol');
	"your symbol is " + sym
// TypeError: can't convert symbol to string
`your symbol is ${sym}`
// TypeError: can't convert symbol to string
	但是，Symbol 值可以显式转为字符串。
	let sym = Symbol('My symbol');
	String(sym) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'
	另外，Symbol 值也可以转为布尔值，但是不能转为数值。
	let sym = Symbol();
Boolean(sym) // true
!sym  // false
	if (sym) {
  // ...
}
	Number(sym) // TypeError
sym + 2 // TypeError
	

	Object.prototype.toString.call(value) === "[object Object]" && value !== null
	可检测对象

	JavaScript包括核心（ECMAScript）、文档对象模型（DOM）、浏览器对象模型（BOM）
	Javascript=ECMAScript+DOM+BOM
	
	
	
	宿主环境有浏览器、Node和Adobe Flash 。
	
	ECMA-262标准规定了语言的下列组成部分：语法、类型、语句、关键字、保留字、操作符、对象。
	
	DOM 
	规定的是如何映射于XML的文档结构，以便简化对文档中任意部分的访问和操作。
	针对HTML的对象和方法。
	事件
	样式
	遍历和范围
	SVG(Scalable Vector Graphic, 可伸缩向量图形)等
	
	BOM
	弹出新浏览器窗口的功能
	移动、缩放和关闭浏览器窗口的功能
	window
	navigator
	location
	screen
	cookies
	XMLHTTPRequest和IE的ActiveXObject这样的自定义对象
	
	// 行注释    /* */  不能嵌套
	表达式会产生一个值，可以写在任何需要值的地方。
	等号和分号之间的代码是一个表达式。
	块结束的语句后面没有分号。
	标识符的首字符美元符号$、下划线和任何Unicode字符也是合法的，比如拉丁字母，希腊字母。
	



	在JavaScript中所有的值都有属性。每一个属性都有一个key（或者是name）
	和一个value。可以认为，属性就像是一条记录的字段。通过点(.)操作符可以读
	取属性、赋值。
	
	
	
	console.log(typeof null);   //object, null是一个空的对象指针。  
	判断一个值是否为空类型：value===null
	使用===，是因为三等号在比较时不会将变量强制转换为另一种类型。
	(==会把字符串转换成数字）
	
	
	
	string 虽然是原始类型，但也有方法：
	console.log(typeof null); // object，null是一个空的对象指针，也可以认为是一个bug
	console.log("5" === 5); // true
	console.log(undefined==null); // 注意三等号会强制类型转换
	var name = "Beth_Chan";
	console.log(name.toLowerCase(),name.charAt(0),name.substring(2,5)); // 注意驼峰；索引从0开始；第二个索引不能算进去（左闭右开区间）
	var count = 10;
	console.log(count.toFixed(2),count.toString(8),count.toString(16)); // 10.00；10转换成八进制是12，转换成十六进制是a
	var flag = true;
	console.log(flag.toString()); // true
	
	
	创建对象：
	new Object() // new操作符和，=构造函数 指向内存中实际对象所在的指针（或者说引用）
	内置（内建build-in）对象：Object，Function，Array，Date，Error，RegExp
	
	对象字面形式创建对象，可以在大括号中定义一个新对象及其属性，属性的组成包括一个标识符或字符串、一个冒号以及一个值，多个属性之间用逗号隔开。
	字面形式并没有调用new Object()，但JavaScript引擎背后做的工作与new Object()一样。
	
	数组用中括号。
	
	JavaScript有垃圾收集功能，使用引用类型时无需担心内存分配。解除引用是将对象变量置为null。
	
	对象可随时添加和删除属性。
	
	通常不会有人使用函数的构造函数。
	
	允许用字面形式而不是使用RegExp构造函数定义正则表达式。
	（类似Perl）
	模式被包含在两个“/“之间，第二个”/“后是由单字符表示的额外选项。
	使用字面形式不需要担心字符串中的转义字符。
	除非需要通过一个或多个字符串动态构造正则表达式，否则建议字面形式。
	
	
	function reflect(value) {
	return value;
	}
	console.log(typeof reflect); // function；对于其他非函数的引用类型，typeof都是返回“object”
	var items = [];
	var object = {};
	function reflect(value) {
	return value;
	}
	// instanceof以一个对象和一个构造函数为参数
	console.log(items instanceof Array);
	console.log(items instanceof Object);
	console.log(object instanceof Array); // false
	console.log(object instanceof Object);
	console.log(reflect instanceof Function);
	console.log(reflect instanceof Object);
	// 所有引用类型都继承自Object，即所有对象都是Object的实例
	Array.isArray(items); // true；鉴别数组（把一个数组从一个框架传到另一个框架时，全局上下文不同，所以instanceof无法识别）；IE8及更早的版本不支持。
	
	
	属性是对象中保存的名字和值的配对。
	点号或中括号（要有引号）均可访问属性。例如array.push（123）可以写成array["push"](123)。
	动态访问哪个属性或者属性名字有特殊字符时，特别有用。var method = "push"; array[method] (123)。
	
	原始封装类型
	原始封装类型有String，Number，Boolean
	当读取字符串、数字或布尔值时，原始封装类型将被自动创建。
	var name = "cxf";
	var firstChar = name.charAt(0);
	console.log(firstChar);
	背后JavaScript引擎（engine）：
	var name = "cxf";
	var temp = new  String(name); // 自动打包。
	var firstChar = temp .charAt(0);
	temp = null;
	console.log(firstChar);
	
	var name = "cxf";
	name.last = "Beth";
	console.log(name.last); // undefined
	背后JavaScript引擎（engine）：
	var name = "cxf";
	var temp = new String(name);
	temp.last = "Beth";
	temp = null;
	var temp = new String(name);
	console.log(temp.last);
	temp = null;
	
	临时对象仅在值被读取时创建。
	var name = "cxf";
	var count = 12;
	var found = false;
	console.log(name instanceof String); // false
	console.log(count instanceof Number); // false
	console.log(found instanceof Boolean); // false
	instanceof操作符并没有真的读取任何东西。
	
	手动创建原始封装类型，会创建一个object，这意味着typeof无法鉴别实际保存的数据的类型。
	var name = new String("cxf");
	var count = new Number(12);
	var found = new Boolean(false);
	console.log(typeof name); // object
	console.log(typeof count); // object
	console.log(typeof found); // object
	
	
	var found = new Boolean(false);
	if(found) {
	console.log("Found");
	} // 即使是false，也总是被执行。因为一个对象在条件判断语句中总被认为是true
	
	var found = false;
	if(found) {
	console.log("Found");
	} else {
	console.log("Not found");
	} // Not found
	
	var temp = /[?&][^?&]+=[^?&]+/g;
	console.log(typeof temp); // object，正则表达式返回object。
	
	函数
	函数其实就是对象，使函数不同于其他对象的决定性特点是函数存在一个被称为[[Call]]的内部属性（函数独有的[[Call]]属性表明该对象可以被执行，[[Call]]该内部属性包含了该函数的执行指令）。ECMAScript定义typeof操作符会在对象内查找这个内部属性，对任何具有[[Call]]属性的对象返回“function"。
	内部属性无法通过代码访问，而是定义了代码执行时的行为。
	内部属性都用双重中括号来标注。
	
	定义函数：（1）通过函数表达式（2）通过函数声明（3）通过Function构造函数
	函数表达式可以是匿名函数或具名函数表达式（名字只能在内部被访问，例如递归），取而代之通常会被一个变量或属性引用，将一个函数作为值赋值给变量，最后多了个分号。
	在函数的真实形式直到运行时才能确定时不得不用Function构造函数。
	var add = new Function('x', 'y', 'return x+y'); // 把代码放在字符串里（对于工具是不可访问的）
	重要区别就是：函数声明会被提升至上下文（要么是 该函数被声明时所在的函数的范围，要么是 全局范围）的顶部。意味着可以先使用函数后声明它们。
	（因为JavaScript引擎会将函数声明放在其作用域最前面，提前知道了函数的名字）
	函数声明是做了完全（整体）提升，变量声明是部分提升（只对于声明有效，赋值过程无效）。
	
	
	
	它们基本是一样的，但是函数声明相比函数表达式有两个优势：
	函数声明会做代码提升，因此你可以在源码中先于函数的定义来调用函数。
	它们具有名字。不过，JavaScript引擎也在对匿名函数表达式的名字引用做优化。
	 
	
	
	
	所有的函数都是对象、Function构造器的实例：
	function id(x) {
		return x;
	}
	console.log(id instanceof Function); // true
	
	var numbers = [1,5,6,8,2,7,10];
	numbers.sort();
	console.log(numbers); // [ 1, 10, 2, 5, 6, 7, 8 ];
	因为默认情况下，sort()将数组中每个对象转换成字符串，然后进行比较。
	numbers.sort(function(first,second) {
	return first - second;
	});
	console.log(numbers); // [ 1, 2, 5, 6, 7, 8, 10 ]；
	数组的sort()方法接受一个比较函数作为可选参数。传递给sort()的比较函数是一个函数表达式。第一个数小于第二个时返回负数。相等时返回0。
	
	只要记住函数就是对象，很多行为都变得容易理解。
	
	JavaScript函数的另一个独特之处，在于可以给函数传递任意数量的参数却不造成错误。那是因为，函数参数实际上被保存在一个被称为arguments的类似数组的对象中。如同一个普通的JavaScript数组，arguments可以自由增长，值可通过数字索引来引用。arguments的length属性会告诉你目前有多少个值。
	
	arguments对象自动存在于函数中。也就是说，函数的命名参数不过是为了方便，并不真的限制该函数可接受函数的个数。
	
	注意：arguments对象不是一个数组的实例，其拥有的方法与数组不同，Array.isArray(arguments)永远返回false。
	function reflect(value) {
	console.log(Array.isArray(arguments)); // false
	} 
	reflect();
	
	
	length属性表明了该函数的期望参数个数。
	注意实际传入的参数的数量不影响函数的期望参数个数。
	function reflect(value) {
	return value;
	} 
	console.log(reflect("cxf",111)); // cxf
	console.log(reflect.length); // 1 不变
	
	reflect = function() {
	return arguments[0];
	} 
	console.log(reflect("cxf",111)); // cxf
	console.log(reflect.length); // 0 不变
	如果两个放一起运行，第一个也是0。


arguments

	
	
	
	
	
	可选参数（设默认值）：
	
	
	例子：求和
	function sum() {
		var result = 0, i = 0, len = arguments.length; // 会变
		while(i < len) {
			result += arguments[i];
			i++;
		}
		return result;
	}
	console.log(sum(1,1)); // 2
	console.log(sum()); // 0
	console.log(sum(8)); // 8
	console.log(sum(4+6+9+1));









变量的作用域是指变量在何处可以被访问到。
以前只有函数级作用域，ES6后有块级作用域了（块就是指{}包围的范围）。

(function () { /* code */ } ()); // 推荐使用这个
(function () { /* code */ })(); // 但是这个也是可以用的

立即调用函数表达式可以模仿块级作用域








后一个IIFE则会作为变量








IIFE改造：



全局对象







function sayMessage(message) {
console.log(message);
}
function sayMessage() {
console.log("Default message");
}
sayMessage("Hello"); // Default message
同名函数，只有最后定义的有效，之前的函数声明被完全删除。
用对象来帮助理解：
var sayMessage = new Function("message","console.log(message);");
sayMessage = new Function("console.log(\"Default message\");")
sayMessage("Hello"); // sayMessage连续赋了两次函数对象，第一个自然丢失了。
可以用arguments对象获取传入的参数个数并决定怎么处理。
即：
	if (arguments.length === 0) {
		message = "Default message";
	}
	console.log(message);

注意：在实际使用中，检查命名参数是否为未定义比依靠arguments.length更常见。

如果属性的值是函数，则该属性被称为方法。
可以像添加属性那样给对象添加方法。
var person = {
	name: "cxf",
	sayName: function() {
		console.log(this.name); // 不要用person，改变变量名就必须改变方法里引用的名字，这种紧耦合不好，所以要用this。
	}
};
person.sayName(); // cxf
所有函数作用域内都有一个this对象代表调用该函数的对象。
在全局作用域中，this代表全局对象（浏览器里的window）。
当一个函数作为对象的方法被调用时，默认this的值等于那个对象。
this可避免紧耦合，要是改person，就老是得改对应引用的话，会很麻烦。
function sayNameForAll() {
	console.log(this.name); 
}
var person1 = {
	name: "cxf",
	sayName: sayNameForAll
};
var person2 = {
	name: "Beth",
	sayName: sayNameForAll
};
var name = "Tone";
person1.sayName(); // cxf
person2.sayName(); // Beth
sayNameForAll(); // undefined; 为什么？
this在函数调用时才被设置。

改变this：
call()
apply()
bind() 





改变属性特征，可使用Object.defineProperty(拥有该属性的对象，"属性名", )



整数和浮点数（国际标准 IEEE 754）
JavaScript 内部，所有数字都是以64位浮点数形式储存，即使整数也是如此。所以，1与1.0是相同的，是同一个数。

由于浮点数不是精确的值，所以涉及小数的比较、运算要特别小心。


最佳实践是不要直接比较非整数
取而代之，将边界错误的上界（机器精度）考虑进来，对于双精度一个标准的精度值是2的-53次方：



%是求余，不是取模，因为它会返回与第一个操作数符号相同的值。
+number 保持参数不变；非数字会被转换成数字


特殊的数字值：
	1. 两个错误值：NaN 和 Infinity
	2. 两个零值：+0 和 -0（一个数字的正负号和数值是分开存储的）

NaN: 
	(1) NaN是唯一一个和自身不相等的值
	
	Array.prototype.indexOf也使用了严格相等（===），因此不能通过该方法在数组中查找NaN
	
	如果要检查一个值是否是NaN，必须使用全局函数isNaN()
	
	对非数字不起作用，因为它首先做的是把值转换成数字，转换可能生成NaN，然后函数会错误地返回true
	
	因此，最好的检验NaN的方法是将isNaN和typeof类型检查组合起来：
	
	或者，利用NaN是唯一一个与自身不相等的特点，来检验NaN：
	
	(2) NaN("Not a Number")是一个数字
	
	(3) 一个不能被解析的数字
	
	对比：
	
	(4) 失败的操作
	
	(5) 一个运算数是NaN（这样可以确保，如果在一个较长的运算中发生了错误，可以在最后结果中看到）
	
	
Infinity
两种错误：大到无法表示的数字；或者除以0

（1）Infinity比任何数（除了NaN）大，-Infinity比任何数（除了NaN）小，所以需要最大值或最小值时可以当默认值
	
	
	都是false
	
	
	
（2）巨大的数字
	指数必须在-1023到1024之间（开区间）
	
	不知道为什么没有-Infinity：
	
（3）被0除
	
	
	对比：
	
（4）Infinity的运算
	如果尝试用一个Infinity“抵消”另一个Infinity的时候，会得到错误的结果NaN：
	
	如果试图得到大于Infinity的书，得到的仍然是Infinity：
	
（5）检查Infinity
	严格相等和宽松相等都适用于Infinity：
	
	附：全局函数isFinite()可以检查一个值是否是实际的值（既不是Infinity也不是NaN）：
	













遵从IEEE754双精度浮点数标准，在js中我们通常写0，这意味着+0，但是它也意味着是-0
要记住和“.”点操作符区分开，要不然容易报错。为了区分有时要用两个"."，或者"."前加空格，或者把数字加括号，或者写成浮点数类似1.0.toString()
+0和-0大部分时候是一样的，都是0，但是也可以区分两个0：
除以两个0

判断两个0不同的权威方法是除以0：

还有其他可以区别的：
Math.pow()
Math.atan2()


 
document.getElementById('pox').style.color = 'red';

onclick="***()"

用[]而不是.可以使用有特殊符号的属性




 



结果是大桃花。
 









 

 
 

 

 

 







 

给Object加就都有了。
 
 

 
 
 





 





 
 
javascript有对象，没有类（但有构造函数）。





私有属性和封装：





JavaScript包括 ECMAScript, DOM, BOM


2 JavaScript 的 基 本 类 型 有 string, number, boolean，undefined，null
3 ． JavaScript 的 复 合 类 型（对象类型） 有  Object，Array，Number， String， Boolean ， Function，Argument，Date，  RegExp, Math，Error。
（JavaScript的对象是键值对的集合）
4 ． JavaScript 还 有 两 个 空 类 型 ： undefined 和 null
5 ． JavaScript 中 获 得 类 型 的 运 算 符 是 typeof， 使 用 该 运 算 符 返 回 什 么 数 据 类 型 ？ string
6 ． JavaScript 中 = = = 和 = = 有 什 么 区 别 ？ 全等是既比较值，又比较类型。
7 ． JavaScript 中 in 运 算 符 有 什 么 用 ？  判断一个对象是否具有某一个属性。还有for ( var i in object ）用法。

& JavaScript 的 条 件 运 算 符 是 

9 ． JavaScript 中 创 建 对 象 使 用 运 算 符 




例子：（副本与快捷方式的区别）

10 ． JavaScript 什 么 叫 逻 辑 中 断 ： 


浏览器可直接设断点，刷新，点击箭头或F11执行下一步，VM是内部提供的虚拟机，F10跳过，watch或鼠标放变量上或直接出来（新浏览器）等。
可以直接if (num)也可以直接三元运算符，更好更简单的方法是逻辑（短路）||:







1 1 ． JavaScript 中 delete 运 算 符 的 作 用 是 



arr[2]的位置是undefined，arr.length还是4
12 ． JavaScript 中 循 环 语 旬 有 种 ． 分 别 是 ． 
13 ． JavaScript 中 分 支 语 句 有种 、 分 别 是 ： 
1 生 JavaScripv 中 跳 转 语 句 break 与 continuega 何 使 用 ？ 
和 












有等号是表达式。例如a = 100 例如
加分号不是表达式，是语句。





for while do-while for-in
if-else switch
break跳出循环 continue跳出本次循环

			
Geolocation
	
	
	
	
	

	
Web Workers
	






	
	
	
	
单单js格式文件运行方式
	（1） 控制台
	
	（2）在线js编辑器RunJS、JSBin等
	（3）命令行：node 文件名（加不加js都可以） 这种太麻烦了
	（4)   VScode把program 换成"program": "${file}"
		一开始 配置错了，改成${file} 就解决了，就是运行当前文件 
		
