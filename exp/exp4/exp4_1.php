<?php
	$cities = array('广州市' => '020', '深圳市' => '0755', '上海市' => '021', '北京市' => '010', '杭州市' => '0571');
	$mobilephone = $_POST['mobilephone'];
	$pwd = $_POST['pwd'];
	$nickname = $_POST['nickname'];
	$gender = $_POST['gender'];
	$place = $_POST['place'];
	$validateNum = $_POST['validateNum'];
	
	// echo "<p>你的手机号：{$_POST['mobilephone']}</p>";
	echo "<p>你的手机号：{$mobilephone}</p>";
	echo "<p>创建密码：{$pwd}</p>";
	echo "<p>昵称：{$nickname}</p>";
	echo "<p>性别：{$gender}</p>";
	echo "<p>所在地：{$place}</p>";
	echo "<p>所在区号：{$cities[$_POST['place']]}</p>";
	echo "<p>所在区号：{$validateNum}</p>";
?>