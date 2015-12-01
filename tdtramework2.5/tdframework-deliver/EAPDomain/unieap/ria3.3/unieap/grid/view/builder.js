dojo.provide('unieap.grid.view.builder');
dojo.require("unieap.grid.view.drag");

unieap.grid.rowIndexTag = "gridRowIndex";

dojo.declare("unieap.grid.view.Builder", null, {
	
	view: null,
	
	_table: '<table class="u-grid-row-table" border="0" cellspacing="0" cellpadding="0"',
	
	constructor: function(inView) {
		this.view = inView;
	},
	
	generateCellMarkup: function(inCell, isHeader) {
		var result = [], html, cellTag, colSpan, rowSpan;
		if (isHeader) {
			cellTag = "th";
			colSpan = "colSpan";
			rowSpan = "rowSpan";
		} else {
			cellTag = "td";
			colSpan = "contentColSpan";
			rowSpan = "contentRowSpan";
		}
		html = [ "<" + cellTag + " tabIndex='-1'" ];
		
		inCell.colSpan && html.push(" colspan='", inCell.colSpan, "'");
		inCell.rowSpan && html.push(" rowspan='", inCell.rowSpan, "'");
		html.push(" class='");
		//修正MasterDetail中嵌套的Grid表头分隔线不明线的bug
		isHeader&&html.push("u-grid-hcell ");
		
		inCell.classes && html.push(inCell.classes.join(' '));
		html.push("");
		
		//result[0]-->"<td class='u-grid-cell"
		result.push(html.join(''));
		
		//result[1]-->""
		result.push("");
		
		html = ["' idx='", inCell.index, "' style='"];
		html.push(isHeader?inCell.headerStyles:inCell.styles);
		
		//result[2]--->"' idx='1' style='background:#ccc;"
		result.push(html.join(''));

		//result[3]-->""
		result.push("");
		
		html = [ "'" ];
		
//		cell现在没有attrs属性
//		inCell.attrs && html.push(" ", inCell.attrs);
		
		html.push(">");
		
		//result[4]-->"'>"
		result.push(html.join(''));
		
		//result[5] -->""
		result.push("");
		
		//result[6]-->"</td>"
		result.push("</" + cellTag + ">");
		

		
		return result;
	},
	// cell finding
	isCellNode: function(inNode) {
		return Boolean(inNode && inNode.getAttribute && inNode.getAttribute("idx"));
	},
	getCellNodeIndex: function(inCellNode) {
		return inCellNode ? Number(inCellNode.getAttribute("idx")) : -1;
	},
	getCellNode: function(inRowNode, inCellIndex) {
		for(var i=0, row; row=unieap.grid.getTr(inRowNode.firstChild, i); i++) {
			for(var j=0, cell; cell=row.cells[j]; j++) {
				if(this.getCellNodeIndex(cell) == inCellIndex) {
					return cell;
				}
			}
		}
	},
	findCellTarget: function(inSourceNode, inTopNode) {
		var n = inSourceNode;
		while(n && !this.isCellNode(n) && (n!=inTopNode)) {
			n = n.parentNode;
		}
		return n!=inTopNode ? n : null 
	},
	// event decoration
	baseDecorateEvent: function(e) {
		e.dispatch = 'do' + e.type;
		e.grid = this.view.grid;
		e.sourceView = this.view;
		e.cellNode = this.findCellTarget(e.target, e.rowNode);
		e.cellIndex = this.getCellNodeIndex(e.cellNode);
		var layout = this.view.grid.managers.get("LayoutManager"); 
		e.cell = (e.cellIndex >= 0 ? layout.getCell(e.cellIndex) : null);
	},
	// event dispatch
	findTarget: function(inSource, inTag) {
		var n = inSource;
		while(n && !(inTag in n) && (n!=this.view.grid.domNode)) {
			n = n.parentNode;
		}
		return (n != this.view.domNode) ? n : null; 
	},
	findRowTarget: function(inSource) {
		var rowNode=this.findTarget(inSource, unieap.grid.rowIndexTag);
		var l=0,m=rowNode;
		while(m&&(m!=this.view.grid.domNode)){
			m = m.parentNode;
			l+=1;
			if(l>10)return null;
		}
		if (l > 10) {
			return null;
		}
		return rowNode;
	},
	isIntraNodeEvent: function(e) {
		try {
			return (e.cellNode && e.relatedTarget && dojo.isDescendant(e.relatedTarget, e.cellNode));
		} catch(x) {
			// e.relatedTarget has permission problem in FF if it's an input: https://bugzilla.mozilla.org/show_bug.cgi?id=208427
			return false;
		}
	},
	isIntraRowEvent: function(e) {
		try {
			var row = e.relatedTarget && this.findRowTarget(e.relatedTarget);
			return !row && (e.rowIndex==-1) || row && (e.rowIndex==row.gridRowIndex);			
		} catch(x) {
			// e.relatedTarget on INPUT has permission problem in FF: https://bugzilla.mozilla.org/show_bug.cgi?id=208427
			return false;
		}
	},
	dispatchEvent: function(e) {
		if(e.dispatch in this) {
			return this[e.dispatch](e);
		}
	},
	// dispatched event handlers
	domouseover: function(e) {
		if(e.cellNode && (e.cellNode!=this.lastOverCellNode)) {
			this.lastOverCellNode = e.cellNode;
			this.view.onMouseOver(e);
		}
		this.view.onMouseOverRow(e);
	},
	domouseout: function(e) {
		var relatedTarget = e.relatedTarget;
		if(relatedTarget && relatedTarget.className != 'u-grid-text2' && relatedTarget.className != 'u-grid-cell'){
			this.view.onMouseOut(e);
		}else if(e.cellNode && (e.cellNode==this.lastOverCellNode) && !this.isIntraNodeEvent(e, this.lastOverCellNode)){
			this.lastOverCellNode = null;
			if(!this.isIntraRowEvent(e)) {
				this.view.onMouseOutRow(e);
			}
		}
	}
});

