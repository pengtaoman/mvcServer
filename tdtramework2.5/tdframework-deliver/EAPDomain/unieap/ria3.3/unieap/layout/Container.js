dojo.provide("unieap.layout.Container");
dojo.require("unieap.util.util");
dojo.require("dijit._Widget");
(function(){
//容器管理器
var containerManager = new function(){
	var containers = [];
	this.getContainers = function(){
		return containers;
	}
	this.addContainer = function(container){
		containers.push(container);
	}
	this.removeContainer = function(container){
		for(var i=0;containers[i];i++){
			if(container == containers[i]){
				containers.splice(i,1);
				return;
			}
		}
	}
	this.getParent = function(container){
		//在文档流中查找此节点，如果不在文档流中返回-1，如果没有根节点返回null
		if(dojo.byId(container.id)==null){
			return -1; 
		}
		var node = container.domNode.parentNode,widget;
		while(node){
			if(node.getAttribute && (widget=dijit.byNode(node))){
				if(dojo.hasClass(node,"unieap-container")){
					return widget;
				}
			}
			node = node.parentNode;
		}
		return null;
	}
	this.getChildren = function(container){
		var chilren = [];
		for(var i=0;containers[i];i++){
			if(container==containers[i].getParent()){
				children.push(containers[i]);
			}
		}
		return children;
	}
	
}();
dojo.declare("unieap.layout.Container", dijit._Widget, {
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
    //配置属性接口
	UserInterfaces : {
		width : "string",
		height : "string",
		securityId : "string",
		id : "string",
		jsId : "string",
		"class" : "string",
		style : "string",
		postponeRender : "boolean",
		onContainerResize : "function"		
	},
	
	
	buildRendering : function(){
		// all widgets with descendants must set containerNode
		this.inherited(arguments);
		if(this.templateString==null){
			this.containerNode = this.domNode;
		}
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
			//最外层容器，需要监听window的变换
			this.bindEvent4onresize();
			//改变子容器
			this.resizeContainer();
		}
	},
	
	/**
	 * @summary:
	 *		容器初始化是否延迟渲染
	 * @type:
	 *		{boolean}
	 * @default:
	 *		false
	 */
	postponeRender : false,
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
		//给容器增加唯一的class定义，便于查找容器
		dojo.addClass(this.domNode,"unieap-container")
		this.connects = [];
		//设置宽度和高度
		this._setWidth(this.domNode.style.width || this.width);
		this._setHeight(this.domNode.style.height || this.height);
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
		if(null==this.domNode) return;
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
	*   当本容器（例如：AdaptiveContainer、StackCOntainer和HBoxContainer）的大小发生变化的时候，会触发的事件 
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
		var node = this.domNode.parentNode,widget = null;
		while(node ){
			if(node.getAttribute && (widget = dijit.byNode(node))){
				if(dojo.hasClass(node,"unieap-container")){
					break;
				}
			}
			node = node.parentNode;
		}
		return (this.parentContainer = widget);
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
		if(this.postponeRender){
			this.postponeRender = false;
			dojo.parser.parse(this.containerNode);
		}
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
		return dojo.style(this.domNode,"display")=="none";
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
		if(this.connects){
			while(this.connects.length){
				dojo.disconnect(this.connects.pop());
			}
		}
		var children = (this instanceof unieap.layout.Container) && this.containerNode ? dijit.findWidgets(this.containerNode) : [];
		dojo.forEach(children,function(widget){
			widget.destroy();
		});
		this.inherited(arguments);
	},
	_setWidth : function(width){
		this.width = width;
		dojo.style(this.domNode,"width",this._convertNumber(this.width));
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
		this._setWidth(width);
		this.notifyResize();
	},
	_setHeight : function(height){
		this.height = height;
		dojo.style(this.domNode,"height",this._convertNumber(this.height));
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
		this._setHeight(height);
		this.notifyResize();
	},
	
	//转换合法的数值
	_convertNumber : function(data){
		return data + ((isNaN(data)||data=="")?"" : "px");
	},
	/*
	 * 获得container所有孩子节点(widget)
	 */
	getChildren: function(){
		//上面buildRendering没走
		!this.containerNode && (this.containerNode = this.domNode);
		
		this.children = dojo.query("> [widgetId]", this.containerNode).map(dijit.byNode);
		return this.children;
//		if(this.children == null) {
//		}
//		return this.children;
	},
	
	/*
	 * 为container增加孩子节点，如果widget没有start，则执行startup()方法
	 */
	addChild: function(/*Widget*/ widget, /*int?*/ insertIndex){
		var refNode = this.containerNode;
		if(insertIndex && typeof insertIndex == "number"){
			var children = this.getChildren();
			if(children && children.length >= insertIndex){
				refNode = children[insertIndex-1].domNode;
				insertIndex = "after";
			}
		}
		dojo.place(widget.domNode, refNode, insertIndex);

		// If I've been started but the child widget hasn't been started,start it now.  
		if(this._started && !widget._started){
			widget.startup();
		}
	},
	
	/*
	 * dom中移除container中指定孩子节点，输入参数支持index
	 */
	removeChild: function(/*Widget or int*/ widget){
		if(typeof widget == "number" && widget > 0){
			widget = this.getChildren()[widget];
		}
		// If we cannot find the widget, just return
		if(!widget || !widget.domNode){ return; }
		
		var node = widget.domNode;
		node.parentNode.removeChild(node);	// detach but don't destroy
	},
	
	/*
	 * 查找孩子节点在container中的位置(index)，没有找到返回-1
	 */
	getIndexOfChild: function(/*Widget*/ child){
		var children = this.getChildren();
		for(var i=0, c; c=children[i]; i++){
			if(c == child){ 
				return i; // int
			}
		}
		return -1; // int
	},
	
	/*
	 * 判断是container是否含有孩子节点
	 */
	hasChildren: function(){
		return !!this.getChildren().length;
	}
});
})();