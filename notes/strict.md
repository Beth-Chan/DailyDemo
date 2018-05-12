"use strict"
针对脚本文件，将"use strict"放在脚本第一行，则整个脚本都将以“严格模式”运行，不在第一行则无效，以“普通模式”（也叫“宽松模式”，“非严格模式”）运行；（不利于文件合并）
针对单个函数，将"use strict"放在函数体第一行，则整个函数都将以“严格模式”运行。
将整个脚本文件放在一个立即执行的匿名函数中最好。
(
	function() {
		"use strict";
	}
)();

区别：
严格模式：
变量必须通过var进行声明，否则将会报错ReferenceError（* is not defined）。
宽松模式未显式声明的变量会变成全局变量。
	示例：
	"use strict";
	x = 1;
	console.log(x); // ReferenceError: x is not defined
	
	"use strict";
	for(var i=0;i<10;i++) {
		console.log(i);
	}
	

为了让代码更安全，禁止this关键字指向全局对象。
	this从普通模式的window变成严格模式的undefined
	无方法的函数中this的值为undefined
	
	示例：
	"use strict";
	var fn = function() {
		console.log(this); // undefined
	}
	fn(); 
	
	所以，构造函数只要不通过new实例化对象，那么就会直接报错，因为undefined无法设置属性。
	宽松模式中代码不会报错，并且会创建全局变量x和y
	"use strict";
	var Cat = function(name) {
		this.name = name;
		this.say = function() {
			console.log(this.name);
		}
	};
	Cat("咪咪");
	window.say(); // Uncaught TypeError: Cannot set property 'name' of undefined
	
	
	
为了让代码更安全，禁止删除变量。
	示例：
	var x = 111;
	delete x;
	console.log(x); // SyntaxError: Delete of an unqualified identifier in strict mode.
	
	"use strict";
	var obj = {};
	obj.y = 10;
	delete obj.y;
	console.log(obj.y); // undefined
	
	
严格模式下，对禁止扩展的对象添加新属性，会报错。
	示例：
	"use strict";
	var obj = {};
	obj.x = 1;
	Object.preventExtensions(obj);
	obj.y = 2;
	console.log(obj); // TypeError: Can't add property y, object is not extensible
	普通模式下，不会报错，只会默默失败。
	





普通模式下，如果对象有多个重名属性（重名函数可以用arguments[i]读取），最后赋值的那个属性会覆盖前面的值，严格模式下，这属于语法错误。
	"use strict";
	var obj = {
	x: 200,
	x: 300
	};
	console.log(obj);
	都是300，为什么？
	

普通模式下，JS语言有两种变量作用域（scope）：全局作用域和函数作用域；严格模式创设了第三种作用域：eval作用域。
严格模式下，eval语句本身就是一个作用域。它所生成的变量只能用于eval内部。
	"use strict";
	eval("var a = 200; console.log(a);");
	console.log(a); // ReferenceError: a is not defined
	
	var fn = function() {
		eval("var x = 100");
		console.log(x); // 100
	}
	fn();
	
	"use strict";
	var fn = function() {
		eval("var x = 100");
		console.log(x); // ReferenceError: x is not defined
	}
	fn();

arguments对象的限制
	arguments是函数的参数对象，严格模式对它的使用做了限制
	1、不允许对arguments赋值
		"use strict";
		arguments++; // 语法错误
		var obj = { set p(arguments) { } }; // 语法错误
		try { } catch (arguments) { } // 语法错误
		function arguments() { } // 语法错误
		var f = new Function("arguments", "'use strict'; return 17;"); // 语法错误
		
	2、arguments不再跟踪参数的变化
		      function f(a) {
		　　　　a = 2;
		　　　　return [a, arguments[0]];
		　　}
		　　f(1); // 正常模式为[2,2]
		
		　　function f(a) {
		　　　　"use strict";
		　　　　a = 2;
		　　　　return [a, arguments[0]];
		　　}
		　　f(1); // 严格模式为[2,1]
		
	3、禁止使用arguments.callee（这意味着，我们无法在匿名函数内部调用自身（递归）了）、arguments.caller
		"use strict";
		var f = function() { return arguments.callee; };
		f(); // 报错
		

禁用with关键字
	当代码执行到with语句时，执行环境的作用域链临时被改变。一个新的变量对象被创建，它包含了参数指定的对象的所有属性。这个对象被推入作用域链的首位，这意味着函数的所有局部变量处于第二个作用域链对象中，因此访问的代价变高了。
	示例：
	"use strict";
	var obj = {};
	obj.a = 1;
	obj.b = 2;
	with(obj) {
		console.log(a + b); // SyntaxError: Strict mode code may not include a with statement
	}

不允许使用关键字
	为了向将来JavaScript的新版本过渡，严格模式新增了一些保留字：implements, interface, let, package, private, protected, public, static, yield
	
	示例：
		var extends = "我是extends";
		console.log(extends);
		报错：
		SyntaxError: Unexpected token extends 
		
		// "use strict";
		var interface = "我是interface";
		console.log(interface); // 我是interface
		
		"use strict";
		var interface = "我是interface";
		console.log(interface);
		报错：
		SyntaxError: Unexpected strict mode reserved word

为了让代码更安全，禁止在函数内部遍历调用栈
	示例：
	// "use strict";
	var fn = function() {
	console.log(arguments.length);
	}
	fn("abc","123"); // 2 两种模式都是2 为什么？
	

禁止八进制表示法
	示例：
	"use strict";
	var obj = 0100; // 64
	console.log(obj); // SyntaxError: Octal literals are not allowed in strict mode.
	
函数声明必须在作用域的顶部，即不能在一个块内声明函数（通过变量声明和函数表达式就可以在块中创建函数或改成立即调用函数表达式）
	示例：
	"use strict";
	var a = 1;
	if (a>0) {
		(function() {
		console.log("行");
		})();
	}
	
	"use strict";
	var a = 1;
	if (a>0) {
		function fn() {
			console.log("不行");
		}
		fn();
	}
	
	   function strictFunc() {
	    	'use strict'
	    	{
	    		// SyntaxError
	    		function nested() {
	
	    		}
	    	}
	    }
