<?php
    $username = $_GET['username'];
    // 模拟数据库
    $usernames = ['admin', 'jack', 'tom'];
    if (in_array($username, $usernames)) {
        echo 1;
    } else {
        echo 0;
    }
?>