// 先初始化一个Promise实例
new Promise(
    // 执行器 executor
    function(resolve, reject) {
        // 一段耗时很长的异步操作
        resolve(); // 数据处理完成
        reject(); // 数据处理出错
    } // 这个函数执行完后就会改变Promise实例的状态
).then(function A() { // 当前面的Promise状态改变时，then会根据最终状态选择特定的状态响应函数执行
    // 成功时
    // then返回一个新的Promise实例，所以它可以链式调用
}, function B() {
    // 失败时
});

// pending，fullfilled，rejected
// 状态一经改变就不可改变


console.log('go');
new Promise(function(resolve) {
    setTimeout(function() {
        resolve('hello'); // resolve里的参数往then的函数参数传递
    }, 2000);
}).then(function(value) {
    console.log(value + 'world');
});


