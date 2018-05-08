function toRGB(str) { // 首先看输入参数：是字符串
    // 考虑有多少种情况
    // 先处理最特殊的情况
    if(str === 'invalid') {
        return 'invalid';
    } else { 
        // 用正则表达式找出符合的，忽略大小写
        var reg1 = /^#([0-9A-F]{2}([0-9A-F]{2}([0-9A-F]{2})$/i; 
        var reg2 = /^([0-9A-F])([0-9A-F])([0-9A-F])$/i;
        var reg3 = /[0-9A-F]{2}/gi;
        if(reg2.test(str)) {
            str = str.replace(reg2, "#$1$1$2$2$3$3");
        }
        if(reg1.test(str)) {
            // 要拿到每个分组，然后去parseInt变成16进制的数字
            var m = str.match(reg3);
            // 进制转换
            str = "rgb(" + [parseInt(m[0], 16),parseInt(m[1], 16),parseInt(m[2], 16)].join(', ') + ')';
        }
        return str;
    }
}