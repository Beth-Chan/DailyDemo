// 扩展内置对象,不覆盖可能已经定义的功能(函数兼容)
String.prototype.repeatify = String.prototype.repeatify || function(times) {
    var str = "";
    for (let i = 0; i < times; i++) {
        str += this;
    }
    return str;
};