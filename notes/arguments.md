// x有值执行
if(x !== undefined && x !== null)
// x没值执行
if(x === undefined && x === null)

// x真值执行
if(x)
// x假值执行
if(!x)

// 存在时执行
if(typeof XMLHttpRequest != undefined)


JS中检测数据类型的四种方法
1、typeof 用来检测数据类型的运算符
->typeof value
->返回值首先是一个字符串,其次里面包含了对应的数据类型,例如:"number"、"string"、"boolean"、"undefined"、"object"、"function"
->局限性:
1)typeof null ->"object"
2)检测的不管是数组还是正则都返回的是"object",所以typeof不能判断一个值是否为数组
->console.log(typeof typeof typeof [12, 23]);//->"string" 两个或者多个typeof一起使用时,返回值一定是"string";

2、instanceof/constructor
->检测某一个实例是否属于某一个类
->我们使用instanceof/constructor可以检测数组和正则了
console.log([] instanceof Array);//->true
console.log(/^$/ instanceof RegExp);//->true
console.log([] instanceof Object);//->true

console.log([].constructor === Array);//->true
console.log([].constructor === Object);//->false 我们的constructor可以避免instanceof检测的时候,用Object也是true的问题
console.log({}.constructor === Object);

局限性：
1)用instanceof检测的时候,只要当前的这个类在实例的原型链上(可以通过原型链__proto__找到它),检测出来的结果都是true
var oDiv = document.getElementById("div1");
//HTMLDivElement->HTMLElement->Element->Node->EventTarget->Object
console.log(oDiv instanceof HTMLDivElement);//->true
console.log(oDiv instanceof Node);//->true
console.log(oDiv instanceof Object);//->true

2)基本数据类型的值是不能用instanceof来检测的
->console.log(1 instanceof Number);//->false

数组创建的两种方式(对象、正则、函数...)
->对于引用数据类型来说,我们两种方式创建出来的都是所属类的实例,而且都是对象数据类型的值,是没有区别的
var ary = [];
var ary = new Array;

->对于基本数据类型来说,虽然不管哪一种方式创建出来的都是所属类的一个实例(在类的原型上定义的方法都可以使用),但是字面量方式创建出来的是基本数据类型,而实例方式创建出来的是对象数据类型
var num1 = 1;
var num2 = new Number("1");
console.log(typeof num1,typeof num2);//->"number" "object"

3)在类的原型继承中,instanceof检测出来的结果其实是不准确的
function Fn() {}
var f = new Fn;
console.log(f instanceof Array);//->false f不是一个数组,它就是一个普通的实例(普通的对象)


->虽然我们的Fn继承了Array,但是f没有length和数字索引哪些东西,所以f应该不是数组才对,但是用instanceof检测的结果却是true,因为f虽然不是数组,但是在f的原型链上可以找到Array
function Fn() {
}
Fn.prototype = new Array;//->Fn子类继承了Array这个父类中的属性和方法
var f = new Fn;
console.log(f instanceof Array);//->true

3、Object.prototype.toString.call(value) 
->找到Object原型上的toString方法,让方法执行,并且让方法中的this变为value(value->就是我们要检测数据类型的值)

->toString:一个方法,转换为字符串数据类型用的方法
每一个数据类型所属类的原型上都有toString方法,例如:Number.prototype/String.prototype/Array.prototype/Function.prototype...
除了Object上的toString,其他类原型上的toString都是把当前的数据值转换为字符串的意思

->null和undefined比较的特殊:他们所属类Null/Undefined的原型上也有toString,只不过不让我们用而已,不仅如此其实类的原型都给屏蔽了

->HTML元素对象的toString:虽然它的原型链很长,但是在其它类的原型上都没有toString,只有在最底层Object.prototype这上才有
var oDiv = document.getElementById("div1");
oDiv.toString();//->调用的其实也是Object.prototype.toString...

->alert、document.write这两种输出的方式其实都是把要输出的内容先转换为字符串,然后在输出的
alert([]);//->""
alert(true);//->"true"
alert({});//->这个就要调用Object.prototype上的toString了 ->?

4、Object.prototype.toString是用来返回对应值的所属类信息的
大小写不能写错，比较麻烦，但胜在通用。
var oDiv = document.getElementById("div1");
var obj = {};
oDiv.toString();//->"[object HTMLDivElement]"
obj.toString();//->"[object Object]"

