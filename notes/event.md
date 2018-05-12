编写一个通用的事件监听函数
描述事件冒泡过程
对于一个无限下拉加载图片的页面，如何给每个图片绑定事件（事件代理/事件委托，即事件冒泡的具体应用，场景题）
知识点
// 通用事件绑定，但是每次写事件都要这么写的话很麻烦
var btn=document.getElementById('btn1')
btn.addEventListener('click',function(){
	console.log('clicked')
})

// 所以需要封装
function bindEvent(elem, type, fn){
	elem.addEventListener(type,fn)
}
// 使用
var a=document.getElementById('link1')
bindEvent(a,'click',function(e){
	e.preventDefault();//阻止默认行为 比如:阻止a标签的跳转，没阻止的话就不会有下面的alert('clicked')
	alert('clicked');
})

关于低版本IE兼容性问题：IE低版本使用attachEvent（对IE低版本的兼容性了解即可），和W3C不一样

事件冒泡
e.stopPropatation()//阻止冒泡


代理
通过事件冒泡机制，在元素的上层增加事件绑定机制


完善通用绑定事件的函数
function bindEvent(elem,type,selector,fn){ // 如果用代理把选择器放进去
	// 先处理参数
	if(fn==null){
		// 三个参数时，fn用第三个参数的selector代替，selector是空，也就是交换参数
		fn=selector;
		selector=null;
	}
	elem.addEventListener(type,function(e){
		var target
		// 有没有选择符决定是不是代理
		if(selector){
			target=e.target;
			if(target.matches(selector)){
				fn.call(target,e)
			}else{
				// 不使用代理
				fn(e)
			}
		}
	})
}
// 使用代理
bindEvent(a,'click','a',function(e){
	console.log(this.innerHTML) // this指上面函数的fn.call(target,e)中的target
}) 
// 不使用代理
bindEvent(a,'click',function(e){
	console.log(a.innerHTML)
})

解答
DOM树形结构——》事件冒泡——》组织冒泡——》冒泡的应用（代理）
使用代理。好处：代码简洁，减少浏览器内存占用
