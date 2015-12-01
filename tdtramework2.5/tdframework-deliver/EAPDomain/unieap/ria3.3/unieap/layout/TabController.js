dojo.provide("unieap.layout.TabController");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("unieap.menu.Menu");
dojo.require("unieap.layout._BaseContainer");

dojo.declare("unieap.layout.TabController",
	[dijit._Widget, dijit._Templated,unieap.layout._BaseContainer],
	{
	/*
     * @declaredClass:
     * 		unieap.layout.TabController
     * @summary:
     * 		控制Tab页控制类，增加TabButton、控制Tab页切换等
     */

	templateString: "<div wairole='tablist' dojoAttachEvent='onkeypress:onkeypress'></div>",

	//tab标签的位罄1�7
	//	{"top"|"bottom"|"left-h"|"right-h"}	
	tabPosition: "top",
	
	buttonWidget: "unieap.layout._TabButton",
	
	//关联的TabContainer
	container: null,
	
	postCreate: function(){
		
		dijit.setWaiRole(this.domNode, "tablist");
		
		if(this.tabPosition == 'left-h' || this.tabPosition == 'right-h') {
			this.domNode.style.height="99999px"
		} else {
			//this.domNode.style.width="99999px"
		}

		this.pane2button = {};		// mapping from panes to buttons

		this._subscriptions=[
			dojo.subscribe(this.container.id+"-startup", this, "onStartup"),
			dojo.subscribe(this.container.id+"-addChild", this, "onAddChild"),
			dojo.subscribe(this.container.id+"-removeChild", this, "onRemoveChild"),
			dojo.subscribe(this.container.id+"-selectChild", this, "onSelectChild"),
			dojo.subscribe(this.container.id+"-hideTabButton", this, "hideTabButton"),
			dojo.subscribe(this.container.id+"-showTabButton", this, "showTabButton"),
			//取消了该事件的发布�1�7�订阄1�7,TabContainer暂不响应键盘事件
//			dojo.subscribe(this.containerId+"-containerKeyPress", this, "onContainerKeyPress")
		];
	},
	/*
	 * container的addChild方法发布-addChild事件
	 * TabController订阅事件后执行该方法：创建对应的TabButton,绑定相应的事仄1�7
	 */
	onAddChild: function(/*Widget*/ page, /*Integer?*/ insertIndex){
		// summary:
		//		Called whenever a page is added to the container.
		//		Create button corresponding to the page.
		// tags:
		//		private

		// add a node that will be promoted to the button widget
		var refNode = dojo.doc.createElement("span");
		this.domNode.appendChild(refNode);
		// create an instance of the button widget
		var cls = dojo.getObject(this.buttonWidget);
//		var button = new cls({label: page.title, closeButton: page.closable,tabPosition:this.tabPosition}, refNode);
		var button = new cls({tablist: this, page:page}, refNode);
		this.addChild(button, insertIndex);
		this.pane2button[page] = button;
		
		page.controlButton = button;	// this value might be overwritten if two tabs point to same container

		if(!this._currentChild){ // put the first child into the tab order
			button.focusNode.setAttribute("tabIndex", "0");
			this._currentChild = page;
		}
		//make sure all tabs have the same length
		if(!this.isLeftToRight() && dojo.isIE && this._rectifyRtlTabList){
			this._rectifyRtlTabList();
		}
	},
	
	_rectifyRtlTabList: function(){
		//summary: Rectify the width of all tabs in rtl, otherwise the tab widths are different in IE
		if(0 >= this.tabPosition.indexOf('-h')){ return; }
		if(!this.pane2button){ return; }

		var maxWidth = 0;
		for(var pane in this.pane2button){
			var ow = this.pane2button[pane].innerDiv.scrollWidth;
			maxWidth = Math.max(maxWidth, ow);
		}
		//unify the length of all the tabs
		for(pane in this.pane2button){
			this.pane2button[pane].innerDiv.style.width = maxWidth + 'px';
		}	
	},
	/*
	 * container.startup方法发布-startup事件
	 * TabController订阅事件后执行该方法 
	 * info {children:孩子节点数组，seleted:选中某节点}
	 */
	onStartup: function(/*Object*/ info){
		dojo.forEach(info.children, this.onAddChild, this);
		this.onSelectChild(info.selected);
	},
	
	/*
	 * container.removeChild方法发布-removeChild事件
	 * TabController订阅事件后执行该方法：移除container对应的TabButton
	 */
	onRemoveChild: function(/*Widget*/ page){
		if(this._currentChild === page){ this._currentChild = null; }
		
		var button = this.pane2button[page];
		if(button){
			button.destroy();
			delete this.pane2button[page];
		}
	},
	
	/*
	 * container.selectChild(page)发布-selectChild事件＄1�7
	 * TabController订阅事件后执行该方法,处理TabButton的�1�7�中状�1�7�1�7
	 */
	onSelectChild: function(/*Widget*/ page){

		if(!page){ return; }
		
		if(this._currentChild){
			//原TabButton取消选中状�1�7�1�7
			var oldButton=this.pane2button[this._currentChild];
			
			oldButton.setSeleted(false);
			oldButton.focusNode.setAttribute("tabIndex", "-1");
		}
		//设置TabButton选中状�1�7�1�7
		var newButton=this.pane2button[page];
		newButton.setSeleted(true);
		this._currentChild = page;
		newButton.focusNode.setAttribute("tabIndex", "0");
		dijit.setWaiState(this.container.containerNode, "labelledby", newButton.id);
		this._handleFocus(newButton);
	},
	//隐藏TabButton
	hideTabButton: function(page) {
		var button = this.pane2button[page];
		button.hide();
	},
	
	showTabButton: function(page) {
		var button = this.pane2button[page];
		button.show();
	},
	/*
	 * 处理焦点
	 */
	_handleFocus: function(button) {
		unieap.blurWidget();
	},
	
	//选中page
	onButtonClick: function(/*Widget*/ page){
		this.container.selectChild(page); 
	},
	
	//关闭page
	onCloseButtonClick: function(/*Widget*/ page){
		this.container.closeChild(page);
		var b = this.pane2button[this._currentChild];
		if(b){
			dijit.focus(b.focusNode || b.domNode);
		}
	},
	
	// TODO: this is a bit redundant with forward, back api in StackContainer
	adjacent: function(/*Boolean*/ forward){
		// summary:
		//		Helper for onkeypress to find next/previous button
		// tags:
		//		private

		if(!this.isLeftToRight() && (!this.tabPosition || /top|bottom/.test(this.tabPosition))){ forward = !forward; }
		// find currently focused button in children array
		var children = this.getChildren();
		var current = dojo.indexOf(children, this.pane2button[this._currentChild]);
		// pick next button to focus on
		var offset = forward ? 1 : children.length - 1;
		return children[ (current + offset) % children.length ]; // dijit._Widget
	},

	onkeypress: function(/*Event*/ e){
		// summary:
		//		Handle keystrokes on the page list, for advancing to next/previous button
		//		and closing the current page if the page is closable.
		// tags:
		//		private
		
		if(this.disabled || e.altKey ){ return; }
		var forward = null;
		if(e.ctrlKey || !e._djpage){
			var k = dojo.keys;
			switch(e.charOrCode){
				case k.LEFT_ARROW:
				case k.UP_ARROW:
					if(!e._djpage){ forward = false; }
					break;
				case k.PAGE_UP:
					if(e.ctrlKey){ forward = false; }
					break;
				case k.RIGHT_ARROW:
				case k.DOWN_ARROW:
					if(!e._djpage){ forward = true; }
					break;
				case k.PAGE_DOWN:
					if(e.ctrlKey){ forward = true; }
					break;
				case k.DELETE:
					if(this._currentChild.closable){
						this.onCloseButtonClick(this._currentChild);
					}
					dojo.stopEvent(e);
					break;
				default:
					if(e.ctrlKey){
						if(e.charOrCode === k.TAB){
							this.adjacent(!e.shiftKey).onClick();
							dojo.stopEvent(e);
						}else if(e.charOrCode == "w"){
							if(this._currentChild.closable){
								this.onCloseButtonClick(this._currentChild);
							}
							dojo.stopEvent(e); // avoid browser tab closing.
						}
					}
			}
			// handle page navigation
			if(forward !== null){
				this.adjacent(forward).onClick();
				dojo.stopEvent(e);
			}
		}
	},
	
	destroy: function(){
		for(var pane in this.pane2button){
			this.onRemoveChild(pane);
		}
		dojo.forEach(this._subscriptions, dojo.unsubscribe);
		this.inherited(arguments);
	}

//	onContainerKeyPress: function(/*Object*/ info){
//		info.e._djpage = info.page;
//		this.onkeypress(info.e);
//	},
});

