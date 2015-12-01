dojo.provide("unieap.tree.DndContainer");
dojo.require("dojo.dnd.common");
dojo.declare("unieap.tree.DndContainer",null,{
		//DndSource的父类，用来对支持拖拽的树总体设置样式和绑定事件
			
		constructor: function(params){
			dojo.mixin(this, params);
			this.tree = this.widget;   //关联的树
			this.node = this.tree.domNode;   //树的domNode
			this.current = null;	// 当前节点domNode
			this.currentId = null;
			this.containerState = "";   //标示树的状态
			dojo.addClass(this.node, "dojoDndContainer");
			this.events = [
				dojo.connect(this.node, "onmouseenter", this, "onOverEvent"),
				dojo.connect(this.node, "onmouseleave",  this, "onOutEvent"),
				dojo.connect(this.tree, "onMouseOver", this, "_onMouseOver"),
				dojo.connect(this.tree, "onMouseOut",  this, "_onMouseOut"),
				dojo.connect(this.node, "ondragstart",   dojo, "stopEvent"),
				dojo.connect(this.node, "onselectstart", dojo, "stopEvent")
			];
			dojo.setSelectable(this.node,false);
		},
		
		//销毁时，解除事件绑定
		destroy: function(){
			dojo.forEach(this.events, dojo.disconnect);
			this.node = this.parent = null;
		},

		//树的鼠标over事件，将事件相关的节点设为当前节点
		_onMouseOver: function(widget,evt){
			var node = this._getChildByEvent(evt);
			if (node&&!widget.isRoot()) {
				this.current = node; //当前节点显示区域的dom对象
				this.currentId = this.tree.getBinding().getId(widget.domNode.associatedData.item);
			}else if(node&&widget.isRoot()&&this.isDragging){
				this.current = node; //当前节点显示区域的dom对象
				this.currentId = this.tree.getBinding().getId(widget.domNode.associatedData.item);
			}
		},

        //树的鼠标out事件，将当前节点置空
		_onMouseOut: function(widget){
			this.current = null;
			this.currentId = null;
		},

       //修改树的状态
		_changeState: function(type, newState){
			var prefix = "dojoDnd" + type;
			var state  = type.toLowerCase() + "State";
			dojo.removeClass(this.node, prefix + this[state]);
			dojo.addClass(this.node, prefix + newState);
			this[state] = newState;
		},
       
	    //增加节点的样式
		_addItemClass: function(node, type){
			dojo.addClass(node, "dojoDndItem" + type);
		},

         //移除节点的样式
		_removeItemClass: function(node, type){
			dojo.removeClass(node, "dojoDndItem" + type);
		},
        
		//监听树的鼠标over事件
		onOverEvent: function(){
			this._changeState("Container", "Over");
		},

        //监听树的鼠标out事件
		onOutEvent: function(){
			this._changeState("Container", "");
		},
		
		//根据event得到当前的关联的节点，只取节点的显示区域部分
		 _getChildByEvent: function(evt){
              var node = evt.target;
               if (node && dojo.hasClass(node,"dijitTreeLabel")){
                   return node;
               }
               return null;
        }
});



