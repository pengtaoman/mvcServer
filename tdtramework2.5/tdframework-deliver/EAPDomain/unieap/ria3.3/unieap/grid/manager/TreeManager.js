dojo.provide('unieap.grid.manager.TreeManager');

dojo.declare("unieap.grid.manager.TreeManager", null, {
	/**
	 * @declaredClass:
	 * 		unieap.grid.manager.TreeManager
	 * @summary:
	 * 		树表控制器
	 */
	
	ui: {
		expand: true,
		collapse: true,
		expandAll: true,
		collapseAll: true,
		
		events: {
		}
	},
	
	_patch: "unieap.grid.manager.TreePatch",
	
	
	id: null,
	parent: null,
	isLeaf: null,
	closedIcon: null,
	openedIcon: null,
	leafIcon: null,
	expandOnLoad: null,
	
	root: null,
	treeHelper: null,
	
	constructor: function(param) {
		this.id = "id";
		this.parent = "parentID";
		this.closedIcon = "u-grid-treegrid-closedIcon-default";
		this.openedIcon = "u-grid-treegrid-openedIcon-default";
		this.leafIcon = "u-grid-treegrid-leafIcon-default";
		
		this.expandOnLoad = false;
		dojo.mixin(this, param);
		this.connects = [];
		this.treeHelper = new unieap.grid.TreeHelper();
		this.treeHelper.setManager(this);
		this.buildTree();
		this.connects.push(dojo.connect(this.grid.managers.get("ViewManager"), "buildViews", this, "onBuildViews"));
		this.connects.push(dojo.connect(this.grid.managers.get("ViewManager"), "_doClick", this, "doExpand"));
		this.connects.push(dojo.connect(this.grid.getBinding(), "setDataStore", this, "onDataChanged"));
		this.connects.push(dojo.connect(this.grid.getBinding(), "onAfterSort", this, "onDataChanged"));
	},
	
	onBuildViews: function() {
		var firstCell = this.grid.managers.get("LayoutManager").getCell(0);
		this.doPatch(firstCell);
		this.doPatch(this.grid.managers.get("ViewManager"));
	},
	
	onDataChanged: function() {
		this.buildTree();
		this.grid.managers.get("ViewManager").refresh();
	},
	
	/*
	 * @description:
	 * 		通过rowset构造tree结构
	 */
	buildTree: function() {
		this.treeHelper.reset();
		this.root = {isRoot:true,children:[]};
		
		var rows = this.grid.getBinding().getRowSet().getData();
		for (var i=0; i<rows.length; i++) {
			data = rows[i];
			var tree = this.register(data);
			this.link(tree);
		}
	},
	
	register: function(inRowData) {
		var helper = this.treeHelper;
		var tree = helper.map(inRowData[this.id]);
		tree = tree? helper.upgrade(inRowData[this.id], inRowData)
			: helper.map(inRowData[this.id], helper.createTree(inRowData));
		tree.expand = this.expandOnLoad;
		return tree;
	},
	
	link: function(tree) {
		var parentId = tree.rowData[this.parent];
		if (parentId==false||parentId==null) {
			this.root.children.push(tree);
		} else {
			var parent = this.treeHelper.fetch(parentId);
			this.treeHelper.map(parentId, parent);
			parent.children.push(tree);
		}
	},
	
	isLeaf: function(inTree) {
		
		switch(inTree.rowData[this.isLeaf]) {
			case true:
			case "true":
				return true;
		}
		if (dojo.isArray(inTree.children) && inTree.children.length>0) {
			return false;
		} else {
			return true;
		}
	},
	
	toRowData: function() {
		var rows = [], helper = this.treeHelper;
		var children = this.root.children;
		for (var i=0, tree; tree=children[i]; i++) {
			rows = rows.concat(helper.transform(tree));
		}
		return rows;
	},
	
	formatNode: function(inRow, inValue) {
		var rowData = inRow;
		var table="<table cellspacing='0' cellpadding='0' class='u-grid-treegrid-celltable'><tr>",_table="</tr></table>";
		//indentation
		var level = this.findLevel(inRow[this.id]);
		//expand node
		var expandNode = "<td style='width:"+level*16+"px;height:100%;' align='right'>";
		var tree = this.treeHelper.map(inRow[this.id]);
		if (dojo.isArray(tree.children) && tree.children.length>0) {
			if (tree.expand) {
				expandNode += "<div class='u-grid-treegrid-minus' style='float:right;'></div></td>";
			} else {
				expandNode += "<div class='u-grid-treegrid-plus' style='float:right;'></div></td>";
			}
		} else {
			expandNode = "";
		}
		//icon
		level++;
		var iconNode = expandNode==""?("<td style='width:"+level*16+"px;height:100%;' align='right'>"):"<td style='width:16px' align='left'>";
		if (this.isLeaf(tree)) {
			iconNode += "<div class='" + this.leafIcon + "' style='float:right;'></div></td>";
		} else if (tree.expand) {
			iconNode += "<div class='" + this.openedIcon + "' style='float:right;'></div></td>";
		} else {
			iconNode += "<div class='" + this.closedIcon + "' style='float:right;'></div></td>";
		}
		//value
		var value = "<td><nobr class='u-grid-text'>" + inValue +"</nobr></td>";
		return table + expandNode + iconNode + value + _table;
	},
	
	/*
	 * @summary:
	 * 		查找某ID的结点处于第几层
	 * @param:
	 * 		{string} inId
	 * @return:
	 * 		{number}
	 */
	findLevel: function(inId) {
		var tree = this.treeHelper.map(inId);
		var level = tree?1:0;
		if (level) {
			level += this.findLevel(tree.rowData[this.parent]);
		}
		return level;
	},
	
	doExpand: function(e) {
		if (!e.cell || isNaN(e.rowIndex)) {
			return;
		}
		var row = this.grid.getBinding().getRow(e.rowIndex);
		try {
			switch(e.target.className) {
				case "u-grid-treegrid-plus": 
				case "u-grid-treegrid-minus": {
					var tree = this.treeHelper.map(row[this.id]);
					tree.expand = !tree.expand;
					var views = this.grid.managers.get("ViewManager");
					views.render(views.scrollTop);
					break;
				}
			}
		} catch(e) {
//			console.log("e.target.className");
		}
	},
	
	expand: function(inId) {
		try {
			var tree = this.treeHelper.map(inId);
			tree.expand = true;
			var views = this.grid.managers.get("ViewManager");
			views.render(views.scrollTop);
		} catch(e) {
			
		}
	},
	
	collapse: function(inId) {
		try {
			var tree = this.treeHelper.map(inId);
			tree.expand = false;
			var views = this.grid.managers.get("ViewManager");
			views.render(views.scrollTop);
		} catch(e) {
			
		}
	},
	
	expandAll: function() {
		try {
			var rows = this.grid.getBinding().getRowSet().getData();
			var helper=this.treeHelper,tree = null;
			for (var i=0,row; row=rows[i]; i++) {
				tree = helper.map(row[this.id]);
				if (tree) {
					tree.expand = true;
				}
			}
			var views = this.grid.managers.get("ViewManager");
			views.render(views.scrollTop);
		} catch(e) {
			
		}
	},
	
	collapseAll: function() {
		try {
			var rows = this.grid.getBinding().getRowSet().getData();
			var helper=this.treeHelper,tree = null;
			for (var i=0,row; row=rows[i]; i++) {
				tree = helper.map(row[this.id]);
				if (tree) {
					tree.expand = false;
				}
			}
			var views = this.grid.managers.get("ViewManager");
			views.render(views.scrollTop);
		} catch(e) {
			
		}
	},
	
	doPatch: function(inComponent) {
		if (!this.patcher) {
			dojo.require(this._patch);
			var clazz = dojo.getObject(this._patch);
			this.patcher = new clazz();
		}
		this.patcher.doPatch(inComponent);
	},
	
	destroy: function() {
		while(this.connects.length>0) {
			dojo.disconnect(this.connects.pop());
		}
	}
});

