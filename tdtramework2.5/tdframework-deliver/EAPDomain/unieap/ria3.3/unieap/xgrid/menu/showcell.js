dojo.provide('unieap.xgrid.menu.showcell');
dojo.require("unieap.xgrid.manager.Manager");
dojo.require('unieap.menu.Menu');
dojo.declare("unieap.xgrid.menu.showcell", unieap.xgrid.manager.Manager, {
	
	//记录LayoutManager中每一列
	menuItems: [],
	//记录弹出菜单的每个菜单项
	children: [],
	//弹出菜单项，它的popup是menu
	showItem: null,
	//当非锁定列只有一项在视图中显示时，这一项将被禁用，disableItem记录这一项的序号
	disableItem: -1,
	
	create: function(params){
		this.children = [];
		this.menuItems = [];
		this.showItem = null;
		this.initMenuItem();
		this.subscribe("structureChanged",this,"updateMenuItem");
		this.subscribe("headerNameChanged",this,"updateMenuItem");
	  },
	
	//初始化注入菜单的菜单项
	initMenuItem:function(){
		var layoutManager = this.grid.getManager("LayoutManager");
		var self = this;
		dojo.forEach(layoutManager.structure,function(structure){
			if(!structure.type){
				dojo.forEach(structure.rows[0],function(cell){
					self.menuItems.push(cell)
				});
			}
		});
		
		var lockCellNum = -1;
		dojo.forEach(layoutManager.structure,function(structure){
			if(structure.noscroll && !structure.isRowBar){
				lockCellNum = structure.rows[0].length;
			}
		});
		
		var menu = new unieap.menu.Menu();
		var menuItemNo = this.menuItems.length;
		for(var i=0; i<menuItemNo;i++){
			if(i == lockCellNum){
				menu.addChild(new unieap.menu.MenuSeparator());
			}
			self.children[i] = new unieap.menu.MenuItem({
	        	'label': self.menuItems[i].label,
				'onClick':	function(name,e){
					return self.doMenuClick(e);
				},
				'iconClass': 'u-xgird-menu-unchecked'
	 		})
	 		if(!self.menuItems[i].hidden){
	 			dojo.addClass(self.children[i].iconNode,'u-xgird-menu-checked');
	 		}
			menu.addChild(self.children[i]);
		}
		
		this.showItem =new unieap.menu.PopupMenuItem({
        	'label': RIA_I18N.xgrid.menu.columns,
        	'iconClass':'u-xgird-menu-columns',
        	popup: menu
 		});	
 		this.checkColumnsHidden();
	    this.publish("injectMenuItem",[[this.showItem]]);
	},
	//菜单项结构改变时，更新菜单项
	updateMenuItem: function(){
		this.publish("reinjectMenuItem",[[this.showItem]]);
		this.showItem.popup.destroy();
		this.showItem.destroy();
		this.menuItems = [];
		this.initMenuItem();
	},
	//处理点击菜单项的事件
	doMenuClick: function(e){
		var targetItem = e.target.parentNode;
		if(targetItem.tagName != "TR"){
			targetItem = targetItem.parentNode;
		}
		var children = this.children;
		var childNo = children.length;
		for(var i = 0; i<childNo; i++){
			if(targetItem.id == children[i].id){
				var iconNode = children[i].iconNode;
				if(dojo.hasClass(iconNode,"u-xgird-menu-checked")){
					dojo.removeClass(iconNode,"u-xgird-menu-checked");
					this.menuItems[i].hidden = true;
				} else {
					dojo.addClass(iconNode,"u-xgird-menu-checked");
					this.menuItems[i].hidden = false;
				}
				break;
			}
		}
		this.checkColumnsHidden();
		var viewManager = this.grid.getManager("ViewManager");
		
		var beginIndex = this._computeBeginIndex()
		var snapshot = viewManager.getScrollView().snapshot;
		snapshot.beginCellIndex = beginIndex;
		snapshot.showCells = this._computeShowCells(beginIndex);
		if(this.grid.rowEdit){
			this.grid.notifyEdit = 2;
		}
		viewManager.refreshPage();
		return false;
	},
	
	_computeBeginIndex: function(){
		var beginIndex = 0;
		var viewManager = this.grid.getManager("ViewManager");
		var cells = viewManager.views[viewManager.views.length-1].structure.rows[0];
		for(var i =0; i<cells.length; i++){
			if(!cells[i].hidden){
				beginIndex = i;
				return beginIndex;
			}
		}
		return beginIndex;
	},
	
	_computeShowCells: function(beginIndex){
		var showcells = 0, width=0;
		var viewManager = this.grid.getManager("ViewManager");
		var cells = viewManager.views[viewManager.views.length-1].structure.rows[0];
		for(var i =beginIndex; i<cells.length; i++){
			if(!cells[i].hidden){
				width += cells[i].getRealWidth();
				showcells++;
				if(width > viewManager.views[viewManager.views.length-1].snapshot.viewContentWidth){
					return showcells;
				}
			}
		}
		return showcells;
	},
	
	checkColumnsHidden: function(){
		var structure = this.grid.getManager("LayoutManager").structure;
		var unlockcells = structure[structure.length-1].rows[0];
		var unlockNum = [];
		for(var i = 0; i<unlockcells.length; i++){
			if(!unlockcells[i].hidden){
				unlockNum.push(i);
			}
		}
		if(1 == unlockNum.length){
			this.disableItem = this.children.length - unlockcells.length + unlockNum[0];
			this.children[this.disableItem].setDisabled(true);
		} else if(this.disableItem >= 0){
			this.children[this.disableItem].setDisabled(false);
			this.disableItem = -1;
		}
	}
});