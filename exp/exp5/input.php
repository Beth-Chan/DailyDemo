<?php
    include('./MyDB.php');
    $db = new MyDB();
    $sno = $_POST['sno'];
    $name = $_POST['name'];
    $psw = $_POST['psw'];
    $title = $_POST['title'];
    $partner = $_POST['partner'];
    $action = $_POST['action'];
    if ($action === 'add') {
        $insertSQL = "INSERT INTO students(sno, name, psw, title, last_time, partner) VALUES('$sno', '$name', '$psw', '$title', now(), '$partner')";
        $result = $db -> execSQL($insertSQL);
        if ($result) {
            echo 'Success. Data is successfully inserted.';
            include('show_student.php');
        } else {
            die('Failure! Data cannot been inserted!');
        }
    } 
    if ($action === 'modify') {
        $updateSQL ="UPDATE students SET title='$title', last_time=now() WHERE sno='$sno' AND psw='$psw'";
        $result = $db -> execSQL($updateSQL);
        if ($result) {
            echo 'Success. Data is successfully updated.';
            include('show_student.php');
        } else {
            die('Failure! Data cannot been updated!');
        }
    }
?>