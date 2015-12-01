dojo.provide('unieap.grid.view.groupbar');
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.declare('unieap.grid.GroupBar', [dijit._Widget, dijit._Templated], {
	
	nodeWidth: null,
	
	label: null,
	
	name: null,
	
	templateString: '<div dojoAttachPoint="groupNode" class="u-grid-group-node">' + 
						'<div></div>' + 
						'<div dojoAttachPoint="commitBtn" class="u-grid-group-btn u-grid-group-btnNormal"></div>' + 
					'</div>',
					
	postCreate: function() {
		//请选择进行分组的列
		this.label = RIA_I18N.grid.group.tip;
		//提交分组信息
		dojo.attr(this.commitBtn,'title',RIA_I18N.grid.group.sumbitGroup);
		this.nodeWidth = 100;
		this.name = [];
		this.groupNode.firstChild.innerHTML = "<div class=\"text\">"+this.label+"</div>";
		dojo.place(this.domNode, this.grid.domNode, "first");
		
		if (this.autoApply) {
			dojo.style(this.commitBtn, "display", "none");
		} else {
			this.connect(this.commitBtn, "onclick", "commit");
		}
		this.connect(this.grid, "doheadermousedown", "begin");
		this.connect(this.groupNode, "onclick", "removeName");
	},
	
	//begin drag
	begin: function(e) {
		if (dojo.style(e.sourceView.headerNode, "cursor")=="e-resize") return;
		if (!e.cellNode) return; 
		dojo.setSelectable(this.grid.domNode, false);
		this.createProxyNode(e);
		this.dragHandle = dojo.connect(this.grid.domNode, "onmousemove", dojo.hitch(this, "onDrag"));
		this.endHandle = dojo.connect(this.grid.domNode, "onmouseup", dojo.hitch(this, "end"));
		this.dragging = true;
	},
	
	onDrag: function(evt) {
		evt = dojo.fixEvent(evt);
		var node = this.proxy.node;
		dojo.style(node, "display", "block");
		dojo.style(node, "left", (evt.clientX- this.proxy.x )+"px");
		dojo.style(node, "top", (evt.clientY- this.proxy.y)+"px");
		var offsetY  = evt.clientY- this.proxy.y;
		if (-5<offsetY && offsetY<10) {
			this.groupReady(true);
		} else {
			this.groupReady(false);
		}
	},
	
	//end drag
	end: function(e) {
		dojo.style(this.proxy.node, "display", "none");
		dojo.style(this.arrowTopNode, "display", "none");
		dojo.style(this.arrowBottomNode, "display", "none");
		dojo.setSelectable(this.grid.domNode, true);
		dojo.disconnect(this.dragHandle);
		dojo.disconnect(this.endHandle);
		this.send();
		this.groupReady(false);
		this.dragHandle = null;
		this.endHandle = null;
		this.dragging = true;
	},
	
	groupReady: function(isReady) {
		this.prepared = isReady;
		var width = this.name.length*(this.nodeWidth);
		dojo.style(this.arrowTopNode, "left", width+"px");
		dojo.style(this.arrowBottomNode, "left", width+"px");
		dojo.style(this.arrowTopNode, "display", isReady?"block":"none");
		dojo.style(this.arrowBottomNode, "display", isReady?"block":"none");
	},
	
	createProxyNode: function(evt) {
		var proxy = this.proxy || {
			node: dojo.create('div', {'class':'u-grid-group-dragProxy'})
		};
		var posTarget = dojo.coords(evt.cellNode,true);
		var posGrid = dojo.coords(evt.grid.domNode,true);
		proxy.x =evt.clientX - posTarget.x + posGrid.x;
		proxy.y = evt.clientY - posTarget.y + posGrid.y ;
		proxy.cell = evt.cell;
		var node = proxy.node;
		
		dojo.style(node, "width", dojo.style(evt.cellNode, "width")+"px");
		dojo.style(node, "height", this.grid.managers.get("RowManager").defaultRowHeight-1+"px");
		dojo.style(node, "top",(posTarget.y - posGrid.y)+"px");
		dojo.style(node, "left",(posTarget.x - posGrid.x)+"px");
//		dojo.style(node, "display", "block");
		node.innerHTML = evt.cell.label || evt.cell.name;
		if (this.proxy == null) {
			this.proxy = proxy;
			this.grid.domNode.appendChild(node);
		}
		
		//
		this.arrowTopNode = this.arrowTopNode 
			|| dojo.create('div', {'class':'u-grid-group-arrow u-grid-group-arrow-top'});
		this.arrowBottomNode = this.arrowBottomNode 
			|| dojo.create('div', {'class':'u-grid-group-arrow u-grid-group-arrow-bottom'});
		this.groupNode.appendChild(this.arrowTopNode);
		this.groupNode.appendChild(this.arrowBottomNode);
	},
	
	removeName: function(e) {
		var target = e.target,
			cloneName = [],
			cellname = dojo.attr(target, "cellname");
			
		if(target && cellname){
			for(var i=0; n=this.name[i]; i++){
				if (n==cellname) {
					continue;
				}
				cloneName.push(n);
			}
			if (this.autoApply) {
				this.name = cloneName;
				this.commit();
			} else {
				this.update(cloneName);
			}
		}
	},
	
	send: function() {
		if (!this.prepared) {
			return;
		}
		var cell = this.proxy.cell;
		var name = this.name;
		for (var i=0,n; n=name[i]; i++) {
			if (n==cell.name) {
				this.prepared = false;
				return;
			}
		}
		name.push(cell.name);
		
		if (this.autoApply) {
			this.commit();
		} else {
			this.update(name);
		}
		this.prepared = false;
	},
	
	//update name and group bar display
	update: function(inName) {
		this.name = inName;
		if (dojo.isArray(inName) && inName.length>0) {
			var temp = null,
				label = null,
				html = [],
				layout = this.grid.managers.get("LayoutManager");
			for(var i=0; cellName=inName[i]; i++){
				label = layout.getCell(cellName)?layout.getCell(cellName).label:cellName;
		 		temp =["<div class=\"u-grid-group-cell\">"];
		 		temp.push(label);
		 		temp.push("<div class=\"u-grid-group-cellremove\"");
		 		temp.push(" cellName=\""+cellName+"\"title=\""+ RIA_I18N.grid.group.removeColumn + "\"></div>");
		 		temp.push("</div>");
				html.push(temp.join(""));
		 	}
	 		this.groupNode.firstChild.innerHTML = html.join("<div class=\"u-grid-group-sep\"></div>");
	 	} else {
	 		this.name = [];
	 		this.groupNode.firstChild.innerHTML = "<div class=\"text\">"+this.label+"</div>";
	 	}
	},
	
	commit: function() {
		var group = this.grid.managers.get("GroupManager");
		//清除groupList
		group.groupList=[];
		//修改标志位
		group._flag=true;
		group.setName(this.name);
		group.commit();
	},
	
	reviseWindowHeight: function(h) {
		return h-23;//23 is this group bar height
	},
	
	destroy: function() {
		this.inherited(arguments);
	}
});