/* 最小化重排和重绘 */
var lis = document.getElementById('fruit');

// 创建文档片段
var frag = document.createDocumentFragment();
// 创建li标签
var li = document.createElement('li');
// 还要设置li的内容
li.innerHTML = 'apple';
// 再把li标签添加到文档片段
frag.appendChild(li);

var li = document.createElement('li');
li.innerHTML = 'watermelon';
frag.appendChild(li);

// 再整体把fragment添加DOM中
lis.appendChild(frag);


// 三个样式属性被改变，每一个都会影响元素的几何结构，虽然大部分现代浏览器都做了优化，只会引起一次重排，但是像上文一样，如果一个及时的属性被请求，那么就会强制刷新队列，而且这段代码四次访问DOM，一个很显然的优化策略就是把它们的操作合成一次，这样只会修改DOM一次：
var ele = document.getElementById('myDiv');
ele.style.borderLeft = '1px';
ele.style.borderRight = '2px';
ele.style.padding = '5px';


var ele = document.getElementById('myDiv');
 
// 整体样式用cssText，样式修改有三种方式：

// 1. 重写 style
ele.style.cssText = 'border-left: 1px; border-right: 2px; padding: 5px;';
 
// 2. add style
ele.style.cssText += 'border-;eft: 1px;'
 
// 3. use class 这个很常用，也很好用，只需要在样式表中增加样式规则，然后在JS中使用className就可以动态添加样式了
ele.className = 'active';


// 重排和重绘是DOM编程中耗能的主要原因之一，平时涉及DOM编程时可以参考以下几点：

// 尽量不要在布局信息改变时做查询（会导致渲染队列强制刷新）
// 同一个DOM的多个属性改变可以写在一起（减少DOM访问，同时把强制渲染队列刷新的风险降为0）

// 如果要批量添加DOM，可以先让元素脱离文档流，操作完后再带入文档流，这样只会触发一次重排（fragment元素的应用）

// 将需要多次重排的元素，position属性设为absolute或fixed，这样此元素就脱离了文档流，它的变化不会影响到其他元素。例如有动画效果的元素就最好设置为绝对定位。