/*
 * TabButton实现籄1�7
 */
dojo.declare("unieap.layout._TabButton",
	[dijit._Widget, dijit._Templated],
	{

	baseClass: "tab",
	
	tabPosition:"top",
	
	selected: false,
	
	//TabButton关联的container
	container: null,
	
	//标记tab页当前的选中状�1�7�1�7
	selected: false,

	//标记tab页是否可关闭，对应CSS样式：tab页按钮上会有'X'
	closable: false,
	
	templateString: "<a href='javascript:void(0);' class='tab u-a-tab' dojoAttachPoint='focusNode' dojoAttachEvent='onclick:onButtonClick'>"+
						"<div  class='tabInnerDiv' dojoAttachPoint='innerDiv'>"+
							"<span dojoAttachPoint='containerNode' class='tabLabel'></span>"+
							"<span class='closeImage' dojoAttachPoint='closeNode' "+
								"dojoAttachEvent='onclick: onClickCloseButton'>"+
							"</span>"+
						"</div>"+
					"</a>",
								
	tabIndex: "-1",

	postCreate: function(){
		
		this.label = this.page.title;
		this.tabPosition = this.tablist.tabPosition;
		this.closable = this.page.closable;
		var aLabelClass = 'u-a-tab'+this.tabPosition.charAt(0).toUpperCase() + this.tabPosition.substr(1).replace(/-.*/, "");
		dojo.addClass(this.domNode,aLabelClass);
		
		if(this.closable){
			dojo.addClass(this.innerDiv, "unieapClosable");
			dojo.attr(this.closeNode,"title", RIA_I18N.layout.tabController.close);
		}else{
			this.closeNode.style.display="none";		
		}
		
		this.inherited(arguments); 

		if(this.label){
			//存在-h霄1�7要字体纵向显礄1�7
			if(-1 != this.tabPosition.indexOf('-h')&&dojo.isFF){
				//this.containerNode.innerHTML="<marquee scrollAmount='2'>"+this.label+"</marquee>";
				var labelArray = this.label.split("");
				var e;
				for(var i=0; i<labelArray.length; i++) {
					e = dojo.create('div',null,this.containerNode);
					e.textContent = labelArray[i];
				}
			}else{
				if(dojo.isFF) {
					this.containerNode.textContent = this.label;
				} else {
					this.containerNode.innerText = this.label;
				}
			}
		}
		dojo.setSelectable(this.containerNode, false);
		
		
	},
	/*
	 * 设置TabButon选中
	 */
	setSeleted: function(/*Boolean*/ bool){
		this.selected = bool;
		var cls=this.baseClass+"Checked";
		//设置选中样式
		if(bool) {
			dojo.addClass(this.domNode,cls);
			//ie6下不显示Tab按钮边框
			dojo.isIE==6&&dojo.style(this.domNode,"height",dojo.style(this.domNode,"height")+2)
		}else {
			if(dojo.isIE==6&&dojo.hasClass(this.domNode,cls)){
				dojo.style(this.domNode,"height",dojo.style(this.domNode,"height")-2);
				dojo.style(this.domNode,'backgroundColor','white')
			}
			dojo.removeClass(this.domNode,cls);
		}	
	},

	/*
	 * 在TabController onAddChild方法里把onClick方法绑定了onButtonClick
	 */
	onButtonClick: function(/*Event*/ evt){
		
		if(dojo.isIE&&this.domNode.setActive){
			try{
				this.domNode.setActive();
			}catch(e){
				
			}
		}
		//调用 TabController 方法里的
		this.tablist.onButtonClick(this.page);
	},
	//当closable=true时，点击'X'触发该方法，方法不应该被覆盖，可以connect
	//Note that you shouldn't override this method, but you can connect to it.
	onClickCloseButton: function(/*Event*/ evt){
		//禁止事件传播
		evt.stopPropagation();
		this.tablist.onCloseButtonClick(this.page);
	},
	
	//tab页关闭前触发的事件，return true tab页关闄1�7
	onClose: function(){
		return true;		// Boolean
	},
	
	getWidth:function(){
		var size=dojo.marginBox(this.domNode);
		if(dojo.isWebKit){
			//margin;
			return size.w+4;
		}
		return size.w;
	},
	
	getHeight : function(){
		var size=dojo.marginBox(this.domNode);
		return size.h;
	},
	
	hide: function() {
		dojo.style(this.domNode,'display','none');
	},
	
	show: function() {
		dojo.style(this.domNode,'display','inline-block');
	}
});
