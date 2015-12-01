dojo.provide('unieap.xgrid.manager.LayoutManager');
dojo.require("unieap.xgrid.core.cell");
dojo.require("unieap.xgrid.manager.Manager");
dojo.declare("unieap.xgrid.manager.LayoutManager", unieap.xgrid.manager.Manager, {
	/**
	 * @declaredClass:
	 * 		unieap.xgrid.manager.LayoutManager
	 * @summary:
	 * 		布局控制器
	 * @description:
	 * 		布局控制器提供一些布局相关的方法，如：setStructure，getCell，getCells，sortCell等.
	 */
	
	structure: null,
	
	create : function() {
		if(!this.structure){
			this._setLayout(this.grid.srcNodeRef);
		}
		
	},
	
	//解析布局元素
	_setLayout: function(node) {
		var layout = [],
			headerlist =dojo.query("header",node),
			fixedNode =dojo.query("fixed",node);
		if(fixedNode.length>0){
			var fixed={noscroll: true};
			fixed["rows"] = this._parseRows(fixedNode[0]);
			layout.push(fixed);
		}
		if(headerlist.length>0){
			var header={};
			header["rows"] = this._parseRows(headerlist[0]);
			layout.push(header);
		}
		this.structure = layout;
		this.origin = {
			fixed: 0,
			columns: []
		};
		for(var i=0;i<this.structure.length;i++) {
			for(var j=0;this.structure[i]["rows"]&&j<this.structure[i]["rows"].length;j++) {
				for(var k=0;k<this.structure[i]["rows"][j].length;k++) {
					//排除复杂表头和多标题
					if (this.structure[i]["rows"] && this.structure[i]["rows"].length != 1) {
						this.origin = null;
					} else if (this.origin != null) {
						if (this.structure[i].noscroll)	 {
							this.origin.fixed = this.structure[i]["rows"][j].length;
						}
						this.origin.columns.push(this.structure[i]["rows"][j][k]);
					}
				}
			}
		}
	},
	
	setIndividualStructure: function(){
		var individual = this.grid.getManager("IndividualManager");
		if (individual) {
			var customSet = unieap.Action.getIndividual(this.grid.id);
			if (customSet) {	
				this.setStructure(this._customStructure(customSet)); 
			} 
		} 
	},
	
	_customStructure: function(customSet) {
		var columns = dojo.clone(this.origin.columns);
		var fixedNum = 0;
		var customColumns = [];
		dojo.forEach(customSet, function(item){
			customColumns.push(item);
			if (item.lock) fixedNum++;
		});
		
	  	var structure = [];
	  	var fixed = {noscroll: true};
	  	var header = {};
	  	fixed["rows"] = [];
	  	header["rows"] = [];
	  	
		var fixrow = []; //锁定的列数据
		var freerow = []; //非锁定列的数据
		var column = null;
		for (var i = 0; i < customColumns.length; i++) {
			column = columns[customColumns[i].index];
			column.hidden = !customColumns[i].show;
			column.width = customColumns[i].width;
			if (fixedNum && i < fixedNum) {
				fixrow.push(column);
			} else {
				freerow.push(column);
			}
		}
		fixed["rows"].push(fixrow);
		header["rows"].push(freerow);
		
		if (fixrow.length > 0 && freerow.length > 0) {
			structure.push(fixed);
			structure.push(header);
		} else if (fixrow.length > 0) {
			structure.push(fixed);
		} else if (freerow.length > 0) {
			structure.push(header);
		}
		
		return structure;
	 },
	
	//解析行元素
	_parseRows: function(nodelist) { 
		var rows = [];
		var rowlist = dojo.query("row",nodelist);
		if(rowlist.length==0){
			rows.push(this._parseCells(dojo.query("cell",nodelist)));			
		}
		for(var i=0;i<rowlist.length;i++){
			rows.push(this._parseCells(dojo.query("cell",rowlist[i])));
		}
		return rows;
	},
	//解析列元素
	_parseCells: function(nodelist) {
		var row = [],
			properties = unieap.xgrid.Cell.prototype.properties;
		for(var i=0,value,name,node; (node = nodelist[i]); i++){
			var cell = {};
			for(name in properties){
				if((value = node.getAttribute(name))!=null){
					var dataType = properties[name];
					cell[name] = this._dataConvertor[dataType](value);
				}					
			}	
			if(!cell.hidden){
				cell.hidden = false;
			}			
			row.push(cell);
		}
		return row;
	},
	
	_dataConvertor : {
		"string" : function(inValue){ return inValue;},
		"number" : function(inValue){return Number(inValue);},
		"boolean" : function(inValue){return inValue=="true";},
		"object" : function(inValue){return dojo.getObject(inValue) || dojo.fromJson(inValue);}
	},
	
	_postLayout: function() {
		if (this.grid.getManager("ViewManager").hasRowBar()||this.structure.length==0) {
			dojo.require("unieap.xgrid.core.rowbar");
			this.structure.unshift({type: 'unieap.xgrid.RowView', width: 20});
		}
	},
	
	//获得grid的结构信息
	getLayoutInfo:function(){
		var structure=this.getStructure(),
			layoutInfo=[],
			view;
		for(var i=0,l=structure.length;i<l;i++){
			view=structure[i];
			//不处理rowbar
			if(view.type&&view.type=="unieap.xgrid.RowView"){
				continue;
			}
			if(view.rows && view.rows.length>0){
				layoutInfo.push(this._getViewInfo(view));
			}
		}
		return layoutInfo;
	},
	
	_getViewInfo:function(view){
		var rows=view.rows,viewInfo=[];
		for(var i=0,l=rows.length;i<l;i++){
			var row=rows[i],rowInfo=[];
			for(var j=0,k=row.length;j<k;j++){
				var cell=row[j],cellInfo;
				cellInfo=this._getCellInfo(cell);
				rowInfo.push(cellInfo);
			}
			viewInfo.push(rowInfo);
		}
		return viewInfo;
	},
	
	_getCellInfo:function(cell){
		var cellInfo={};
		if(cell.name){
			cellInfo.name=cell.name
		}
		var width=cell.getWidth();
		if(width){
			cellInfo.width=width;
		}
		if(cell.label){
			cellInfo.label=cell.label
		}
		if(cell.rowSpan){
			cellInfo.rowSpan=cell.rowSpan
		}
		if(cell.colSpan){
			cellInfo.colSpan=cell.colSpan
		}
		if(cell.isMulTitle){
			cellInfo.isMulTitle=cell.isMulTitle
		}
		if(cell.getDisplayFormatter && cell.getDisplayFormatter().dataFormat){
			cellInfo.dataFormat=cell.getDisplayFormatter().dataFormat;
		}
		if(cell.decoder){
			var decoder=cell.decoder,decoderInfo={};
			var valueAttr=decoder.valueAttr||"CODEVALUE",displayAttr=decoder.displayAttr||"CODENAME";
			var store=unieap.getDataStore(decoder.store)
			if(store){
				var k,v;
				store.getRowSet().forEach(function(row){
					k=row.getItemValue(valueAttr);
					v=row.getItemValue(displayAttr);
					decoderInfo[k]=v;
				},null,null,null,this)
			}	
			cellInfo.decoder=decoderInfo;
		}
		return cellInfo;
	},
	

	
	/**
	 * @summary:
	 * 		取得表格的结构信息
	 * @return:
	 * 		{array}
	 */
	getStructure: function() {
		return this.structure;
	},
	/**
	 * @summary:
	 * 		设置表格结构
	 * @param：
	 * 		{array} inStructure
	 * @example:
	 *  |	layout = grid.getManager("LayoutManager");
	 *  |	layout.setStructure(s);
	 * 	|	grid.getManager("ViewManager").refresh();
	 */
	setStructure: function(inStructure,flag) {
		if (!dojo.isArray(inStructure)) return;
		if (inStructure) {
			if (inStructure.length>0) {
				for(var i=0;i<inStructure.length-1;i++){
					inStructure[i].noscroll = true;
				}
				var last = inStructure[inStructure.length-1];
				last.noscroll && delete last.noscroll;
			}
			this.structure = inStructure;
		}
		
		this._postLayout();
		//存在行编辑，在改变structure时，先关闭编辑器，否则不能及时销毁text-box
		if(this.grid.rowEdit){
			var rowEdit = this.grid.rowEdit;
			rowEdit.refreshEditTextBox(rowEdit.index);
		    rowEdit.applyEdit();
		    var editflag = true,
		    	rowEditIndex = rowEdit.index;
		}
		if(this.cells){
			dojo.forEach(this.cells,function(cell){
				cell.destroy();
			});
		}
		this.cells = [];
		this.structure = s = [];
		for(var i=0, viewDef; (viewDef=inStructure[i]); i++){
			s.push(this.addViewDef(viewDef));
		}
		this.structure = s;
		this.cellCount = this.cells.length;
		if(editflag){
			this.grid.noInitEdit = true;
			this.grid.getViewManager().getScrollView().contentBuilder.getRowEdit(rowEditIndex);
		}
		var cellLength = this.cells.length;
		for(var i = 0,j = 0; i<cellLength ; ++i){
			if(!this.cells[i].isMulTitle){
				this.cells[i].mulTitleIndex = j++;
			}
		}
		//发布一个结构改变的消息
		this.publish("structureChanged",[flag]);
	},
	addViewDef: function(inDef){
		this._defaultCellProps = inDef.defaultCell || {};
		return dojo.mixin({}, inDef, {rows: this.addRowsDef(inDef.rows || inDef.cells)});
	},
	addRowsDef: function(inDef){
		var result = [];
		for(var i=0, row; inDef && (row=inDef[i]); i++){
			result.push(this.addRowDef(i, row));
		}
		return result;
	},
	addRowDef: function(inRowIndex, inDef){
		var result = [];
		for(var i=0, def, cell; (def=inDef[i]); i++){
			cell = this.addCellDef(inRowIndex, i, def);
			result.push(cell);
			this.cells.push(cell);
		}
		return result;
	},
	addCellDef: function(inRowIndex, inCellIndex, inDef){
		var w;
		if(inDef.colSpan > 1){
			w = 0;
		}else{
			w = inDef.width;
		}
		var fieldIndex = inDef.field != undefined ? inDef.field : (inDef.get ? -1 : this.fieldIndex);
		if((inDef.field != undefined) || !inDef.get){
			this.fieldIndex = (inDef.field > -1 ? inDef.field : this.fieldIndex) + 1; 
		}
		var param = dojo.mixin({}, this._defaultCellProps, inDef, {
			grid: this.grid,
			subrow: inRowIndex,
			layoutIndex: inCellIndex,
			index: this.cells.length,
			fieldIndex: fieldIndex
		});
		w && dojo.mixin(param, {width:w});
		return new unieap.xgrid.Cell(param);
	},
	
	getCells: function() {
		return this.cells;
	},
	/**
	 * @summary:
	 * 		获取cell对象
	 * @param:
	 * 		{number|string} inData
	 * @return:
	 * 		{unieap.xgrid.Cell}
	 * @description:
	 * 		获取某个cell对象，inData可为cell的序号，也可以是cell的name属性值
	 */
	getCell: function(inData) {
		if (typeof(inData)=="number") {
			return this.cells[inData];
		} else {
			for(var i =0;i<this.cells.length;i++){
				if(this.cells[i]["name"]==inData)
					return this.cells[i];
			}
		}
	},
	
	_getCol: function(col){
		var newCol = null;
		!isNaN(col)&&(col=parseInt(col,10));
 		if (dojo.isString(col)) {
 			for (var j = 0; this.cells[j]; j++) {
 				if (this.cells[j].id == col) {
 					newCol = j;
 					break;
 				}
 			}
 			if (dojo.isString(newCol)) return newCol;
 		} else if (isNaN(col))	{
 			return newCol;
 		} else {
 			newCol = col;
 		}
	 	return newCol;
	},
	
	/**
	  * @summary:
	  * 	列锁定/解锁
	  * @param:
	  * 	{array} cols
	  * @param:
	  * 	{boolean} isLock
	  * @description:
	  * 	参数cols代表被锁定列的数组,
	  * 	形如:[4,2](数字为列的原始序号,第2列和4列将被锁定),["col1", "col3", "col2"](字符串为列的id或者securityId)
	  * 	参数isLock设置操作类型为锁定还是解锁,可不写,默认为锁定。
	  * @example:
	  * |	var layout = grid.getManager("LayoutManager");
	  * |	layout.lockCell(["col1", "col3", "col2"], true);
	  */
	lockCell: function(cols, isLock) {
		if (!dojo.isArray(cols)||cols.length==0) {
	 		return;
	 	}
		typeof(isLock)=='undefined'&&(isLock=true);
		var individual = this.grid['IndividualManager'];
	 	if(!individual){
			dojo.require("unieap.xgrid.manager.Individual");
			individual = this.grid['IndividualManager']= new unieap.xgrid.manager.Individual({grid:this.grid});
			this.grid.managers.push("IndividualManager");
		}
		var self = this;
		dojo.forEach(cols,function(col){
			col = self._getCol(col);
			col = self.getCell(col);
			
			if(isLock){
	 			individual.menulockcell.doLockCell(col);
	 		} else {
	 			individual.menulockcell.doUnlockCell(col);
	 		}
		});
	 },
	 
	 /**
	  * @summary:
	  * 	列隐藏
	  * @param:
	  * 	{array} cols
	  * @description:
	  * 	参数cols代表被隐藏列的数组,
	  * 	形如:[2,4](数字为列的原始序号,第2列和4列将被隐藏),["col1", "col3", "col2"](字符串为列的id或者securityId)
	  * @example:
	  * |	var layout = grid.getManager("LayoutManager");
	  * |	layout.hideCell(["col1", "col3", "col2"]);
	  */
	hideCell: function(cols) {
		if (!dojo.isArray(cols)||cols.length==0) {
	 		return;
	 	}
		var self = this;
		dojo.forEach(cols,function(col){
			col = self._getCol(col);
			self.getCell(col).hidden = true;
		});
	 	this.grid.getManager("ViewManager").refreshPage();
	 },
	 
	 /**
	  * @summary:
	  * 	列显示
	  * @param:
	  * 	{array} cols
	  * @description:
	  * 	参数cols代表被显示列的数组,
	  * 	形如:[2,4](数字为列的原始序号,第2列和4列将被显示),["col1", "col3", "col2"](字符串为列的id或者securityId)
	  * @example:
	  * |	var layout = grid.getManager("LayoutManager");
	  * |	layout.hideCell(["col1", "col3", "col2"]);
	  */
	showCell: function(cols) {
		if (!dojo.isArray(cols)||cols.length==0) {
	 		return;
	 	}
	 	var self = this;
		dojo.forEach(cols,function(col){
			col = self._getCol(col);
			self.getCell(col).hidden = false;
		});
	 	this.grid.getManager("ViewManager").refreshPage();
	 },
	 
	 /**
	 * @summary:
	 * 		判断一列是否被隐藏
	 * @description:
	 * 		参数为unieap.xgrid.Cell对象的name属性。
	 * 		注意，若表格中不存在此inName值的列，方法也将返回true。
	 * @example:
	 * |	var layout = grid.getManager("LayoutManager");
	 * |	layout.isHidden("attr_salary");
	 * @param:
	 * 		{string} inName
	 * @return:
	 * 		{boolean}
	 */
	isHidden: function(inName) {
	 	var cell;
	 	var cellNum = this.cells.length;
	 	for (var i = 0; i < cellNum; ++i) {
	 		 cell = this.cells[i];
	 		 if(cell.name&&cell.name===inName){
	 		 	return cell.hidden;
	 		 }
	 	}
	 	return true;
	},
	
	/**
	  * @summary:
	  * 	调整Grid各列的次序
	  * @param:
	  * 	{array} sequence 
	  * @param:
	  * 	{number} fixedNum
	  * @description:
	  * 	参数sequence为列顺序数组, 
	  * 	形如:[4,2,3,1,0](数字为列的原始序号),["col1", "col3", "col2"](字符串为列的id)
	  * 	参数fixedNum为锁定列数
	  * 	如：sortCell([4,2,1,0,3],2)
	  * @example:
	  * |	var layout = grid.getManager("LayoutManager");
	  * |	layout.sortCell(["col1", "col3", "col2"], ${1}2);
	  * ${1}表示锁定前两列
	  */
	 sortCell: function(sequence, fixedNum) {
	 	if (!dojo.isArray(sequence)||sequence.length==0) {
	 		return;
	 	}
	 	var se = [];
	 	for(var i=0; i<sequence.length;i++){
	 		se[i] = this._getCol(sequence[i]);
	 	}
		
	  	var fixed = {noscroll: true};
	  	var header = {};
	  	fixed["rows"] = [];
	  	header["rows"] = [];
	  	
		var fixrow = []; //锁定的列数据
		var freerow = []; //非锁定列的数据
		var column = null;
		var existColumns = [];
		existColumns.length = this.cells.length;
		var self = this;
		dojo.forEach(se,function(index){
			column = self.cells[index];
			if(column){
				existColumns[index]=true;
				if (fixedNum && i < fixedNum) {
					fixrow.push(column);
				} else {
					freerow.push(column);
				}
			}
		});
		for(var i=0;i<existColumns.length;i++){
			!existColumns[i] && freerow.push(this.cells[i]);
		}
		
		fixed["rows"].push(fixrow);
		header["rows"].push(freerow);
		var structure = [];
		if (fixrow.length > 0 && freerow.length > 0) {
			structure.push(fixed);
			structure.push(header);
		} else if (fixrow.length > 0) {
			structure.push(fixed);
		} else if (freerow.length > 0) {
			structure.push(header);
		}
	 	if (structure) {
	 		this.structure = structure;
	 		this.setStructure(this.structure);
	 	} 
	 },
	
	startup : function(){
		//第二个参数的目的是告知ViewManager初始化表格时不刷新表格
		this.setStructure(this.structure,true);
	},
	
	forEachCell: function(inCallback) {
		for(var i=0, c; (c=this.cells[i]); i++) {
			inCallback(c, i);
		}
	}
	
});
