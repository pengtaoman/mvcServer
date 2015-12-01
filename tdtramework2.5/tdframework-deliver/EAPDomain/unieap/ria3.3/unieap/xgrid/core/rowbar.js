dojo.provide('unieap.xgrid.core.rowbar');
dojo.require('unieap.xgrid.core.view');

dojo.declare('unieap.xgrid.RowView', unieap.xgrid.View, {
	
	
	//noscroll用来标识本视图是一个锁定视图。
	noscroll: true,
	
	//标识本视图是一个rowBar视图
	isRowBar: true,
	
	postCreate: function() {
		this.inherited(arguments);
		this._fs = parseInt(dojo.style(this.grid.domNode,"fontSize"))/2 || 8 ;
	},
	
	setStructure: function(inStructure) {
		this.structure = inStructure;
		this.cells = [];
		this.cells.length = 1;
		this.snapshot = {
			beginRowIndex : 0,
			beginCellIndex : 0
		};
	},
	
	prepareHtml: function() {
		var html = [];
		html.push('<tr class="" gridrowindex=');		
		html.push('');
		html.push('>');	
		//html[3]: cells
		html.push('');
		html.push('</tr>')
		return html;
	},
	//为rowbar准备header的HTML
	generateHeader: function() {
		var html = this.prepareHtml();
		html[1] = -1;	
		html[3] = this.generateRowCells(-1);
		return html.join('');
	},	
	//为rowbar准备content的HTML
	generateContent: function(inRowIndex) {
		var html = this.prepareHtml();
		html[1] = inRowIndex;
		html[3] = this.generateRowCells(inRowIndex);
		return html.join('');
	},
	//产生rowNumberCell的HTML
	generateRowNumberCell: function(inRowIndex) {
		if(inRowIndex<0){ 
			return this.generateBlankCell(false,inRowIndex);
		}
		var result = [];
		var store = this.grid.getBinding().getDataStore();
		var nodeHeight = this.grid.getManager("RowManager").defaultRowHeight;
		inRowIndex += (store.getPageNumber()-1) * store.getPageSize();
		result.push('<td class="" >');
		result.push('<div class="u-xgrid-rowbar" style="height:'+(nodeHeight-1)+'px;line-height:'+nodeHeight+'px;">');
		result.push('<div class="u-xgrid-rowbar-cell">');
		result.push(inRowIndex+1);
		result.push('</div></div></td>');
		return result;
	},
	//产生空cell的HTML
	generateBlankCell : function(bool,inRowIndex){
		var result = [];
		if(!bool){
			var hheight;
			result.push('<td class="" >');
			if(inRowIndex<0){
				hheight = this.grid.ViewManager.getHeaderHeight();
				result.push('<div class="u-xgrid-rowbar" style="height:'+(hheight-1)+'px; line-height:'+hheight+'px">');
			} else {
				hheight = this.grid.getManager("RowManager").defaultRowHeight;
				result.push('<div class="u-xgrid-rowbar" style="height:'+(hheight-1)+'px; line-height:'+hheight+'px">');
			}
			result.push('<div class="u-xgrid-rowbar-cell">')
			result.push('&nbsp;');
			result.push('</div></div></td>');
			return result;
		} else {                //为锁定列产生空的rowbar提供的方法
			var html = [];
			html.push('<tr class="" gridrowindex=-1>');	
			html.push('');
			html.push('</tr>')
			var hheight = this.grid.getManager("RowManager").defaultRowHeight;
			result.push('<td class="" ><div class="u-xgrid-rowbar" style="height:'+(hheight-1)+'px; line-height:'+hheight+'px">');
			result.push('<div class="u-xgrid-rowbar-cell">&nbsp;</div></div></td>')
			html[1] = result.join("");
			return html.join("");
		}
	},
	//根据inRowIndex生成相应的rowBar的HTML	
	generateRowCells: function(inRowIndex) {
		var selectManager = this.grid.getManager("SelectionManager");
	
		var cells= this.rowNumber ?  this.generateRowNumberCell(inRowIndex) : [];
		if(selectManager){
			var td;
			td=selectManager.generateRowBarCells(inRowIndex);
			td && cells.push(td);
		}
		if (cells.length==0) {
			cells = this.generateBlankCell(false,inRowIndex);
		}
		return cells.join('');
	},
	//生成colgroup的HTML
	genarateColgroup: function(){
		var colgroup = ["<colgroup>"];
		var view = this.grid.getManager("ViewManager");
		var select = this.grid.getManager("SelectionManager");
		if(view.rowNumber){
			var bindManager = this.grid.getBinding();
			var number = bindManager.rowData.length + (bindManager.store.pageNumber-1)*bindManager.store.pageSize;
			var width = Math.max((String(number).length*this._fs+10),20);	
			colgroup.push("<col style='width:")
			if(select&&(select.selectType=='s'||select.selectType=='single'
				||select.selectType=='m'||select.selectType=='multiple')){
				colgroup.push(width);
				colgroup.push("px'>");
				colgroup.push("<col style='width:19px'>");	
			} else {
				colgroup.push(width-1);
				colgroup.push("px'>");
			}
			return colgroup.join("");
		} 
		
		colgroup.push("<col style='width:19px'>");					
		colgroup.push("</colgroup>");
		return colgroup.join("");	
	},
	
	//计算获得rowbar的宽度
	getRowBarWidth: function() {	
		var	width = 0;
		var view = this.grid.getManager("ViewManager");
		if(view.rowNumber){
			var bindManager = this.grid.getBinding();
			var number = bindManager.rowData.length + (bindManager.store.pageNumber-1)*bindManager.store.pageSize;
			width = Math.max((String(number).length*this._fs+10),20);		
		}
		var select = this.grid.getManager("SelectionManager");
		if(select){
			width += select.getRowBarWidth();
		}								
		return width==0?20:width;
	},
	//处理点击rowbar的header的事件
	dispatchHeaderEvent: function(e) {
		if("click"==e.type && "INPUT"==e.target.tagName.toUpperCase()) {
			this.grid.getManager("SelectionManager").setAllSelect(e.target.checked) || dojo.stopEvent(e);
		}
	},
	//处理点击rowbar的content的事件
	dispatchContentEvent: function(e) {
		if("click"==e.type && "INPUT"==e.target.tagName.toUpperCase()) {
			var select = this.grid.getManager("SelectionManager");
			var rowIndex = Number(e.rowIndex);
			switch(select.getSelectType()) {
				case select.types.s:
				case select.types.single: 
					select.setSelect(rowIndex, true);
					break;
				case select.types.m:
				case select.types.multiple: 
					select.setSelect(rowIndex, !select.isSelected(rowIndex));
					break;
			}
		}
		return true;
	}	
});