dojo.provide("unieap.layout._BaseContainer");
dojo.declare("unieap.layout._BaseContainer", null, {
	/*
     * @declaredClass:
     * 		unieap.layout._BaseContainer
     * @summary:
     * 		提供容器组件操作孩子结点的基本API
     */
	
	buildRendering: function(){
		this.inherited(arguments);
		if(!this.containerNode){
			// all widgets with descendants must set containerNode
			this.containerNode = this.domNode;
		}
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