dojo.declare("unieap.grid.view.ContentBuilder", unieap.grid.view.Builder, {
	update: function() {
		this.prepareCells();
	},
	
	prepareCells: function() {
		var rows = this.view.contentStructure.rows;
		for(var j=0, row; (row=rows[j]); j++) {
			for(var i=0, cell; (cell=row[i]); i++) {
				cell.markup = this.generateCellMarkup(cell, false);
			}
		}
	},
	
	generateHtml: function(inRowIndex,data,isLockedRow) {

		var html = [this._table], 
			v = this.view,
			rows = v.contentStructure.rows,
			rowData = this.view.grid.getBinding().getRowData(),
			markDirty = this.view.grid.managers.get("ViewManager").markDirty,
			defaultRowHeight=this.view.grid.managers.get("RowManager").defaultRowHeight;
			
		html.push('height="' + v.rowHeight + 'px">');
		html.push(this.view.rowTable["colgroup"]);
		
		for(var j=0, row; (row=rows[j]); j++) {
			html.push(!row.invisible ? '<tr>' : '<tr class="u-grid-invisible">');
			for(var i=0, cell, m, cc; (cell=row[i]); i++) {
				//cell.markup是一个指针引用，会被其他代码调用，采用克隆的方式操作
				m = dojo.clone(cell.markup), cc = cell.customClasses = [];
			
				//如果是锁定行,不进行css渲染
				if(isLockedRow){
					var index=m[2].indexOf("style='");
					m[2]=m[2].substring(0,index+7);
				}
				
				//给每个td设置高度,高度为defaultRowHeight-1
				if(dojo.trim(m[2]).endWith(";")){
					m[3]="height:"+(defaultRowHeight-1)+"px";
				}else{
					m[3]=";height:"+(defaultRowHeight-1)+"px";
				}
				

				//数据如果修改就显示红色小三角
				m[5] = this.formatCellNode(cell, inRowIndex, data, rowData, markDirty);

				html.push.apply(html, m);
			}
			html.push('</tr>');
			
		}
		
		html.push('</table>');
	
		return html.join('');
	},
	
	formatCellNode: function(inCell, inRowIndex, data, rowData, markDirty) {
		var value = inCell.format(inRowIndex,data),
			changedValue='',
			_o;
		if (markDirty&&!data) {//显示修改标记,锁定行不走该过程
			if (inCell["name"]
				&& rowData
				&& rowData[inRowIndex]
				&& (_o=rowData[inRowIndex]["_o"])
				&& inCell["name"] in _o) {
				changedValue += "<div class=\"u-grid-value-changed\"></div></div>";
				var index=value.lastIndexOf("</div>");
				value=value.substring(0,index)+changedValue;
			}
		}
		

		return value;
	},
	
	decorateEvent: function(e) {
		e.rowNode = this.findRowTarget(e.target);
		if(!e.rowNode) {return false};
		e.rowIndex = e.rowNode[unieap.grid.rowIndexTag];
		this.baseDecorateEvent(e);
		return true;
	}
});

