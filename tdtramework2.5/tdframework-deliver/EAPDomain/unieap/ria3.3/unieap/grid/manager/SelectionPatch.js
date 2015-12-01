dojo.provide("unieap.grid.manager.SelectionPatch");

dojo.declare("unieap.grid.manager.SelectionPatch", null, {
	constructor: function(inGrid) {
		this.grid = inGrid;
	},
	doPatch: function(inComponent) {
		if (inComponent.declaredClass=="unieap.grid.RowView") {
			var func;
			for (func in this.patches[inComponent.declaredClass]) {
				inComponent[func].push(this.patches[inComponent.declaredClass][func]);
			}
		} else {
			dojo.mixin(inComponent, this.patches[inComponent.declaredClass]);
		}
	},
	
	patches: {
		/*
		 * principle:
		 * 		尽量只修改自身及表格的基本模块，以免多个可选模块之间“交叉感染”。
		 * 
		 * list:
		 * 		unieap.grid.manager.SelectionManager
		 * 		unieap.grid.manager.RowManager
		 * 		unieap.grid.RowView
		 */
		
		"unieap.grid.manager.SelectionManager": {
			addToSelection: function(inRowIndex) {
				this.grid.getBinding().selectedData(inRowIndex);
			},
			
			removeFromSelection: function(inRowIndex) {
				this.grid.getBinding().unSelectedData(Number(inRowIndex));
			},
			
			enableCheckbox: function(inRowIndex) {
				var binding = this.grid.getBinding();
				var rowData = binding.getRow(inRowIndex);
				var row = new unieap.ds.Row(binding.getRowSet(),rowData);
				var groupIdentifier = row.getIdentifier("_g");
				if (!groupIdentifier) {
					groupIdentifier = {};
				}
				groupIdentifier["uncheckabled"] = false;
				row.setIdentifier("_g",groupIdentifier);
			},
			
			unableCheckbox: function(inRowIndex) {
				var binding = this.grid.getBinding();
				var rowData = binding.getRow(inRowIndex);
				var row = new unieap.ds.Row(binding.getRowSet(),rowData);
				var groupIdentifier = row.getIdentifier("_g");
				if (!groupIdentifier) {
					groupIdentifier = {};
				}
				groupIdentifier["uncheckabled"] = true;
				row.setIdentifier("_g",groupIdentifier);
			},
			/**
			 * @summary:
			 * 		判断某行是否可变更选择状态
			 * @param:
			 * 		{number} inRowIndex
			 * @return:
			 * 		{boolean}
			 */
			isCheckable: function(inRowIndex) {
				var binding = this.grid.getBinding();
				var rowData = binding.getRow(inRowIndex);
				var row = new unieap.ds.Row(binding.getRowSet(),rowData);
				var groupIdentifier = row.getIdentifier("_g");
				return (groupIdentifier && groupIdentifier["uncheckabled"])==true;
			},
			
			/**
			 * @summary:
			 * 		设置表格行数据的选中状态
			 * @param:
			 * 		{number} inRowIndex
			 * @param:
			 * 		{boolean} inSelect
			 */
			setSelect: function(inRowIndex, inSelect) {
				inRowIndex = parseInt(inRowIndex,10);
				if (inRowIndex<0 || inRowIndex >= this.grid.managers.get("RowManager").getRowCount()) {
					return;
				}
				//var row = this.grid.getBinding().getRow(inRowIndex);
//				if (!row["_g"]) {
//					row["_g"] = {};
//				}
//				if(row["_g"]["uncheckabled"]) return;
				
				var binding = this.grid.getBinding();
				var rowData = binding.getRow(inRowIndex);
				var row = new unieap.ds.Row(binding.getRowSet(),rowData);
				var groupIdentifier = row.getIdentifier("_g");
				if(groupIdentifier && groupIdentifier["uncheckabled"]) return;
				
				var select = true, 
					views = this.grid.managers.get("ViewManager"),
					rowbar = views.views[0].isRowBar?views.views[0]:null;;
				
				if (arguments.length == 2) {
					select = inSelect==true;
				}
				if (select) {
					if (!this.onBeforeSelect(inRowIndex)) {
						if (rowbar) {
							rowbar && rowbar.renderRow(rowbar.getRowNode(inRowIndex), inRowIndex);
							var selected = this.getSelectedRowIndexs();
							if (dojo.isArray(selected) && selected.length>0) {
								for (var i=0,s; s=selected[i]; i++) {
									rowbar.renderRow(rowbar.getRowNode(s), s);
								}
							}
						}
						return;
					}
				} else {
					if (!this.onBeforeDeselect(inRowIndex)) {
						rowbar && rowbar.renderRow(rowbar.getRowNode(inRowIndex), inRowIndex);
						return;
					}
				}
				switch (this.selectType) {
					case this.types.s :
					case this.types.single : {
						var selected = this.getSelectedRowIndexs();
						if (dojo.isArray(selected) && selected.length>0) {
							var rows = this.grid.managers.get("RowManager");
							for (var i=0,s; s=selected[i]; i++) {
								rows.updateStyles(s);
								rows.updateCurrnetRow(s);
							}
						}
						this.clearSelection();
						select?this.addToSelection(inRowIndex):this.removeFromSelection(inRowIndex);
						this._onSelect(inRowIndex, select);
						break;
					}
					case this.types.m :
					case this.types.multiple : {
						select?this.addToSelection(inRowIndex):this.removeFromSelection(inRowIndex);
						this._onSelect(inRowIndex, select);
						break;
					}
				}
//				views.refreshRow(inRowIndex);
				rowbar && rowbar.renderRow(rowbar.getRowNode(inRowIndex), inRowIndex);
				
			},
			
			/**
			 * @summary:
			 * 		设置一行是否可设置选择状态
			 * @param:
			 * 		{number} inRowIndex
			 * @param:
			 * 		{boolean} checkabled
			 */
			setCheckabled: function(inRowIndex, checkabled) {
				if (inRowIndex != parseInt(inRowIndex,10)) return;
				if (isNaN(inRowIndex)) return;
				if (inRowIndex<0||inRowIndex>this.grid.getBinding().getRowCount()-1) return;
				checkabled? this.enableCheckbox(inRowIndex):this.unableCheckbox(inRowIndex);
				this.grid.managers.get("ViewManager").refreshRow(inRowIndex);
			},
			
			/**
			 * @summary:
			 * 		设置表格全选
			 * 		只对多选时有用
			 * @param:
			 * 		{boolean} inSelect
			 */
			setAllSelect: function(inSelect) {
				if (!this.onBeforeAllSelect(inSelect)) {
					return false;
				}
				if (!(this.selectType==this.types.multiple || this.selectType==this.types.m)) {
					return false;
				}
				var rowData = this.grid.getBinding().getRowSet().getData();
				var rowCount = rowData.length;
				if (rowCount==0) return false;
				var checkNode=dojo.query("input[type^=checkbox]",this.grid.headerNode);
				var binding = this.grid.getBinding();
				if (inSelect) {					
					for (var i =0; i<rowCount; i++){
//						var row = rowData[i];
						var row = new unieap.ds.Row(binding.getRowSet(),rowData[i]);
						var groupIdentifier = row.getIdentifier("_g");
						if (groupIdentifier && groupIdentifier["uncheckabled"]==true) {
						} else {
							//row["_s"] = true;
							row.setRowSelected(true);
						}
					}
					
					checkNode[0]&&(checkNode[0].checked = true);
				} else {					
					for (var i =0; i<rowCount; i++){
						var row = new unieap.ds.Row(binding.getRowSet(),rowData[i]);
						var groupIdentifier = row.getIdentifier("_g");
						if (groupIdentifier && groupIdentifier["uncheckabled"]==true) {
						} else {
							//row["_s"] = false;
							row.setRowSelected(false);
						}
					}
//					this.clearSelection();
					checkNode[0]&&(checkNode[0].checked = false);
				}
				this.grid.managers.get("ViewManager").refreshPage();
				this.onAfterAllSelect(inSelect);
				return true;
			},
			
			/**
			 * @summary:
			 * 		判断一行是否被选中
			 * @param:
			 * 		{number} inIndex
			 * @return:
			 * 		{boolean}
			 */
			isSelected: function(inRowIndex){
				var binding = this.grid.getBinding();
				var rowData = binding.getRow(inRowIndex);
				var row = new unieap.ds.Row(binding.getRowSet(),rowData);
				return row.isRowSelected();
				//return this.grid.getBinding().getRow(inRowIndex)["_s"]==true;
			},
			
			/**
			 * @summary:
			 * 		取得选择的行号
			 * @return:
			 * 		{array}
			 */
			getSelectedRowIndexs: function() {
				return this.grid.getBinding().getRowSet().getSelectedRowIndexs();
			},
			
			/**
			 * @summary:
			 * 		清空选择
			 */
			clearSelection: function() {
				var view = this.grid.managers.get("ViewManager").views[0];
				if (view.isRowBar) {
					var inputs = dojo.query("input",view.domNode);
					for (var i=0, check; check=inputs[i]; i++) {
						if (check.checked==true) {
							check.checked = false;
						}
					}
				}
				var rows,
					rowSet = this.grid.getBinding().getRowSet();
			    var rows_p = rowSet.getSelectedRows(unieap.ds.Buffer.PRIMARY);
				var rows_f = rowSet.getSelectedRows(unieap.ds.Buffer.FILTER);
				rows = rows_p.concat(rows_f);
				for (var i=0,r; r=rows[i]; i++) {
					//r && (r.data["_s"]=false);
					r && (r.setRowSelected(false));
				}
				
			},
			
			//events
			_onSelect: function(inRowIndex, select) {
		//		若是多选，可根据情况设置全选按钮选中状态
		//		var views = this.grid.managers.get("ViewManager");
		//		
		//		if (views.views[0].isRowBar) {
		//			views.views[0].renderHeader();
		//		}
				var rows = this.grid.managers.get("RowManager");
				rows.updateStyles(inRowIndex);
				rows.updateCurrnetRow(inRowIndex);
				select?this.onAfterSelect(inRowIndex):this.onAfterDeselect(inRowIndex);
				
			}
		},
		
		"unieap.grid.manager.RowManager": {
			prepareStylingRow: function(inRowIndex, inRowNode, inView) {
				return {
					index: inRowIndex,
					node: inRowNode,
					odd: Boolean(inRowIndex&1),
					selected: this.grid.managers.get("SelectionManager").isSelected(inRowIndex),
					over: this.isOver(inRowIndex),
					customStyles: "",
					customClasses: inView.isRowBar? "u-grid-rowbar":"u-grid-row"
				}
			},
			
			onStyleRow: function(inRow) {
				with(inRow){
					customClasses += (odd?" u-grid-row-odd":"")
					+ (over?" u-grid-row-over":"")
					+ (selected?" u-grid-row-selected":"")
					+((index==this.currentRowIndex)?" u-grid-row-current":"");
				}
			}
		},
		
		"unieap.grid.RowView": {
			// event handlers
			headerEvtHandler: function(e) {
				if(e.target.tagName.toUpperCase()=="INPUT"&&e.type=="click") {
					this.grid.managers.get("SelectionManager").setAllSelect(e.target.checked) || dojo.stopEvent(e);
				}
			},
			
			contentEvtHandler: function(e) {
				if(e.target.tagName.toUpperCase()=="INPUT"&&e.type=="click") {
					var select = this.grid.managers.get("SelectionManager");
					var rowIndex = Number(e.rowIndex);
					switch(select.getSelectType()) {
						case select.types.s:
						case select.types.single: {
							select.setSelect(rowIndex, true);
							break;
						}
						case select.types.m:
						case select.types.multiple: {
							select.setSelect(rowIndex, !select.isSelected(rowIndex));
							break;
						}
					}
				}
			}
		}
		
	}
});