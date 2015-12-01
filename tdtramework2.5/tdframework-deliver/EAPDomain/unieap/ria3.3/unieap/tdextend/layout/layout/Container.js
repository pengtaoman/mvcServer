dojo.provide("unieap.layout.Container");
dojo.require("unieap.util.util");
dojo.require("dijit._Widget");
dojo.require("unieap.layout._BaseContainer");
dojo.declare("unieap.layout.Container", [dijit._Widget,unieap.layout._BaseContainer], {
	/**
     * @declaredClass:
     * 		unieap.layout.Container
     * @summary:
     * 		简单的容器组件，unieap的容器组件均继承自此类
     * @classDescription:
     *		本组件可以直接使用，可用作某些容器组件的父容器。
     *      可以控制容器的显示、隐藏以及大小，并会同时调整父子容器的显示状态和大小。
     * @example:
     * |<div dojoType="unieap.layout.Container" style='height:200px'>
     * |	<div dojoType="unieap.layout.TitlePane" style="width:100%">
     * |	</div>
     * |</div>
     */
	
	buildRendering : function(){
	    this.inherited(arguments);
	},
	
	postCreate:function(){
		if(this.declaredClass == 'unieap.layout.Container') {
			dojo.style(this.containerNode,{
				'position':'relative',
				'overflow':'hidden'
			});
		}
		this.initContainer();
	},
	
		
	//容器启动时会调用的方法
	startup : function() {
		if(!this.getParentContainer()) {
			this.resizeContainer();
		}
		this.inherited(arguments);
	},
	
	/**
	 * @summary：
	 * 		设置容器的宽度
	 * @type：
	 * 		{string}
	 * @default：
	 * 		auto
	 */
	width : "auto",

	/**
	 * @summary：
	 * 		设置容器的高度
	 * @type：
	 * 		{string}
	 * @default：
	 * 		auto
	 */
	height : "auto",
	
	 /**
	  *@summary:
	  *   权限id,控制显示或隐藏
	  * @type:
	  *   {string}
     */
	securityId:'',
	
	/*
	 * @summary:
	 * 		父容器的id
	 * @type:
	 * 		{string}
	 */
	parentContainer : '',
	
	children : null,
	
	//进行容器的参数初始化，在容器的postCreate里面，需要调用该方法
	initContainer : function(){
		this.connects = [];
		//设置宽度和高度
		clearTimeout(this.setWidth(this.domNode.style.width || this.width));
		clearTimeout(this.setHeight(this.domNode.style.height || this.height));
		//最外层容器，需要监听window的变换
		if(this.getParentContainer()==null){ 
			this.bindEvent4onresize();
		}
		this.connects.push(dojo.connect(this,"resizeContainer",this,"onContainerResize"));
	},
	
	//绑定onresize事件 ，如果没有_viewport的判断，页面切换也会触发onresize事件
	bindEvent4onresize: function() {
		this._viewport = dijit.getViewport();
		this.connects.push(dojo.connect(dojo.global, 'onresize', this, function(){
			var newViewport = dijit.getViewport();
			if(newViewport.w != this._viewport.w ||  newViewport.h != this._viewport.h){
				this._viewport = newViewport;
				this.resizeContainer();
			}
		}));
	},
	
	
	//===========================容器调整============================
	/*
	* @summary：
	*   通知子容器和父容器调整其高度和宽度
	* @description:
	*   在容器的内部实现中，本容器大小发生变化时，会调用该方法以设置页面内相关容器的大小
	*   用户也可以调用该方法，从而按照页面配置的原则，手动改变关联容器的大小
	* @example:
	* |unieap.byId("container").notifyResize()
	*/
	notifyResize : function(){
		this.resizeContainer();
		//通知父容器重新分配子容器大小
		unieap.notify(this.getParentContainer(),"notifyParentResize",this);
	},
	
	/*
	 * @summary：
	 * 	 通知本容器的子容器调整大小
	 * @example:
	 * |unieap.byId("container").resizeContainer()
	 */
	resizeContainer: function() {
		var display = dojo.style(this.containerNode,"display");
		if(dojo.isIE!=8 && display!="none"){
			dojo.style(this.containerNode,"display","none");
			dojo.style(this.containerNode,"display",display);
		}
		this.resizeChildrenContainer();
	},
	
    //重置子容器高度和宽度
	resizeChildrenContainer : function(){
		var children = this.getChildrenContainer();
		setTimeout(function(){
			for(var i=0,child;i<children.length;i++){
				child= children[i];
				unieap.notify(child,"resizeContainer");
			}
		},0);
	},
	
	//通知父容器重新分配子容器大小,自适应容器重载此方法重新分配各子容器宽高
	notifyParentResize : function(child){
		unieap.notify(this.getParentContainer(),"notifyParentResize",this);
	},
	
	/**
	*@summary：
	*   大小改变事件
	*@description:
	*   当本容器的大小发生变化的时候，会触发的事件 
	* @example:
	* |<div id="AdaptiveContainer" dojoType="unieap.layout.AdaptiveContainer">
	* |	<div dojoType="unieap.layout.AdaptivePane">
	* |		<div dojoType="unieap.layout.TitlePane" title="titlepane" >
	* |			固定高度1
	* |		</div>	
	* |	</div>
	* |	<div dojoType="unieap.layout.AdaptivePane" autoHeight="true" onContainerResize="heightChange">
	* |		自适应内容
	* |	</div>
	* |	<div dojoType="unieap.layout.AdaptivePane">
	* |		<div dojoType="unieap.layout.TitlePane" title="titlepane" >
	* |			固定高度3
	* |		</div>	
	* |	</div>
	* |</div>	
	* |<script>
	* |function heightChange(){
	* |	if(this.isHidden())
	* |		return ;
	* |	alert("回调事件");
	* |}
	* |</script>
	*/
	onContainerResize : function(){},
	
	
	resize: function(changeSize, resultSize){
	},
	
    /*
	*@summary：
	*   设置父容器对象id
	*@param：
	* 	{string} parentContainer
	*/
	setParentContainer : function(parentContainer){
		this.parentContainer = parentContainer;
	},
	
	/*
	* @summary：
	*      获取父容器对象
	* @return :
	*	{unieap.layout.Container} 容器对象
	* @example:
	* |var parent = unieap.byId("testContainer").getParentContainer();
	* |alert(parent.domNode.offsetHeight);
	*/
	getParentContainer : function(){
		if(this.parentContainer){
			if(dojo.isString(this.parentContainer)){
				this.parentContainer = unieap.byId(this.parentContainer);
			}
			return this.parentContainer;
		}
		return (this.parentContainer = this._getPCObject(this.domNode));
	},
	
	//获取父容器的内部实现
	_getPCObject : function(node){
		if(!node || node.nodeName=="BODY") return null;
		var pNode = node.parentNode,id,widget;
		if(pNode&&pNode.getAttribute&&(id=pNode.getAttribute("widgetId"))!=null && 
			(widget = dijit.byId(id)) instanceof unieap.layout.Container){
			return  widget;
		}
		return this._getPCObject(pNode);
	},
	
	/**
	*@summary：
	*   显示本容器
	*@description:
	*   在容器隐藏的情况下，调用本方法，能够将容器显示出来，并动态调整页面内其它容器组件的大小
	* @example:
	* |unieap.byId("container").show();
	*/
	show : function(){
		dojo.style(this.domNode,"display","block");
		this.notifyResize(1);
	},
	
	/**
	*@summary：
	*   隐藏容器
	*@description:
	*   在容器显示的情况下，调用本方法，能够将容器隐藏，并动态调整页面内其它容器组件的大小
	* @example:
	* |unieap.byId("container").hide();
	*/
	hide : function(){
		dojo.style(this.domNode,"display","none");
		this.notifyResize(0);
	},
	
	/**
	*@summary:
	*   判断容器是否隐藏
	*@description:
	*   返回值为容器是否处于隐藏状态
	*@return 
	*      {boolean}
	* @example:
	* |var hidden = unieap.byId("container").isHidden();
	* |if(hidden){
	* |		unieap.byId("container").show();
	* |}
	*/
	isHidden : function(){
		return this.domNode.offsetHeight == 0;
	},
	
	/*
	*@summary:
	*	获取本容器的直接子容器构成的数组
	*@description:
	*	在RIA的容器框架中，调用本方法可以得到指定容器的所有直接子容器
	* @example:
	* |var children = unieap.byId("parentContainer").getChildrenContainer();
	* |for(var i=0;i<children[i];i++){
	* |   alert(children[i].isHidden());	
	* |}
	* @return:
	* 	{array} 子容器数组对象
	*/
	getChildrenContainer : function(){
		return unieap.getChildrenContainer(this.containerNode);
	},
	
	destroy : function(){
		//销毁事件绑定
		while(this.connects.length){
			dojo.disconnect(this.connects.pop());
		}
		var children = (this instanceof unieap.layout.Container) && this.containerNode ? dijit.findWidgets(this.containerNode) : [];
		dojo.forEach(children,function(widget){
			widget.destroy();
		});
		this.inherited(arguments);
	},
	
	/**
	 * @summary：
	 * 		设置容器的宽度
	 * @description：
	 * 		用户可以动态的调整容器的宽度，可以是固定数值、百分比或auto
	 *      调用该方法将会动态调整页面内相关的容器组件的宽度
	 * @param：
	 * 		{string} width
	 * @example:
	 * |unieap.byId("container").setWidth("300px");
	 */
	setWidth : function(width){
		this.width = width;
		dojo.style(this.domNode,"width",this._convertNumber(this.width));
		return setTimeout(dojo.hitch(this,"notifyResize"),0);
	},
	
	/**
	 * @summary:
	 * 		设置容器的高度
	 * @description:
	 * 		用户可以动态的调整高度，可以是固定数值、百分比或auto
	 *      调用该方法将会动态调整页面内相关的容器组件的高度
	 * @param:
	 * 		{string} height
	 * @example:
	 * |unieap.byId("container").setHeight("800px");
	 */
	setHeight : function(height){
		this.height = height;
		dojo.style(this.domNode,"height",this._convertNumber(this.height));
		return setTimeout(dojo.hitch(this,"notifyResize"),0);
	},
	
	//转换合法的数值
	_convertNumber : function(data){
		return data + (isNaN(data)? "" : "px");
	}
});