### 购物车功能

   **用PHP与Session来操作购物车**简单案例

###### 登录界面
``` html
 <form action="psw_validator.php" method="POST">
       <div class="login-container">
           <h4>请输入用户名</h4>
           <div class="login-main">
               <div class="login-row">
                   <label for="username">用户名:</label>
                   <input type="text" name="username" id="username">
               </div>
               <div class="login-row">
                   <label for="psw">密码：</label>
                   <input type="password" name="psw" id="psw">
               </div>
               <div class="login-row submit">
                   <input type="submit" value="登录">
               </div>
           </div>
       </div>
   </form>
```

###### 密码验证
``` php
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
            header("Location: http://localhost/cxf/exp7/exp7_3/shopcart.html");
        }
    } else { // 用户注销
        session_start();
        // 取消session
        unset($_SESSION['cart']);
        session_destroy();
        // 跳转到登录界面
        header("Location: http://localhost/cxf/exp7/exp7_3/login.html");
    }
?>
```

###### 购物车列表页面
``` html
 <div class="shopcart">
        <h1>请选择购物</h1>
        <hr>
        <div class="shopcart-row shopcart-header">
            <span>产品名称</span>
            <span>价格</span>
            <span>数量</span>
        </div>
        <div class="shopcart-row">
            <span>iPad</span>
            <span>￥3000</span>
            <span>
                <a href="shopcart.php?product=ipad&status=add">购买</a>
            </span>
        </div>
        <div class="shopcart-row">
            <span>笔记本</span>
            <span>￥4000</span>
            <span>
                <a href="shopcart.php?product=notebook&status=add">购买</a>
            </span>
        </div>
        <div class="shopcart-row">
            <span>数码相机</span>
            <span>￥2000</span>
            <span>
                <a href="shopcart.php?product=camera&status=add">购买</a>
            </span>
        </div>
        <div class="shopcart-row">
            <span>iPhone</span>
            <span>￥3500</span>
            <span>
                <a href="shopcart.php?product=iphone&status=add">购买</a>
            </span>
        </div>
        <div class="review">
            <a href="shopcart.php?status=show" target="_self">查看购物车</a>
        </div>
        <div class="logout">
            <a href="psw_validator.php" target="_self">注销</a>
        </div>
    </div>
</body>
```

###### 购物车php操作
``` php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PHP与Session</title>
    <style>
        input {
            display: inline-block;
            width: 20px;
        }
        #modify {
            display: inline-block;
            width: 90px;
        }
    </style>
</head>
<body>
    <div class="shopcart">
        <form action="shopcart.php?status=modify" method="post">
        <?php
            // 模拟数据库
            $products = array("ipad"=>3000, "notebook"=>4000, "camera"=>2000, "iphone"=>3500); // 方便查找物品价格
            $productNames = array("ipad"=>"iPad", "notebook"=>"笔记本", "camera"=>"数码相机", "iphone"=>"iPhone");

            session_start();
            // 先判断购物车是否存在
            if (isset($_SESSION['cart'])) {
                // 采用数组保存购物车，并保存在$_SESSION 中，并取出赋值于$carts
                $carts = $_SESSION['cart'];
            } else {
                // 不存在就构建一个新数组，例如$carts['ipad']表示 ipad 的购买数量， $carts['iphone']表示 iphone 的购买数量。
                $carts = [];
            }

            // 取得status值，可以是show或add
            $status = $_REQUEST['status'];

            // “查看购物车”的相关处理，由$_REQUEST["status"]获取 status 进行以下分支判断，
            if ($status == "show") {
                show("", $carts, $productNames, $products);
            }

            // “购买”操作
            // 如果 status="add"，说明从"shopcart.html"跳转过来，从$_GET["product"]获取要增加的货物 id
            // 如果该货物 id 在$carts 中未存在，则建立数组散列值，并记录购买数量是 1；如果该货物 id 在$carts 中已存在，则数量加 1；
            if (isset($_GET["product"]) && $status=="add") {//判断是否为添加
                $product = $_GET["product"];//取出传入的物品的 id
                if (array_key_exists($product, $carts)) {
                    $carts[$product]++; // 已存在，就加1
                } else {
                    $carts[$product] = 1; // 不存在，就设置为1
                }
                show('已增加', $carts, $productNames, $products);
            }

            // “修改购物车”的相关处理
            if ($status == "modify") {
                // 遍历$_POST 中要修改的物品与数量值，对$carts 的购物车中对应的物品修改相应数量。  
                // var_dump($_POST); // array(4) { ["ipad"]=> string(1) "4" ["iphone"]=> string(1) "3" ["camera"]=> string(1) "5" ["notebook"]=> string(1) "7" }        
                foreach ($_POST as $product => $current) {
                    if($current != 0) {
                        $carts[$product] = $current;
                    } else { // 该物品修改的数量为 0
                        // 去掉某件产品
                        unset($carts[$product]);
                    }
                }
                show('已修改', $carts, $productNames, $products);
            }
        
            // 最后当$carts 处理完之后，要重新存入$_SESSION['cart']中。
            $_SESSION['cart'] = $carts;

            function show($tips, $carts, $productNames, $products) {
                echo "<div class=\"shopcart\"><h1>尊敬的用户{$_SESSION['name']} 购物车{$tips}：</h1>";
                echo "<div class=\"shopcart-row shopcart-header\"><span>产品名称</span><span>价格</span><span>数量</span></div>";
                foreach($carts as $name=>$count) {
                    echo "<div class=\"shopcart-row\"><span>$productNames[$name]</span>";
                    echo "<span>$products[$name]</span>";
                    echo "<input type=\"text\" name=\"$name\" value=\"$count\"></div></div>";
                }
            }
        ?>
        <div class=\"shopcart-row\">
            <a href="shopcart.html">继续购物</a>
            <input type="submit" value="修改购物车" id="modify">
        </div>
        </form>
    </div>
</body>
</html>
```