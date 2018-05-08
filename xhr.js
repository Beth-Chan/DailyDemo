// AJAX核心是XMLHttpRequest对象。AJAX请求过程：创建 XMLHttpRequest 对象、连接服务器、发送请求、接收响应数据；
var xhr = null;
function ajax() {
    // 先考虑 存在XMLHttpRequest
    if(typeof XMLHttpRequest != "undefined") {
        // 1.创建 XMLHttpRequest 对象
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsof.XMLHTTP"); // 注意有小数点，而且HTTP是全大写
    }

    // 此阶段readyState为0

    // readyState的变化都会触发事件，这就是原理
    // readyState属性值变化时会触发readystatechange事件
    xhr.onreadystatechange = function() {

        // 此阶段readyState为2:未接收到响应

        // 请求过程的当前活动阶段。0是未初始化，尚未调用open()方法；1是启动，已调用open()方法，未调用send()方法；2是未接收到响应。3是接收到部分响应数据，4是接收到全部响应数据。
        if(xhr.readyState == 4) {
            // 检查status状态码
            if((xhr.status >= 200 && xhr.status <  300) || xhr.status == 304) {
                // 4.接收响应数据（响应主体的内容）
                console.log(xhr.responseText);
            } else { // 要处理拿不到数据的情况
                console.log("Request was unsuccessful:" + xhr.status + " - " + xhr.statusText);
            }
        }
    }

    // 2.连接服务器
    xhr.open("get","getLastestBook.php?b_ID=" + b_ID, true); // true是异步，继续执行，不必等待响应

    // 此阶段readyState为1：已调用open()方法，未调用send()方法
  
    // 3.发送请求
    xhr.send(null);
}