使用事件代理机制，当事件被抛到更上层的父节点的时候，我们通过检查**事件的目标对象（target）**来判断并获取事件源Li。下面的代码可以完成我们想要的效果：

复制代码
// 获取父节点，并为它添加一个click事件
document.getElementById("parent-list").addEventListener("click",function(e) {
  // **检查事件源e.targe是否为Li**
  if(e.target && e.target.nodeName.toUpperCase == "LI") {
    // 真正的处理过程在这里**可以取得id等HTML标签属性**
    console.log("List item ",e.target.id.replace("post-")," was clicked!");
  }
});
复制代码
为父节点添加一个click事件，当子节点被点击的时候，click事件会从子节点开始向上冒泡。父节点捕获到事件之后，通过判断e.target.nodeName来判断是否为我们需要处理的节点。并且通过e.target拿到了被点击的Li节点。从而可以获取到相应的信息，并作处理。


在javasript中delegate这个词经常出现，看字面的意思，代理、委托。那么它究竟在什么样的情况下使用？它的原理又是什么？在各种框架中，也经常能看到delegate相关的接口。这些接口又有什么特殊的用法呢？这篇文章就主要介绍一下javascript delegate的用法和原理，以及Dojo，jQuery等框架中delegate的接口。
JavaScript事件代理
首先介绍一下JavaScript的事件代理。事件代理在JS世界中一个非常有用也很有趣的功能。当我们需要对很多元素添加事件的时候，可以通过将事件添加到它们的父节点而将事件委托给父节点来触发处理函数。这主要得益于浏览器的事件冒泡机制，后面会详细介绍。下面我们具体举个例子来解释如何使用这个特性。这个例子主要取自David Walsh的相关文章（How JavaScript Event Delegation Works）。
 
假设有一个 UL 的父节点，包含了很多个 Li 的子节点：
复制代码
<ul id="parent-list">
  <li id="post-1">Item 1</li>
  <li id="post-2">Item 2</li>
  <li id="post-3">Item 3</li>
  <li id="post-4">Item 4</li>
  <li id="post-5">Item 5</li>
  <li id="post-6">Item 6</li>
</ul>
复制代码
当我们的鼠标移到Li上的时候，需要获取此Li的相关信息并飘出悬浮窗以显示详细信息，或者当某个Li被点击的时候需要触发相应的处理事件。我们通常的写法，是为每个Li都添加一些类似onMouseOver或者onClick之类的事件监听。

复制代码
function addListeners4Li(liNode){
    liNode.onclick = function clickHandler(){...};
    liNode.onmouseover = function mouseOverHandler(){...}
}

window.onload = function(){
    var ulNode = document.getElementById("parent-list");
    var liNodes = ulNode.getElementByTagName("Li");
    for(var i=0, l = liNodes.length; i < l; i++){
        addListeners4Li(liNodes[i]);
    }   
}
复制代码
如果这个UL中的Li子元素会频繁地添加或者删除，我们就需要在每次添加Li的时候都调用这个addListeners4Li方法来为每个Li节点添加事件处理函数。这就添加的复杂度和出错的可能性。

更简单的方法是使用事件代理机制，当事件被抛到更上层的父节点的时候，我们通过检查事件的目标对象（target）来判断并获取事件源Li。下面的代码可以完成我们想要的效果：

复制代码
// 获取父节点，并为它添加一个click事件
document.getElementById("parent-list").addEventListener("click",function(e) {
  // 检查事件源e.targe是否为Li
  if(e.target && e.target.nodeName.toUpperCase == "LI") {
    // 真正的处理过程在这里
    console.log("List item ",e.target.id.replace("post-")," was clicked!");
  }
});
复制代码
为父节点添加一个click事件，当子节点被点击的时候，click事件会从子节点开始向上冒泡。父节点捕获到事件之后，通过判断e.target.nodeName来判断是否为我们需要处理的节点。并且通过e.target拿到了被点击的Li节点。从而可以获取到相应的信息，并作处理。

