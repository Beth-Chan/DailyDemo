<?php
    // 判断是“login.html”提交过来进行密码验证的，还是“shopcart.html”跳转过来进行用户注销的。
    if (isset($_POST['username']) && isset($_POST['username'])) { 
        $username = $_POST['username'];
        $psw = $_POST['psw'];
        if ($psw != '123') { // 密码不是123时还是登录界面
            echo '密码错误，请重新登录<br/>';
            echo '<a href="login.html">重新登录</a>';
        } else { // 密码对时展示购物列表
            session_destroy();
            session_start();
            // 建立session
            $_SESSION['username'] = $username;
            header("Location: http://localhost/cxf/exp7/shopcart/shopcart.html");
        }
    } else { // 用户注销
        session_start();
        // 取消session
        unset($_SESSION['cart']);
        session_destroy();
        // 跳转到登录界面
        header("Location: http://localhost/cxf/exp7/shopcart/login.html");
    }
    
    
?>