原理:
->obj首先找到原型上toString方法,并且让toString执行,toString方法执行的时候,里面的this是obj,同理oDiv.toString(),toString方法中的this是oDiv
->执行toString方法,返回当前方法中this的数据类型 ->"[object 当前this的直属类]",例如:"[object HTMLDivElement]"/"[object Object]"

Object.prototype.toString.call(12);//->执行原型上的toString,并且让方法中的this变为12,也就相当于返回的是12的直属类的信息 ->"[object Number]"
Object.prototype.toString.call("zhufeng");//->"[object String]"
依此类推:
"[object Boolean]"/"[object Null]"/"[object Undefined]"/"[object Object]"/"[object Array]"/"[object RegExp]"/"[object Function]"/"[object Math]"/"[object Date]"...
->所有的数据类型都可以用它来检测,而且非常的精准

value:要检测数据类型的值 type:判断是否为这个数据类型
function isType(value, type) {
var res = Object.prototype.toString.call(value);//-> "[object 直属类]"
return res === "[object " + type + "]";
98->"[object Array]"
字符串拼接->"[object Array"]"
两个相等了返回true
}

优化:->忽略第二个传递进来参数的大小写
function isType(value, type) {
var reg = new RegExp("^\\[object " + type + "\\]$", "i");
return reg.test(Object.prototype.toString.call(value));
}
var ary = [];x
var flag = isType(ary, "array");
console.log(flag);//->true说名是数组,false说明不是数组 ->true
flag = isType(1, "string");
console.log(flag);//->false


~function () {
var utils = {}, numObj = {
isNum: "Number",
isStr: "String",
isBoo: "Boolean",
isNul: "Null",
isUnd: "Undefined",
isObj: "Object",
isAry: "Array",
isFun: "Function",
isReg: "RegExp",
isDate: "Date"
}, isType = function () {
var outerArg = arguments[0];
return function () {
var innerArg = arguments[0], reg = new RegExp("^\\[object " + outerArg + "\\]$", "i");
return reg.test(Object.prototype.toString.call(innerArg));
}
};
for (var key in numObj) {
if (numObj.hasOwnProperty(key)) {
utils[key] = isType(numObj[key]);
}
}
window.$type = utils;
}();
//console.log($type);

var ary = [];
console.log($type.isAry(ary));//->true
console.log($type.isFun(ary));//->false

4、constructor属性 
所有实例对象都有constructor属性，constructor属性指向prototype对象所在的构造函数，就是说指向创建这个实例的构造函数。 
还是推荐阮大大的文章，看这个constructor属性 
注意： constructor 在类继承时会出错
eg：
1	function A(){};
2	function B(){};
3	A.prototype = new B(); //A继承自B
4	var aObj = new A();
5	alert(aobj.constructor === B) -----------> true;
6	alert(aobj.constructor === A) -----------> false;
解决construtor的问题通常是让对象的constructor手动指向自己：
1	aobj.constructor = A; //将自己的类赋值给对象的constructor属性
2	alert(aobj.constructor === A) -----------> true;
3	alert(aobj.constructor === B) -----------> false; //基类不会报true了;

5、duck type（鸭子类型） 
比如判断一个对象是否是数组，可以看这个对象是否拥有length()等方法，不禁想到类数组转数组的方法，看这里类数组转数组了


if(obj)
null、undefined、false、0 等值，都能使得 if 判断为假
除了这些值以外 if 几乎都可以执行
你赋值给她一个字符串是可以被执行的


使用arguments对象验证函数的参数是否合法

1	<script>
2	function sum(arg1,arg2) //加法函数
3	{
4	var realArgCount = arguments.length; //调用函数时传递的实参个数
5	var frmArgCount = sum.length; //函数定义时的形参个数
6	if(realArgCount < frmArgCount) //如果实际参数个数小于形参个数
7	{
8	var e = new Error(); //定义错误信息，然后抛出
9	e.number = 1000001; //错误编号
10	e.message = "实际参数个数不符合要求！" //错误消息
11	throw e;
12	}
13	return arguments[0] + arguments[1];//参数符合要求则从arguments对象中提取实参并返回两者的和
14	}
15	try
16	{
17	document.write("<p><h1>arguments对象测试</h1></p>"); //输出标题
18	document.write("正确调用的结果："+sum(10,20));//输出正确调用的结果
19	document.write("<br>不符合规则的调用结果："); //人为引发一个不符合规则的调用方式
20	document.write(sum(10));
21	}
22	catch(e) //捕捉错误信息
23	{
24	alert(e.number+"错误号："+e.message);
25	}
26	</script>
