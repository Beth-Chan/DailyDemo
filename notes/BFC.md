触发（生成）BFC（块级格式化上下文）   哪些元素会生成BFC？
	根元素
	display值为inline-block，inline-flex，flex，table-cell，table-caption
	position值不为static
	float值不为none
	overflow值不为visible

首先什么是BFC？
BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。

BFC布局规则：
1.内部的Box会在垂直方向，一个接一个地放置。
2.Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。
3.每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
4.BFC的区域不会与float box重叠。
5.BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
6.计算BFC的高度时，浮动元素也参与计算

那么BFC有何用？
1.清除浮动
2.防止 margin 重叠
3.多栏布局的一种方式

首先我们来看清除浮动
	<style>
		.f{
			border: 10px solid red;
			width: 300px;
		}
		.c{
			border: 10px solid black;
			width:100px;
			height: 100px;
			float: left;
		}
	</style>
	<body>
		<div class="f">
			<div class="c"></div>
			<div class="c"></div>
		</div>
	</body>

根据BFC布局规则第六条：计算BFC的高度时，浮动元素也参与计算,为达到清除内部浮动，我们可以触发f生成BFC，那么f在计算高度时，f内部的浮动元素c也会参与计算。
	.f{
		overflow: hidden;
	}


对于防止 margin 重叠也有很好的效果
	p {
		color: rad;
		background: pink;
		width: 400px;
		line-height: 200px;
		text-align:center;
		margin: 200px;
	}
	<p>1</p>
	<p>2</p>

两个p之间的距离为200px，发送了margin重叠。
根据BFC布局规则第二条：Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。
我们可以在p外面包裹一层容器，并触发该容器生成一个BFC。那么两个P便不属于同一个BFC，就不会发生margin重叠了。
	.container {
		overflow: hidden;
		border:1px solid red;
	}
	p {
		color: rad;
		background: pink;
		width: 100px;
		line-height: 50px;
		text-align:center;
		margin: 50px;
	}
	
外边距的重叠只产生在普通流文档的上下外边距之间，这个看起来有点奇怪的规则，其实有其现实意义。设想，当我们上下排列一系列规则的块级元素（如段落P）时，那么块元素之间因为外边距重叠的存在，段落之间就不会产生双倍的距离。

CSS中margin边界叠加问题及解决方案
本文向大家描述一下CSS的margin边界叠加问题，边界叠加是一个相当简单的概念。但是，在实践中对网页进行布局时，它会造成许多混淆。
你对CSS的margin边界叠加的概念是否了解，这里和大家分享一下，当一个元素出现在另一个元素上面时，第一个元素的底边界与第二个元素的顶边界发生叠加。
CSS的margin边界叠加深度剖析
边界叠加简介
边界叠加是一个相当简单的概念。但是，在实践中对网页进行布局时，它会造成许多混淆。简单地说，当两个垂直边界相遇时，它们将形成一个边界。这个边界的高度等于两个发生叠加的边界的高度中的较大者。
当一个元素出现在另一个元素上面时，第一个元素的底边界与第二个元素的顶边界发生叠加，见图：


◆元素的顶边界与前面元素的底边界发生叠加
当一个元素包含在另一个元素中时（假设没有填充或边框将边界分隔开），它们的顶和/或底边界也发生叠加，见图：


◆元素的顶边界与父元素的顶边界发生叠加
尽管初看上去有点儿奇怪，但是边界甚至可以与本身发生叠加。假设有一个空元素，它有边界，但是没有边框或填充。在这种情况下，顶边界与底边界就碰到了一起，它们会发生叠加，见图：

◆元素的顶边界与底边界发生叠加
如果这个边界碰到另一个元素的边界，它还会发生叠加，见图：
◆空元素中已经叠加的边界与另一个空元素的边界发生叠加
这就是一系列空的段落元素占用的空间非常小的原因，因为它们的所有边界都叠加到一起，形成一个小的边界。
边界叠加初看上去可能有点儿奇怪，但是它实际上是有意义的。以由几个段落组成的典型文本页面为例（见图2-8）。第一个段落上面的空间等于段落的顶边界。如果没有边界叠加，后续所有段落之间的边界将是相邻顶边界和底边界的和。这意味着段落之间的空间是页面顶部的两倍。如果发生边界叠加，段落之间的顶边界和底边界就叠加在一起，这样各处的距离就一致了。

◆边界叠加在元素之间维护了一致的距离
只有普通文档流中块框的垂直边界才会发生边界叠加。行内框、浮动框或绝对定位框之间的边界不会叠加。
边界叠加的问题
边办叠加是一个如果误解就会导致许多麻烦的CSS特性。请参考div元素内嵌套段落的简单示例：

	1. <dividdivid="box"> 
	2. <p>Thisparagraphhasa20pxmargin.p> 
	3. div> 
	4.  
div框设置了10像素边界，段落设置了20像素的边界：

	1. #box{  
	2. margin:10px;  
	3. background-color:#d5d5d5;  
	4. }  
	5. p{  
	6. margin:20px;  
	7. background-color:#6699ff;  
	8. }  
	9.  
你会自然地认为产生的样式会像图1-1那样，在段落和div之间有20像素的距离，在div外边围绕着10像素的边界。
图1-1

但是，产生的样式实际上像图1-2。
图1-2

这里发生了两个情况。首先，段落的20像素上边界和上边界与div的10像素边界叠加，形成一个单一的20像素垂直边界。其次，这些边界不是被DIV包围，而是突出到DIV的顶部和底部的外边。出现这种情况是由于具有块级子元素的元素计算其高度方式造成的。
如果元素没有垂直边框和填充，那么它的高度就是它包含的子元素的顶部和底部边框边缘之间的距离。因此，包含的子元素的顶部和底部空白边就突出到容器元素的外边。但是，有一个简单的解决方案。通过添加一个垂直边框或填充，空白边就不再叠了，而且元素的高度就是它包含的子元素的顶部和底部空白边边缘之间的距离。
为了让前面的示例看起来像图1-1这样，只需在div周围添加补白或边框：

	1. #box{  
	2. margin:10px;  
	3. padding:1px;/*或者border:1pxsolidcolor;*/  
	4. background-color:#d5d5d5;  
	5. }  
	6. p{  
	7. margin:20px;  
	8. background-color:#6699ff;  
	9. }  
	10.  
边界叠加的大多数问题可以通过添加透明边框或1px的补白来修复。

补充解决方案：
1.外层padding: 1px;
2.透明边框border:1px solid transparent;
3.绝对定位postion:absolute:
4.外层DIV  overflow:hidden;
5.内层DIV　加float:left; display:inline;
6.外层DIV有时会用到zoom:1;

最后，对于多栏布局
	body {
	width: 600px;
	position: relative;
	}
	.left {
	width: 200px;
	height: 350px;
	float: left;
	background: red;
	}
	.right {
	height: 400px;
	background: blue;
	}

根据BFC布局规则第3条：每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
根据BFC布局规则第四条：BFC的区域不会与float box重叠。
我们可以通过通过触发right生成BFC， 来实现自适应两栏布局。
加上
	.right {
		height: 400px;
		background: blue;
		overflow:hidden;
	}
这样实现了左栏的宽度固定，右栏可以根据浏览器宽度自适应，依次类比，三栏布局也是很好实现的
