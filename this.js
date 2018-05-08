var cxf = {
    gender: 'female',
    getGender: function() {
        // this的值取决于函数调用的位置
        console.log(this);
        console.log(this.gender);
    }
};

var getFunc = cxf.getGender(); // this是cxf这个Object; this.gender是female

var getFunc = cxf.getGender;
getFunc(); // this在浏览器环境下是window，node环境下是global，window下没有gender，所以是undefined，严格模式下this是undefined，读取gender会报错 TypeError: Cannot read property 'gender' of undefined

// getGender后没带括号，等价于在全局环境下有个函数是：
// function() {
//     console.log(this.gender);
// }
// 这时函数的调用位置为全局作用域，所以是window，而window没有gender属性，所以是undefined

// 正确提取方法，bind没有立即执行，只是返回一个函数，apply和call就会立即执行函数
var getFunc = cxf.getGender.bind(cxf);
getFunc(); // females

var fullname = 'Beth-Chan';
var obj = {
   fullname: 'Tone',
   prop: {
      fullname: 'Chen Xiaofang',
      getFullname: function() {
         return this.fullname;
      }
   }
};

console.log(obj.prop.getFullname()); // Chen Xiaofang
 
var test = obj.prop.getFullname;
 
console.log(test()); // Beth-Chan


// 在第一个 console.log()调用中，getFullname() 被调用作为obj.prop对象的函数。所以，上下文指的是prop，函数返回该对象的fullname。
// 下面这种情况则是：上下文指的是全局对象（window）。这是因为test是被隐式设置为全局对象的属性。出于这个原因，该函数返回window的fullname。 

// call() 和 apply()

// 要使最后这种情况的console.log() 打印 Chen Xiaofang，可以通过使用 call() 或者 apply() 改变函数上下文。在这种情况下，apply()也会输出相同的结果

console.log(test.call(obj.prop));