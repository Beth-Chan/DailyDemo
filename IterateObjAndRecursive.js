/* 请编写一段程序，将一个对象和它直接、间接引用的所有对象的属性字符串放入一个数组，如var o = {a:1,b:2,c:{d:1}}，这里o经过处理后，应该得到[‘a’,’b’,’c’,’d’]

考察点：递归，for in */

var arr = [];
function getAllProperty(obj) {
    // 总是要检查传入的参数，obj是以防obj是null的情况
    if (obj && typeof obj == 'object') {
        // 遍历属性
        for(let k in obj) {
            // 将属性放进数组，必须都是字符串，把k隐式转换成字符串
            arr.push(k + '');
            // 当属性值是对象时，
            if(typeof obj[k] == 'object') {
                // 递归
                getAllProperty(obj[k]);
            }
        }
    }
}
console.log(arr);
