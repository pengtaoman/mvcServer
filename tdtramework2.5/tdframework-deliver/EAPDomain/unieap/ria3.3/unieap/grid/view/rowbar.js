dojo.provide('unieap.grid.view.rowbar');
dojo.require('unieap.grid.view.view');

dojo.declare('unieap.grid.RowView', unieap.grid.View, {
	
	rowClassTag: 'u-grid-rowbar',
	
	noscroll: true,
	isRowBar: true,
	cellWidth: true,
	
	postCreate: function() {
		this.inherited(arguments);
		this.headerEvtHandler = [];
		this.contentEvtHandler = [];
		this._fs = parseInt(dojo.style(this.grid.domNode,"fontSize"))/2 || 6 ;
	},
	
	setStructure: function(inStructure) {
		this.structure = inStructure;
		this.cellWidth = this.structure.width || 20;
		
		dojo.style(this.scrollboxNode,"overflow", "hidden"); 
		//绑定自动扩展rowbar的事件
		if(this.rowNumber){
			var viewManager = this.grid.managers.get("ViewManager");			
			this.connect(viewManager, "render", "_resizeNumberWidth");
			this.connect(viewManager, "setScrollTop", "_resizeNumberWidth");
		}
	},
	_resizeNumberWidth : function() {
		if(!this.rowNumber) return ;	
		var viewManager = this.grid.managers.get("ViewManager");						
		var number = viewManager.scroller.lastVisibleRow;
		var store = this.grid.getBinding().getDataStore();
		number += (store.getPageNumber()-1) * store.getPageSize();	
		var	width = String(number).length*this._fs+6;	
		if(width<=20) width = 20;													  
		this.resizeContentWidth(width);
		//调整滚动条
		var viewManager = this.grid.managers.get("ViewManager");
		viewManager.adjustScrollBar();
	},
	
	resizeContentWidth: function(inWidth) {
		var width = this.getRowBarWidth(inWidth);		
		if(this.originWidth == width) return ;
		this.originWidth = width;
		dojo.style(this.headerNode,"width",width);
		dojo.style(this.headerContentNode.firstChild,"width",width);
		dojo.style(this.domNode,"width",width);
		this.lockedNode&&dojo.style(this.lockedNode,"width",width);
	},
	
	prepareHtml: function() {
		var html = [];
		html.push('<table class="u-grid-rowbar-table" style="height:');
		//html[1]: rowHeight
		html.push('');
		html.push('px;" cellspacing=0 cellpadding=0>');
		
		html.push('<tr>');
		//html[4]: cells
		html.push('');
		html.push('</tr></table>')
		return html;
	},
	
	renderHeader: function() {
		var html = this.prepareHtml();
		html[1] = this.headerHeight;
		html[4] = this.generateRowCells(-1);
		this.headerContentNode.innerHTML = html.join('');
		this.originWidth = 0;
		this.resizeContentWidth();
	},
	
	renderRow: function(inRowNode, inRowIndex) {
		if (!inRowNode) return;
		var html = this.prepareHtml();
		html[1] = this.rowHeight;
		html[4] = this.generateRowCells(inRowIndex);
		inRowNode.innerHTML = html.join('');
		unieap.grid.notify(this, "onRowRender", [inRowNode, inRowIndex,this]);
	},
	
	generateLockedRow:function(node,data) {
		var _html = '<div class="u-grid-rowbar"><table class="u-grid-rowbar-table" style="width:100%;height:' + this.rowHeight + 'px;" cellspacing=0 cellpadding=0><tr>';
		var html_='</tr></table></div>';
		var cell,inner=[];
		 dojo.forEach(data,function(d,index){
	    
	       var value=d['_BAR']||'';
		    var gclass="";
		   
            if(value.cls){
		       gclass=value.cls;
		    }
		    if(value.value){
		     value=value.value;
		   }
		    cell = "<td class='u-grid-rowbar-cell'><nobr class='"+gclass+"'>"+value+"</nobr></td>";
			inner.push(_html,cell,html_);
	        
		},this)
		node.innerHTML=inner.join('');
	},
	
	generateRowNumberCell: function(inRowIndex) {
		if(inRowIndex<0){ 
			return this.generateBlankCell(false);
		}
		var result = [];
		var store = this.grid.getBinding().getDataStore();
		inRowIndex += (store.getPageNumber()-1) * store.getPageSize();
		result.push('<td class="u-grid-rowbar-cell">');
		result.push(inRowIndex+1);
		result.push('</td>');
		return result;
	},
	generateBlankCell : function(bool){
		var result = [];
		if(!bool){
			result.push('<td class="u-grid-rowbar-cell">');
			result.push('&nbsp;');
			result.push('</td>');
		}
		return result;
	},
	
	//may be override by selection module
//	generateColGroup: function() {
//		return '<colgroup><col style="width: ' + this.cellWidth + 'px"></col></colgroup>';
//	},
	//may be override by selection module
	generateRowCells: function(inRowIndex) {	
		var viewManager = this.grid.managers.get("ViewManager");
		var plusCells=this.grid.managers.getPlus(viewManager,'generateRowBarCells');
		var cells= this.rowNumber ?  this.generateRowNumberCell(inRowIndex) : [];
//		var cells= this.rowNumber ?  this.generateRowNumberCell(inRowIndex) : this.generateBlankCell(plusCells && plusCells.length);
		if(plusCells){
			var td;
			dojo.forEach(plusCells,function(_g){
				td=_g.call(this,inRowIndex);
				td && cells.push(td);
//				cells.push(_g.call(this,inRowIndex));
			})
		}
		if (cells.length==0) {
			cells = this.generateBlankCell(false);
		}
		return cells.join('');
	},
	
	getRowBarWidth: function(inWidth) {	
		var width=inWidth   || (this.cellWidth);
		var viewManager = this.grid.managers.get("ViewManager");
		var widths=this.grid.managers.getPlus(viewManager,'getRowBarWidth');
		var _twidth=1;
		if(widths&&widths.length>0){
		 	for(var i=0;i<widths.length;i++){
				var _mw=widths[i];
				if(typeof _mw =="function"){
					_twidth+=_mw.call();
				}else if(typeof _mw =="number"){
					_twidth+=_m;
				}
			}
		 }
		 if(!this.rowNumber&&_twidth!=1){
		 	return _twidth+"px";
		 }
		 return (width+_twidth)+"px";
	},
	
	dispatchHeaderEvent: function(e) {
		if (this.headerEvtHandler.length>0) {
    		for (var i=0, p; p=this.headerEvtHandler[i]; i++) {
    			p.apply(this, [e]);
    		}
    	} else {
    		this.inherited(arguments);
    	}
	},
	
	dispatchContentEvent: function(e) {
		//this.contentEvtHandler的修改见SelectionPatch.js中的doPatch方法
		if (this.contentEvtHandler.length>0) {
			for (var i=0, p; p=this.contentEvtHandler[i]; i++) {
    			p.apply(this, [e]);
    		}
		}
		var index=Number(e.rowIndex);
		if(typeof(index)!='undefined'){
			this.grid.managers.get('RowManager').updateCurrnetRow(index);
		}
		//返回为true,见Grid.js中的dispatchContentEvent方法
		//这样就只执行e.sourceView.dispatchContentEvent(e)不执行this._dispatch(e.dispatch, e);
		return true;
	}
});