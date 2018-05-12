构造函数（Object()、Object(value)）
实例属性（__proto__、prototype、constructor)
实例方法（hasOwnProperty、isPropertyOf、propertyIsEnumerable、toLocaleString、toString、valueOf）
静态方法（Object.assign()、Object.create()、Object.defineProperties(）
	Object.defineProperty()、Object.freeze()、
	Object.getOwnPropertyDescriptor()、Object.getOwnPropertyNames()、Object.getPrototypeOf()、Object.setPropertyOf()、
	Object.isExtensible()、Object.isFrozen()、Object.isSealed()、Object.keys()、Object.preventExtensions()、Object.seal()）
属性描述符（数据属性如value，writable，enumerable，configurable；访问器属性get，set）

创建对象（实例），创建方法如下：
     1. 用new操作符后面跟Object的构造函数                        
 var cat = new Object();//推荐
// var o=new Object;//这种方法有效，但不推荐用。
cat.name="sunny";
cat.legs=4;

  2.  对象字面量字面量表示法(推荐)
var cat = {
       name:"sunny",
       legs:4
}

Object类型中所具有的任何属性和方法，同样存在于具体的对象（实例）中。
Object类型的属性和方法如下：
1. 构造函数：Object（）
2. hasOwnProperty(PropertyName):检查给定的属性是否在当前的对象实例中，注：PropertyName必须以字符串给定
3. isPrototypeOf(object):检查传递的对象，是否是另一个对象的原型。注：这里牵扯到原型和原型链，所以以后具体在讲，目前大家先知道有这么个方法
4. propertyIsEnumerable（PropertyName）：检查给定的属性是否能用for-in 语句来枚举。注：PropertyName必须以字符串给定
5. toLocaleString():返回的字符串与执行环境的地区对应
6. toString()：返回字符串
7. valueOf（）：返回对象的字符串、数值或布尔值表示

对象属性的访问方法
     1. 点表示法  cat.name
     2. 方括号表示法：cat["name"]
      注1：方括号访问的优点是：
 A. 可以通过变量来访问属性    
var  pName="name";
alert(cat[pName]);
B. 如果属性名中包含会导致语法错误的字符，或者属性名使用的是关键字或保留字，也可以用方括号表示法。
  cat["lovely brother"]="Tom"; 属性名中包含空格所以不能使用点表示法访问它
注2：访问属性推荐使用点表示法，除非没办法用点表示法的时候选择用方括号访问

Object对象，是所有JavaScript对象的超类(基类)。Object.prototype(Object的原型)定义了Js对象的基本方法和属性。
alert(Object.prototype);  // [object Object]
alert(Object); // function Object { [native code] }
alert(Object()); // [object Object]


2. 构造函数（Object()、Object(value)）
2.1 new Object() ：返回一个Object实例
2.2 new Object(value) ：根据value的值，返回不同的对象(Number、Boolean、String)
参数：
①value {number | bool | string} ：一个数字、布尔值或者字符串
返回值：
{Number、Boolean、String} 返回一个转换后的对象
示例 ：
var o = new Object(123);
console.log(o); // => Number对象
o = new Object(true);
console.log(o); // => Boolean对象
o = new Object('abc');
console.log(o); // => String对象

而alert(o); // 弹出123

3. 实例属性（__proto__、prototype、constructor)
3.1 __proto__ ：设置或返回对象的原型对象(IE中不支持此属性)
说明：
1) 赋值时，对象实例继承新原型的所有方法和属性，以及新原型的原型链中的所有方法和属性。
2) 属性名称以两个下划线开始和结束。
3) 对象实例的__proto__ == 或=== 对象原型（类/构造函数）的prototype
示例：
function People(name) {
    this.name = name;
}
function Student(age) { 
    this.age = age;
}
Student.prototype = new People(); // 设置Student的原型为People对象
 
var s = new Student(22);
console.log(s.__proto__); // => People 对象
console.log(Student.prototype); // => People 对象
console.log(s.__proto__ == Student.prototype); // => true
console.log(s.__proto__ === Student.prototype); // => true
 
// 2.对象直接量
var p = {}; // 等于new Object()
console.log(p.__proto__ == Object.prototype); // => true
console.log(p.__proto__ === Object.prototype); // => true
 
