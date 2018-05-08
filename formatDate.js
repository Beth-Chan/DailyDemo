export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) { // 匹配到4个y
        // 用数字去替换 yyyy-MM-dd hh:mm 的日期格式，$1在这里是yyyy，getFullYear取得的年份是个四位数字，转为字符串，用字符串的substr方法，RegExp.$1.length是4，所以substr从0开始
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            // 要替换的字符串
            let str = o[k] + ''
            // 9月份的话就是09
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return fmt
}

// 一位数补零
function padLeftZero(str) {
    // 一位数字和两位数字都可用的技巧
    return ('00' + str).substr(str.length)
}
