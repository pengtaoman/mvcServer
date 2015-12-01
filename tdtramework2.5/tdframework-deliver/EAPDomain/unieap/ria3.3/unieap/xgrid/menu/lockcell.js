dojo.provide('unieap.xgrid.menu.lockcell');
dojo.require("unieap.xgrid.manager.Manager");
dojo.require('unieap.menu.Menu');
dojo.declare("unieap.xgrid.menu.lockcell", unieap.xgrid.manager.Manager, {
	
	//记录弹出菜单的列节点
	cellNode: null,
	
	lockItem: null,
	
	unlockItem: null,
	
	create: function(params){
		this.initMenuItems();
		this.subscribe("itemStatus",this,"menuItemStatus");
	  },
	
	//初始化注入菜单的菜单项
	initMenuItems:function(){
		var self=this;
		this.lockItem =new unieap.menu.MenuItem({
        	'label': RIA_I18N.xgrid.menu.lockColumn,
			'onClick':	function(){
				self.doLockCell(self.cellNode);
			},
			'iconClass':'u-xgird-menu-lockcell'
 		});	
 		this.unlockItem =new unieap.menu.MenuItem({
        	'label': RIA_I18N.xgrid.menu.unlockColumn,
			'onClick': function(){
				self.doUnlockCell(self.cellNode);
			},
			'iconClass':'u-xgird-menu-unlockcell'
 		});	
	    this.publish("injectMenuItem",[[this.lockItem,this.unlockItem]]);
	},
	//根据列节点在锁定还是非锁定视图，发布菜单项的禁用状态
	menuItemStatus: function(node){
		this.cellNode = node;
		var views = this.grid.getManager("ViewManager").views;
		var viewNum = views.length;
		var lockCellNum = this.getLockCellNo();
		
		var unlockNum = 0;
		for(var i=0; i<views[viewNum-1].cells.length;i++){
			if(!views[viewNum-1].cells[i].hidden){
				unlockNum++;
			}
		}
		
		var pubLockItem = [];
		var pubUnlockItem = [];
		pubLockItem.menuItem = this.lockItem;
		pubUnlockItem.menuItem = this.unlockItem;
		if(dojo.attr(node,"idx")< lockCellNum){
			pubLockItem.flag = true;
			pubUnlockItem.flag = false;
		} else {
			if(1 == unlockNum){
				pubLockItem.flag = true;
				pubUnlockItem.flag = true;
			} else {
				pubLockItem.flag = false;
				pubUnlockItem.flag = true;
			}
		}
		this.publish("setItemStatus",[pubLockItem]);
		this.publish("setItemStatus",[pubUnlockItem]);
	},
	
	//锁定指定的列
	doLockCell: function(domNode){
		var layoutManager = this.grid.getManager("LayoutManager");
		var structure = layoutManager.structure;
		var lockCellNum = this.getLockCellNo();
		if(!domNode || domNode.index < lockCellNum){
			return;
		}
		//当没有锁定列时，为structure创建一个锁定列
		if(0 == lockCellNum){
			var newStructure = [];
			newStructure.noscroll = true;
			newStructure.rows = [];
			newStructure.rows[0] = [];
			structure.splice(structure.length-1,0,newStructure);
		}
		
		var removeCellNum = (dojo.attr(domNode,"idx")||domNode.index)-lockCellNum;
		var movedNode = structure[structure.length-1].rows[0][removeCellNum];
		structure[structure.length-1].rows[0].splice(removeCellNum,1);
		
		if(structure[0].type=="unieap.xgrid.RowView"){
			structure.shift();
		}
		if(this.grid.rowEdit){
			this.grid.notifyEdit = 1;
		}
		structure[structure.length-2].rows[0].push(movedNode);
		layoutManager.setStructure(structure);
		
		var viewManager = this.grid.getManager("ViewManager");
		var beginIndex = this._computeBeginIndex()
		var snapshot = viewManager.getScrollView().snapshot;
		snapshot.beginCellIndex = beginIndex;
		snapshot.showCells = this._computeShowCells(beginIndex);
		if(this.grid.rowEdit){
			this.grid.notifyEdit = 2;
		}
		viewManager.refreshPage();
		return true;
	},

	//解锁指定的列
	doUnlockCell: function(domNode){
		var layoutManager = this.grid.getManager("LayoutManager");
		var structure = layoutManager.structure;
		var lockCellNum = this.getLockCellNo();
		if(!domNode || domNode.index >= lockCellNum){
			return;
		}
		var removeCellNum = dojo.attr(domNode,"idx") || domNode.index;
		var movedNode;
		for(var i = 0 ; i<structure.length; ++i){
			if(structure[i].noscroll){
				movedNode = structure[i].rows[0][removeCellNum];
				structure[i].rows[0].splice(removeCellNum,1);
				//锁定列只有一列，解锁后，structure销毁锁定列
				if(0 == this.getLockCellNo()){
					structure.splice(i,1);
				}
			}
		}
		("unieap.xgrid.RowView" == structure[0].type)&& structure.shift();
		structure[structure.length-1].rows[0].push(movedNode);
		if(this.grid.rowEdit){
			this.grid.notifyEdit = 1;
		}
		layoutManager.setStructure(structure);
		var viewManager = this.grid.getManager("ViewManager");
		var beginIndex = this._computeBeginIndex()
		var snapshot = viewManager.getScrollView().snapshot;
		snapshot.beginCellIndex = beginIndex;
		snapshot.showCells = this._computeShowCells(beginIndex);
		if(this.grid.rowEdit){
			this.grid.notifyEdit = 2;
		}
		viewManager.refreshPage();
		return true;
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
	
	getLockCellNo: function(){
		var structure = this.grid.getManager("LayoutManager").structure;
		var lockCellNum = 0;
		for(var i = 0 ; i<structure.length; ++i){
			if(structure[i].noscroll && !structure[i].isRowBar){
				lockCellNum = structure[i].rows[0].length;
			}
		}
		return lockCellNum;
	}
});