3.2 prototype ：设置或返回对象原型（类/构造函数）的原型对象
说明：
1) prototype为对象原型（类/构造函数）的属性。__proto__是对象实例的属性。
2)  JS内置对象(Array、Date等对象)都有一个只读的prototype属性。 可将属性和方法添加到原型中，但不能为内置对象分配其他原型。
3) 自定义对象的prototype属性可进行读写操作。
示例：
var Student = function (name) {
    this.name = name;
};
// 给Student的原型添加一个sayHello方法
Student.prototype.sayHello = function () {
    alert('Hello,' + this.name);
}
var st = new Student('张三'); // 初始化对象st
console.log(st.name); // => 张三
st.sayHello(); // 弹出：Hello,张三

3.3 constructor ：表示创建此对象的构造函数
说明：
1) 设置或返回创建此对象的构造函数。
2) 若一个对象有多层继承，将返回最先调用的构造函数。
3) obj.constructor.prototype 可表示对象的原型。
示例：
// 1.内置对象
var str = 'abc';
console.log(str.constructor); // => function String 构造函数 
var o = {};
console.log(o.constructor); // => function Object 构造函数
Chrome控制台显示 ƒ Object() { [native code] }，跟一开始的console.log(Object)一样，
所以也就能理解obj.constructor.prototype 可表示对象的原型了
 
// 2.自定义对象多层继承 ：constructor返回最先调用的构造函数
function People(name) {
    this.name = name; // s对象初始化时，先调用People构造函数，再调用Student构造函数
    console.log('People调用');
}
function Student(age) {
    this.age = age;
    console.log('Student调用');
}
Student.prototype = new People(); // 设置Student的原型为People对象
 
var s = new Student(22);
console.log(s.constructor); // => function People 构造函数
 
总结：__proto__、prototype、constructor 的关系
说明：
1) 对象实例的__proto__ 等于 对象原型（类/构造函数）的prototype
2) 对象实例的constructor 等于 对象原型（类/构造函数），所以obj.constructor.prototype 可表示对象的原型。
示例：**
	var o = {};
	console.log(o.__proto__ === Object.prototype); // true ：对象的__proto__等于类的prototype
	console.log(o.constructor === Object); // true ：对象的constructor 等于 类
	console.log(o.constructor.prototype === Object.prototype); // true ：o.constructor.prototype 可表示对象的原型。

4. 实例方法（hasOwnProperty、isPropertyOf、propertyIsEnumerable、
toLocaleString、toString、valueOf）
4.1 hasOwnProperty(propertyName) ：判断对象是否拥有一个指定名称的实例属性(非继承)
参数：
①propertyName {string} ：属性名称。
返回值：
{bool} 判断对象是否拥有一个指定名称的本地定义(非继承)的属性；此方法不会检查对象原型链中的属性。
true ：属性为对象的实例属性，非继承。
false ：属性不为对象的实例属性。
示例 ：
// 1.Object对象
var o = new Object();
o.name = '自定义属性'; // 定义一个实例属性
console.log(o.hasOwnProperty('name')); // => true：name属性为实例o自己定义的，而非继承
console.log(o.hasOwnProperty('toString')); // => false：toString为继承属性
 
// 2.自定义对象
var Student = function (name) {
    this.name = name;
};
// 给Student的原型添加一个sayHello方法
Student.prototype.sayHello = function () {
    alert('Hello,' + this.name);
}
// 给Student的原型添加一个age属性
Student.prototype.age = '';
 
var st = new Student('张三'); // 初始化对象st
console.log(st.hasOwnProperty('name')); // => true ：调用构造函数时，通过this.name附加到实例对象上
console.log(st.hasOwnProperty('sayHello')); // => false ：sayHello方法为原型上的成员
console.log(st.hasOwnProperty('age')); // => false ：age属性为原型上的成员
 
4.2 isPrototypeOf(obejct) ：判断某个原型是否出现在对象的原型链中
语法：
prototype.isPrototypeOf(object)
参数：
①obejct {object} ：被检测的对象。
返回值：
{bool} 返回某个原型是否出现在对象的原型链中
true ：是
false ：不是
示例 ：
// 1.Obejct对象
var o = new Object();
console.log(Object.prototype.isPrototypeOf(o)); // => true ：o为Obejct一个对象
 
// 2.Array
var array = [1, 2, 3];
console.log(Array.prototype.isPrototypeOf(array)); // => true ：数组原型
console.log(Object.prototype.isPrototypeOf(array)); // => true ：Object是所有对象的基原型
 
