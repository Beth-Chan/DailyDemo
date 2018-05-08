/**
 * 返回一个合并过的数组（归并操作），归并其实只是两个指针（i和j）分别在两个数组从左到右扫一遍，很简单
 * 看哪个数组先扫完（所以要看两个数组的长度），哪个数组的数更小就先放进临时数组，还没扫完的就直接放进临时数组
 * var a = [-3,-1,0,1,3,5,7,9], b = [-4,-2,0,2,3,4,5,6,7,8]，返回[-4,-3,-2,-1,0,0,1,2,3,3,4,5,5,6,7,7,8,9]
 */
function merge(a, b) {
    var temp = [];
    var i = 0;
    var j = 0;
    var aLen = a.length;
    var bLen = b.length;
    while(i < aLen && j < bLen) {
        if (a[i] <= b[j]) {
            temp.push(a[i++]);
        } else {
            temp.push(b[j++]);
        }
    }
    while(i < aLen) {
        temp.push(a[i++]);
    }
    while(j < bLen) {
        temp.push(b[j++]);
    }
    return temp;
}