<?php
    include('./MyDB.php');
    $db = new MyDB();
    
    $username = $_POST['id'];
    $psw = $_POST['psw'];
    // 没有传id、密码值时
    if ((!isset($username)) && (!isset($psw))) {
        if ((!isset($_COOKIE['id'])) && (!isset($_COOKIE['psw']))) {
            header('Location: http://localhost/cxf/exp4/exp4_3.html');
            die;
        } else { // 没id和密码，但有cookie时
            $username = $_COOKIE['id'];
            $psw = $_COOKIE['psw'];
        }
    }
     else {
        $username = $_POST['id'];
        $psw = $_POST['psw'];
        // 判断有没有勾选“记住我一周”
        if (isset($_POST['remenberme'])) {
            setcookie('id', $username, time() + 60 * 60 * 24 * 7);
            setcookie('psw', $psw, time() + 60 * 60 * 24 * 7);
        } else {
            setcookie('id', $username);
            setcookie('psw', $psw);
        } 

    }

    $sql = "SELECT * FROM user WHERE id='$username' AND psw='$psw'";
    $rs = $db -> execSQL($sql);
    if ($rs -> num_rows) {
        $obj = $rs -> fetch_object();
        echo "<p>欢迎您 ", "{$obj -> name}";
        $date = date('Y-m-d H:i:s');
        if (($obj -> logintime) === null) {
            echo '<p>您上次的登录时间是：无</p>';
        } else {
            echo '<p>您上次的登录时间是：', $obj -> logintime, '</p>';
        }
        $strSQL = sprintf("UPDATE user SET logintime='%s' WHERE id='%s'", $date, $username);
        $db -> execSQL($strSQL);
    } else {
        echo '用户名或密码错误，请您重新登录！';
    }
?>