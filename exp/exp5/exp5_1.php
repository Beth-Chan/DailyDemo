<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div class="main" style="width: 350px;">
        <?php
        $username = $_POST['username'];
        echo "<p>尊敬的用户{$username} 你购买了以下产品</p>";
        $products = $_POST['product'];
        $product = array('4个100瓦灯泡', '8个100瓦灯泡', '4个100瓦节能灯泡', '8个100瓦节能灯泡');
        $price = array(2, 4, 3, 6);
        $oldprice = 0;
        // 遍历$products数组，得到的值存在$selected里
        foreach($products as $selected) {
            echo $product[$selected], '<span style="display: inline-block; margin-left: 40px; float: right;">￥', $price[$selected], '</span><br/>';
            $oldprice += $price[$selected];
        }
        echo '<hr/>';
        $pay = $_POST['pay'];
        $payway = array('Visa', 'MasterCard', '银联');
        echo "支付方式: {$payway[$pay]}<br/>";
        echo '<div style="display:inline-block;margin-right:50px;">原价： ￥',$oldprice,'</div>';
        echo '<div style="display:inline-block;margin-top:10px;">优惠价： ￥', $oldprice*0.7,'</div>';
        ?>
    </div>
</body>
</html>