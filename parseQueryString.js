// ?id=1&name=cxf 
// var obj = {
//     id: "1",
//     name: "cxf"
// }
// 首先要传进来一个url
// 然后找到查询字符串中的 ?id=1 和 &name=1（可能有，也可能没有），可以用正则表达式
// key和value只要不是?或者&就可以，中间是等号
// 用substring(1)提取?或者&后的键值对
// 然后用split("=")方法分割出等号前后
// 然后放进新建的对象 obj[key] = val

/**
 *  解析url参数为一个对象
 *  @example ?id=1&name=cxf
 *  @return Object {id: "1", name: "cxf"}
 */
function parseQueryString(url) { 
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]+/g; // 匹配出?id=1和&name=cxf；记得加上g！要不然就只能执行一次匹配，只匹配到了一个，如果没找到任何匹配的文本，返回null
    let arr = url.match(reg); // 记得是返回一个数组！该数组的第 0 个元素存放的是匹配文本，而其余的元素存放的是与正则表达式的子表达式匹配的文本，这里写的没有分组，所以没有子表达式
    if (arr) {
        arr.forEach(function(item, index, arr) {
            // 遍历匹配后的数组，把每个键值对分割成只包含key和value两个元素的数组；1是因为?号或者&号
            let tempArr  = item.substring(1).split('=');
            // obj[temp[0]] = temp[1]; 关于url的处理，别忘了要encodeURIComponent了！
            let key = encodeURIComponent(tempArr[0]);
            let val = encodeURIComponent(tempArr[1]);
            obj[key] = val;
        });
    }
    return obj;
}

var obj = parseQueryString('http://www.baidu.com?id=1&name=cxf');
console.log(obj);