// 3.自定义对象
var People = function () {
}
var Student = function () {
}
// 设置Student类的原型为People
Student.prototype = new People();
var st = new Student();
console.log(Student.prototype.isPrototypeOf(st)); // => true ：st为Student一个对象
console.log(People.prototype.isPrototypeOf(st)); // => true ：Student的原型为People
console.log(Object.prototype.isPrototypeOf(st)); // =>true ：Object是所有对象的基原型
 
4.3 propertyIsEnumerable(propertyName) ：
	判断指定名称的属性是否为实例属性并且是可枚举的(可用for/in循环枚举)
参数：
①propertyName {string} ：属性名称
返回值：
{bool} 判断属性是否为实例属性并且是可枚举的(可用for/in循环枚举)，不考虑原型链中的成员。
true ：是
false ：不是
示例 ：
// 1.Array对象
var array = [1, 2, 3];
array.name = 'Array';
console.log(array.propertyIsEnumerable('name')); // => true ：name属性为实例属性
console.log(array.propertyIsEnumerable('join')); // => false ：join方法继承自Array
console.log(array.propertyIsEnumerable('length')); // => false ：length属性继承自Array
console.log(array.propertyIsEnumerable('toString')); // => false ：toString方法继承自Object
 
// 2.自定义对象
var Student = function (name) {
    this.name = name;
}
// 定义一个原型方法
Student.prototype.sayHello = function () {
    alert('Hello' + this.name);
};
var a = new Student('tom');
console.log(a.propertyIsEnumerable('name')); // => true ：name为自身定义的实例属性
console.log(a.propertyIsEnumerable('age')); // => false ：age属性不存在，也返回false
console.log(a.propertyIsEnumerable('sayHello')); // => false ：sayHello属于原型方法
 
4.4 toLocaleString() ：返回当前对象的一个本地化的字符串表示
4.5 toString() ：返回当前对象的一个字符串表示形式
4.6 valueOf() ：返回当前对象的原始值
参数：无
返回值：
{object} 返回当前对象关联的原始值，若没有相关联的值，则返回对象本身
示例 ：
var a = [1, 2, 3];
console.log(a.valueOf()); // => [1, 2, 3]
 
var b = true;
console.log(b.valueOf()); // => true
 
var c = {};
console.log(c.valueOf()); // => Object {}
 
var s = 'abc';
console.log(s.valueOf()); // => abc
 
// 自定义个对象，重写valueOf
var customObject = {};
customObject.valueOf = function () {
    return '自定义对象';
}
console.log(customObject.valueOf()); // => 自定义对象
 
5. 静态方法（Object.assign()、Object.create()、Object.defineProperties()、
Object.defineProperty()、Object.freeze()、
Object.getOwnPropertyDescriptor()、
Object.getOwnPropertyNames()、Object.getPrototypeOf()、Object.setPropertyOf()、
Object.isExtensible()、Object.isFrozen()、
Object.isSealed()、Object.keys()、Object.preventExtensions()、
Object.seal()）

Object.assign(target, ...sources)
	将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。合成对象，共同属性会合并
	
Object.setPropertyOf()

5.1 Object.create(prototype, propertyDescriptor)：
	创建并返回一个指定原型和指定属性的对象
参数：
①prototype {prototype} ：返回对象的原型，可以为null。若为null，对象的原型为undefined。
②propertyDescriptor {propertyDescriptor} 可选：属性描述符。
属性描述符：设置属性的一系列特性；
语法格式：
propertyName: {
    value: '', // 设置此属性的值
    writable: true, // 设置此属性是否可写入；默认为false：只读
    enumerable: true, // 设置此属性是否可枚举(通过for/in预付)；默认为false：不可枚举
    configurable: true // 设置此属性是否可配置；如：是否可以修改属性的特性及删除属性。默认为false
}
返回值：
{object} 返回一个指定原型和指定属性的对象
示例 ：
// 建立个自定义对象，设置name和age属性
var obj = Object.create(null, {
    name: {
        value: 'tom',
        writable: true,
        enumerable: true,
        configurable: true
    },
    age: {
        value: 22
    }
});
console.log(obj.name); // => tom
console.log(obj.age); // => 22
 
obj.age = 28;
console.log(obj.age); // => 22 ：age属性的writable默认为false，此属性为只读
 
5.2  Object.defineProperties(object, propertyDescriptor) ：添加/修改对象一个或多个属性的特性
参数：
①object {object} ：对象
②propertyDescriptor {propertyDescriptor} 属性描述符。
说明：
若对象包含此属性，则是修改此属性的特性；否则为为对象添加此属性。
示例 ：
var obj = {};
 
