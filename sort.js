// sort([5, 100, 6, 3, -12]) // 返回 [-12, 3, 5, 6, 100]

// 有冒泡、插入、选择、快速、归并等各种排序算法。掌握各种排序算法的思路和优缺点。

var arr = [33, 3, 2];
let result = arr.sort(function(a, b) {
    // 升序，降序变成 b - a 即可
    return a - b;
});
console.log(result);

// 数组对象的某个属性值排序
let arr = [
    {
        name: 'cxf',
        age: 22
    },
    {
        name: 'ddd',
        age: 12
    }
];
function compare(prop) {
    return function(a, b) {
        return a[prop] - b[prop];
    };
}
let result = arr.sort(compare('age'));
console.log(result);

// 根据参数不同，来确定是升序排列，还是降序排序呢？

sortBy: function(attr,rev){
    //第二个参数没有传递 默认升序排列
    if(rev ==  undefined){
        rev = 1;
    }else{
        rev = (rev) ? 1 : -1;
    }
    return function(a,b){
        a = a[attr];
        b = b[attr];
        if(a < b){
            return rev * -1;
        }
        if(a > b){
            return rev * 1;
        }
        return 0;
    }
}
// 使用方式：

newArray.sort(sortBy('number',false)) 

// 冒泡排序
function sort(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length - 1; j++) {
            if(array[j] > array[j+1]) {
                var temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
            }
        }
    }
    return array;
}

function sort(arr) {
    let pivotIndex = arr.indexOf(arr[0])
    // some code...        
}