dojo.declare("unieap.grid.view.HeaderBuilder", unieap.grid.view.Builder, {
	
	bogusClickTime: 0,
	overResizeWidth: 4,
	minColWidth: 10,
	oldWidth: -1,
	rawWidth: -1,
	
	update: function() {
		this.tableMap = new unieap.grid.tableMap(this.view.structure.rows);
	},
	
	generateHtml: function() {
		var html = [], rows = this.view.structure.rows;	  
		
		var sortInfo = this.view.grid.getSortInfo();
		var isMulTitle = false;	
		for(var j=0, row; (row=rows[j]); j++) {
			html.push(!row.invisible ? '<tr>' : '<tr class="u-grid-invisible">');
			for(var i=0, cell,cc, markup; (cell=row[i]); i++) {
				markup = this.generateCellMarkup(cell, true);
				isMulTitle = isMulTitle || cell.isMulTitle || false;
				markup[5] = "<nobr class='u-grid-text'>" + (cell.label || '') + "</nobr>";
				//设置排序列样式，包括主排序列和次排序列
				for(var k=0;k<sortInfo.length;k++){
					if(sortInfo[k] == cell){
						cc = cell.customClasses = [];
						cc.push(k==0?" u-grid-sort-primary" : " u-grid-sort-secondary");
						markup[1] = cc.join(' ');
						var result = ["<nobr class='u-grid-text'><span"];
						
						result.push(">");
						result.push(cell.label || '');
						result.push("</span>");
						result.push("<span class='"+(cell.asc >0? "u-grid-sort-up":"u-grid-sort-down")+"'>&nbsp</span>");
						result.push("</nobr>");
						markup[5] = result.join("");
						break;
					}
				}
				markup[5]="<div class='u-grid-header-cell'>"+markup[5]+"</div>"
				
				html.push(markup.join(''));
			}
			html.push('</tr>');
		}
		html.push('</table>');
		html.push('</div>');
		
		if (dojo.isIE && isMulTitle) {
			var s = ["<tr style='display:none;'>"];
			for(var i =this.view.rowTable["cols"].length;i>0;i--){
				s.push("<td class=\"u-grid-cell\"></td>");
			}
			s.push("</tr>");
			html.unshift(s.join(""));
		}
		html.unshift(this.view.rowTable["colgroup"]);
		html.unshift('height="' + this.view.headerHeight + 'px">');
		html.unshift(this._table);
		html.unshift("<div class='u-grid-inner'>");
		return html.join('');
	},
	
	getMousePosition: function(event,o) {
		var mousePosition={x:0,y:0};
		var top,left,obj=o;
		var ParentObj=obj;
		left=obj.offsetLeft;
		while(ParentObj=ParentObj.offsetParent){
			left+=ParentObj.offsetLeft;
		}
		mousePosition.x=event.clientX-left+document.body.scrollLeft;
		ParentObj=obj;
		top=obj.offsetTop;
		while(ParentObj=ParentObj.offsetParent){
			top+=ParentObj.offsetTop;
		}
		mousePosition.y=event.clientY-top+document.body.scrollTop;
		return mousePosition;
	},

	// event decoration
	decorateEvent: function(e) {
		this.baseDecorateEvent(e);
		e.rowIndex = -1;
		e.cellX = this.getCellX(e);
		return true;
	},
	
	// event helpers
	getCellX: function(e) {
		var x = e.layerX;
		if(dojo.isMoz) {
			var n = unieap.grid.ascendDom(e.target, unieap.grid.makeNotTagName("th"));
			x -= (n && n.offsetLeft) || 0;
			//x -= getProp(ascendDom(e.target, mkNotTagName("td")), "offsetLeft") || 0;
		}
		var n = unieap.grid.ascendDom(e.target, function() {
			if(!n || n == e.cellNode) {
				return false;
			}
			// Mozilla 1.8 (FF 1.5) has a bug that makes offsetLeft = -parent border width
			// when parent has border, overflow: hidden, and is positioned
			// handle this problem here ... not a general solution!
			x += (n.offsetLeft < 0 ? 0 : n.offsetLeft);
			return true;
		});
		return x;
	},
	
	// event handlers
	// resizing
	prepareLeftResize: function(e) {
		var i = unieap.grid.getTdIndex(e.cellNode);
		e.cellNode = (i ? e.cellNode.parentNode.cells[i-1] : null);
		e.cellIndex = (e.cellNode ? this.getCellNodeIndex(e.cellNode) : -1);
		return Boolean(e.cellNode);
	},
	canResize: function(e) {
		if(!e.cellNode || e.cellNode.colSpan > 1 || e.cell.noresize) {
			return false;
		}
		var layout = this.view.grid.managers.get("LayoutManager");
		var cell = layout.getCell(e.cellIndex);
//		return !cell.noresize && !cell.isFlex();
	
		return !cell.noresize;
	},
	overRightResizeArea: function(e) {
		if (dojo.isFF) {
			return e.cellNode && (e.cellX >= e.cellNode.offsetWidth - this.overResizeWidth);
		}		
		else if (e.cellNode) {
			var node = this.view.scrollboxNode,
				scrollLeft = 0;
			while(node){
				scrollLeft+=node.scrollLeft;
				node=node.offsetParent;
			}
			this.cellX = this.getMousePosition(e, e.cellNode).x + scrollLeft;
			return e.cellNode && (this.cellX >= e.cellNode.offsetWidth - this.overResizeWidth);
		} else {
			return false;
		}
	},
	domousemove: function(e) {
		var c = this.overRightResizeArea(e) ? 'e-resize'  : 'default';
	
		if(c && !this.canResize(e)) {
			//c = 'not-allowed';
			c = "default";
		}

		e.sourceView.headerNode.style.cursor = c || ''; //'default';
	},
	domousedown: function(e) {
		if(!unieap.grid.drag.dragging) {
			if(this.overRightResizeArea(e)  && this.canResize(e)) {
				this.beginColumnResize(e);
			}
			//else{
			//	this.beginMoveColumn(e);
			//}
		}
	},
	domouseup: function(e) {
		this.resizeHelper && this.resizeHelper.end();
	},
	
	domouseover: function(e) {
		this.view.onMouseOverHeader(e);
	},
	domouseout: function(e) {
		this.view.onMouseOutHeader(e);
	},
	
	doclick: function(e) {
		if (new Date().getTime() < this.bogusClickTime) {
			dojo.stopEvent(e);
			return true;
		}
	},
	getResizeHelper: function() {
		if (!this.resizeHelper) {
			this.resizeHelper = new unieap.grid.resizeHelper(this.view);
		}
		return this.resizeHelper;
	},
	// column resizing
	beginColumnResize: function(e) {
		dojo.stopEvent(e);
		var spanners = [], nodes = this.tableMap.findOverlappingNodes(e.cellNode);
		for(var i=0, cell; (cell=nodes[i]); i++) {
			spanners.push({ node: cell, index: this.getCellNodeIndex(cell), width: cell.offsetWidth });
		}
		var drag = {
			view: e.sourceView,
			node: e.cellNode,
			index: e.cellIndex,
			w: e.cellNode.clientWidth,
			spanners: spanners
		};
		this.oldWidth = e.cellNode.offsetWidth;
		if (dojo.isFF) {
			this.getResizeHelper().begin(e.cellX + e.cellNode.offsetLeft 
				+ this.view.domNode.offsetLeft - this.view.scrollboxNode.scrollLeft);
		} else {
			this.getResizeHelper().begin(this.cellX + e.cellNode.offsetLeft 
				+ this.view.domNode.offsetLeft - this.view.scrollboxNode.scrollLeft);
		}
		unieap.grid.drag.start(e.cellNode, 
			dojo.hitch(this, 'doResizeColumn', drag),  //drag
			dojo.hitch(this, 'endResizeColumn', drag), //end
			dojo.hitch(this, 'domouseup'), //release
			e
			);
	},
	doResizeColumn: function(inDrag, inEvent) {
		var w = inDrag.w + inEvent.deltaX,view=inDrag.view,grid=view.grid;
		var offsetParent = inEvent.target.parentNode.offsetParent;
		while(offsetParent){
			if(dojo.hasClass(offsetParent,"u-grid")){
				break;
			}else{
				offsetParent = offsetParent.offsetParent;
			}
		}
		//不是同一个grid，返回false
		if(null == offsetParent || inDrag.view.grid.id != offsetParent.id){
			return;
		}
		if(w >= this.minColWidth) {
			this.getResizeHelper().resize(inEvent.deltaX);
			this.rawWidth = w;
		}
		//放置锁定行拖到grid的边界外
		if(view.noscroll){
			var hasRowBar=grid.managers.get("ViewManager").hasRowBar(),
				gridWidth=grid.domNode.offsetWidth,
				queryRs=dojo.query(".u-grid-header",grid.header),
				fixeNode;
			//判断是否有rowbar,有则减去rowbar的宽度
			if(hasRowBar){
				var rowBarNode=queryRs[0];
				fixedNode=queryRs[1];
				gridWidth=gridWidth-rowBarNode.offsetWidth;
			}else{
				fixedNode=queryRs[0];
			}
			//减去当前单元格之前的单元格的宽度
			gridWidth=gridWidth-this._getFixedNodeWidth(inDrag.node,fixedNode);
			this.rawWidth>=gridWidth&&(this.rawWidth=gridWidth);
		}
	},
	
	_getFixedNodeWidth:function(cellNode,fixedNode){
		var rs=dojo.query(".u-grid-cell",fixedNode),width=0;
		for(var i=0,l=rs.length;i<l;i++){
			if(rs[i]===cellNode) break;
			width+=(rs[i].offsetWidth+1);
		}
		return width;
	},
	
	endResizeColumn: function(inDrag) {
		this.getResizeHelper().end();
		this.bogusClickTime = new Date().getTime() + 30;
		if (this.rawWidth > this.minColWidth && this.rawWidth != this.oldWidth) {
			var cellIndex = this.getCellNodeIndex(inDrag.node);
			var layout = this.view.grid.managers.get("LayoutManager"); 
			var cell = cellIndex >= 0 ? layout.getCell(cellIndex) : null;
			cell && setTimeout(dojo.hitch(inDrag.view, "updateCellWidth", cell,this.rawWidth), 50);
		}
	}
	
});

