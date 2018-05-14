<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>题目列表</title>
    <style> 
    table {
        width: 900px;
        margin: 30px auto;
        border-collapse: collapse;
        text-align: center;
    }
    tr, td {
        width: 270px;
        height: 50px;
    }
    form {
        text-align: center;
    }
    table tr:first-child {
        background: yellow;
    }
    tr:nth-child(even) {
        background: lightgreen;
    }
    </style>
</head>
<body>
    <table border="1">
        <tr>
            <td>序号</td>
            <td>学号</td>
            <td>姓名</td>
            <td>题目</td>
            <td>状态</td>
            <td>录入时间</td>
            <td>合作学生</td>
        </tr>
    <div class="paganation">
        <?php
        require_once('MyDB.php');
        $db = new MyDB();
        $records = 3; // 每页显示的记录数
        $page = 1; // 表示显示的页码
        if (isset($_GET['page'])) {
            $page = $_GET['page'];
        }
        $numStart = ($page - 1) * $records; // 计算起始记录, 0 开始
        $selectSQL = "SELECT * FROM students LIMIT $numStart, $records";
        $result = $db -> execSQL($selectSQL);

        $i = 0;
        while ($line = $result -> fetch_assoc()) {
            ++$i;
            echo "<tr><td>{$i}</td>";
            echo "<td>{$line['sno']}</td>";
            echo "<td>{$line['name']}</td>";
            echo "<td>{$line['title']}</td>";
            echo "<td>{$line['state']}</td>";
            echo "<td>{$line['last_time']}</td>";
            echo "<td>{$line['partner']}</td>";
            echo '</tr>';
        }
        ?>
    </table>
    
    <form action="show_student.php" method="GET">
        <input type="submit" value="翻到"/>
        <?php
            echo "<input type=\"text\" name=\"page\" size=\"2\" value=\"{$page}\"/>";
            echo '<a href="show_student.php?page=', $page-1, '">前一页</a>';
            echo '<a href="show_student.php?page=', $page+1, '">下一页</a>';
        ?>
    </form>
    </div>
        
    
</body>
</html>