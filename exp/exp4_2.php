<?php
    foreach($_FILES as $file) {
        if($file['error'] > 0) {
            echo 'Error: ', $file['error'], '<br/>';
        } else {
            $filename = $file['name'];
            $tmp_name = $file['tmp_name'];
            // 目录要先建立好
            $filepath = '../upload/'.$filename;
            // 把临时文件copy到web目录中
            move_uploaded_file($tmp_name, $filepath);
            // 判断文件类型
            if (strpos($file['type'], 'image') === false) { // 不是图片的情况下
                // 链接方式，点击可下载
                echo "<a href=\"{$filepath}\" download=\"{$file['name']}\">文件下载{$file['name']}</a>";
            } else { // 图片的情况
                // 直接展示图片
                echo "<div><img src=\"{$filepath}\"/></div>";
            }
            echo "<hr/>";
        }
    }
?>