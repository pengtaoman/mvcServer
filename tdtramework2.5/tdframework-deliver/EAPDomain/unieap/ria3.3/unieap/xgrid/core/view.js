dojo.provide('unieap.xgrid.core.view');
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("unieap.xgrid.core.builder");
dojo.declare('unieap.xgrid.View', [dijit._Widget, dijit._Templated], {
	
	rowHeight : null,
	
	_table: '<table class="u-xgrid-table" border="0" cellspacing="0" cellpadding="0" ',
	
	templateString: 
		"<div class='u-xgrid-view' dojoAttachPoint='viewNode'>" +
			"<div class='u-xgrid-header' dojoAttachPoint='headerNode'>" +
				"<div class='u-xgrid-headerContent' dojoAttachPoint='headerContentNode'></div>" +							
			"</div>" +
			"<div class='u-xgrid-scrollContent' dojoAttachPoint='scrollboxNode'>" +
				"<div class='u-xgrid-viewContent' dojoAttachPoint='contentNode'></div>" +
			"</div>" +
		"</div>",
					
	postCreate: function() { 
		this.evts = [];
		this.rowHeight = this.grid.getRowManager().defaultRowHeight;
		this.rowNodes = [];
		this.contentStructure = {};
		this.headerBuilder = new unieap.xgrid.view.HeaderBuilder(this);
		this.contentBuilder = new unieap.xgrid.view.ContentBuilder(this);
	},
	destroy: function() {
		dojo.destroy(this.domNode);
		dojo.destroy(this.headerNode);
		delete this.rowNodes;
		delete this.snapshot;
		this.inherited(arguments);
	},
	
	setStructure: function(inStructure) {
		this.structure = inStructure;
		this.noscroll = inStructure.noscroll;
		var rows = this.structure.rows;
		//hh用于获取锁定列header高度
		this.grid.ViewManager.hh = Math.max(this.grid.ViewManager.hh,rows.length);
		//this.cells = rows[rows.length-1];
		this.cells = [];
		for(var i = 0; i<rows.length ; ++i){
			for(var j = 0; j<rows[i].length; ++j){
				if(!rows[i][j].isMulTitle){
					this.cells.push(rows[i][j]);
				}
			}
		}
		this.snapshot = {
			beginRowIndex : 0,
			beginCellIndex : 0
		};
		this._buildisMulTitleStructure();
	},
	
	_prepareTable: function() {
		this.rowTable = {content : ""};
		var rows = this.structure.rows,wa=[],layout=[];
		for(var j=0; j<rows.length; j++) {
			wa[j] = [];
		}
		for(var j=0, index, cell, row; (row=rows[j]); j++) {
			index = 0;
			wa[j] = wa[j] || [];
			layout[j] = layout[j] || [];
			for (var i=0, l; (cell=row[i]); i++) {
				if((l=Number(cell.colSpan))>1) {
					for (var k=0;k<l;k++) {
						while(wa[j][index]!=null) {
							index++;
						};
						for(var k1=1,ll=Number(cell.rowSpan);k1<ll;k1++) {
							wa[j+k1] = wa[j+k1] || [];
							wa[j+k1][index] = -1;
							layout[j+k1] = layout[j+k1] || [];
							layout[j+k1][index] = cell.index;
						}
						wa[j][index] = -1;
						layout[j][index] = cell.index;
						index++;
					}
				} else {
					while(wa[j][index]!=null) {
						index++;
					};
					wa[j][index] = cell.index;
					layout[j][index] = cell.index;
					for(var k=1,l=Number(cell.rowSpan);k<l;k++) {
						wa[j+k] = wa[j+k] || [];
						wa[j+k][index] = wa[j][index];
						layout[j+k] = layout[j+k] || [];
						layout[j+k][index] = layout[j][index];
					}
					index++;
				}
			}
		}
		this.rowTable["layout"] = layout;
		this.rowTable["cache"]  = wa;
	},
	
	_generateTableColGroup: function() {
		var wa = this.rowTable["cache"],t = [], w = [];
		t.push("<colgroup>");
		var layout = this.grid.LayoutManager;
		for (var k=0,l = wa[0].length; k< l;k++) {
			for(var i=0;i<wa.length;i++) {
				if (wa[i][k] != -1) {
					var cell = layout.getCell(wa[i][k]);
					if (this.noscroll && cell.isPercent() && !cell.isRowBar) {
						cell.setWidth("200px");
					}
					t.push("<col style='width:"+cell.getWidth()+"'>");
					w.push(cell);
					break;
				}
			}
		}
		t.push("</colgroup>");
		this.rowTable["colgroup"] = t.join("");
		this.rowTable["cols"] = w;
	},
	
	_buildisMulTitleStructure:function(){
		this._prepareTable();
		this._generateTableColGroup();
		var _t = this.rowTable["layout"];
		var layout = this.grid.LayoutManager;
		if (_t.length == 0) {
			return;
		}
		//映射多标题表结构,升级法
		for (var i,j=0,cursor,cell; j<_t[0].length; j++,i=_t.length-1) {
			i=_t.length-1;
			cursor = _t[i][j];
			i--;
			while(i>=0) {
				cell = layout.getCell(_t[i][j]);
				if (cell.isMulTitle) {
					_t[i][j] = cursor;
				} else {
					cursor = _t[i][j];
				}
				i--;
			}
		}
		var d = [];
		for (var i=0; i<_t.length-1; i++) {
			var same = true;
			for (var j=0; j<_t[i].length; j++) {
				if (_t[i][j] != _t[i+1][j]) {
					same = false;
					break;
				}
			}
			if (same) {
				d.push(i);
			}
		}
		//删除重复行
		for (i in d) {
			delete _t[i];
		}
		//生成contentStructure
		var rows = [], cs=[];
		for (i in _t) {
			if (typeof(_t[i]) == "function") {
				continue;
			} else {
				rows.push(_t[i]);
			}
		}
		for (var i=0; i<rows.length; i++) {
			var row = [];
			for (var j=0,cell; j< rows[i].length;) {
				if (rows[i][j] == -1) {
					j++;
					continue;
				}
				cell = layout.getCell(rows[i][j]);
				//compute rowSpan
				var n = i + 1;
				while(rows[n] && rows[n][j] == rows[i][j]) {
					rows[n][j] = -1;
					n++;
				}
				var rowSpan = n-i;
				if (rowSpan && rowSpan>1) {
					cell.contentRowSpan = rowSpan;
				}
				//compute colSpan
				n = j+1;
				while(rows[i][j] == rows[i][n]) {
					n++;
				}
				var colSpan = n-j;
				if (colSpan && colSpan>1) {
					cell.contentColSpan=colSpan;
				}
				
				row.push(cell);
				j = n;
			}
			cs.push(row);
		}
		this.contentStructure.rows = cs;
	},
	
	
	//判断当前视图是否存在指定的cell
	hasCell: function(inCell) {
		if(this.declaredClass != 'unieap.xgrid.View') return;
		var rows = this.structure.rows;
		for (var row=0; row<rows.length; row++) {
			for (var c=0; c<rows[row].length; c++) {
				if (inCell == rows[row][c])
					return true;
			}
		}
		return false;
	},
	
	render : function(){
		this.renderHeader();
		if(this.snapshot.viewHeight!=null){
			this.renderContent();
		}
	},
	
	renderLockedRow: function(data,flag){
		if(!data || data.length==0){
			return;
		}
		if(!this.lockedNode){
			var isAbsolute;
			var _tem =	"<div class='row-locked-splitter' dojoAttachPoint='rows_locked'>"+
							"<div class='u-grid-locked-content' style='z-index:-1;'>"+
								"<div class='u-grid-inner'>"+
									"<div class='u-grid-locked-content-rows' dojoAttachPoint='locked-rows'>"+
									"</div>"+
								"</div>"+
							"</div>"+
						"</div>",
				node=dojo._toDom(_tem);
			this.lockedContentNode = node;
			this.lockedNode=node.childNodes[0].childNodes[0].childNodes[0];
			this.lockedScrollNode=this.lockedNode.parentNode;
			this.generateLockedRow(this.lockedNode,data,flag)
			dojo.place(node,this.scrollboxNode);
		}else{
			this.generateLockedRow(this.lockedNode,data,flag)
		}
	},
	generateLockedRow:function(lockedNode,data,flag){
		var inner=this.generalLockedHTML(data);
		lockedNode.innerHTML=inner;
		if(!this.isRowBar && this.noscroll && this.cells.length>0){
			if(dojo.isIE){
				dojo.query("table>tbody>tr",this.lockedNode).forEach(function(tr){
					if(tr.cells.length>0){
						dojo.addClass(tr.cells[tr.cells.length-1].firstChild,"locked-splitter");
					}
				});
			}else{
				dojo.addClass(this.lockedContentNode,"locked-splitter");
			}
		}
		this.resizeLocked(data,flag);
	},
	generalLockedHTML: function(data){
		var html = [],
			snapshot = this.snapshot,
			showCells = this.snapshot.showCells || this.cells.length;
		!this.snapshot.xscroller &&  (this.snapshot.beginCellIndex = 0);
		var tableWidth = this.getRealWidth(this.snapshot.beginCellIndex,showCells);
		this.isRowBar ? html.push("<div class='u-xgrid-rowbar-table'") : html.push("<div class='xgrid-table-layout' dojoAttachPoint='locked_rows'");
		var temp = isNaN(tableWidth)?"":"px";
			html.push("style='width:"+(tableWidth-1)+temp+";");
			html.push(snapshot.lastRow && "bottom:0px;" || "");
			html.push(snapshot.lastCell && "right:0;" || "");
			html.push("'>");
			html.push(this._table);
			html.push("style='width:100%;");
			html.push("'>");
		if(this.isRowBar){
			for(var j=0;j<data.length; j++) {
				html.push(this.generateBlankCell(true));
			}
		}else{
			var colgroup = ["<colgroup>"];
			var rows = this.contentStructure.rows,
				row = rows[0];
			var unShowNum = 0;
			for(var i=0;i<showCells; i++) {
				var cellIndex = this.snapshot.beginCellIndex + i + unShowNum,
					cell = row[cellIndex];
				if(cell){
					if(!cell.hidden){
						colgroup.push("<col style='width:")
						colgroup.push(cell.getWidth());
						colgroup.push("'>");
					} else {
						unShowNum++;
						i--;
					}
				}
			}
			colgroup.push("</colgroup>");
			html.push(colgroup.join(""));	
			html.push("<tbody>");
			for(var j=0;j<data.length; j++) {
				var rowIndex = snapshot.beginRowIndex + j;
				html.push('<tr class="'+(j%2?"u-xgrid-odd":"")+'">');
				var unShowNum = 0;
				for(var i=0,cell; i<showCells; i++) {
					var cellIndex = i+snapshot.beginCellIndex+unShowNum,
				 		cell = row[cellIndex],
				 		nodeHeight = this.rowHeight;
				 	if(cell){
					 	if(!cell.hidden){
							if(this.isRowBar){
								html.push('<td class="u-grid-rowbar-cell">');
								html.push('<nobr class="" style="height:'+(nodeHeight-1)+'px">');
								html.push('</td>');
							}else{
								html.push('<td>');
								html.push('<div class="u-xgrid-cell" style="height:'+(nodeHeight-1)+'px">');
								//html.push('<div class="u-xgrid-text">');
								//html.push('<div class="u-xgrid-text2">');
								if(cell.name in data[j]){
									html.push(data[j][cell.name]);
								}
								html.push('</div></td>');
							}
					 	}else {
							unShowNum++;
							i--;
						}
				 	}
				}
				html.push('</tr>');
			}
		}
		html.push('</tbody>');
		html.push('</table>');
		html.push('</div>');
		return html.join('');
	},
	resizeLocked:function(data,flag){
		dojo.style(this.lockedScrollNode,'height',(data.length*this.rowHeight) + "px");
		var contentHeight = dojo.style(this.contentNode,'height'),
			bottomValue;
		if(flag){
			dojo.style(this.contentNode,'height',contentHeight - (data.length*this.rowHeight) +"px");
			this.snapshot.viewContentHeight = contentHeight - (data.length*this.rowHeight);
		}
		this.snapshot.viewHeight -= data.length*this.rowHeight;
		if(!this.noscroll){
			for(var c = this.rowTable["cols"],i=c.length-1;i>=0;i--) {
				if(c[i].isPercent()) {
					dojo.style(this.lockedNode,'width','100%');
					dojo.style(this.lockedContentNode,'width',dojo.style(this.contentNode,'width')+'px');
					return ;
				}
			}
		}
//		var lockedContentNodeWidth = dojo.style(this.contentNode,'width');
//		if(!flag && !dojo.isIE){
//			lockedContentNodeWidth--;
//		}
//		dojo.style(this.lockedContentNode,'width',lockedContentNodeWidth+'px');
//		dojo.style(this.lockedContentNode.childNodes[0],'width',dojo.style(this.contentNode,'width')+'px');
//		this.snapshot.xscroller ? (bottomValue = this.grid.scrollerOffset) : (bottomValue = 0);
//		dojo.style(this.lockedContentNode,'bottom',bottomValue+'px');
	},
	renderHeader: function() {
		this.headerContentNode.innerHTML = this.headerBuilder.generateHtml();
		unieap.xgrid.notify(this, "onHeaderRender",[this.headerContentNode,this]);
	},
	//获取实际的宽度
	getRealWidth : function(beginCellIndex,showCells){
		if(this.isRowBar) return this.getRowBarWidth();
		var rows = this.contentStructure.rows,
			row = rows[0];
		if(0==arguments.length){
			beginCellIndex = 0;
			//showCells = this.cells.length ;
			showCells = row.length;
		}
		if(!showCells){
			//showCells = this.cells.length ;
			showCells = row.length;
		}
		var width = 0;
		for(var i=0;i<showCells; i++) {
			var cellIndex = beginCellIndex + i ;
			if(this.contentStructure.rows){
				cell = row[cellIndex];
			}
			else{
				cell = this.cells[cellIndex];
			}
			if(cell && !cell.hidden){
				if(!cell.resized && cell.isPercent()) {
					if(this.noscroll){
						width += 200;
					}else{
						return "100%";
					}
				}
				width+=cell.getPixelWidth();
			}
		}
		return width;
	},
	setViewLeftPosition : function(left){
		dojo.style(this.headerNode,"left",left+"px");
		dojo.style(this.viewNode,"left",left+"px");
	},
	resize : function(w,h){
		var snapshot = this.snapshot,
			scrollerOffset = this.grid.scrollerOffset;
		//设置最小宽度和高度
		w = w< scrollerOffset ? scrollerOffset : w;
		h = h< scrollerOffset ? scrollerOffset : h;
		if(this.noscroll){
			w = this.getRealWidth();
		}
		snapshot.viewWidth = w;
		snapshot.viewHeight  = h;
		snapshot.viewContentWidth = w;
		snapshot.viewContentHeight = h;
		snapshot.yscroller = false;
		snapshot.xscroller = false;
		dojo.style(this.headerNode,"width",w + "px");
		dojo.style(this.viewNode,{
			"width" : w + "px",
			"height" : h + "px"
		});
		//先计算高度
		var rowCount = this.grid.getBinding().getRowCount(),
			totalRowHeight = rowCount * this.grid.getRowManager().defaultRowHeight;
		if(!this.grid.getManager("ViewManager").autoRender){
			rowCount = 0;
			totalRowHeight = 0;
		}
		//表格实际高度
		snapshot.totalRowHeight = totalRowHeight;
		//总记录数
		snapshot.rowCount = rowCount;
		//如果是锁定视图则不计算高度
		if(!this.noscroll && totalRowHeight>h){
			snapshot.yscroller = true;
			snapshot.viewContentWidth = snapshot.viewWidth - scrollerOffset;
		}
		//如果锁定视图或百分比表格
		snapshot.showCells = this.cells.length;
		if((!this.noscroll && !snapshot.percentage)){
			//计算是否应该有横向滚动条
			var headerContentWidth = this.getRealWidth();
			if(this.contentStructure.rows){
				var rows = this.contentStructure.rows,
					row = rows[0];
			}
			else{
				var row = this.cells;
			}
			if(headerContentWidth > snapshot.viewContentWidth){
				snapshot.xscroller = true;
				var beginCellIndex = snapshot.beginCellIndex,
					visibleWidth = 0;
				snapshot.showCells = 0;
				//for(var i=beginCellIndex,cell;cell = this.cells[i];i++){
				if(snapshot.lastCell){
					snapshot.beginCellIndex = 0;
					for(var i=row.length-1,cell;(cell = row[i]);i--){
						visibleWidth+=cell.getPixelWidth();
						snapshot.showCells ++;
						if(visibleWidth>=snapshot.viewContentWidth){
							snapshot.beginCellIndex = i;
							break;
						}
					}
					if(visibleWidth<snapshot.viewContentWidth){
						snapshot.lastCell = false;
					}
					
				}else{
					for(var i=beginCellIndex,cell;(cell = row[i]);i++){
						visibleWidth+=cell.getPixelWidth();
						snapshot.showCells ++;
						if(visibleWidth>=snapshot.viewContentWidth){
							break;
						}
					}
					//判断beginCellIndex的合法性
					for(;visibleWidth<snapshot.viewContentWidth;){
						snapshot.lastCell = true;
						snapshot.beginCellIndex --;
						visibleWidth+= this.cells[snapshot.beginCellIndex].getPixelWidth();
						snapshot.showCells++;
						if(0==snapshot.beginCellIndex) break;
					}
				}
				
				
				snapshot.viewContentHeight = snapshot.viewHeight -scrollerOffset;
				//如果此时还存在纵向滚动条的场景
				if(false==snapshot.yscroller){
					if(totalRowHeight + scrollerOffset > snapshot.viewHeight){
						snapshot.yscroller = true;
						snapshot.viewContentWidth = snapshot.viewWidth - scrollerOffset;
					}
				}
			}else{
				if(true==snapshot.yscroller){
					if(headerContentWidth > snapshot.viewContentWidth ){
						snapshot.xscroller = true;
						snapshot.viewContentHeight = snapshot.viewHeight - scrollerOffset;
					}else{
						snapshot.lastCell = false;
					}
				}
			}
		}
		//设置偏移量
		dojo.style(this.headerContentNode,"marginRight",snapshot.yscroller && (scrollerOffset+"px") || "0px");			
		//非锁定视图再设置应该显示多少条记录
		if(!this.noscroll){
			var showRows = Math.ceil(snapshot.viewContentHeight / this.grid.getRowManager().defaultRowHeight);
			snapshot.showRows = Math.min(showRows,rowCount);
			//考虑当前的beginRowIndex的合法性，可视的记录小于showRows，重新确定beginRowIndex
			if(snapshot.beginRowIndex + snapshot.showRows > rowCount){
				snapshot.beginRowIndex = rowCount - snapshot.showRows;
				snapshot.lastRow = true;
			}
		}
		//设置ViewContent容器和滚动条的宽高
		dojo.style(this.contentNode,{
			"width": snapshot.viewContentWidth+"px",
			"height" : snapshot.viewContentHeight+"px"
		});
	},
	renderContent : function(){
		var snapshot = this.snapshot;
		var headerTable = this.headerContentNode.firstChild;
		if(snapshot.lastCell){
			dojo.style(headerTable,{
				"left":"auto",
				"right" : "0"
			});	
		}else{
			dojo.style(headerTable,{
				"left": -(snapshot.scrollWidth || 0) + "px",
				"right" : "auto"
			});	
		}
	//		this.headerContentNode.innerHTML = this.headerBuilder.generateHtml();
			this.contentNode.innerHTML = this.contentBuilder.generateHtml();
		//锁定列右边线为黑色
		if(!this.isRowBar && this.noscroll && this.cells.length>0){
			if(dojo.isIE < 9){
				var ths = dojo.query("table>tbody>tr>th",this.headerContentNode);
				if(ths.length){
					dojo.addClass(ths[ths.length-1],"locked-splitter");
						var trs = dojo.query("table>tbody>tr",this.contentNode).forEach(function(tr){
							dojo.addClass(tr.cells[tr.cells.length-1].firstChild,"locked-splitter");
						});
				}
			}else{
				dojo.style(this.headerContentNode,"width",dojo.style(this.headerNode,'width')+"px");
				dojo.addClass(this.headerNode,"locked-splitter");
				var contentNodeWidth = dojo.style(this.contentNode,'width');
				//避免每次有页面刷新的时候都将contentNodeWidth加1
				if(this.grid.splitterFlag != contentNodeWidth){
					dojo.style(this.contentNode,"width",contentNodeWidth+1+"px");
					this.grid.splitterFlag = dojo.style(this.contentNode,'width');
				}
				dojo.addClass(this.contentNode.firstChild,"locked-splitter");
			}
		}
		this.grid.getManager("ViewManager").publish("resize");
		//改变header容器的位置
		if(this.noscroll || snapshot.percentage){
			return;
		}
	},
	updateCellWidth: function(inCell, inWidth) {
		inCell.percent = false;
		inCell.setWidth(inWidth);		
		var colCells = this.rowTable["cols"],
			layout = this.grid.getManager("LayoutManager"),
			w = 0, t = [], index = -1, isPercent = false;
			t.push("<colgroup>");
		for (var i=0,cell,vw,col; colCells[i]; i++) {
			cell = colCells[i];
			if (cell == inCell) {
				index = i;
			}
			if (cell.isPercent()) {
				isPercent = true;
			}
			t.push("<col style='width:"+cell.getWidth()+";'>");
			w += cell.getPixelWidth();
		}
		t.push("</colgroup>");
		this.rowTable["colgroup"] = t.join("");
		
		var viewManager = this.grid.getManager("ViewManager");
		if(this.grid.rowEdit && 
		   this.grid.rowEdit.editShowCells == viewManager.getScrollView().snapshot.showCells){
			this.grid.rowEdit.updateCellWidth = true;
		}
		this.renderHeader();
		viewManager.refreshPage();
	},
	//cell.index是准备移动的idx，toCell是非锁定视图从0开始计算的idx
	updateColumnPosition: function(cell,toCell,lockingColNo,tuning){
		var viewManager = this.grid.getManager("ViewManager");
		//判断有没有rowbar找到锁定列视图
		var lockingindex = 0;
		if((lockingColNo > 0) && this.grid.getManager("ViewManager").views[0].isRowBar){
			lockingindex = 1;
		}
		//原列在锁定视图中，在锁定视图的structure中删除
		if(cell.index < lockingColNo){
			var removeCellNum = cell.index;
		}else{
			var removeCellNum = cell.index-lockingColNo;
		}
		var removed = this.structure.rows[0].splice(removeCellNum,1);
		var removedcontent = this.contentStructure.rows[0].splice(removeCellNum,1);
		//目标列在锁定视图中，将移动列加入锁定视图中，否则加入非锁定视图中,如果tuning为-1表示将非锁定列移动到锁定列最后一个位置，当tuning为1表示将锁定列移动到非锁定列第一个位置
		if((toCell < lockingColNo || tuning == -1) && tuning != 1){
			viewManager.views[lockingindex].structure.rows[0].splice(toCell,0,removed[0]);
			viewManager.views[lockingindex].contentStructure.rows[0].splice(toCell,0,removed[0]);
		}else{
			toCell -= lockingColNo;
			if(lockingColNo > 0){
				if(cell.index < lockingColNo){
					toCell++;
				}
					viewManager.views[lockingindex+1].structure.rows[0].splice(toCell,0,removed[0]);
					viewManager.views[lockingindex+1].contentStructure.rows[0].splice(toCell,0,removed[0]);
			}else{
				this.structure.rows[0].splice(toCell,0,removed[0]);
				this.contentStructure.rows[0].splice(toCell,0,removed[0]);
			}
		}
		//refreshPage
		var layoutManager = this.grid.getManager("LayoutManager");
		if(layoutManager.structure[0].type=="unieap.xgrid.RowView"){
			layoutManager.structure.shift();
		}
		var snapshot = this.grid.getViewManager().getScrollView().snapshot;
		//当notifyEdit为1时，在viewmanager中不需要处理关于行编辑
		if(this.grid.rowEdit){
			this.grid.notifyEdit = 1;
		}
		layoutManager.setStructure(layoutManager.structure);
		this.grid.getViewManager().getScrollView().snapshot = snapshot;
		//this.grid.resizeContainer();
		if(this.grid.rowEdit){
			this.grid.notifyEdit = 2;
		}
		viewManager.refreshPage();
	},
	
	doContentEvent: function(e) {
		if(this.contentBuilder.decorateEvent(e)) {
			this.grid.onContentEvent(e);
		}
	},
	doHeaderEvent: function(e) {
		if(this.headerBuilder.decorateEvent(e)) {
			//防止快速点击表头多次排序,当数据量过大时会使得浏览器假死
			typeof(this._flag)=='undefined'&&(this._flag=true)
			if(this._flag&&e.type=='click'){
				this._flag=false;
				this.grid.onHeaderEvent(e);
				setTimeout(dojo.hitch(this,function(){
					this._flag=true;
				}),250)
				
			}else if(e.type!='click'){
				this.grid.onHeaderEvent(e);
			}
			
		}
	},
	getRowNode: function(inRowIndex) {
		var viewName = this.id,
			rowNodes = dojo.query("tr",viewName);
		return rowNodes[inRowIndex];
	},
	getCellNode: function(inRowIndex, inCellIndex) {
		var row = this.getRowNode(inRowIndex);
		if (row) {
			return this.contentBuilder.getCellNode(row, inCellIndex);
		} else {
			return null;
		}
	},
	getCurrentRows: function() {
		var rows = [];
		for(i in this.rowNodes) {
			if (isNaN(i)) {continue;}
			rows.push(Number(i));
		}
		return rows;
	},
	// event dispatch(from Grid)
	dispatchContentEvent: function(e) {
		return this.contentBuilder.dispatchEvent(e);
	},
	dispatchHeaderEvent: function(e) {
		return this.headerBuilder.dispatchEvent(e);
	},
	onMouseOver: function(e) {
		unieap.xgrid.notify(this, "onMouseOver", [e]);
	},
	onMouseOut: function(e) {
		unieap.xgrid.notify(this, "onMouseOut", [e]);
	},
	
	//鼠标移过表头
	onMouseOverHeader: function(e) {
		unieap.xgrid.notify(this, "onHeaderMouseOver", [e]);
	},
	
	
	//鼠标移出表头
	onMouseOutHeader: function(e) {
		unieap.xgrid.notify(this, "onHeaderMouseOut", [e]);
	},
	
	onMouseOverRow: function(e) {
		unieap.xgrid.notify(this, "onMouseOverRow", [e]);
	},
	onMouseOutRow: function(e) {
		unieap.xgrid.notify(this, "onMouseOutRow", [e]);
	}
});

