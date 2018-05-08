// 1. 遍历对象最佳实践，for-in
// 会遍历继承来的属性
// 不要用for-in遍历数组，第一for-in只会遍历索引，而不是数组元素，除非通过arr[索引]的方式获取数组元素，其次，for-in还会遍历所有的（非索引）属性值
for(var key in person) {
    // 不写if(person.hasOwnProperty(key))，因为它可能被重写，实例person可能也有一个hasOwnProperty属性，那就会导致这种方式失效
    if (Object.prototype.hasOwnProperty.call(person, key)) { // 检验属性是否存在的最佳实践；也可以写{}.hasOwnProperty.call(obj, key);
        console.log(key);
    }
}

// 遍历对象的三种方法
for(var i in obj) {
     console.log(i, ":", obj[i]);
}

Object.keys(obj).forEach(function(key) {
    console.log(key, obj[key]);
});

Object.getOwnPropertyNames(obj).forEach(function(key) {
    console.log(key, obj[key]);
});

// 枚举性（一般规则是，系统创建的属性不可枚举，用户创建的属性可枚举）
Object.keys(Object.prototype); // [] 遍历可枚举的属性，返回一个数组
Object.getOwnPropertyNames(Object.prototype); // ["constructor", "hasOwnProperty", "toString"等]  所有自身属性的属性名(包括不可枚举属性但不包括Symbol值作为名称的属性)，返回一个数组


/* ========================================================================================================================================================== */

// 2. 遍历数组最佳实践是用for和forEach
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
arr.forEach(function(elem, index) {
    console.log(elem);
});

// 遍历数组的另外两种方法
for (var i in arr){ // 遍历的是下标
    console.log(i, ":", arr[i]);
}

for (var value of arr){ // 遍历的是数组元素
    console.log(value);
}


/* ========================================================================================================================================================== */


// 3. 类数组对象（看起来像数组，实际上不是；意味着它们可以通过 索引访问 且拥有 length 属性， 但没有数组方法。
// 例如arguments、DOM节点列表NodeList、字符串）
// （字符串的length是不变的，reverse()的length是可变的）
// document.getElementsBy*(), document.forms等都是返回DOM NodeList
// 使用类数组对象的技巧
// （1）for循环或者Array.prototype.forEach()遍历类数组对象中的所有元素
for (let i = 0; i < arguments.length; i++) {
    console.log(i + '. ' + arguments[i]);
}
Array.prototype.forEach.call(arguments, function(elem, index) {
    console.log(index + '. ' + elem);
});
// （2）把类数组对象转化为数组
var arr = Array.prototype.slice.call(arguments);
// 附：slice()不带任何参数时会创建拷贝
var copy = ['a', 'b'].slice();


/* ========================================================================================================================================================== */


// 4. 很多使用对象作为映射，作为var obj = {}; obj[key] = value使用

 

