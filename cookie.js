/**
 * cookie的操作都跟document.cookie有关系
 */

function setcookie(cname, cvalue, exdays) {
    let exdate = new Date(); 
    // php的 time() 函数返回一个以秒为单位的、整型数的时间 + 60秒 * 60分钟 * 24小时 * 30天 即 过期日期
    exdate.setDate(exdate.getDate() + exdays);
    // 或者exdate.setTime(exdate.getTime() + (exdays * 24 * 60 * 60 * 1000));
    document.cookie = encodeURIComponent(cname) + "=" + encodeURIComponent(cvalue) + (exdays == null)? "" : ";expires=" + exdate.toGMTString();
}

function getcookie(cname) {
    // 有没有cookie
    if (document.cookie.length > 0) {
        // 有没有指定的cookie 比如：name=cxf; gender=female;secure
       let cstart = document.cookie.indexOf(cname + "=");
       if (cstart !== -1) {
            cstart = cstart + cname.length + 1; // 0+4+1=5 c的位置
            cend = document.cookie.indexOf(";", cstart); // f后的;
            if(cend === -1) {
                cend = document.cookie.length;
            }
            // substring方法
            return decodeURIComponent(document.cookie.substring(cstart, cend)); // 前闭后开 刚好是cxf
       }
    }
    return "";
}

// 直接调用setcookie设置为空字符串即可
function clearcookie (cname) {
    setcookie(cname, "", -1);
}