事件冒泡及捕获
之前的介绍中已经说到了浏览器的事件冒泡机制。这里再详细介绍一下浏览器处理DOM事件的过程。对于事件的捕获和处理，不同的浏览器厂商有不同的处理机制，这里我们主要介绍W3C对DOM2.0定义的标准事件。

DOM2.0模型将事件处理流程分为三个阶段：一、事件捕获阶段，二、事件目标阶段，三、事件起泡阶段。如图：



事件捕获：当某个元素触发某个事件（如onclick），顶层对象document就会发出一个事件流，随着DOM树的节点向目标元素节点流去，直到到达事件真正发生的目标元素。在这个过程中，事件相应的监听函数是不会被触发的。

事件目标：当到达目标元素之后，执行目标元素该事件相应的处理函数。如果没有绑定监听函数，那就不执行。

事件起泡：从目标元素开始，往顶层元素传播。途中如果有节点绑定了相应的事件处理函数，这些函数都会被一次触发。如果想阻止事件起泡，可以使用e.stopPropagation()（Firefox）或者e.cancelBubble=true（IE）来组织事件的冒泡传播。

jQuery和Dojo中delegate函数
下面看一下Dojo和jQuery中提供的事件代理接口的使用方法。

首先是jQuery：

$("#link-list").delegate("a", "click", function(){
  // "$(this)" is the node that was clicked
  console.log("you clicked a link!",$(this));
});
jQuery的delegate的方法需要三个参数，一个选择器，一个时间名称，和事件处理函数。

而Dojo的与jQuery相似，仅是两者的编程风格上的差别：

复制代码
require(["dojo/query","dojox/NodeList/delegate"], function(query,delegate){

    query("#link-list").delegate("a","onclick",function(event) {
    // "this.node" is the node that was clicked
    console.log("you clicked a link!",this);
  });
})
复制代码
Dojo的delegate模块在dojox.NodeList中，提供的接口与jQuery一样，参数也相同。

优点
通过上面的介绍，大家应该能够体会到使用事件委托对于web应用程序带来的几个优点：

1.管理的函数变少了。不需要为每个元素都添加监听函数。对于同一个父节点下面类似的子元素，可以通过委托给父元素的监听函数来处理事件。

2.可以方便地动态添加和修改元素，不需要因为元素的改动而修改事件绑定。

3.JavaScript和DOM节点之间的关联变少了，这样也就减少了因循环引用而带来的内存泄漏发生的概率。

写到这里，突然想起了之前对于Dojo DataGrid的困惑：那么多的rows和cells，如何处理他们事件之间的关系。现在想想，使用委托就很简单了。所有的事件委托到grid最外层的节点上，当事件发生的时候通过一些方法来获取和添加事件的额外属性，如rowIndex, cellIndex，之后在分配到onRowClick,onCellClick之类的处理函数上。

在JavaScript编程中使用代理
上面介绍的是对DOM事件处理时，利用浏览器冒泡机制为DOM元素添加事件代理。其实在纯JS编程中，我们也可以使用这样的编程模式，来创建代理对象来操作目标对象。这里引用司徒正美相关文章中的一个例子：

复制代码
    var delegate = function(client, clientMethod) {
        return function() {
            return clientMethod.apply(client, arguments);
        }
    }
    var ClassA = function() {
        var _color = "red";
        return {
            getColor: function() {
                console.log("Color: " + _color);
            },
            setColor: function(color) {
                _color = color;
            }
        };
    };

    var a = new ClassA();
    a.getColor();
    a.setColor("green");
    a.getColor();
    console.log("执行代理！");
    var d = delegate(a, a.setColor);
    d("blue");
    console.log("执行完毕！");
    a.getColor();
复制代码
上面的例子中，通过调用delegate()函数创建的代理函数d来操作对a的修改。这种方式尽管是使用了apply（call也可以）来实现了调用对象的转移，但是从编程模式上实现了对某些对象的隐藏，可以保护这些对象不被随便访问和修改。

在很多框架中都引用了委托这个概念用来指定方法的运行作用域。比较典型的如dojo.hitch(scope,method)和ExtJS的createDelegate(obj,args)。有兴趣的同学可以看一下他们的源代码，主要也是js函数的apply方法来制定执行作用域。