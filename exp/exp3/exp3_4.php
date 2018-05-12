<?php
	$str = 'The Quick Brown Fox';
	echo "$str<br>";
	$lowerstr = strtolower($str);
	$newstr = str_replace("brown", "red", $lowerstr);
	echo "$newstr<br>";

	for($i = 0; $i < strlen($newstr); $i++){		
		$aa = substr($newstr, $i, 1);
		$bb = ord($aa) + 5; 
		$cc = chr($bb);
		echo "$cc";
	}
?>