dojo.declare("unieap.grid.tableMap", null, {
	// summary:
	//	Maps an html table into a structure parsable for information about cell row and col spanning.
	//	Used by headerBuilder
	constructor: function(inRows) {
		this.mapRows(inRows);
	},
	map: null,
	// map table topography
	mapRows: function(inRows) {
		// # of rows
		var rowCount = inRows.length;
		if(!rowCount) {
			return;
		}
		// map which columns and rows fill which cells
		this.map = [ ];
		for(var j=0; (row=inRows[j]); j++) {
			this.map[j] = [];
		}
		for(var j=0, row; (row=inRows[j]); j++) {
			for(var i=0, x=0, cell, colSpan, rowSpan; (cell=row[i]); i++) {
				while (this.map[j][x]) {x++};
				this.map[j][x] = { c: i, r: j };
				rowSpan = cell.rowSpan || 1;
				colSpan = cell.colSpan || 1;
				for(var y=0; y<rowSpan; y++) {
					for(var s=0; s<colSpan; s++) {
						this.map[j+y][x+s] = this.map[j][x];
					}
				}
				x += colSpan;
			}
		}
	},
	// find node's map coords by it's structure coords
	getMapCoords: function(inRow, inCol) {
		for(var j=0, row; (row=this.map[j]); j++) {
			for(var i=0, cell; (cell=row[i]); i++) {
				if(cell.c==inCol && cell.r == inRow) {
					return { j: j, i: i };
				}
			}
		}
		return { j: -1, i: -1 };
	},
	// find a node in inNode's table with the given structure coords
	getNode: function(inTable, inRow, inCol) {
		var row = inTable && inTable.rows[inRow];
		return row && row.cells[inCol];
	},
	_findOverlappingNodes: function(inTable, inRow, inCol) {
		var nodes = [];
		var m = this.getMapCoords(inRow, inCol);
		var row = this.map[m.j];
		for(var j=0, row; (row=this.map[j]); j++) {
			if(j == m.j || !row[m.i]) { continue; }
			with(row[m.i]) {
				var n = this.getNode(inTable, r, c);
				if(n) { nodes.push(n); }
			}
		}
		return nodes;
	},
	findOverlappingNodes: function(inNode) {
		return this._findOverlappingNodes(unieap.grid.findTable(inNode), unieap.grid.getTrIndex(inNode.parentNode), unieap.grid.getTdIndex(inNode));
	}
});

//resize helper
dojo.declare("unieap.grid.resizeHelper", null, {
	view: null,
	helperNode: null,
	positionX: 5,
	
	constructor: function(inView) {
		this.view = inView;
		this.helperNode = dojo.create("div");
		dojo.addClass(this.helperNode,"u-grid-resize-proxy");
		dojo.style(this.helperNode, "display", "none");
	},
	
	begin: function(inPositionX) {
		this.positionX = inPositionX;
		dojo.place(this.helperNode,this.view.grid.domNode);
		dojo.style(this.helperNode, "display", "block");
		dojo.style(this.helperNode, "left", this.positionX + "px");
	},
	
	resize: function(deltaX) {
		dojo.style(this.helperNode, "left", (this.positionX + deltaX) + "px");
	},
	
	end: function() {
		dojo.style(this.helperNode, "display", "none");
		dojo.style(this.helperNode, "left", "5px");
	}
	
});
