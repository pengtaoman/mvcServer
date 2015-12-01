dojo.provide('unieap.grid.view.view');
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.declare('unieap.grid.View', [dijit._Widget, dijit._Templated], {
	
	rowClassTag: 'u-grid-row',
	headerNode: null,
	headerBuilder: null,
	contentBuilder: null,
	lastTop: null,
	viewWidth: "",    
	
	templateString: '<td class="u-grid-view-cell" valign="top">' +
						'<div class="u-grid-header-scrollbox" dojoAttachPoint="headerScrollNode">' +
							'<div dojoAttachPoint="headerContentNode" class="u-grid-header-content"></div>' +							
						'</div>' +
						'<div dojoAttachPoint="contentboxNode" class="u-grid-contentbox">'+
							'<div class="u-grid-scrollbox" dojoAttachPoint="scrollboxNode">' +
								'<div class="u-grid-content" dojoAttachPoint="contentNode"></div>' +
							'</div>' +
						'</div>'+
					'</td>',
					
	postCreate: function() { 

		this.rowNodes = [];
		this.headerBuilder = new unieap.grid.view.HeaderBuilder(this);
		this.contentBuilder = new unieap.grid.view.ContentBuilder(this);
		
		unieap.grid.funnelEvents(this.contentNode, this, "doContentEvent",[ 'mouseover', 'mouseout', 'mousedown', 'click', 'dblclick', 'contextmenu' , 'mouseup']);
		unieap.grid.funnelEvents(this.headerContentNode, this, "doHeaderEvent", [ 'mouseover', 'mouseout', 'mousemove', 'mousedown', 'click', 'dblclick', 'contextmenu']);
	},
	destroy: function() {
		dojo.destroy(this.domNode);
		dojo.destroy(this.headerNode);
		this.inherited(arguments);
	},
	resizeContentWidth: function() {
		var width = 0;
		for(var c = this.rowTable["cols"],i=c.length-1;i>=0;i--) {
			if(!c[i].resized && c[i].isPercent()) {
				dojo.style(this.contentNode,"width","auto");				
				return ;
			}
			width+=c[i].getPixelWidth();
		}
		dojo.style(this.contentNode,"width",width+"px");
		if(!this.noscroll){
			dojo.style(this.headerContentNode.firstChild.firstChild,"width",width+"px");
		}
	},
	
	setStructure: function(inStructure) {
		this.structure = inStructure;
		this.noscroll = inStructure.noscroll;
		if (this.noscroll) {
			dojo.style(this.scrollboxNode,"overflow", "hidden");			
		}else{
			this.connect(this.scrollboxNode, "onscroll", "doscroll");
		}
		this.updateStructure();
	},
	
	updateStructure: function() {
		this.updateLayout();
		this.headerBuilder.update();
		this.contentBuilder.update();
	},
	
	getHeaderNode: function() {
		if (!this.headerNode) {
			var header = document.createElement('td');
			dojo.addClass(header, 'u-grid-header');
			header.appendChild(this.headerScrollNode);
			this.headerNode = header;
		}
		return this.headerNode;
	},
	
	getRowNode: function(inRowIndex) {
		return this.rowNodes[inRowIndex];
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
	
	getScrollbarWidth: function() {
		return (this.noscroll ? 0 : unieap.grid.getScrollbarWidth());
	},
	updateLayout: function() {
		this._prepareTable();
		this._generateTableColGroup();
		this._buildContentStructure();
		if (this.noscroll) {
			var vw = 0;
			for (var i=0, l=this.rowTable["cols"].length; i<l; i++) {
				var cell = this.rowTable["cols"][i] ;
				vw += cell.isPercent() ? 200 : cell.getPixelWidth();
			}
			dojo.style(this.domNode, 'width', vw+"px");
			dojo.style(this.headerNode, 'width', vw+"px");
		}
	},
	_prepareTable: function() {
		this.rowTable = {content : ""};
		var rows = this.structure.rows,wa=[],layout=[];
//		if (rows.length < 2) return;
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
		var layout = this.grid.managers.get("LayoutManager");
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
	_buildContentStructure: function() {
		var _t = this.rowTable["layout"];
		this.contentStructure = {};
		var layout = this.grid.managers.get("LayoutManager");
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
	hasCell: function(inCell) {
		var rows = this.structure.rows;
		for (var row=0; row<rows.length; row++) {
			for (var c=0; c<rows[row].length; c++) {
				if (inCell == rows[row][c])
					return true;
			}
		}
		return false;
	},
	prerender: function(inRowHeight, inHeaderHeight) {
		this.rowHeight = inRowHeight;
		this.headerHeight = inHeaderHeight;
		this.renderHeader();
	},
	renderHeader: function() {
		this.headerContentNode.innerHTML = this.headerBuilder.generateHtml();
		this.resizeContentWidth();
		unieap.grid.notify(this, "onHeaderRender",[this.headerContentNode,this]);
	},
	
	renderRow: function(inRowNode, inRowIndex) {
		if (inRowNode) {
			this.grid.managers.get("RowManager").onRowRemoved(inRowNode, inRowIndex);
			inRowNode.innerHTML = this.contentBuilder.generateHtml(inRowIndex);
		}
		unieap.grid.notify(this, "onRowRender", [inRowNode, inRowIndex,this]);
	},
	
	//销毁锁定行
	destroyLockedRow:function(){
		if(this.lockedNode){
			dojo.empty(this.lockedNode)
		}
	},
	//渲染锁定行
	renderLockedRow:function(data){
		if(!data || data.length==0){
			return;
		}
		if(!this.lockedNode){
			var _tem =	"<div class='u-grid-locked'>"+
							"<div class='u-grid-locked-content'>"+
								"<div class='u-grid-inner'>"+
									"<div class='u-grid-locked-content-rows'>"+
									"</div>"+
								"</div>"+
							"</div>"+
						"</div>"
			var node=dojo._toDom(_tem);
			this.lockedContentNode = node;
			this.lockedNode=node.childNodes[0].childNodes[0].childNodes[0];
//			dojo.query(".u-grid-locked-content-rows",node)[0];
			this.lockedScrollNode=this.lockedNode.parentNode;
//			if(!this.noscroll){
//				//解决挡住滚动条 使下拉失效的bug U_EAP00005982
//				dojo.style(node.childNodes[0],'marginRight','17px');
//			}
			this.generateLockedRow(this.lockedNode,data)
			dojo.place(node,this.scrollboxNode,'after');
		}else{
			this.generateLockedRow(this.lockedNode,data)
		}
	},
	generateLockedRow:function(lockedNode,data){
		var inner="";

		dojo.forEach(data,function(d,index){
			inner+="<div class='u-grid-row";
			inner+=(index==0)?' u-grid-toplockedrow':'';
			inner+=(Boolean(index&1)?'':' u-grid-row-odd');
			inner+="'>"
			inner+=this.contentBuilder.generateHtml(index,d,true);
			inner+="</div>";
		},this)
		lockedNode.innerHTML=inner;
		this.resizeLocked(data);
	},
	resizeLocked:function(data){
		dojo.style(this.lockedScrollNode,'height',(data.length*this.rowHeight) + "px");
		var width =0;
		if(!this.noscroll){
			for(var c = this.rowTable["cols"],i=c.length-1;i>=0;i--) {
				if(c[i].isPercent()) {
					dojo.style(this.lockedNode,'width','100%');
					return ;
				}
			}
		}
		dojo.style(this.lockedNode,'width',dojo.style(this.contentNode,'width')+'px');
	},
	setScrollTop: function(inTop) {
		if(this.lastTop==null){
			this.lastTop = inTop;
			return;
		}
		this.lastTop = inTop;
		this.scrollboxNode.scrollTop = inTop;
		var left = this.scrollboxNode.scrollLeft;
		this.headerContentNode.firstChild.scrollLeft = left
		this.lockedScrollNode&&(this.lockedScrollNode.scrollLeft = left);
	},
	doscroll: function(inEvent) {
		//如果有过滤菜单并且菜单处于显示状态,滚动滚动条时应该关闭菜单.
		var menuManager=this.grid.managers.managers['MenuManager'],
			scrollLeft=this.scrollboxNode.scrollLeft
		if(menuManager){
			var menu=menuManager.getMenu();		 
	 		menu.isShowingNow&&dijit.popup.close(menu);	   
		}
		//滚动表格内容,标题也应该跟着滚动
		this.headerContentNode.firstChild.scrollLeft =scrollLeft ;
		var top = this.scrollboxNode.scrollTop;
		if (top != this.lastTop) {
			unieap.grid.notify(this, "scrollTo", [top]);
		}
		if(this.lockedScrollNode){
			this.lockedScrollNode.scrollLeft=scrollLeft
		}


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
	// event dispatch(from Grid)
	dispatchContentEvent: function(e) {
		return this.contentBuilder.dispatchEvent(e);
	},
	dispatchHeaderEvent: function(e) {
		return this.headerBuilder.dispatchEvent(e);
	},
	onMouseOver: function(e) {
		unieap.grid.notify(this, "onMouseOver", [e]);
	},
	onMouseOut: function(e) {
		unieap.grid.notify(this, "onMouseOut", [e]);
	},
	
	//鼠标移过表头
	onMouseOverHeader: function(e) {
		unieap.grid.notify(this, "onHeaderMouseOver", [e]);
	},
	
	
	//鼠标移出表头
	onMouseOutHeader: function(e) {
		unieap.grid.notify(this, "onHeaderMouseOut", [e]);
	},
	
	onMouseOverRow: function(e) {
		unieap.grid.notify(this, "onMouseOverRow", [e]);
	},
	onMouseOutRow: function(e) {
		unieap.grid.notify(this, "onMouseOutRow", [e]);
	},
	//改变列宽方法
	updateCellWidth: function(inCell, inWidth) {
		inCell.setWidth(inWidth);		
		var colCells = this.rowTable["cols"],
			layout = this.grid.managers.get("LayoutManager"),
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
		if (this.noscroll) {
			dojo.style(this.domNode,"width",w+"px");
			dojo.style(this.headerNode,"width",w+this.getScrollbarWidth()+"px");
			dojo.style(this.contentNode,"width",w+"px");
			dojo.style(this.headerContentNode,"width",w+this.getScrollbarWidth()+"px");
			dojo.style(this.headerContentNode.firstChild, "width", w+"px");
			this.lockedNode&&dojo.style(this.lockedNode,"width",w+"px");
		} else {
			if (!isPercent) {
				dojo.style(this.contentNode,"width",w+"px");
				dojo.style(this.headerContentNode.firstChild.firstChild, "width", w+"px");
				this.lockedNode&&dojo.style(this.lockedNode,"width",w+"px");
			}
		}
//		this.renderHeader();
//		console.log("inWidth: " + inWidth);
		this._resizeWidth(this.headerContentNode, index, inCell.getWidth());
		this._resizeWidth(this.contentNode, index, inCell.getWidth());
		this.lockedNode&&this._resizeWidth(this.lockedNode,index,inCell.getWidth());
		
		//safari/chrome直接改变table的colgroup时，结构更新不及时
		//手动将结点隐藏再显示
		if (dojo.isSafari || dojo.isChrome) {
			dojo.style(this.headerContentNode, "display", "none");
			dojo.style(this.contentNode, "display", "none");
			unieap.grid.jobs.job("u-grid-cellresize", 0, dojo.hitch(this, function() {
				dojo.style(this.headerContentNode, "display", "block");
				dojo.style(this.contentNode, "display", "block");
			}));
		}
		//调整滚动条
		var viewManager = this.grid.managers.get("ViewManager");
		viewManager.adjustScrollBar();
	},
	
	_resizeWidth : function(node,index,width) {
		var colgroups; 
		if(node){
			if(node==this.contentNode){
				colgroups=dojo.query('> div > div > .u-grid-row-table > colgroup',node);
			}else{
				//header lockedNode
				colgroups=dojo.query('> div > .u-grid-row-table > colgroup',node);
			}
		}
		for(var colgroup, i= 0;colgroup = colgroups[i]; i++) {
			dojo.style(colgroup.childNodes[index],"width",width);
		}
	},
	//调整滚动条的位置
	adjustScrollBar : function(port,b){
		var height = this.domNode.clientHeight;
		//如果是隐藏的
		if(!height) return;
		if(this.noscroll){
			dojo.style(this.scrollboxNode, "height", (height - port.h) + "px");
		}
		else{
			var viewManager = this.grid.managers.get("ViewManager");
			viewManager.scroller.windowHeight = height - port.h;
			dojo.style(this.headerContentNode,"marginRight",port.v + "px");
			this.lockedContentNode && dojo.style(this.lockedContentNode.childNodes[0],'marginRight',port.v + "px");
		}
		if(this.lockedContentNode){
			dojo.style(this.lockedContentNode,"bottom",port.h + "px");
			//IE6存在bug
			dojo.style(this.lockedContentNode,"display","none");
			dojo.style(this.lockedContentNode,"display","block");
		}
	},
	//获取scroll view的滚动条状态
	getScrollBarPort : function(){
		var n = this.scrollboxNode;
		return {
			v : n.clientWidth < n.offsetWidth ? 17 : 0,
			h : n.clientHeight < n.offsetHeight ? 17 : 0
		};	
	}
});
