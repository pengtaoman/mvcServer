dojo.provide('unieap.xgrid.core.builder');
unieap.xgrid.rowIndexTag = "gridrowindex";

dojo.declare("unieap.xgrid.view.Builder", null, {
	
	view: null,
	
	_table: '<table class="u-xgrid-table" border="0" cellspacing="0" cellpadding="0" ',
	_rowbartable: '<table class="u-xgrid-rowbar-table" border="0" cellspacing="0" cellpadding="0" ',
	
	constructor: function(inView) {
		this.view = inView;
	},
	
	generateCellMarkup: function(inCell, isHeader) {
		var result = [], html, cellTag;
		if (isHeader) {
			cellTag = "th";
		} else {
			cellTag = "td";
		}
		html = [ "<" + cellTag + " " ];
		//如果不是Header，则认为没有colspan和rowspan
		if(isHeader){
			inCell.colSpan && html.push(" colspan='", inCell.colSpan, "'");
			inCell.rowSpan && html.push(" rowspan='", inCell.rowSpan, "'");
		}
		html.push(" class='");
		isHeader&&html.push("u-xgrid-hcell ");
		if(isHeader){
			html.push(inCell.headerClass);
		}
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
		for(var i=0, row; row=unieap.xgrid.getTr(inRowNode.firstChild, i); i++) {
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
		var layout = e.grid.LayoutManager; 
		e.cell = (e.cellIndex >= 0 ? layout.getCell(e.cellIndex) : null);
	},
	// event dispatch
	findTarget: function(inSource, inTag) {
		var n = inSource;
		while(n && !(n.getAttribute(inTag)) && (n!=this.view.grid.domNode)) {
			n = n.parentNode;
		}
		return (n != this.view.domNode) ? n : null; 
	},
	findRowTarget: function(inSource) {
		var rowNode=this.findTarget(inSource, unieap.xgrid.rowIndexTag);
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
		//if(relatedTarget && relatedTarget.className != 'u-xgrid-text2' && relatedTarget.className != 'u-xgrid-cell'){
		if(relatedTarget){
			this.view.onMouseOut(e);
		}else if(e.cellNode && (e.cellNode==this.lastOverCellNode) && !this.isIntraNodeEvent(e, this.lastOverCellNode)){
			this.lastOverCellNode = null;
			if(!this.isIntraRowEvent(e)) {
				this.view.onMouseOutRow(e);
			}
		}
	}
});



dojo.declare("unieap.xgrid.view.HeaderBuilder", unieap.xgrid.view.Builder, {
	bogusClickTime: 0,       //防止调整列宽mouseup后，让表头排序
	overResizeWidth: 4,      //调整列宽时，在overResizeWidth范围内，鼠标改变
	minColWidth: 50,         //调整列宽，允许调整到的最小的宽度
	oldWidth: -1,            //调整列宽，cell原宽度
	rawWidth: -1,            //调整列宽，cell新的宽度
	isMulTitle: false,       //标记是否是多标题
	
	generateHtml : function() {
		var html = [], rows = this.view.structure.rows,w =this.view.getRealWidth();
		var sortInfo = this.view.grid.getSortInfo();
		var v = this.view,
			cells = v.cells,
			snapshot = v.snapshot,
			showCells = snapshot.showCells || cells.length;
		var temprows = v.contentStructure.rows,
			temprow = temprows?temprows[0]:cells;
		var colgroup = ["<colgroup>"];
		if(v.isRowBar){
			html.push(this._rowbartable);	
			html.push(">");
				
			var rowbar_null = true;
			var colgroup = ["<colgroup>"];
			if(v.isRowBar){	
				html.push(v.genarateColgroup());		
			} 
			colgroup.push("</colgroup>");
			html.push(colgroup.join(""));		
		} else {
			html.push("<div class='xgrid-table-layout'");
			var temp = isNaN(w)?"":"px";
			html.push("style='width:"+w+temp+"'>");
			html.push(this._table);
			html.push("style='width:100%'");
			html.push(">");
			
			for(var j=0;j<temprow.length; j++) {
				var cellIndex = j ,
					cell = temprow[cellIndex];
				if(!cell.hidden){
					colgroup.push("<col style='width:")
					if(dojo.isIE <= 7 && -1 == cell.getWidth().indexOf("%")){
						colgroup.push(cell.width-1);
					}else{
						colgroup.push(cell.getWidth());
					}
					colgroup.push("'>");
				}
			}
			colgroup.push("</colgroup>");
			html.push(colgroup.join(""));	
		}	
		
		html.push("<tbody>");
		if(v.isRowBar){
			html.push(v.generateHeader());
		} else {
			if(dojo.isIE){
				var s = ["<tr style='display:none;'>"];
				for(var i =this.view.rowTable["cols"].length;i>0;i--){
					s.push("<td class=\"u-xgrid-hcell\">&nbsp;</td>");
				}
				s.push("</tr>");
				html.push(s.join(""));
			}
			for(var j=0, row; row=rows[j]; j++) {
				html.push('<tr>');
				for(var i=0, cell,cc, markup; (cell=row[i]); i++) {
					if(!cell.hidden){
						markup = this.generateCellMarkup(cell, true);
						this.isMulTitle = this.isMulTitle || cell.isMulTitle || false;
						markup[5] = (cell.label || '');
						//设置排序列样式，包括主排序列和次排序列
						for(var k=0;k<sortInfo.length;k++){
							if(sortInfo[k] == cell){
								cc = cell.customClasses = [];
								cc.push(k==0?" u-xgrid-sort-primary " : " u-xgrid-sort-secondary");
								markup[1] = cc.join(' ');
								//var result = ["<nobr class='u-xgrid-text'><span"];
								var result = ["<nobr><span"];
								result.push(">");
								result.push(cell.label || '');
								result.push("</span>");
								result.push("<span class='"+(cell.asc >0? "u-xgrid-sort-up":"u-xgrid-sort-down")+"'>&nbsp</span>");
								result.push("</nobr>");
								markup[5] = result.join("");
								break;
							}
						}
						var xgrid_hcell_height = v.grid.getManager("RowManager").defaultHeaderHeight;
						cell.rowSpan && (xgrid_hcell_height = cell.rowSpan * xgrid_hcell_height);
						markup[5]="<div class='u-xgrid-htext'"+" style='height:"+
								(xgrid_hcell_height-1)+"px"+";line-height:"
								+xgrid_hcell_height+"px'"+">"+markup[5];
						if(v.grid.menu){
							markup[5] += "<div class='u-xgrid-menu'"+" style='height:"+
									(xgrid_hcell_height-1)+"px"+";line-height:"
									+xgrid_hcell_height+"px;";
							if(v.grid.menu.alwaysShowMenu){
								markup[5] += "visibility:visible'></div>";
							} else {
								markup[5] += "'></div>";
							}
						}
						markup[5] +="</div>";
						html.push(markup.join(''));
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
	decorateEvent: function(e) {
		this.baseDecorateEvent(e);
		e.rowIndex = -1;
		return (this.overRightResizeArea(e) && e.type == 'click')? false: true;
	},
	
	canResize: function(e) {
		return (!e.cellNode || e.cellNode.colSpan > 1 || e.cell.noresize)? false: (!e.cell.noresize);
	},
	overRightResizeArea: function(e) {
		if (e.cellNode) {
			return e.cellNode && (this.getMousePosition(e, e.cellNode).x >= e.cellNode.offsetWidth - this.overResizeWidth);
		} else {
			return false;
		}
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
	domousemove: function(e) {
		var c;
		if(this.canResize(e)){
			c = this.overRightResizeArea(e) ? 'col-resize'  : 'default';
		}
		
		e.sourceView.headerNode.style.cursor = c || ''; 
	},
	domousedown: function(e) {
		dojo.require("unieap.xgrid.core.drag");
		if(!unieap.xgrid.drag.dragging) {
			if(e.sourceView.headerNode.style.cursor == 'col-resize' && this.overRightResizeArea(e)) {
				this.beginColumnResize(e);
			}else if((this.view.grid.draggable == true) && 
				(e.cell && e.cell.draggable != false) && 
				!this.isMulTitle && 
				!this.overRightResizeArea(e))
			{
				this.beginAdjustColPosition(e);
			}
		}
	},
	domouseup: function(e) {
		this.resizeHelper && this.resizeHelper.end();
		this.adjustHelper && this.adjustHelper.end();
	},
	
	domouseover: function(e) {
		this.view.onMouseOverHeader(e);
	},
	domouseout: function(e) {
		this.view.onMouseOutHeader(e);
	},
	
	dodblclick: function(e){
		if(e.sourceView.headerNode.style.cursor!='col-resize')
			return;
		var width;
		var maxlength = this._calStringWidth(String(e.cell.label))*7+14;
		var rowCount = this.view.grid.getManager("BindingManager").rowData.length;
		for(var i = 0; i< rowCount;i++){
			var value = e.cell.get(i);
			e.cell._format && (value = e.cell._format(value,i));
			value = this._getText(value);
			if(value!=null){
				width = this._calStringWidth(String(value))*7+14;
				if(width > maxlength)
					maxlength = width; 
			}
		}
		if(maxlength < this.minColWidth)
			maxlength = this.minColWidth;
		this.view.updateCellWidth(e.cell,maxlength);
		dojo.style(e.sourceView.headerNode,"cursor",'');
	},
	
	_getText: function(str){
		var result = str.match( /(>[^<]*<)+?/g);
		var resultStr = "";
		if(result){
			for(var i=result.length-1;i>=0;i--){
				resultStr += result[i].substring(1,result[i].length-1);
			}
		}
		else{
			resultStr = str;
		}
		return resultStr;
	},
	
	_calStringWidth: function(str){
	    return str.replace(/[^\x00-\xff]/g,"xx").length;
	},
	
	doclick: function(e) {
		if (new Date().getTime() < this.bogusClickTime) {
			dojo.stopEvent(e);
			return true;
		}
	},
	
	beginAdjustColPosition:function(e){
		dojo.stopEvent(e);
		var menu = this.view.grid.getManager("MenuManager").menu;
		if(menu && menu.isShowingNow){
			menu.isShowingNow = false;
			dijit.popup.close(menu);
		}
		var drag = {
			view: e.sourceView,
			node: e.cellNode,
			index: e.cellIndex,
			w: e.cellNode.clientWidth,
			flag: false,
			clientX: e.clientX,
			innerHTML: e.target.innerHTML
		};
		var obj = {
			"inElement": e.cellNode,
			"inOnDrag": dojo.hitch(this, 'doAdjustColumn', drag),
			"inOnEnd": dojo.hitch(this, 'endAdjustColumn', drag),
			"inOnRelease": dojo.hitch(this, 'domouseup'),
			"inEvent": e,
			"inOnStart": null
		};
		unieap.xgrid.drag.start(obj);
	},
	
	beginColumnResize: function(e) {
		dojo.stopEvent(e);
		var menuManager = this.view.grid.getManager("MenuManager");
		if(menuManager && menuManager.menu.isShowingNow){
			menuManager.menu.isShowingNow = false;
			dijit.popup.close(menuManager.menu);
		}
		var drag = {
			view: e.sourceView,
			node: e.cellNode,
			index: e.cellIndex,
			w: e.cellNode.clientWidth
		};
		this.oldWidth = e.cellNode.offsetWidth;
		this.getResizeHelper().begin(
			e.cellNode.offsetWidth           //改变宽度的单元的原宽度
			+ e.cellNode.offsetLeft          //本单元相对table中的偏移量
			+ this.view.domNode.offsetLeft   //这个view前面视图的宽度
			+ e.cellNode.offsetParent.parentNode.offsetLeft   //本table中前面被覆盖的单元格的宽度
		);
		var obj = {
			"inElement": e.cellNode,
			"inOnDrag": dojo.hitch(this, 'doResizeColumn', drag),
			"inOnEnd": dojo.hitch(this, 'endResizeColumn', drag),
			"inOnRelease": dojo.hitch(this, 'domouseup'),
			"inEvent": e,
			"inOnStart": null
		};
		unieap.xgrid.drag.start(obj);
	},
	
	getResizeHelper: function() {
		return (!this.resizeHelper)?(this.resizeHelper = new unieap.xgrid.resizeHelper(this.view))
			: this.resizeHelper;
	},
	
	getAdjustHelper: function() {
		return(!this.adjustHelper)? (this.adjustHelper = new unieap.xgrid.adjustHelper(this.view))
			: this.adjustHelper;
	},
	//调整列位置准备工作，计算目标位置是否正确
	doAdjustColumn: function(inDrag, inEvent){
		//不可以没有非锁定列，当非锁定列只有一列时，不允许向锁定列中拖拽
		if(!this.view.noscroll && (1 == this.view.cells.length)){
			 return false; 
		}
		//第一次mousemove时，调用begin方法
		if(!inDrag.flag){
			var text;
			if(dojo.isIE){
				text = inDrag.node.innerText;
			} else {
				text = inDrag.node.textContent;
			}
			this.getAdjustHelper().begin(inDrag.clientX, text);
			inDrag.flag = true;
		}
	    var getIdx = dojo.attr(inEvent.target,"idx");
	    var temp = getIdx?getIdx:dojo.attr(inEvent.target.parentNode,"idx");
		this.getAdjustHelper().resize(inEvent.clientX);
		//鼠标移动出xgrid或者移动到另外一个xgrid中时，不可以调整列位置
		var offsetParent = inEvent.target.parentNode.offsetParent;
		while(offsetParent){
			if(dojo.hasClass(offsetParent,"u-xgrid")){
				break;
			}else{
				offsetParent = offsetParent.offsetParent;
			}
		}
		//不是同一个grid，返回false
		if(null == offsetParent || inDrag.view.grid.id != offsetParent.id){
			this.noAdjust();
			return false;
		}
		if(!temp){//如果鼠标移动到header外部，不可以调整列位置
			this.noAdjust();
			return false;
		}
		//鼠标还在同一个header内
		if(inDrag.index == temp){
			this.noAdjust();
			return false;
		}else{
			if(8 == dojo.isIE){
				var offsetX = inEvent.x;
				offsetX++;
				if(offsetX > inEvent.target.offsetWidth) {
					this.noAdjust();
					return false;
				}
			}else{
				var offsetX = this.adjustGetX(inEvent)-1;
			}
	    	//左侧第一个节点,但不是锁定和非锁定的临界,如果是锁定和非锁定列的临界，那么相邻的列也是可以调整位置，否则，鼠标需要过下列的一半后才可以调整
			if((1 == inDrag.index - temp) && (inDrag.index != this.getAdjustHelper().lockingCellNo())){ 
				if(offsetX > inEvent.target.offsetWidth/2){
					this.noAdjust();
					return false;
				}
			}else if((1 == temp - inDrag.index) && (temp != this.getAdjustHelper().lockingCellNo())){  //右侧第一个节点
				if(offsetX < inEvent.target.offsetWidth/2){
					this.noAdjust();
					return false;
				}
			}
			this.yesAdjust(inEvent,offsetX);
		}
	},
	
	endAdjustColumn: function(inDrag){
		//end后，将inDrag设置为false，以便下次第一次mousemove调用helper的begin方法
		inDrag.flag = false;
		this.getAdjustHelper().end();
		if(dojo.hasClass(this.getAdjustHelper().helperNode,"u-xgrid-adjust-yes")){
			var cellIndex = this.getCellNodeIndex(inDrag.node);
			var num = this.view.noscroll?cellIndex:cellIndex-this.getAdjustHelper().lockingColNo;
			var cell = this.view.structure.rows[0][num];
				cell && setTimeout(dojo.hitch(inDrag.view, "updateColumnPosition", cell,this.getAdjustHelper().toCol,this.getAdjustHelper().lockingColNo,this.getAdjustHelper().tuning), 50);
		}
	},
	
	adjustGetX: function(e){
		var e=window.event || e,
			posX=(e.offsetX==undefined) ? this.getOffset(e).offsetX : e.offsetX ;
		return posX;
	},
	
	getOffset: function(e){
		var target = e.target;
		if (target.offsetLeft == undefined){
			target = target.parentNode;
		}
		var pageCoord = this.getPageCoord(target);
		var eventCoord =
			{     
				x: window.pageXOffset + e.clientX,
				y: window.pageYOffset + e.clientY
			};
		var offset =
			{
				offsetX: eventCoord.x - pageCoord.x,
				offsetY: eventCoord.y - pageCoord.y
			};
		return offset;
	},
	
	getPageCoord: function(element){
		var coord = {x: 0, y: 0};
		while (element){
			coord.x += element.offsetLeft;
			coord.y += element.offsetTop;
			element = element.offsetParent;
		}
		return coord;
	},
	
	yesAdjust: function(inEvent,offsetX){
		this.getAdjustHelper().adjust(inEvent,offsetX);
	},
	
	noAdjust: function(){
		this.getAdjustHelper().noadjust();
	},
	
	doResizeColumn: function(inDrag, inEvent) {
		var w = inDrag.w + inEvent.deltaX,view=inDrag.view,grid=view.grid;
		
		var offsetParent = inEvent.target.parentNode.offsetParent;
		while(offsetParent){
			if(dojo.hasClass(offsetParent,"u-xgrid")){
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
			var hasRowBar=grid.getManager("ViewManager").hasRowBar(),
				gridWidth=grid.domNode.offsetWidth,
				queryRs=dojo.query(".u-xgrid-header",grid.header),
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
			var layout = this.view.grid.getManager("LayoutManager"); 
			var cell = cellIndex >= 0 ? layout.getCell(cellIndex) : null;
			cell && setTimeout(dojo.hitch(inDrag.view, "updateCellWidth", cell,this.rawWidth), 50);
		}
	}
});
dojo.declare("unieap.xgrid.view.ContentBuilder", unieap.xgrid.view.Builder, {
	decorateEvent: function(e) {
		e.rowNode = this.findRowTarget(e.target);
		if(!e.rowNode) {return false};
		e.rowIndex = e.rowNode.getAttribute("gridrowindex");
		this.baseDecorateEvent(e);
		return true;
	},
	
	generateHtml: function() {
		var html = [], 
			v = this.view,
			cells = v.cells,
			snapshot = v.snapshot,
			binding = v.grid.getBinding(),
			rowData = v.grid.getBinding().getRowData(),
			showCells = snapshot.showCells || cells.length;
		//如果生成关于多标题，contentStructure存在，tableWidth按照contentStructure获得
		if(!v.isRowBar){
		var temprows = v.contentStructure.rows,
			temprow = temprows[0];
		}
		var tableWidth = v.getRealWidth(snapshot.beginCellIndex,showCells);
		var colgroup = ["<colgroup>"];
		if(v.isRowBar){
			html.push(this._rowbartable);
			html.push("style='");
			html.push(snapshot.lastRow && "bottom:0;" || "");
			html.push(snapshot.lastCell && "right:0;" || "");
			html.push("'>");	
		} else {
			html.push("<div class='xgrid-table-layout'");
			var temp = isNaN(tableWidth)?"":"px";
			html.push("style='width:"+tableWidth+temp+";");
			html.push(snapshot.lastRow && "bottom:0px;" || "");
			html.push(snapshot.lastCell && "right:0;" || "");
			html.push("'>");
			html.push(this._table);
			html.push("style='width:100%;");
			html.push(snapshot.lastRow && "bottom:0px;" || "");
			html.push("'>");
		}
		//构造colgroup
		var width;
		if(v.isRowBar){
			html.push(v.genarateColgroup());	
		}else{
			// 用这个构造colgroup可以避免多级标题后面继续有跨行的标题宽度设置不正确
			//html.push(this.view.rowTable["colgroup"]);
			var unShowNum = 0;	
			for(var j=0;j<showCells; j++) {
				var cellIndex = snapshot.beginCellIndex + j + unShowNum ,
					cell = temprow[cellIndex];
					//cell = cells[cellIndex];
				if(cell){
					if(!cell.hidden){
						colgroup.push("<col style='width:")
						colgroup.push(cell.getWidth());
						colgroup.push("'>");
					} else {
						unShowNum++;
						j--;
					}
				}
			}
			colgroup.push("</colgroup>");
			html.push(colgroup.join(""));	
		}
		html.push("<tbody>");
		for(var j=0;j<snapshot.showRows; j++) {
			if(v.isRowBar){
				html.push(v.generateContent(snapshot.beginRowIndex+j));
			} else {
				var rows = v.contentStructure.rows,
				row = rows[0];
				var unShowNum = 0;
				var rowIndex = snapshot.beginRowIndex + j;
				html.push('<tr class="'+(j%2?"u-xgrid-odd":"")+'" gridrowindex="'+(snapshot.beginRowIndex+j)+'">');
				for(var i=0, cell, m, cc; i<showCells; i++) {
				//for(var i=0, cell, m, cc; i<cells.length; i++) {
					var cellIndex = i+snapshot.beginCellIndex+unShowNum;
					//cell = cells[cellIndex];
					cell = row[cellIndex];
					if(cell){
						if(!cell.hidden){
							m = this.generateCellMarkup(cell, false), cc = cell.customClasses = [];
							var value = cell.format(rowIndex);
							if(cell.changeStyle){
								m = cell._changeStyle(rowData,rowIndex,m,cell.mulTitleIndex);
							}
							nodeHeight = v.grid.getManager("RowManager").defaultRowHeight;
							m[5]="<div class='u-xgrid-cell'"+" style='height:"+(nodeHeight-1)+"px"
									+";line-height:"+nodeHeight+"px'"+">"+value+"</div>";
							html.push(m.join(''));
						} else {
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
	
	getRowEdit: function(index) {
		var view = this.view;
		if(!view.grid.rowEdit){
			dojo.require("unieap.xgrid.core.RowEdit");
			if(index){
				view.grid.rowEdit = new unieap.xgrid.RowEdit({view:view,setEditting:true});
				view.grid.getRowEditManager().setEdit(index);
			}else{
				view.grid.rowEdit = new unieap.xgrid.RowEdit({view:view});
			}
			if(view.grid.rowEdit.unableEdit){
				view.grid.rowEdit = null;
			}
		} 
		return view.grid.rowEdit;
	},
	
	doclick: function(e){
		var index = this.view.grid.getRowManager().getCurrentRowIndex();
		var rowEditManager = this.view.grid.getRowEditManager();
		var rowEdit = this.view.grid.rowEdit
		if(rowEdit && rowEdit.editing && !dojo.hasClass(e.target,"u-xgrid-viewContent") &&
			rowEditManager.onBeforeEdit && 
			rowEditManager.onBeforeEdit(index)){
			rowEdit.initEdit(1);
		}
	},
	
	dodblclick: function(e){
		var rowEditManager = this.view.grid.getRowEditManager();
		if(rowEditManager && this.view.grid.getManager("ViewManager").autoRender){
			this.getRowEdit();
		}
	}
});

dojo.declare("unieap.xgrid.resizeHelper", null, {
	view: null,
	helperNode: null,
	positionX: 5,
	
	constructor: function(inView) {
		this.view = inView;
		this.helperNode = dojo.create("div");
		dojo.addClass(this.helperNode,"u-xgrid-resize-proxy");
		dojo.style(this.helperNode, "display", "none");
	},
	
	begin: function(inPositionX) {
		this.positionX = inPositionX;
		dojo.place(this.helperNode,this.view.grid.domNode);
		dojo.style(this.helperNode, "display", "block");
		dojo.style(this.helperNode, "left", this.positionX + "px");
		var height = this.view.headerNode.offsetHeight + this.view.contentNode.offsetHeight;
		var data = this.view.grid.getBinding().getLockedRowData();
		height += this.view.rowHeight*data.length;
		dojo.style(this.helperNode, "height", height+"px");
	},
	
	resize: function(deltaX) {
		dojo.style(this.helperNode, "left", (this.positionX + deltaX) + "px");
	},
	
	end: function() {
		dojo.style(this.helperNode, "display", "none");
	}
	
});

dojo.declare("unieap.xgrid.adjustHelper", null, {
	view: null,
	helperNode: null,
	positionX: 15,
	toCol: 0,
	tuning: 0,
	
	constructor: function(inView) {
		this.view = inView;
		this.lockingColNo = 0;
		this.tuning = 0;
		this.helperNode = dojo.create("div");
		dojo.addClass(this.helperNode,"u-xgrid-adjust-proxy");
		dojo.style(this.helperNode, "display", "none");
		dojo.style(this.helperNode, "overflow", "hidden");
		//创建定位图标
		this.moveTopNode = dojo.create("div");
		this.moveBottomNode = dojo.create("div");
		dojo.addClass(this.moveTopNode,"move-top");
		dojo.addClass(this.moveBottomNode,"move-bottom");
	},
	
	begin: function(inPositionX,textHtml) {
		this.positionX = inPositionX+10;
		this.helperNode.innerHTML = textHtml;
		dojo.place(this.helperNode,this.view.grid.domNode);
		dojo.style(this.helperNode, "display", "block");
		dojo.style(this.helperNode, "left", this.positionX + "px");
		//添加定位图标
		dojo.place(this.moveTopNode,this.view.grid.domNode);
		dojo.place(this.moveBottomNode,this.view.grid.domNode);
		var nodeHeight = this.view.grid.getManager("RowManager").defaultHeaderHeight;
		dojo.style(this.moveBottomNode, "top", nodeHeight + "px");
	},
	
	resize: function(reClientX) {
		var temp = reClientX+10;
		var gridOffset = dojo.position(this.view.grid.domNode).x;
		temp -= gridOffset;
		dojo.style(this.helperNode, "left", temp + "px");
	},
	
	//计算锁定列列数
	lockingCellNo: function(){
		var viewManager = this.view.grid.getManager("ViewManager");
		for(i = 0 ; i<viewManager.views.length; ++i){
			if(viewManager.views[i].noscroll && !viewManager.views[i].isRowBar){
				this.lockingColNo = viewManager.views[i].cells.length;
			}
		}
		return this.lockingColNo;
	},

	adjust: function(inEvent,offsetX){
		var deltaX = inEvent.deltaX,
			target = inEvent.target;
		!dojo.hasClass(this.helperNode,"u-xgrid-adjust-yes") && dojo.addClass(this.helperNode,"u-xgrid-adjust-yes");
		dojo.style(this.moveTopNode, "display", "none");
		dojo.style(this.moveBottomNode, "display", "none");
		var left = Math.floor(dojo.position(target).x),
			getIdx = target.getAttribute("idx");
		this.toCol = getIdx?getIdx:target.parentNode.getAttribute("idx");
		this.lockingCellNo();
		this.tuning = 0;
		//根据鼠标前移还是后移计算目标位置
		if(deltaX > 0){
			if(offsetX >= target.offsetWidth/2){
				left += target.offsetWidth;
			}else{
				if(this.lockingColNo>0 && this.toCol == this.lockingColNo){
					this.tuning = 1;
				}
				this.toCol--;
			}
		}else{
			if(offsetX > target.offsetWidth/2){
				if(this.lockingColNo>0 && (this.toCol == this.lockingColNo-1)){
					this.tuning = -1;
				}
				left += target.offsetWidth;
				this.toCol++;
			}
		}
		//减掉grid的偏移量，例如padding
		var gridOffset = dojo.position(this.view.grid.domNode).x;
		left -= gridOffset;
		dojo.style(this.moveTopNode, {
			"left": left+"px",
			"display": "block"
		});
		dojo.style(this.moveBottomNode, {
			"left": left+"px",
			"display": "block"
		});
	},
	
	noadjust: function(){
		dojo.removeClass(this.helperNode,"u-xgrid-adjust-yes");
		dojo.style(this.moveTopNode, "display", "none");
		dojo.style(this.moveBottomNode, "display", "none");
	},
	
	end: function() {
		dojo.style(this.helperNode, "display", "none");
		dojo.style(this.moveTopNode, "display", "none");
		dojo.style(this.moveBottomNode, "display", "none");
	}
	
});