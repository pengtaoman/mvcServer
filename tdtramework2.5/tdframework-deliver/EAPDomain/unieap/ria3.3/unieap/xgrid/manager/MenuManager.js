dojo.provide('unieap.xgrid.manager.MenuManager');
dojo.require("unieap.xgrid.manager.Manager");
dojo.require('unieap.menu.Menu');
dojo.declare("unieap.xgrid.manager.MenuManager", unieap.xgrid.manager.Manager, {
	/**
	 * @summary:
	 * 		是否总是在Grid表头上显示菜单按钮(点击该按钮会弹出菜单)
	 * @description:
	 * 		该属性有效的前提是要弹出的菜单必须有子节点或者用户自自定义了onBeforeMenuClick函数。
	 * 		用户可以修改global.js中的unieap.widget变量来全局设定是否在表头上显示菜单按钮
	 * @type:
	 * 		 {boolean}
	 * @example:
	 * |<div dojoType="unieap.xgrid.Grid' 
	 * 		menu="{alwaysShowMenu:true,onBeforeMenuClick:fn}" showcell=true lockcell=true>
	 */
	alwaysShowMenu:unieap.widget.grid.alwaysShowMenu,
	
	/*
	 * Grid菜单的事件句柄
	 */
	_connectHandlers: null,
	
	create: function(param){
		this._connectHandlers = [];
		dojo.mixin(this, param);
		this.menu = new unieap.menu.Menu({});
		this.subscribe("injectMenuItem",this,"injectMenuItem");
		this.subscribe("setItemStatus",this,"setItemStatus");
		this.subscribe("resize",this,"updateEvent");
		this.subscribe("reinjectMenuItem",this,"destroyMenuItem");
		this.bindEvent();
	},
	//向menu中注入菜单项
	injectMenuItem: function(menuItems){
		for(var i=0;i< menuItems.length;i++){
			this.menu.addChild(menuItems[i]);
		}
	},
	//根据array中的ID设置菜单项的禁用状态
	setItemStatus: function(item){
		item.menuItem.setDisabled(item.flag);
	},
	//页面刷新时，需要重新绑定菜单事件
	updateEvent: function(){
		this.unbindEvent();
		this.bindEvent();
	},
	//当菜单项的结构发生改变时，需要先销毁这个菜单项，然后重新注入菜单项
	destroyMenuItem: function(menuItems){
		for(var i=0;i< menuItems.length;i++){
			this.menu.removeChild(menuItems[i]);
		}
	},
	//为菜单项绑定事件
	bindEvent: function(){
		var viewManager=this.grid.getManager('ViewManager');
		var self=this;
		dojo.forEach(dojo.query(".u-xgrid-menu", this.grid.headersNode),function(th){
			self._connectHandlers.push(dojo.connect(th, 'onclick', dojo.hitch(self,self.onMenuCick)
				))
		});
		
		this._connectHandlers.push(dojo.connect(viewManager,'onHeaderMouseOver',dojo.hitch(self,self.onHeaderMouseOver)));
		this._connectHandlers.push(dojo.connect(viewManager,'onHeaderMouseOut',dojo.hitch(self,self.onHeaderMouseOut)));
	},
	//解绑定事件
	unbindEvent: function(){
		while(this._connectHandlers.length>0) {
			dojo.disconnect(this._connectHandlers.pop());
		}
	},
		
	/**
	 * @summary:
	 * 		获取Menu对象
	 * @description：
	 * 		通过这个menu可以增加菜单项
	 * @example：
	 * |	var meneuManager=grid.getManager('MenuManager');
	 * |	var menu=meneuManager.getMenu();
	 * |	menu.addChild(new unieap.menu.MenuItem(...));
	 */
	getMenu:function(){
		return this.menu;
	},
	
	//销毁menu控制器
	destroy:function(){
		while(this._connectHandlers.length>0) {
			dojo.disconnect(this._connectHandlers.pop());
		}
		this.menu.destroy();
	},
	
	//鼠标移入Header,显示menuDom按钮
	onHeaderMouseOver: function(e){
		if (e.cell) {
			this.cell=e.cell;
			var menuDom = dojo.query(".u-xgrid-menu", e.cellNode)[0];
			if(menuDom){
				this.showMenuDom(menuDom);
			};
		}
	},
	//鼠标移出Header,删除menuDom按钮
	onHeaderMouseOut: function(e){
		if (e.cell) {
			var menuDom = dojo.query(".u-xgrid-menu", e.cellNode)[0];
			if(menuDom){
				this.hideMenuDom(menuDom);
			}
		}
	},
	//显示menu
	showMenuDom:function(node){
		dojo.addClass(node.parentNode,"u-xgrid-focus");
		dojo.style(node.parentNode,"position",'relative');
		dojo.style(node,"position","absolute");
		dojo.style(node,"visibility","visible");
		dojo.style(node,"display","block");
	},
	
	//隐藏menuDom
	hideMenuDom:function(node){
		if(node.parentNode){
			dojo.removeClass(node.parentNode,"u-xgrid-focus");
			if(this.alwaysShowMenu) return;
			if(!this.menu.isShowingNow || this.menu.cell!= this.cell){
				dojo.style(node,"position","static");
				dojo.style(node,"visibility","hidden");
				dojo.style(node,"display","none");
			}
		}
	},
	
	//点击menuDom后，弹出菜单
	onMenuCick: function(e){
		dojo.stopEvent(e);
		var node = e.srcElement || e.target;
		var view;
		
    	while(node && node!=this.grid.headersNode){
    		if(dojo.hasClass(node,"u-xgrid-header")){
    			view = this.grid.ViewManager.views[dojo.query(">.u-xgrid-header",this.grid.headersNode).indexOf(node)];
    			break;
    		}
    		node = node.parentNode;
    	}
    	if(view.headerNode.style.cursor == 'col-resize'){
    		return;
    	}
		
		this.publish("itemStatus",[e.target.parentNode.parentNode]);
		this.menu.startup();

		//判断是否重复点击表头上的小三角
		if(this.menu.isShowingNow&&e.target==this.menuParent){
			return;
		}
		dijit.popup.close(this.menu);

		var parent = e.target;
		var menu = this.menu;
		this.menuParent=parent;
		//判断用户自定义的函数onBeforeMenuClick的返回值是否为true,否则就不弹出菜单
		if (!this.onBeforeMenuClick()) {
			return;
		}

		menu.cell=this.getCell();
		
		//判断菜单是否有菜单项,没有就直接返回
		if(!menu.hasChildren()){
			return;
		}
		
		dijit.popup.open({
			parent: parent,
			popup: menu,
			around: parent,
			onClose: dojo.hitch(this,function(){
				menu.isShowingNow = false;
				this.hideMenuDom(parent);
				this.menuParent = null;
			}),
			orient:{BL:'TL', BR:'TR',TL:'BL',TR:'BR'}
		});
		
		var children = menu.getChildren();
		dojo.forEach(children, function(child) {
			child._toggleClass && child._toggleClass(false);
		}, this);

		menu.focus();
		menu.isShowingNow = true;
	},

	/**
	 * @summary:
	 * 		点击下拉菜单按钮前事件
	 * @example:
	 * |<div dojoType="unieap.xgrid.Grid' 
	 * 		menu="{alwaysShowMenu:true,onBeforeMenuClick:fn}">
	 */
	onBeforeMenuClick: function(){
		return true;
	},
	
	/**
	 * @summary:
	 * 		获取当前Menu所在的cell
	 * @description
	 * 		在有自定义按钮时,可以通过这个方法取得所在的列
	 */
	getCell: function(){
		return this.cell;
	}
});