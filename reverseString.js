/**
 * @param {string} str 
 * @return {string}
 */
var str = 'hello';
var reverseString = function(str) {
    if(str === null) {
        return; // 这里要怎么写比较好？
    } 
    return str.split('').reverse().join(''); 
    // split的分隔符是必需的，如果把空字符串用作 separator，那么 stringObject 中的每个字符之间都会被分割。
    // join方法如果省略该参数，则使用逗号作为分隔符。
};
console.log(reverseString(str));

var reverseString2 = function(str) {
    var result = '';
    var arr = str.split('');
    for(var i = arr.length-1; i > 0; i++) {
        result = result + arr[i];
    }
    return result;
};
console.log(reverseString2(str));

// var arr = ['cxf', 1, 'Beth'];
// // var reverseWord = function(arr) {
//     arr.reverse();
// // };
// console.log(arr.reverse());