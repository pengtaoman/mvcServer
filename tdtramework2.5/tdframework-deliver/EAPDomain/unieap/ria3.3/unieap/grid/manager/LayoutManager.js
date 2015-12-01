dojo.provide('unieap.grid.manager.LayoutManager');
dojo.require('unieap.grid._grid.cell');

dojo.declare("unieap.grid.manager.LayoutManager", null, {
	/**
	 * @declaredClass:
	 * 		unieap.grid.manager.LayoutManager
	 * @summary:
	 * 		布局控制器
	 * @description:
	 * 		布局控制器提供一些布局相关的方法，如：setStructure，getCell，getCells，sortCell等.
	 */
	
	ui: {
		getCell:true,
		sortCell:true,
		hideCell:true,
		showCell:true,
		lockCell:true,
		isHidden:true,
		getStructure:true,
		setStructure:true,
		getCells:true,
		getOriginCells:true
	},
	
	structure: null,
	
	constructor: function(param) {
		dojo.mixin(this, param);
		this.isMulTitle = this.isMulTitle=="true" ? true : false;
		this._parseFoot();
		this._parseToolBar();
		this.structure || this._setLayout(this.grid.srcNodeRef);
	},
	
	_parseFoot: function() {
		if(!this.grid.srcNodeRef){
			return;
		}
		var footNode = dojo.query("div[tagName='foot']",this.grid.srcNodeRef);
		if(footNode.length>0){
			footNode=footNode[0]
			dojo.require("unieap.grid.view.foot");
			//引用foot
			this.grid.foot=new  unieap.grid.view.foot(this.grid,footNode);
		}
	},
	_parseToolBar: function() {
		if(!this.grid.srcNodeRef){
			return;
		}
		var toolBar=dojo.query("div[tagName='toolbar']",this.grid.srcNodeRef);
		if(toolBar.length>0) {
			//引用toolbar
			dojo.require("unieap.grid.view.toolbar");
			dojo.attr(toolBar[0],'dojoType','unieap.grid.view.toolbar');
			var toolBars=dojo.parser.instantiate(toolBar,{grid:this.grid});
			if(toolBars.length>0){
				this.grid.toolBar=toolBars[0];
			}
		}
	},
	_setLayout: function(node) {
		var layout = [];
		var fixedNode =dojo.query("div[tagName='fixed']",node);
		if(fixedNode.length>0){
			var fixed={noscroll: true};
			fixed["rows"] = this._parseRows(fixedNode[0]);
			layout.push(fixed);
		}
		var headerNode =dojo.query("div[tagName='header']",node);
		if(headerNode.length>0){
			var header={};
			header["rows"] = this._parseRows(headerNode[0]);
			layout.push(header);
		}
		
		this.structure = layout;
		

		
		//for individual
		this.origin = {
			fixed: 0,
			columns: [],
			sequence:[]
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

		if(this.origin){
			for(var i=0,l=this.origin.columns.length;i<l;i++){
				this.origin.sequence.push(i);
			}
		}


		//load individual
		var individual = this.grid.managers.get("Individual");
		if (this.origin && individual) {
			var customSet = unieap.Action.getIndividual(this.grid.id);
			if (customSet) {
				var cs = {};
				cs.sequence = [];
				cs.fixedNum = 0;
				for (var i = 0; i < customSet.length; i++) {
					var data = customSet[i];
					cs.sequence.push(data.index);
					if (data.lock) cs.fixedNum++;
				}
				if(cs.sequence.length==this.origin.sequence.length){
					this._newSequence=dojo.clone(cs.sequence);
				}				
				this.structure = this._customStructure(cs.sequence, cs.fixedNum); 
			} else {
				this.structure = this._customStructure();
			}
		} else if (this.origin) {

			this.structure = this._customStructure();

		}
	},
	
	_parseRows: function(node) { 
		var row = [];
		var rowNode = dojo.query("div[tagName='row']",node);		
		if(rowNode.length==0){
			row.push(this._parseCells(dojo.query("div[tagName='cell']",node)));			
		}
		for(var i=0;i<rowNode.length;i++){
			row.push(this._parseCells(dojo.query("div[tagName='cell']",rowNode[i])));
		}
		return row;
	},
	
	_parseCells: function(node) {
		var row = [],name,value;
		var _cellProps = unieap.grid.Cell.prototype._cellProps;
		
		for(var i=0,len = node.length;i<len;i++){
				var col = node[i];
				var cell = {};
				for(var prop in _cellProps){
					var value = node[i].getAttribute(prop);					
					if(value!=null){					
						var convertor = this._dataConvertor[_cellProps[prop]];
						cell[prop] = convertor(value);
					}					
				}				
				if(dojo.trim(col.innerHTML)!=""){
					//need to deal with editor !!! 
//					cell["value"] = col.innerHTML;
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
		if (this.grid.managers.get("ViewManager").hasRowBar()||this.structure.length==0) {
			dojo.require("unieap.grid.view.rowbar");
			this.structure.unshift({type: 'unieap.grid.RowView', width: 20});
		}
	},
	_structureChanged: function() {
		unieap.grid.notify(this, "structureChanged");
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
	 */
	setStructure: function(inStructure) {
		if (!dojo.isArray(inStructure)) return;
		if (inStructure) {
			if (inStructure.length>0) {
				var last = inStructure[inStructure.length-1];
				last.noscroll && delete last.noscroll;
			}
			this.structure = inStructure;
		}
		this._postLayout();
		this.fieldIndex = 0;
		if(this.cells){
			//重新设置结构时，需要先销毁之前创建的对象 否则当有可编辑列时会重复创建编辑器对象
			//chenxujie 2011/03/07
			for(var i=0, c; c=this.cells[i]; i++) {
				c.destroy();
			}
		}
		
		this.cells = [];
		var s = [];
		for(var i=0, viewDef, rows; (viewDef=this.structure[i]); i++){
			s.push(this.addViewDef(viewDef));
		}
		
		//处理单元格是是否有过滤条件
		var customeSeq=this.customStructure&&this.customStructure.seq,
			filterSeq=this._filterSeq;
		if(customeSeq&&filterSeq){
			for(var seqIndex in filterSeq){
				var index=dojo.indexOf(customeSeq,seqIndex);
				index!=-1&&(this.cells[index].filter=filterSeq[seqIndex]);
			}
		}
		this.structure = s;
		this.cellCount = this.cells.length;
		this._structureChanged();
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
			this.onAfterAddCell(cell);
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
		// fieldIndex progresses linearly from the last indexed field
		// FIXME: support generating fieldIndex based a text field name (probably in Grid)
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
		return new unieap.grid.Cell(param);
	},
	onAfterAddCell: function(inCell) {
	},
	
	/**
	 * @summary:
	 * 		获取cell对象
	 * @param:
	 * 		{number|string} inData
	 * @return:
	 * 		{unieap.grid.Cell}
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
	
	getCells: function() {
		return this.cells;
	},
	
	getOriginCells: function() {
		return this.origin.columns;
	},
	getLayoutInfo:function(){
		var structure=this.getStructure(),self=this;
		var layoutInfo=[];
		dojo.forEach(structure,function(view){
			if(view.type&&view.type=="unieap.grid.RowView"){
			}else if(view.rows&&view.rows.length>0){
				var viewInfo=[];
				viewInfo=self._getViewInfo(view);
				layoutInfo.push(viewInfo);
			}
		})
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
		var width=cell.getRealWidth();
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
		if(cell.getDisplayFormatter()&&cell.getDisplayFormatter().dataFormat){
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
	
	destroy: function() {
		for(var i=0, c; c=this.cells[i]; i++) {
			c.destroy();
		}
	},
	
	/**
	 * @summary:
	 * 		判断一列是否被隐藏
	 * @description:
	 * 		参数为unieap.grid.Cell对象的name属性。
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
		var _structure = this.structure;
	 	var isHidden = true ;
	 	dojo.forEach(_structure,function(view){
	 	   if(view["rows"]){
	 	   	  dojo.forEach(view["rows"],function(rows) {
	 	   	      dojo.forEach(rows,function(cell) {
	 	   	           if(cell.name&&cell.name===inName) {
	 	   	           	  isHidden = false;
	 	   	           	  return isHidden;
	 	   	           }
	 	   	      });
	 	   	  });
	 	   	  }   	
	 	   }
	 	);
	 	return isHidden;
	},
	
	/*
	 * @param {Array} sequence 原始列个性化顺序的数组,元素为数字
	 * @param {Number} fixed 锁定的列数(从左向右按序锁定)
	 */
	_customStructure: function(sequence, fixedNum) {

		var columns = this.origin.columns;
		if (!sequence) {
			sequence = [];
			for (var i = 0; columns[i]; i++) {
				sequence.push(i);
			}
			//记录origin中有多少列被锁定
			fixedNum = this.origin.fixed;
		}
		fixedNum = fixedNum?fixedNum:0;
		
	  	var structure = [];
	  	var fixed = {noscroll: true};
	  	var header = {};
	  	fixed["rows"] = [];
	  	header["rows"] = [];
	  	
		var fixrow = []; //锁定的列数据
		var freerow = []; //非锁定列的数据
		var column = null, cell = null;
		var _cellProps = unieap.grid.Cell.prototype._cellProps;
		for (var i = 0; i < sequence.length; i++) {
			column = columns[sequence[i]];
			if (column["name"] && this.cells) {
				//当有两列的name相同时，会返回同一个cell
				//见bug U_EAP00008081
				var index=-2;
				if(this.customStructure){
					index=dojo.indexOf(this.customStructure.seq,sequence[i]);
				}
				if(index>-1){
					cell=this.cells[index];
					for(var prop in _cellProps) {
						if (prop!="width") {
							column[prop] = cell[prop];
						}
					}
				}
				
			}
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
		
	    this.customStructure&&this._preserveFilteredCells(this.customStructure.seq,sequence);
		this.customStructure = {
			fixed: fixedNum,
			seq: []
		}
		for (var i = 0; i < sequence.length; i++) {
			this.customStructure.seq.push(sequence[i]);
		}
		return structure;
	 },
	
	//保留设置了过滤的条件的单元格的原始序号
	_preserveFilteredCells:function(prevSeq){
		!this._filterSeq&&(this._filterSeq={});
		dojo.forEach(this.cells,function(cell,index){
			cell.filter&&(this._filterSeq[prevSeq[index]]=cell.filter);
		},this);
	},
	
	//清除过滤信息
	clearFilterInfo:function(cell){
		var seq=this.customStructure;
		if(!seq||!this._filterSeq) return;
		if(cell){
			var index=-2,
				seq=seq.seq;
			for(var i=0,l=this.cells.length;i<l;i++){
				if(cell.id==this.cells[i].id||cell.name==this.cells[i].name){
					index=i;
					break;
				}
			}
			index>-1&&(delete this._filterSeq[seq[index]]);
		}else{
			this._filterSeq&&(delete this._filterSeq);
		}
		
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
	 	var se = sequence;
		if(!dojo.isArray(se)||se.length==0||!this.customStructure) return;
		se=unieap.array_unique(se);
	 	for (var i = 0; i < se.length; i++) {
			!isNaN(se[i])&&(se[i]=parseInt(se[i],10));
	 		if (dojo.isString(se[i])) {
	 			for (var j = 0; this.origin.columns[j]; j++) {
	 				if (this.origin.columns[j].id == se[i]||this.origin.columns[j].securityId==se[i]) {
	 					se[i] = j;
	 					break;
	 				}
	 			}
	 			if (dojo.isString(se[i])) return;
	 		} else if (isNaN(se[i]))	{
	 			return;
	 		}
	 	}
		if(se.length==this.origin.sequence.length){
			var caller=arguments.callee.caller;
			caller.nom!='applyIndividual'&&(this._newSequence=se);
		}
		
	 	var s = this._customStructure(se, fixedNum);
	 	if (s) {
	 		this.structure = s;
	 		this.setStructure(this.structure);
	 	} 
	 	
	 },
	 
	 /**
	  * @summary: 
	  * 	隐藏列
	  * @param：
	  * 	{array} cols
	  * @description:
	  * 	参数cols为隐藏列的数组,
	  * 	形如:[2,4](数字为列的原始序号,表示隐藏原始列号为2,4的两列),["col1", "col3", "col2"](字符串为列的id)
	  * @example:
	  * |	var layout = this.grid.getManager("LayoutManager");
	  * |	layout.hideCell(["col1", "col3", "col2"]);
	  */
	 hideCell: function(cols) {
		var seq=this.customStructure;
		
		
		if(!dojo.isArray(cols)||cols.length==0||!seq) return;
		
		cols=unieap.array_unique(cols);
		
	 	for (var i = 0; i < cols.length; i++) {
			!isNaN(cols[i])&&(cols[i]=parseInt(cols[i],10));
	 		if (dojo.isString(cols[i])) {
	 			for (var j = 0; this.origin.columns[j]; j++) {
	 				if (this.origin.columns[j].id == cols[i]||this.origin.columns[j].securityId==cols[i]) {
	 					cols[i] = j;
	 					break;
	 				}
	 			}
	 			if (dojo.isString(cols[i])) return;
	 		} else if (isNaN(cols[i]))	{
	 			return;
	 		}
	 	}
		
	 	var fixed =seq.fixed,
			seq=dojo.clone(seq.seq);
		
		for(var i=0,l=cols.length;i<l;i++){
			if((index=dojo.indexOf(seq,cols[i]))>-1){
				index<fixed&&fixed--;
				seq.splice(index,1);
			}
		}
	 	var s = this._customStructure(seq, fixed);
	 	if (s) {
	 		this.structure = s;
	 		this.setStructure(this.structure);
	 	} 
	 },
	 
	 /**
	  * @summary:
	  * 	显示列
	  * @param:
	  * 	{array} cols
	  * @description:
	  * 	参数cols为显示列的数组，
	  * 	形如:[2,4](数字为列的原始序号,表示显示原始列号为2,4的两列),["col1", "col3", "col2"](字符串为列的id)
	  * @example:
	  * |	var layout = grid.getManager("LayoutManager");
	  * |	layout.showCell(["col1", "col3", "col2"]);
	  */
	 showCell: function(cols) {
		var seq=this.customStructure;
		if(!dojo.isArray(cols)||cols.length==0||!seq) return;
	 	cols=unieap.array_unique(cols);
	 	for (var i = 0; i < cols.length; i++) {
			!isNaN(cols[i])&&(cols[i]=parseInt(cols[i],10));
	 		if (dojo.isString(cols[i])) {
	 			for (var j = 0; this.origin.columns[j]; j++) {
	 				if (this.origin.columns[j].id == cols[i]||this.origin.columns[j].securityId==cols[i]) {
	 					cols[i] = j;
	 					break;
	 				}
	 			}
	 			if (dojo.isString(cols[i])) return;
	 		} else if (isNaN(cols[i]))	{
	 			return;
	 		}
	 	}
	 	
	 	var fixed = seq.fixed,
			seq=dojo.clone(seq.seq),
			newSeq=this._newSequence,
			hide=[],
			_seq;

		if(newSeq&&newSeq.length>0){
			_seq=newSeq;
		}else{
			_seq=this.origin.sequence;
		}
		
		//获得所有隐藏的元素
		
		for(var i=0,l=_seq.length;i<l;i++){
			var show=false;
			for(var j=0,k=seq.length;j<k;j++){
				if(_seq[i]==seq[j]){
					show=true;
					break;
				}
			}
			show || hide.push(_seq[i]);
		}

		//如果不存在隐藏的列,直接返回
		if(hide.length==0) return;
		
		for(var i=0,l=cols.length;i<l;i++){
			var tempIndex=-1;
			if((index=dojo.indexOf(hide,cols[i]))>-1){
				if(newSeq){
					tempIndex=dojo.indexOf(newSeq,hide[index])
				}
				tempIndex==-1?(tempIndex=hide[index]):(tempIndex=tempIndex);
				tempIndex>fixed?(tempIndex=tempIndex):(tempIndex=fixed);
				seq.splice(tempIndex,0,hide[index]);
			}
		}
	 	var s = this._customStructure(seq, fixed);
		
	 	if (s) {
	 		this.structure = s;
	 		this.setStructure(this.structure);
	 	} 
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
	 	var seq=this.customStructure;
	 	if (!dojo.isArray(cols)||cols.length==0||!seq) {
	 		return;
	 	}
		cols=unieap.array_unique(cols);
		
		typeof(isLock)=='undefined'&&(isLock=true);

	 	for (var i = 0; i < cols.length; i++) {
			!isNaN(cols[i])&&(cols[i]=parseInt(cols[i],10));
	 		if (dojo.isString(cols[i])) {
	 			for (var j = 0; this.origin.columns[j]; j++) {
	 				if (this.origin.columns[j].id == cols[i]) {
	 					cols[i] = j;
	 					break;
	 				}
	 			}
	 			if (dojo.isString(cols[i])) return;
	 		} else if (isNaN(cols[i]))	{
	 			return;
	 		}
	 	}
		
	 	var fixed=seq.fixed,
			seq=dojo.clone(seq.seq),
			newSeq=this._newSequence,
			lockedSeq=[], //当前序列中被锁定的列序号
			expectedSeq=[]; //能执行锁定或者解锁操作的序列
			
		for(var i=0,l=seq.length;i<l;i++){
			if(i<fixed){
				lockedSeq.push(seq[i]);
			}
		}
		
		//如果当前序列没有锁定列并且要执行列解锁操作,直接返回
		if(lockedSeq.length==0&&!isLock) return;
		
		for(var i=0,l=cols.length;i<l;i++){
			//要执行锁定操作的列都必须可见
			if(dojo.indexOf(seq,cols[i])>-1){
				if(isLock){ //如果想执行锁定列操作,cols[i]必须处于未锁定状态
					dojo.indexOf(lockedSeq,cols[i])==-1&&expectedSeq.push(cols[i]);
				}else{ //如果想执行解锁操作,cols[i]必须处于锁定状态
					dojo.indexOf(lockedSeq,cols[i])>-1&&expectedSeq.push(cols[i]);
				}
			}
		}
		
		
		if(expectedSeq.length==0) return;
		
		for(var i=0,l=expectedSeq.length;i<l;i++){
			var index=dojo.indexOf(seq,expectedSeq[i]);
			seq.splice(index,1);//删除原有的序列
			if(isLock){
				seq.splice(fixed,0,expectedSeq[i]);//插入新的序列
				fixed++;
			}
		}
		
		//如果是解锁操作,将expectedSeq重新放到seq中
		if(!isLock){
			fixed-=expectedSeq.length;
			var _count=fixed;
			for (var i = 0, l = expectedSeq.length; i < l; i++) {
				seq.splice(_count,0,expectedSeq[i]);
				_count++;
			}
		}

	 	var s = this._customStructure(seq, fixed);
	 	if (s) {
	 		this.structure = s;
	 		this.setStructure(this.structure);
	 	} 
	 },
	 
	forEachCell: function(inCallback) {
		for(var i=0, c; c=this.cells[i]; i++) {
			inCallback(c, i);
		}
	}
});