// 为对象添加name和age属性
Object.defineProperties(obj, {
    name: {
        value: 'tom',
        enumerable: true
    },
    age: {
        value: 22,
        enumerable: true
    }
});
for (p in obj) {
    console.log(p); // => name、age ：输出name和age属性
}

5.3 Object.defineProperty(obj, propertyName, propertyDescriptor) ：添加/修改对象指定属性的特性
参数：
①object {object} ：对象
②propertyName {string} ：属性的名称
③propertyDescriptor {propertyDescriptor} 属性描述符。
说明 ：
若对象包含此属性，则是修改此属性的特性；否则为添加此属性。
示例：
var obj = {};
// 添加一个name属性
Object.defineProperty(obj, 'name', {
        value: 'tom',
        writable: true,
        enumerable: true,
        configurable:true
    }
);
console.log(obj.name); // => tom ：输出name属性的value的值
 
5.4 Object.freeze(object) ：
	冻结对象，使其不能添加属性以及无法对现有的实例属性进行特性更改、值修改、属性删除等操作
参数：
①object {object} ：对象
说明 ：
1) 此操作不可逆，冻结后无法进行解封。
2) 只影响实例属性，不影响原型属性。
示例：
var obj = {
    name: 'tom',
    age: 22
};
Object.freeze(obj); // 冻结对象
 
obj.email = '123@qq.com';
console.log(obj.email); // undefined ：无法添加属性
obj.age = 25;
console.log(obj.age); // 22 ：无法设置属性的值
 
5.5 Object.getOwnPropertyDescriptor(object, propertyName) ：
	返回对象属性的描述符
参数：
①object {object} ：对象
②propertyName {propertyName} 属性名称
返回值：
{propertyDescriptor} 属性描述符对象
示例 ：
var obj = {
    name: 'tom',
    age: 22
};
 
var propertyDes = Object.getOwnPropertyDescriptor(obj, 'name');
console.log(propertyDes); // => Object {value: "tom", writable: true, enumerable: true, configurable: true} ：输出描述符对象

5.6 Object.getOwnPropertyNames(object) ：
	返回一个数组，包含对象的所有实例属性和方法，不包含原型继承的属性和方法
参数：
①object {object} ：对象
返回值：
{Array} 一个数组，包含对象的所有实例属性和方法，不包含原型继承的属性和方法
示例 ：
1	var obj = {
2	    name: 'tom',
3	    age: 22,
4	    sayHello: function () {
5	        alert('Hello' + this.name);
6	    }
7	};
8	console.log(Object.getOwnPropertyNames(obj)); // => ["name", "age", "sayHello"] ：返回对象的实例成员
 
5.7 Object.getPrototypeOf(object) ：返回对象的上一级原型
参数：
①object {object} ：对象
返回值：
{object} 返回原型对象
示例 ：
//   1.对象直接量
var obj = {
    name: 'tom',
    age: 22,
    sayHello: function () {
        alert('Hello' + this.name);
    }
};
console.log(Object.getPrototypeOf(obj)); // => Object 对象：对象直接量的原型为Object
 
// 2.自定义对象
var People = function (name) {
    this.name = name;
};
 
var p = new People('tom');
var people = Object.getPrototypeOf(p);
console.log(people); // => People 对象：new 创建的对象使用构造函数的prototype属性作为他们的原型
console.log(Object.getPrototypeOf(people)); // => Object 对象：原型People的原型为Object

5.8 Object.isExtensible(object) ：判断是否可向对象添加新的属性
5.9 Object.isFrozen(object) ：判断对象是否冻结;true：不能修改对象的现有属性特性和值并且不能添加新的属性
5.10 Object.isSealed(object) ：判断对象是否封闭;true：不能修改对象的现有属性特性并且不能添加新的属性
 
5.11 Object.keys(object) ：返回一个数组，包含对象的可枚举的实例属性名称
参数：
①object {object} ：对象
返回值：
{Array} 返回一个数组，包含对象可枚举的实例属性名称
说明：
此方法与getOwnPropertyNames()类似，但getOwnPropertyNames()包含了可枚举和不可枚举的成员
示例 ：
1	var obj = {
2	    name: 'tom',
3	    age: 22,
4	    sayHello: function () {
5	        alert('Hello' + this.name);
6	    }
7	};
8	 
9	// 1)getOwnPropertyNames与keys方法返回的内容都相同
10	console.log(Object.getOwnPropertyNames(obj)); // => ["name", "age", "sayHello"] ：返回对象的所有实例成员
11	console.log(Object.keys(obj)); // => ["name", "age", "sayHello"] ：返回对象的所有可枚举成员
12	 
13	// 设置对象的name属性不可枚举
14	Object.defineProperty(obj, 'name', {
15	        enumerable: false
16	    }
17	);
18	 
19	// 2)keys方法，只包含可枚举成员
20	console.log(Object.getOwnPropertyNames(obj)); // => ["name", "age", "sayHello"] ：返回对象的所有实例成员
21	console.log(Object.keys(obj)); // => ["age", "sayHello"] ：返回对象的所有可枚举成员
  