dojo.provide("unieap.grid.TreeHelper");
dojo.declare("unieap.grid.TreeHelper", null, {
	
	_treeNodeMap: null,
	_manager: null,
	
	constructor: function() {
		this._treeNodeMap = {};
	},
	
	setManager: function(inManager) {
		this._manager = inManager;
	},
	
	map: function(id, tree) {
		switch(arguments.length) {
			case 2: {
				this._treeNodeMap[id] = tree;
			}
			case 1: {
				return this._treeNodeMap[id];
			}
		}
	},
	
	/*
	 * tree定义：
	 * 		isAbstract:	boolean
	 * 		expand:		boolean
	 * 		children:	array
	 * 		rowData:	object
	 */
	createTree: function(inRowData, isAbstract) {
		var data = {};
		switch(arguments.length) {
			case 2: {
				data.isAbstract = isAbstract;
			}
			case 1: {
				data.expand = false;
				data.children = [];
				data.rowData = inRowData;
			}
		}
		return data;
	},
	
	/*
	 * @description:
	 * 		取得结点，若不存在，创建一个抽象结点
	 * @param:
	 * 		{string} id
	 */
	fetch: function(id) {
		var tree = this.map(id);
		return tree || this.createTree({}, true);
	},
	
	/*
	 * @description:
	 * 		将一个抽象结点升级为一个有效结点
	 * @param:
	 * 		{string} id
	 * @param:
	 * 		{object} inTreeData
	 */
	upgrade: function(id, inRowData) {
		var tree = this.map(id);
		delete tree["isAbstract"];
		tree.rowData = inRowData;
		return this.map(id, tree);
	},
	
	/*
	 * @description:
	 * 		将一颗树转换为一个平面结构
	 * @param:
	 * 		{tree} tree
	 * @return:
	 * 		{array}
	 */
	transform: function(tree) {
		var rows = [];
		var rowData = tree.rowData;
		var binding = this._manager.grid.getBinding();
		var row = new unieap.ds.Row(binding.getRowSet(),rowData);
		var groupIdentifier = row.getIdentifier("_g");
		if(!groupIdentifier){
			groupIdentifier = {};
		}
		groupIdentifier["tree"] = {expand:tree.expand};
		//rowData["_g"] = rowData["_g"]||{}
		//rowData["_g"]["tree"] = {expand:tree.expand};
//		rows.push(tree.rowData);
		row.setIdentifier("_g",groupIdentifier);
		rows.push(row.getData())
		if (tree.expand) {
			for (var i=0, child; child=tree.children[i]; i++) {
				rows = rows.concat(this.transform(child));
			}
		}
		return rows;
	},
	
	reset: function() {
		this._treeNodeMap = {};
	}
});
