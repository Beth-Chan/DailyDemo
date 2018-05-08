// 迭代法
function getNthFibonacci(count) {
    // 不要忘了处理count
    if(count < 0) {
        return 0;
    }
    if (count <= 1) {
        return 1;
    }
    var first = 1;
    var second = 1;
    var third = 0;
    for (let i = 2; i <= count; i++) { // 注意要改成2开始，到小于等于count
        third = first + second;
        first = second;
        second = third;
    }
    return third;
}

console.log(getNthFibonacci(40));

// 不要写递归
function getNthFibonacci2(count) {
    if (count < 0) {
        return 0;
    }
    if (count <= 1) {
        return 1;
    }
    return getNthFibonacci2(count-2) + getNthFibonacci2(count-1);
}

console.log(getNthFibonacci2(40)); // 耗时较长