5.12 Object.preventExtensions(object) ：设置对象不能添加新的属性
参数：
①object {object} ：对象
返回值：
{object} 返回此对象
示例 ：
1	var obj = {
2	    name: 'tom',
3	    age: 22
4	};
5	Object.preventExtensions(obj); // 设置对象不能添加新的属性
6	obj.email = '123@qq.com';
7	console.log(obj.email); // => undefined ：无法向对象添加新的属性
 
5.13 Object.seal(object) ：密封对象，使其无法修改现有属性的特性以及不能添加新的属性
参数：
①object {object} ：对象
返回值：
{object} 返回此对象
示例 ：
1	var obj = {
2	    name: 'tom',
3	    age: 22
4	};
5	Object.seal(obj); // 密封对象
6	obj.email = '123@qq.com';
7	console.log(obj.email); // => undefined ：无法向对象添加新的属性
8	 
9	// 报异常：无法修改对象属性的特性
10	Object.defineProperty(obj, 'name', {
11	        enumerable: false
12	    }
13	);
 
6.属性描述符（数据属性如value，writable，enumerable，configurable；访问器属性get，set）
分为数据属性和访问器属性；
两者可相互转换，若转换后未设置enumerable和configurable特性(两类属性描述符都包含这2个特性)，将默认采用转换前的值。
6.1 数据属性
说明：包含属性的操作特性；如：设置值、是否可枚举等等
特性名称	描述	默认值
value	设置属性的值	undefined
writable	是否可修改属性的值；true：可修改属性的值；false：不可修改属性的值	false
enumerable	是否可枚举属性；true：可枚举，可通过for/in语句枚举属性；false：不可枚举	false
configurable	是否可修改属性的特性；true：可修改属性的特性(如把writable从false改为true)；false：不可修改属性的特性	false
 
默认值：
1)在使用Object.defineProperty、Object.defineProperties 或 Object.create 函数的情况下添加数据属性，writable、enumerable和configurable默认值为false。
2)使用对象直接量创建的属性，writable、enumerable和configurable特性默认为true。
示例：
1	// 1)对象直接量；属性特性默认为true
2	var o1 = {
3	    name: 'tom'
4	};
5	console.log(Object.getOwnPropertyDescriptor(o1, 'name')); // => Object {value: "tom", writable: true, enumerable: true, configurable: true}
6	 
7	// 2)通过Object.create创建，属性特性默认为false
8	var o2 = Object.create(null, {
9	    name: {value:'tom'}
10	});
11	console.log(Object.getOwnPropertyDescriptor(o2, 'name')); // => Object {value: "tom", writable: false, enumerable: false, configurable: false}
 
6.2 访问器属性
说明：设置属性的访问方式；set、get特性等
特性名称	描述	默认值
get	属性的返回值函数	undefined
set	属性的设置值函数；含有一个赋值参数	undefined
enumerable	是否可枚举属性；true：可枚举，可通过for/in语句枚举属性；false：不可枚举	false
configurable	是否可修改属性的特性；true：可修改属性的特性(如把writable从false改为true)；false：不可修改属性的特性	false
 
示例：
1	var obj = {};
2	 
3	// 添加一个属性，并设置为访问器属性
4	Object.defineProperty(obj, "name", {
5	    get: function () {
6	        return this._name; // get和set里的变量不要使用属性，如：属性为name，get和set用的是_name
7	    },
8	    set: function (x) {
9	        if (isNaN(x)) {
10	            this._name = x;
11	        } else {
12	            this._name = 'name不能为纯数字';
13	        }
14	    },
15	    enumerable: true,
16	    configurable: true
17	});
18	 
19	console.log(Object.getOwnPropertyDescriptor(obj, 'name')); // => Object {get: function, set: function, enumerable: true, configurable: true}
20	obj.name = '12';
21	console.log(obj.name); // => name不能为纯数字
