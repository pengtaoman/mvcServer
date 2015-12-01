dojo.provide("unieap.grid.manager.GroupPatch");
dojo.declare("unieap.grid.manager.GroupPatch", null, {
	constructor: function(inGrid) {
		this.grid = inGrid;
	},
	doPatch: function(inComponent) {
		if (inComponent.declaredClass=="unieap.grid.manager.ViewManager") {
			for (func in this.patches[inComponent.declaredClass]) {
				if (func=="refreshRow") {
					inComponent[func] = dojo.hitch(inComponent, this.patches[inComponent.declaredClass][func]);
				} else {
					inComponent[func+"List"].push(this.patches[inComponent.declaredClass][func]);
				}
			}
		} else {
			dojo.mixin(inComponent, this.patches[inComponent.declaredClass])
		}
		
	},
	
	patches: {
		"unieap.grid.manager.ViewManager": {
			prerender: function() {
				var group = this.grid.managers.get("GroupManager");
				group.validate();
				if (group.getName() && group.getName().length>0) {
					var rowData = group.root.toRowData();
					this.grid.getBinding().setRowData(rowData);
				}
		    },
		    postrender: function() {
		        var group = this.grid.managers.get("GroupManager");
		        group.groupBar && group.groupBar.update(group.name);
		    },
		    refreshRow: function(inRowIndex) {
		    	var binding = this.grid.getBinding();
				var rowData = binding.getRow(inRowIndex);
				var row = new unieap.ds.Row(binding.getRowSet(),rowData);
				var groupIdentifier = row.getIdentifier("_g");
				
		    	if (groupIdentifier && groupIdentifier["gr"]) {
		    		return;
		    	} else {
		    		this.forEach(function(inView, i){
			            inView.renderRow(inView.getRowNode(inRowIndex), inRowIndex);
			        });
					this.onRowRefresh(inRowIndex);
		    	}
		    }
		},
		
		"unieap.grid.Cell": {
			extraFormat: function(inRowIndex, inValue) {
				var binding = this.grid.getBinding();
				var value = inValue,
					rowData = binding.getRow(inRowIndex),
					group = this.grid.managers.get("GroupManager"),groupIdentifier;
				if(rowData){
					var row = new unieap.ds.Row(binding.getRowSet(),rowData);
					groupIdentifier = row.getIdentifier("_g");
				}
				if (group && rowData && groupIdentifier && groupIdentifier["gsr"]) {
					return group.formatStatistic(this.name, value);
				} else {
					return value
				}
			}
		},
		
		"unieap.grid.manager.RowManager": {
			renderRow: function(inRowIndex, inNodes) {
				var binding = this.grid.getBinding();
				var rowData = binding.getRow(inRowIndex);
				var row = new unieap.ds.Row(binding.getRowSet(),rowData);
				var groupIdentifier = row.getIdentifier("_g");
				if (groupIdentifier && groupIdentifier["gr"]) {
					var vm = this.grid.managers.get("ViewManager");
					for(var i=0, n, v, rowNode; (v=vm.views[i])&&(n=inNodes[i]); i++) {
						rowNode = this.createRowNode(inRowIndex, v);
						if (v.isRowBar) {
							if (dojo.isIE && dojo.isIE < 7) {
								n.appendChild(rowNode);
								v.renderRow(rowNode, inRowIndex);
							} else {
								v.renderRow(rowNode, inRowIndex);
								n.appendChild(rowNode);
							}
						} else if ((vm.views[0].isRowBar && i==1) || i==0){
							n.appendChild(rowNode);
							this.renderGroupRow(rowNode, rowData);
						} else {
							n.appendChild(rowNode);
							rowNode.innerHTML = "<table cellpadding='0' cellspacing='0' style='width:100%;height:"+this.defaultRowHeight+"px;'><tr><td class='u-grid-group'>&nbsp;</td></tr></table>";
						}
						this.styleRowNode(inRowIndex, rowNode, v);
					}
				} else {
					this._renderRow(inRowIndex, inNodes);
				}
			},
			
			
			renderGroupRow: function(rowNode, groupRow) {
				var groupManager = this.grid.managers.get("GroupManager"),
					html = [];
				var name = groupManager.getName(),level=0;
				for (var n; n=name[level]; level++) {
					if (groupRow.name==n) {
						break;
					}
				}
				
			
				html.push("<table cellpadding='0' cellspacing='0' style='width:100%;height:"+this.defaultRowHeight+"px;'><tr>");
				html.push("<td class='u-grid-group' width=");
				html.push((level+1)*16);
				html.push(" align='right'>");
				html.push("<div class='");
				html.push(groupRow.isExpand?"u-grid-group-minus":"u-grid-group-plus");
				html.push("' style='margin-left:"+level*16+"px;'></div></td>");
				html.push("<td class='u-grid-group u-grid-group-font' align='left'>");
				html.push("");//html[8] : display label
				html.push("</td></tr></table>");
				var group = this.grid.managers.get("GroupManager").getGroup(groupRow.handle),
					cell = this.grid.managers.get("LayoutManager").getCell(groupRow.name);;
				
				if (groupRow.formatter) {
					html[8] = "<nobr>"+groupRow.formatter.apply(cell, [groupRow.name, groupRow.value, group.rows])+"</nobr>";
				} else {
					var value = cell._format(groupRow.value);
//					if (value==null) {
//						value = "空";
//					}
					html[8] = "<nobr>"+cell.label + ": " +value+"(共"+group.rows.length+"条记录)"+"</nobr>";
				}
				
				rowNode.innerHTML = html.join("");
				dojo.query("div",rowNode)[0].onclick=dojo.hitch(this, function(e) {
					
					var handle=groupRow.handle;
					var group = groupManager.getGroup(handle);
					group.setExpand(!group.isExpand());
					group.isExpand()?groupManager.insertGroupList(handle):groupManager.removeGroupList(handle);
					groupManager.commit();
				});
//				rowNode.innerHTML = "<table cellpadding='0' cellspacing='0' style='width:100%;height:"+this.defaultRowHeight+"px;'><tr><td class='u-grid-group'>&nbsp;</td></tr></table>";
			}
		}
	}
});