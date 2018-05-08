/* LeetCode上Array方法的应用 */

// 题目描述
// 在数组 arr 的 index 处添加元素 item。不要直接修改数组 arr，结果返回新的数组
// 示例1
// 输入
// [1, 2, 3, 4], 'z', 2
// 输出
// [1, 2, 'z', 3, 4]
function insert(arr, item, index) {
    var newArr = arr.slice(0);
    newArr.splice(index, 0, item);
    return newArr;
}
// 题目描述
// 为数组 arr 中的每个元素求二次方。不要直接修改数组 arr，结果返回新的数组
function square(arr) {
    if (Array.prototype.map) { // IE8及以下不支持map
        return arr.map(function (val) {
            return val * val;
        });
    } else {
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
            newArr.push(arr[i] * arr[i]); // 返回新的长度
        }
        return newArr;
    }
}
// 题目描述
// 找出元素 item 在给定数组 arr 中的位置
function indexOf(arr, item) {
    if (Array.prototype.indexOf) { // 判断是否支持indexOf方法，IE8及以下不支持indexOf
        return arr.indexOf(item);
    } else {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === item) {
                return i
            }
        }
    }
    return -1;
}
// 题目描述
// 计算给定数组 arr 中所有元素的总和
// 常规循环
function sum(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}
// eval, eval会把字符串值转换为JS代码执行
function sum(arr) {
    return eval(arr.join("+"));
}
// forEach遍历, forEach(callback(val, index, arr), thisArg)
function sum(arr) {
    var sum = 0;
    arr.forEach(function (val) {
        sum += val;
    });
    return sum;
}
// reduce, reduce(callback(prev, next, index, arr))
function sum(arr) {
    return arr.reduce(function (prev, next) {
        return prev + next;
    });
}
// 不考虑算法复杂度的话，可以用递归
function sum(arr) {
    var len = arr.length;
    if (len === 0) {
        return 0;
    } else if (len === 1) {
        return arr[0];
    } else {
        return arr[0] + sum(arr.slice(1)); // 去掉第一个数的arr为arr.slice(1)
    }
}
// 题目描述
// 移除数组 arr 中的所有值与 item 相等的元素。不要直接修改数组 arr，结果返回新的数组
// push
function remove(arr, item) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== item) { // 用相等的话可以用continue
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
// filter
function remove(arr, item) {
    return arr.filter(function (val) {
        return val !== item;
    });
}
// slice和splice
function remove(arr, item) {
    var newArr = arr.slice(0);
    for (var i = 0; i < newArr.length; i++) {
        if (newArr[i] === item) {
            newArr.splice(i, 1);
            i--; // 删除后，不能忘了i要减一
        }
    }
    return newArr;
}
// 题目描述
// 移除数组 arr 中的所有值与 item 相等的元素，直接在给定的 arr 数组上进行操作，并将结果返回
function removeWithoutCopy(arr, item) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
            arr.splice(i, 1);
            i--; // 不用arr.length--，因为splice的length会自动变化
        }
    }
    return arr; // 要返回arr, 不能直接return arr.splice的结果，因为删除后返回值是删除的元素
}
// indexOf
function removeWithoutCopy(arr, item) {
    for (var i = 0; i < arr.length; i++) {
        var a = arr.indexOf(item);
        arr.splice(a, 1);
    }
    return arr;
}
// ES6, new Set()用于数组去重，Array.from()用于将set结构转为数组
function removeWithoutCopy(arr, item) {
    arr = Array.from(new Set(arr));
    var a = arr.indexOf(item);
    arr.splice(a, 1);
    return arr;
}
// 题目描述
// 在数组 arr 末尾添加元素 item。不要直接修改数组 arr，结果返回新的数组
function append(arr, item) {
    return arr.concat(item);
}
// 题目描述
// 删除数组 arr 最后一个元素。不要直接修改数组 arr，结果返回新的数组
function truncate(arr) {
    return arr.slice(0, arr.length - 1);
}
// pop
function truncate(arr) {
    var newArr = arr.slice(0);
    newArr.pop(); // 不能直接arr.pop()
    return newArr;
}
//普通的迭代拷贝
function truncate(arr, item) {
    var newArr = [];
    for (var i = 0; i < arr.length - 1; i++) {
        newArr.push(arr[i]);
    }
    return newArr;
}
// 题目描述
// 在数组 arr 开头添加元素 item。不要直接修改数组 arr，结果返回新的数组
function prepend(arr, item) {
    // return [item].concat(arr);
    var a = arr.slice(0);
    a.unshift(item);
    return a;
}
// 题目描述
// 删除数组 arr 第一个元素。不要直接修改数组 arr，结果返回新的数组
function curtail(arr) {
    return arr.slice(1);
}
// 题目描述
// 合并数组 arr1 和数组 arr2。不要直接修改数组 arr，结果返回新的数组
function concat(arr1, arr2) {
    return arr1.concat(arr2);
}
// 题目描述
// 在数组 arr 的 index 处添加元素 item。不要直接修改数组 arr，结果返回新的数组
function insert(arr, item, index) {
    var newArr = arr.slice(0); // slice通常比遍历push简洁
    newArr.splice(index, 0, item);
    return newArr;
}
// 题目描述
// 统计数组 arr 中值等于 item 的元素出现的次数
//for循环
function count(arr, item) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
            count++;
        }
    }
    return count;
}
//filter()-->利用指定的函数确定是否在返回的数组中包含某一项
function count(arr, item) {
    var count = arr.filter(function (a) {
        return a === item;   //返回true的项组成的数组
    });
    return count.length;
}
//map()-->对数组中的每一项进行给定函数，
//返回每次函数条用的结果组成的数组；
function count(arr, item) {
    var count = 0;
    arr.map(function (a) {
        if (a === item) {
            count++;
        }
    });
    return count;
}
//reduce()-->从数组的第一项开始，逐个遍历到最后；
function count(arr, item) {
    var count = arr.reduce(function (prev, curr) {
        return curr === item ? prev + 1 : prev;
    }, 0);
    return count;
}
//forEach()-->对数组中的每一项运行传入的函数
function count(arr, item) {
    var count = 0;
    arr.forEach(function (a) {
        a === item ? count++ : 0;
    });
    return count;
}
// 动态规划求最大子集
// 动态规划求最大子集
function reverseString(str) {
    var newStr = str.reverse();
    var mutrix = [];
    for (var i = 0; i < str.length; i++) {
        var mutrix[i] = [];
        for (var j = 0; j < str.length; j++) {
            mutrix[i][j] = 0;
        }
    }
    for (var i = 0; i < str.length; i++) {
        for (var j = 0; j < str.length; j++) {
            if (newStr[i] === str[j]) {
                mutrix[i + 1][j + 1] = mutrix[i][j] + 1;
            } else {
                mutrix[i + 1][j + 1] = Math.max(mutrix[i + 1][j], mutrix[i][j + 1]);
            }
        }
    }
    return mutrix[str.length][str.length];
}
