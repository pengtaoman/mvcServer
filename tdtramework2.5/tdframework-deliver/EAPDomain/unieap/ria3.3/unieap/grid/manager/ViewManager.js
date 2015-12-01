dojo.provide('unieap.grid.manager.ViewManager');
dojo.require('unieap.grid.view.view');
dojo.require("unieap.grid.view.scroller");

dojo.declare("unieap.grid.manager.ViewManager", null, {
	/**
	 * @declaredClass:
	 * 		unieap.grid.manager.ViewManager
	 * @summary:
	 * 		Grid视图管理
	 * @description:
	 * 		Grid控件的视图管理模块，用来对Grid的表头样式，滚动条，单元格及行列样式等Grid的外观视图进行管理。
	 */
	 
	ui: {
		autoRender: true,
		rowBar: true,
		rowNumber: true,
		orderType: true,
		hasRowBar: true,
		setAutoRender: true,
		setHeaderName: true,
		getHeaderName:true,
		setRowStyles: true,
		setCellStyles: true,
		getItemText: true,
		refresh: true,
		refreshRow: true,
		scrollToRow: true,
		getCellNode: true,
		refreshCell: true,
		refreshPage:true,
		
		events: {
			onBeforeRender: true,
			onAfterRender: true,
			
			onCellMouseOver: true,
			onCellMouseOut: true,
			onCellMousedown: true,
			onCellMouseup: true,
			onCellClick: true,
			onCellDblClick: true,
			
			onRowMouseOver: true,
			onRowMouseOut: true,
			onRowMousedown: true,
			onRowMouseup:true,
			onRowClick: true,
			onRowDblClick: true,
			
			onHeaderMouseOver: true,
			onHeaderMouseOut: true,
			onHeaderCellMouseOver: true,
			onHeaderCellMouseOut: true,
			onHeaderCellClick: true,
			onHeaderClick: true,
			onHeaderRender :true,
			onHeaderCellMousedown: true,
			onHeaderMousedown: true
		}
	},
    
    /**
     * @type:
     * 		{boolean}
     * @summary:
     * 		是否在初始化时渲染
     * @example:
     * |<div dojoType="unieap.grid.Grid" binding="{store:'empDataStore'}" views="{autoRender:true}">
     * |	...
     * |</div>
     */
    autoRender: true,
    
    /**
     * @type:
     * 		{boolean}
     * @summary:
     * 		是否显示rowBar
     * @example:
     * |<div dojoType="unieap.grid.Grid" binding="{store:'empDataStore'}" views="{rowBar:true}">
     * |	...
     * |</div>
     * @img:
     * 		images/grid/views/rowbar.png
     */
    rowBar: false,
    
    /**
     * @type:
     * 		{boolean}
     * @summary:
     * 		是否显示行号
     * @example:
     * |<div dojoType="unieap.grid.Grid" binding="{store:'empDataStore'}" views="{rowNumber:true}">
     * |	...
     * |</div>
     * @img:
     * 		images/grid/rownumber.png
     */
    rowNumber: false,
    
    /**
     * @type:
     * 		{boolean}
     * @summary:
     * 		是否显示修改标记
     * @example:
     * |<div dojoType="unieap.grid.Grid" views="{markDirty:false}">
     * |	...
     * |</div>
     * @img:
     * 		images/grid/markdirty.png
     */
    markDirty: true,
    
    /**
     * @type:
     * 		{string}
     * @summary:
     * 		设置点击Grid表头的排序方式
     * @enum:
     * 		{client|server|none}
     * @example:
     * |<div dojoType="unieap.grid.Grid" binding="{store:'empDataStore'}" views="{orderType:'none'}">
     * |	...
     * |</div>
     * |上述代码表明点击Grid表头时不排序
     */
    orderType: 'client',
	
	/**
	 * @summary:
	 * 		设置当鼠标移动单元格上时，是否以tooltip的形式来显示单元格内容
	 * @description:
	 * 		只有当拖动表头使得单元的内容显示不全时tooltip才展现出来
	 * @type:
	 * 		{boolean}
	 * @default:
	 * 		false
	 * @example:
	 * |<div dojoType="unieap.grid.Grid" id="grid" views="{enableTooltip:true}">
	 * |	<header>
	 * |		<cell name="attr_empno" label="编号"></cell>
	 * |		<cell name="attr_ename" label="姓名"></cell>
	 * |	</header>
	 * |</div>
	 */
	enableTooltip:false,
	
    
    views: [],
    
    // fastScroll: boolean
    //	flag modifies vertical scrolling behavior. Defaults to true but set to false for slower 
    //	scroll performance but more immediate scrolling feedback
    fastScroll: true,
    delayScroll: false,
    
    scrollRedrawThreshold: (dojo.isIE ? 100 : 50),
    
    constructor: function(param) {
        dojo.mixin(this, param);
        this.createScroller();
    },
    
    structureChanged: function() {
		this.destroyViews();
		this.heightRelation = [];
		this.prerenderList = [];
		this.postrenderList = [];
		this.preaddViewList = [];
		this.buildViews();
        this.render();
    },
    
    createScroller: function() {
        var rows = this.grid.managers.get("RowManager");
        this.scroller = new unieap.grid.view.scroller.columns();
        this.scroller.renderRow = dojo.hitch(rows, "renderRow");
        this.scroller.removeRow = dojo.hitch(rows, "rowRemoved");
    },
    
    destroyViews: function() {
  		this.scroller.invalidateNodes();
  		for (var i = 0, v; v = this.views[i]; i++) 
            v.destroy();
        this.views = [];
    },
    
    getContentNodes: function() {
        var nodes = [];
        for (var i = 0, v; v = this.views[i]; i++) {
            nodes.push(v.contentNode);
        }
        return nodes;
    },
    
    createView: function(inClass) {
        var c = eval(inClass);
        var view = new c({
            grid: this.grid
        });
        if (this.preaddViewList.length > 0) {
        	for (var i=0, p; p=this.preaddViewList[i]; i++) {
    			p.apply(this, [view]);
    		}
        }
        this.addView(view);
        unieap.grid.addObserver(view, this);
        return view;
    },
    
    addView: function(inView) {
        inView.idx = this.views.length;
        this.views.push(inView);
        this.grid.viewsNode.appendChild(inView.domNode);
        this.grid.headerNode.appendChild(inView.getHeaderNode());
    },
    
    buildViews: function() {
        var nodes = [], layout = this.grid.managers.get("LayoutManager");
        for (var i = 0, vs; (vs = layout.structure[i]); i++) {
            var v = this.createView(vs.type || "unieap.grid.View");
            v.isRowBar && (v.rowNumber = this.rowNumber);
            v.setStructure(vs);
            nodes.push(v.contentNode);
        }
        this.scroller.setContentNodes(nodes);
    },
    
    onEach: function(inMethod, inArgs) {
        inArgs = inArgs || [];
        for (var i = 0, v; v = this.views[i]; i++) {
            if (inMethod in v) {
                v[inMethod].apply(v, inArgs);
            }
        }
    },
    
    forEach: function(inCallback) {
        for (var i = 0, v; v = this.views[i]; i++) {
            inCallback(v, i);
        }
    },
    
    resize: function() {
        this.resizeHeight();
        this.finishScrollJob();
    },
    
	resizeHeight: function(gridHeight) {
		var rows = this.grid.managers.get("RowManager"), grid = this.grid;
		var rowCount = 1, headerRowCount = 1;
		this.forEach(dojo.hitch(function(inView, i) {
			if (inView.isRowBar) 
				return;
			rowCount = Math.max(inView.contentStructure.rows.length, rowCount);
			headerRowCount = Math.max(inView.structure.rows.length, headerRowCount);
		}));
		var headerHeight = rows.defaultHeaderHeight * headerRowCount, contentHeight = rows.defaultRowHeight * rowCount, h = typeof(gridHeight) == "number" ? gridHeight : (grid.domNode.clientHeight - 3);
		var footHeight = 0;
		if (this.grid.footNode) {
			footHeight = this.grid.getFoot().getHeight();;
		}
		var toolHeight = 0;
		if (this.grid.toolBar) {
			/* U_EAP00021367 Grid Toolbar丢失底边线*/
			toolHeight = this.grid.getToolBar().getHeight() + 1;
		}
		var windowHeight = this._reviseWindowHeight(h - (headerHeight + footHeight + toolHeight));
		
		this.forEach(function(inView, i) {
			inView.prerender(contentHeight, headerHeight);
//			var height = h - (headerHeight + footHeight + toolHeight);
			var height = windowHeight
			if (height < 18) 
				height = 18;
			
			if(isNaN(height)){
				dojo.style(inView.domNode, "height", "auto");
			}else{
				dojo.style(inView.domNode, "height", height + "px");
			}
			if (dojo.isWebKit && inView.contentboxNode) {
				//在safari和chrome浏览器中,在出现滚动条的情况下,定义td的高度无效	
				dojo.style(inView.contentboxNode, "height", height + "px");
			}
//			if (inView.noscroll) {
//				dojo.style(inView.scrollboxNode, "height", (height - 17) + "px");
//			}
		});
		
		// 当grid出现横向滚动条时，高度需要修正，否则scrollToRow方法不正确
		var off = 0;
		this.forEach(dojo.hitch(function(inView, i) {
			var box = inView.scrollboxNode;
			if (box.clientHeight<box.offsetHeight) {
				off = (box.offsetHeight-box.clientHeight);
			}
		}));
		this.scroller.windowHeight = windowHeight-off > 0 ? windowHeight-off : 1;
		
		//调整滚动条
		this.adjustScrollBar();
		return contentHeight;
    },
    
    _reviseWindowHeight: function(h) {
    	var height = h;
    	if (this.heightRelation.length>0) {
	    	for (var i=0,r; r=this.heightRelation[i]; i++) {
	    		height = r.reviseWindowHeight(height);
	    	}
    	}
    	return height;
    },
    
    prerender: function() {
    	this.onBeforeRender();
    	if (this.prerenderList.length>0) {
    		for (var i=0, p; p=this.prerenderList[i]; i++) {
    			p.apply(this);
    		}
    	}
    },
    
    _prerender: function() {
    	this.prerender();
        var rows = this.grid.managers.get("RowManager"), h = String(this.grid.height);
        h = (h.indexOf("%") < 0 ? parseInt(h, 10) : (this.grid.domNode.clientHeight || 200)) - 3; //上下边框占位3象素
        this.scroller.init(0, rows.keepRows, rows.rowsPerPage, this.resizeHeight(h));
    },
    
    _postrender: function() {
    	//a ie6 bug patch
        if (dojo.isIE == 6) {
            for (var i = 0, v = this.views, l = v.length; i < l; i++) {
                if (v[i].noscroll) {
                    dojo.style(v[i].scrollboxNode, "position", "relative");
                }
            }
        }
        this.postrender();
    },
    
    postrender: function() {
    	this.onAfterRender();
    	if (this.postrenderList.length>0) {
    		for (var i=0, p; p=this.postrenderList[i]; i++) {
    			p.apply(this);
    		}
    	}
    },
    
    render: function(scrollTop) {
		//如果控件还没有渲染完毕，不执行
//		if(this.waitRender) return;
        if (!this.grid.domNode) {
            return;
        }
        //初始化scroller，渲染表格体
        this._prerender();
        if (!this.autoRender) {
        	return;
        }
        //渲染表格内容
        this.scroller.init(this.grid.managers.get("RowManager").getRowCount());
        var layout = this.grid.managers.get("LayoutManager"),
        	storeList = [];
        for (var i=0, c; c=layout.cells[i]; i++) {
        	if (c.decoder&&c.decoder.store) {
				//首先从dataCenter中取数据,取不到再从缓存中读取
        		unieap.getDataStore(c.decoder.store,dataCenter,true) || (
        			storeList.push(c.decoder.store)
        		);
        	}
        }
        if (storeList.length==0) {
        	this.setScrollTop(scrollTop||0);
        } else {
//			this.waitRender=true;
        	unieap.Action.getMultiCodeList(storeList,
        		dojo.hitch(this,function() {
//					this.waitRender=false;
        			this.setScrollTop(scrollTop||0);
        		}));
        }
        //渲染锁定行
        this.renderLockedRow();
        this._postrender();
    },
    _mouseOnView: function(e, view) {
    
    },
    _clickOnView: function(e, view) {
    
    },
    doscroll: function(increase) {
        var top = this.scrollTop + increase;
        this.setScrollTop(top);
    },
	
    scrollTo: function(inTop) {
        if (!this.fastScroll) {
            this.setScrollTop(inTop);
            return;
        }
        var delta = Math.abs(this.lastScrollTop - inTop);
        this.lastScrollTop = inTop;
        this.scrollTop = inTop;
        if (delta > this.scrollRedrawThreshold || this.delayScroll) {
            this.delayScroll = true;
            unieap.grid.jobs.job('unieap-scroll', 50, dojo.hitch(this, "finishScrollJob"));
        }
        else {
            this.finishScrollJob();
        }
    },
	
	
    finishScrollJob: function() {
        this.delayScroll = false;
        //setTimeout(dojo.hitch(this,function(){
        	this.setScrollTop(this.scrollTop);
       // }),0);
    },
	
	
    setScrollTop: function(inTop) {
        var outTop = this.scroller.scroll(inTop);
    	this.scrollTop = outTop;
        for (var i = 0, v; v = this.views[i]; i++) {
            v.setScrollTop(outTop);
        }
    },
	

    getCurrentRows: function() {
        if (this.views[0]) {
            return this.views[0].getCurrentRows();
        }
        else {
            return [];
        }
    },
	
	//根据cell对象来获得该cell所在的view
    getViewByCell: function(inCell) {
        for (var i = 0, v; v = this.views[i]; i++) {
            if (v.hasCell(inCell)) 
                return v;
        }
        return null;
    },
    
    //渲染锁定行
    renderLockedRow: function(destroy) {
		if(destroy){
			var _h=[];
	        this.forEach(function(view) {
				if(view.lockedNode){
					_h.push(dojo.query('.u-grid-row',view.lockedNode).length);
				}
	            view.destroyLockedRow();
	        });
			if(_h.length>0){
				_h=Math.max.apply(this,_h)*this.scroller.defaultRowHeight;
			}else{
				_h=0;
			}
			this.scroller.updateContentHeight(-_h);
		}
		var data = this.grid.getBinding().getLockedRowData();
        if (!data || data.length == 0) {
            return;
        }
        this.forEach(function(view) {
            view.renderLockedRow(data);
        })
        this.scroller.updateContentHeight(this.getLockedRowHeight(data));
    },
    getLockedRowHeight: function(lockRowData) {
        var data = lockRowData || this.getLockedData();
        return data.length * this.scroller.defaultRowHeight;
    },
    //events
    _doHeaderClick: function(e) {
    	if (e.cell) {
    		if (this.canSort(e.cell)) {
                //				this.grid.setSortInfo(e.cell);
                this.grid.getBinding().sort(e.cell, -e.cell.asc);
            }
            this.onHeaderCellClick(e.cell);
    	}
    	this.onHeaderClick(e);
    },
    _doHeaderMousedown: function(e) {
    	if (e.cell) {
            this.onHeaderCellMousedown(e.cell);
    	}
    	this.onHeaderMousedown(e);
    },
    
    //是否能排序
    canSort: function(inCell) {
        return this.orderType != "none" && inCell.canSort != false && inCell.isMulTitle != true;
    },
    onMouseOverRow: function(e) {
        var rows = this.grid.managers.get("RowManager");
        if (!rows.isOver(e.rowIndex)) {
            rows.setOverRow(e.rowIndex);
            e.rowIndex == -1 ? this.onHeaderMouseOver(e) : this.onRowMouseOver(e);
        }
    },
    onMouseOutRow: function(e) {
        var rows = this.grid.managers.get("RowManager");
        if (rows.isOver(-1)) {
            this.onHeaderMouseOut(e);
        } else if (!rows.isOver(-2)) {
//            rows.setOverRow(-2);
            this.onRowMouseOut(e);
        }
        this.enableTooltip&&this._disableTooltip(e);
    },
    onMouseOver: function(e) {
		
    	if (e.rowIndex==null || !e.cell) return;
    	if (e.rowIndex >= 0) {
			this.enableTooltip&&this._enableTooltip(e);
    		this.onCellMouseOver(e.cell, e.rowIndex);
    	}
    },
    onMouseOut: function(e) {
    	if (e.rowIndex==null || !e.cell) return;
    	if (e.rowIndex >= 0) {
			this.enableTooltip&&this._disableTooltip(e);
    		this.onCellMouseOut(e.cell, e.rowIndex);
    	}
		var rows = this.grid.managers.get("RowManager");
    	rows.setOverRow(-1);
    },
	
	_enableTooltip:function(e){
		this._toolTipTimer=setTimeout(dojo.hitch(this,function(){
			var editManager=this.grid.managers.managers["EditManager"];
			//有单元格在编辑时不显示tooltip
			if(editManager){
				var focusCell=editManager.getFocusCell(),
					isEditing=editManager.isEditing(),
					currentRowIndex=editManager.currentRowIndex,
					type=editManager.getType(),
					editor=e.cell.getEditor();
				//是否有单元格处于编辑状态
				if(isEditing){
					if(type=='rowEdit'){
						if(editor&&e.rowIndex==currentRowIndex) return;
					}else if(type=='cellEdit'){
						if(focusCell==e.cell&&e.rowIndex==currentRowIndex) return;
					}
				}
			};
			if(!this._globalSpan&&!dojo.byId('_globalSpan_')){
				this._globalSpan=dojo.create("span",{style: {
					visibility: 'hidden',
					position: 'absolute'
				},id:'_globalSpan_'},dojo.body(),"first");
			}
			this._globalSpan = dojo.byId('_globalSpan_');
			if(dojo.isIE == 6){
			 	dojo.style(this._globalSpan,'display','');
			};
			var cellNode,
				fontSize="12px",
				paddingRight=0;
			try{
				cellNode=e.cellNode;
				fontSize=dojo.style(cellNode,'fontSize');
			}catch(ex){
			}
			this._globalSpan.style.fontSize=fontSize;
			//在配置了filter的情况下不判断会报错
			if(!cellNode||!cellNode.childNodes[0]) return;
			var innerHTML,
				tooltipHTML = innerHTML = cellNode.childNodes[0].childNodes[0].innerHTML;
			innerHTML = "<DIV class=\"u-grid-text\">" +innerHTML+ "</DIV>";
			this._globalSpan.innerHTML = innerHTML;
			paddingRight=parseInt(dojo.getComputedStyle(cellNode.childNodes[0]).paddingRight);//火狐下tooltip报脚本错误问题 见U_EAP00008619
			var showToolTip = dojo.contentBox(this._globalSpan).w-paddingRight>dojo.contentBox(cellNode).w;
			//解决IE6下显示tooltip出现滚动条的问题 见U_EAP00008377
			dojo.isIE==6&&dojo.style(this._globalSpan,"display","none");
			if(showToolTip){
				tooltipHTML = "<DIV style='padding: 0 5px 0 5px;vertical-align: middle;word-wrap: break-word;overflow: hidden;height:100%;'>" +tooltipHTML+ "</DIV>";
				unieap.showTooltip(tooltipHTML,cellNode);
			}else{
			}
		}),500);
	},
	
	_disableTooltip:function(e){

		clearTimeout(this._toolTipTimer);
		this._globalSpan&&unieap.hideTooltip(e.cellNode);
	},
    
    destroy: function() {
        this.destroyViews();
    },
    
	onRowRefresh:function(index) {
		
	},
	
	onCellRefresh:function(index,cell) {
		
	},
	
	//鼠标按下事件
	_onMousedown: function(e) {
		if (e.cell) {
			this.onCellMousedown(e.cell, e.rowIndex);
		}
		var rows = this.grid.managers.get("RowManager");
		if (isNaN(e.rowIndex)) {
			return;
		}
		this.onRowMousedown(e);
		rows.updateCurrnetRow(Number(e.rowIndex));
	},
	
	//鼠标释放事件
	_onMouseup: function(e) {
		if (e.cell) {
			this.onCellMouseup(e.cell, e.rowIndex);
		}
		var rows = this.grid.managers.get("RowManager");
		if (isNaN(e.rowIndex)) {
			return;
		}
		this.onRowMouseup(e);
	},
	
	//鼠标点击事件
	_doClick: function(e) {
		if (e.cell) {
			this.onCellClick(e.cell, e.rowIndex);
		}
		var rows = this.grid.managers.get("RowManager");
		if (isNaN(e.rowIndex)) {
			return;
		}
		this.onRowClick(e);
		rows.updateCurrnetRow(Number(e.rowIndex));
	},
	
	//鼠标双击事件
	_doDbClick: function(e) {
		if (e.cell) {
			this.onCellDblClick(e.cell, e.rowIndex);
		}
		if (isNaN(e.rowIndex)) {
			return;
		}
		this.onRowDblClick(e);
	},
	
	_needPage: function(inRowIndex) {
		var rowPage = Math.floor(inRowIndex / this.scroller.rowsPerPage);
		var t = 0;
		for(var i=0; i<rowPage; i++){
			t += this.scroller.getPageHeight(i);
		}
		var pageTop = t;
		this.scroller.needPage(rowPage, pageTop);
	},
	
	//弹出菜单实现
	_doContextMenu:function(e){
		if(isNaN(e.rowIndex)) return;
		this.onContextMenu(e.cell,e.cellNode,e.rowIndex);
		if(dojo.isIE){
			e.cellNode.oncontextmenu&&e.cellNode.fireEvent('oncontextmenu');
		}else{
			var evt=document.createEvent('HTMLEvents');
			evt.initEvent("contextmenu", false, false);
			e.cellNode.dispatchEvent(evt);
		}
	},
	
    //user interface------------------------------------------------------
	
    /**
     * @summary:
     * 		判断表格是否有rowBar
     * @return:
     * 		{boolean}
     * @example:
     * |var viewMan=unieap.byId('grid').getManager('ViewManager');
     * |var rowBar=viewMan.hasRowBar();
     */
    hasRowBar: function() {
        var sm = this.grid.managers.SelectionManager;
        
        if (sm) {
            return this.rowBar || this.rowNumber || sm.getSelectType();
        }
        else {
            return this.rowBar || this.rowNumber;
        }
    },
    
    /**
     * @summary:
     * 		设置表格是否自动渲染
     * @param:
     * 		{boolean} render
     * @example:
     * |<div dojoType="unieap.grid.Grid" id="grid" views="{autoRender:false}">
     * |	...
     * |</div>
     * |var viewMan=unieap.byId("grid").getManager("ViewManager");
     * |viewMan.setAutoRender(true);
     */
    setAutoRender: function(render) {
        this.autoRender = render;
        this.refresh();
    },
    
    /**
     * @summary:
     * 		设置列标题值
     * @param:
     * 		{string|number} cell
     * @param:
     * 		{string} customName
	 * @example:
	 * |var viewMan=unieap.byId('grid').getManager('ViewManager');
	 * |var label=viewMan.setHeaderName('attr_sal','最新工资');//列标题值变为"最新工资"
     */
    setHeaderName: function(inCell, customName) {
		var cell = this.grid.managers.get("LayoutManager").getCell(inCell);
		if (!cell) {
			return;
		};
		var n = dojo.isString(customName)?customName:cell.name;
		var th = dojo.query("TH", this.getViewByCell(cell).headerNode)[cell.layoutIndex];
		if (dojo.isIE) {
			th.innerText = n;
		} else {
			th.textContent = n;
		}
		 cell.label = n;
    },
	
	/**
	 * @summary:
	 * 		获得列标题值
	 * @param:
	 * 		{string|number} inCell Cell的序号或者name属性
	 * @example:
	 * |var viewMan=unieap.byId('grid').getManager('ViewManager');
	 * |var label=viewMan.getHeaderName('attr_sal');//获得标签值为"工资"
	 */
	getHeaderName:function(inCell){
		var cell = this.grid.managers.get("LayoutManager").getCell(inCell);
		return cell?cell.label:null;
		
	},
    
    /**
     * @summary:
     * 		取得某个单元格的Dom结点
     * @param:
     * 		{string|number} inCell 列绑定名称或者列索引号
     * @param:
     * 		{number} inRowIndex 单元格所在的行索引
     * @return:
     * 		{domNode}
     * @example:
     * |var viewMan=unieap.byId('grid').getManager('ViewManager');
     * |//获得Grid中第一行列绑定名为attr_sal的单元格所在的domNode
     * |var cellNode=viewMan.getCellNode("attr_sal",0); 
     */
    getCellNode: function(inCell, inRowIndex) {
    	try {
    		var cell = this.grid.managers.get("LayoutManager").getCell(inCell);
    		var view = this.getViewByCell(cell);
    		var node = view?view.getCellNode(inRowIndex, cell.index):null;
    		return node;
    	} catch(e) {
    		
    	}
    },
    
	/**
	 * @summary:
	 * 		获得指定单元格的内容
	 * @param:
	 * 		{string|number} inCell 列绑定名称或者列索引号
	 * @param:
	 * 		{number} inRowIndex 单元格所在的行索引
	 * @param：
	 * 		{boolean} isOrigin 是否获得格式化前的值
	 * @example:
	 * |var grid=unieap.byId('grid');
	 * |//获得第一行、第一列单元格中的数据
	 * |var text=grid.getManager('ViewManager').getItemText(0,0);
	 * |//获得第一行行中列绑定名为attr_sal的单元格的值
	 * |var text1=grid.getManager('ViewManager').getItemText("attr_sal",0);
	 * @example:
	 * |var txt=manager.getItemText("attr_sal",0);
	 * |var txt1=manager.getItemText("attr_sal",0,true);
	 * |比如单元格的显示值格式化成'5,000.00',txt的值就为'5,000.00',而txt1为'5000'.
	 */
    getItemText: function(inCell, inRowIndex,isOrigin) {
		if(inCell.declaredClass!='unieap.grid.Cell'){
			inCell=this.grid.managers.get("LayoutManager").getCell(inCell);
		}
    	if (!inCell) {
    		return null;
    	};
    	var value = inCell.get(inRowIndex);
		isOrigin!=true&&(value=inCell._format(value,inRowIndex));
    	return value;
    },
	
	
	//TODO?
	//功能测试用例?
	setItemText:function(inCell,inRowIndex,text){
		if(typeof(inRowIndex)!="number") return;
		var name=inCell,grid=this.grid;
		if(typeof(inCell)=="number"){
			var cell=grid.getManager("LayoutManager").getCell(inCell);
			cell&&(name=cell.name)
		}
		if(!name) return;
		grid.getBinding().getRowSet().setItemValue(inRowIndex,name,text);
	},
    
    /**
	 * @summary:
	 * 		设置指单元格样式(合并单元格暂不支持该方法设置样式)
	 * @param:
	 * 		{number} inRowIndex  单元格所在的行索引 
	 * @param:
	 * 		{string|number} cell 列绑定名称或者列索引号
	 * @param:
	 * 		{object} styles 样式对象
	 * @example:
	 * |var viewMan=unieap.byId("grid").getManager("ViewManager");
	 * |//设置Grid中第一行中列绑定名为attr_sal的单元格的样式
	 * |viewMan.setCellStyles(0,"attr_sal",{"color":"red","textAlign":"left"});
	 */
	setCellStyles: function(inRowIndex, inCell, styles) {
		if(typeof(inRowIndex)!="number") return;
		var rowNodes = [],
			rowDatas=this.grid.getBinding().getRowData(),
			cell = this.grid.managers.get("LayoutManager").getCell(inCell);
		
		if(inRowIndex>rowDatas.length||!cell) return;
		for (var i=0,view; view = this.views[i]; i++) {
			if (view.isRowBar) continue;
			var rowNode = view.getRowNode(inRowIndex);
			rowNode && rowNodes.push(rowNode);
		}
		if (rowNodes.length==0) return;
		var style, cellNode;
		for (var i=0, node; node = rowNodes[i]; i++) {
			cellNode = dojo.query("[idx="+cell.index+"]", node)[0];
			if (cellNode) {
				for(style in styles) {
					dojo.style(cellNode, style, styles[style]);
	
					
				}
				
				dojo.isIE<8&&(cellNode.style.cssText=cellNode.style.cssText);
				
			}
		}
		
		//
		
		var row = new unieap.ds.Row(this.grid.getBinding().getRowSet(),rowDatas[inRowIndex]);
		var styleIdentifier = row.getIdentifier("_style");
		
		//保存cell上的样式
//		!rowDatas[inRowIndex]["_style"]&&(rowDatas[inRowIndex]["_style"]={});
//		!rowDatas[inRowIndex]["_style"]["cell"]&&(rowDatas[inRowIndex]["_style"]["cell"]={}); 
//		rowDatas[inRowIndex]["_style"]["cell"][this._getCellIndex(cell)]=dojo.toJson(styles);
		!styleIdentifier&&(styleIdentifier={});
		!styleIdentifier["cell"]&&(styleIdentifier["cell"]={}); 
		styleIdentifier["cell"][this._getCellIndex(cell)]=dojo.toJson(styles);
		
		//调用setRowStyles，再调用setCellStyles
		//setCellStyles优先级高
		styleIdentifier["cell"]["priority"]="cell";
		//rowDatas[inRowIndex]["_style"]["priority"]="cell";
		row.setIdentifier("_style",styleIdentifier);
	},
	
	//获得cell所在的原始位置
	_getCellIndex:function(cell){
		var layout=this.grid.managers.get("LayoutManager"),
			seq=layout.customStructure,
			cells=layout.cells,
			index;
		if(!seq) return cell.index;
		for(var i=0,l=cells.length;i<l;i++){
			if(cells[i]==cell){
				index=i;
				break;
			}
		}
		return seq.seq[index]
		
	},
	
	
	/**
	 * @summary:
	 * 		设置指定行样式(合并单元格暂不支持该方法设置样式)
	 * @param：
	 * 		{number} inRowIndex 行索引号
	 * @param:
	 * 		{object} styles 样式对象
	 * @example:
	 * |var viewMan=unieap.byId("grid").getManager("ViewManager");
	 * |//设置Grid中第一行的样式
	 * |viewMan.setRowStyles(0,{"color":"red","textAlign":"left"});
	 */

	setRowStyles: function(inRowIndex, styles) {
		if(typeof(inRowIndex)!="number") return;
		var rowNodes = [],
			rowDatas=this.grid.getBinding().getRowData();
		if(inRowIndex>rowDatas.length) return;
		for (var i=0,view; view = this.views[i]; i++) {
			if (view.isRowBar) continue;
			var rowNode = view.getRowNode(inRowIndex);
			rowNode && rowNodes.push(rowNode);
		}
		
		var row = new unieap.ds.Row(this.grid.getBinding().getRowSet(),rowDatas[inRowIndex]);
		var styleIdentifier = row.getIdentifier("_style");
		
		
		//保存row上的样式
		//!rowDatas[inRowIndex]["_style"]&&(rowDatas[inRowIndex]["_style"]={})
		!styleIdentifier&&(styleIdentifier={})
		//调用setCellStyles，再调用setRowStyles
		//setRowStyles优先级高
//		rowDatas[inRowIndex]["_style"]["priority"]="row";
//		rowDatas[inRowIndex]["_style"]["row"]=dojo.toJson(styles);
		styleIdentifier["priority"]="row";
		styleIdentifier["row"]=dojo.toJson(styles);
		row.setIdentifier("_style",styleIdentifier);
		
		if (rowNodes.length==0) return;
		dojo.forEach(rowNodes,function(node){
			dojo.query(".u-grid-cell",node).forEach(function(cellNode){
				dojo.style(cellNode,styles);
				dojo.isIE<8&&(cellNode.style.cssText=cellNode.style.cssText);
			});
		});
	},
	
    /**
     * @summary:
     * 		刷新表格视图
     * @description:
     * 		本方法会重新渲染Grid控件
     * @example:
     * |var grid=dijit.byId('grid');
     * |grid.getManager('ViewManager').refresh()
     */
    refresh: function() {
    	this.onBeforeRefresh();
    	// clear rows tyle cache
    	var binding = this.grid.getBinding();
 		var rowDatas=binding.getRowData();
		if (rowDatas!=null && rowDatas.length>0) {
			for (var i=0,len=rowDatas.length; i<len; i++) {
				var row = new unieap.ds.Row(binding.getRowSet(),rowDatas[i]);
				row.removeIdentifier("_style");
				//rowDatas[i]["_style"] && delete rowDatas[i]["_style"];
			}
		}
        this.render();
    },
    
    /**
     * @summary:
     * 		刷新某一行
     * @description:
     * 		如果用户监听了onRowRefresh方法,调用本方法后会自动调用onRowRefresh
     * @param:
     * 		{number} inRowIndex
     * @example:
     * |var grid=dijit.byId('grid');
     * |grid.getManager('ViewManager').refreshRow(0) //刷新grid中的第一行
     */
    refreshRow: function(inRowIndex) {
        this.forEach(function(inView, i) {
            inView.renderRow(inView.getRowNode(inRowIndex), inRowIndex);
        });
		this.onRowRefresh(inRowIndex);
    },
	
    
    /**
     * @summary:
     * 		刷新某个单元格
     * @description:
     * 		如果某个单元格正处于编辑状态,刷新无效
     * @param:
     * 		{number} inRowIndex
     * @param:
     * 		{unieap.grid.Cell} inCell
     * @example:
     * |var grid=dijit.byId('grid');
     * |var layout=grid.getManager('LayoutManager').getCell(0); //获得第一列Cell
     * |grid.getManager('ViewManager').refreshCell(0,cell) //刷新第一列第一行的cell
     */
    refreshCell: function(inRowIndex, inCell) {
    	var view = this.getViewByCell(inCell);
    	var node = view?view.getCellNode(inRowIndex, inCell.index):null;
    	if (node==null) return;
    	if(dojo.query("[widgetId]",node).length>0) {return;}//当此单元格处于编辑状态时，不刷新
    	
    	var rowData = this.grid.getBinding().getRowData(),
    		value =  inCell.format(inRowIndex) ,
			changedValue='',
    		_o;
    		
    	if (this.markDirty) {//显示修改标记
			if (inCell["name"]
				&& rowData
				&& rowData[inRowIndex]
				&& (_o=rowData[inRowIndex]["_o"])
				&& inCell["name"] in _o) {
				changedValue= "<div class=\"u-grid-value-changed\"></div>";
			}
		}
		
		//由于firefox下,当一个div的position为absolute时，它是从table左上角开始进行计算的
		//需要把<div class=\"u-grid-value-changed\"></div>放到<div class="u-grid-text"></div>下方
		dojo.empty(node);
		node.appendChild(dojo._toDom(value));
		changedValue&&(node.childNodes[0].appendChild(dojo._toDom(changedValue)));
		this.onCellRefresh(inRowIndex,inCell);
    },
    
    /**
     * @summary:
     * 		刷新当前页面
     * @example:
     * |var grid=dijit.byId('grid')
     * |grid.getManager('ViewManager').refreshPage(); 
     */
	refreshPage: function() {
		this.scroller.init(this.grid.managers.get("RowManager").getRowCount());
		// clear rows tyle cache
		var binding = this.grid.getBinding();
 		var rowDatas=binding.getRowData();
		if (rowDatas!=null && rowDatas.length>0) {
			for (var i=0,len=rowDatas.length; i<len; i++) {
				var row = new unieap.ds.Row(binding.getRowSet(),rowDatas[i]);
				row.removeIdentifier("_style");
				//rowDatas[i]["_style"] && delete rowDatas[i]["_style"];
			}
		}
		
		this.renderLockedRow();
		this.setScrollTop(this.scrollTop);
//		this.finishScrollJob();
    },
    
    /**
     * @summary:
     * 		将页面滚动到指定行
     * @param:
     * 		{number} inRowIndex
     * @example:
     * |var grid=dijit.byId('grid');
     * |grid.getManager('ViewManager').scrollToRow(9); //滚动到第10行
     */
    scrollToRow: function(inRowIndex) {
    	if (isNaN(inRowIndex) || inRowIndex<0) return;
    	this._needPage(inRowIndex);
    	this.setScrollTop(this.scroller.findScrollTop(inRowIndex) + 1);
    },
    
	
    visualizeRow: function(inRowIndex) {
		var rows = this.grid.managers.get("RowManager");
		var nextRowTop = this.scroller.findScrollTop(inRowIndex+1);
		if (nextRowTop == -1) {
			this.doscroll(rows.defaultRowHeight);
			return;
		}
		var lockRowHeight = rows.getLockedRowHeight();
		var gridWindowBottom = this.scroller.getScrollBottom(this.scrollTop);
		var discrepancy = gridWindowBottom - lockRowHeight - nextRowTop;
		if (discrepancy < 1 || nextRowTop<this.scrollTop) {
			this.doscroll(-discrepancy);
			return ;
		}
		var rowTop = this.scroller.findScrollTop(inRowIndex);
		if(rowTop<this.scrollTop && nextRowTop>this.scrollTop){
			this.doscroll(rowTop-this.scrollTop);
		}
	},
	
	//调整横向或纵向滚动条是否显示及锁定行位置
	adjustScrollBar :function(){
		setTimeout(dojo.hitch(this,function(){
			if(this.grid.domNode.offsetHeight==0) return;
			var scrollView = this.views[this.views.length-1];
			if (scrollView) {
				var port = scrollView.getScrollBarPort();
				for (var i=0,view; view = this.views[i]; i++) {
					view.adjustScrollBar(port);
				}
			}
		}));
	},
	
	
	/**
     * @summary:
     * 		grid视图刷新前事件
     * @example:
     * |function fn(){}
     * |<div dojoType='unieap.grid.Grid' views="{onBeforeRefresh:fn}"></div>
     */
	onBeforeRefresh: function() {
	},
	
    /**
     * @summary:
     * 		渲染前事件
     * @example:
     * |function fn(){}
     * |<div dojoType='unieap.grid.Grid' views="{onBeforeRender:fn}"></div>
     */
    onBeforeRender: function() {
    },
    
    /**
     * @summary:
     * 		渲染后事件
     * @example:
     * |function fn(){}
     * |<div dojoType='unieap.grid.Grid' views="{onAfterRender:fn}"></div>
     */
    onAfterRender: function() {
    },
    
    /**
     * @summary:
     * 		单元格上鼠标经过事件
     * @param:
     * 		{unieap.grid.Cell} inCell 单元格对象
     * @param:
     * 		{number} rowIndex 行索引号
     * @example:
     * |function fn(cell,index){}
     * |<div dojoType='unieap.grid.Grid' views="{onCellMouseOver:fn}"></div>
     */
    onCellMouseOver: function(inCell,rowIndex) {
    },
    
    /**
     * @summary:
     * 		单元格上鼠标移出事件
     * @param:
     * 		{unieap.grid.Cell} inCell 单元格对象
     * @param:
     * 		{number} rowIndex 行索引号
     * @example:
     * |function fn(cell,index){}
     * |<div dojoType='unieap.grid.Grid' views="{onCellMouseOut:fn}"></div>
     */
    onCellMouseOut: function(inCell,rowIndex) {
    },
    
    /**
     * @summary:
     * 		单元格上鼠标按下事件
     * @param:
     * 		{unieap.grid.Cell} inCell 单元格对象
     * @param:
     * 		{number} rowIndex 行索引号
     * @example:
     * |function fn(cell,index){}
     * |<div dojoType='unieap.grid.Grid' views="{onCellMousedown:fn}"></div>
     */
    onCellMousedown: function(inCell, inRowIndex) {
    },
	
	
	/**
	 * @summary:
	 * 		在单元格上鼠标释放事件
	 * @param:
	 * 		{unieap.grid.Cell} inCell 
	 * @param:
	 * 		{number} inRowIndex
	 * @example:
	 * |function fn(cell,index){}
	 * |<div dojoType='unieap.grid.Grid' views="{onCellMouseup:fn}"></div>
	 */
    onCellMouseup: function(inCell, inRowIndex) {
    },
    

	/**
	 * @summary:
	 * 		在单元格上点击事件
	 * @description:
	 * 		对于合并单元格，请在unitedCell属性上设置onCellClick属性
	 * @param:
	 * 		{unieap.grid.Cell} inCell 
	 * @param:
	 * 		{number} inRowIndex
	 * @example:
	 * |function fn(cell,index){}
	 * |<div dojoType='unieap.grid.Grid' views="{onCellClick:fn}"></div>
	 */
    onCellClick: function(inCell, inRowIndex) {
    },
    
	/**
	 * @summary:
	 * 		在单元格上双击事件
	 * @description:
	 * 		对于合并单元格，请在unitedCell属性上设置onCellDblClick属性
	 * @param:
	 * 		{unieap.grid.Cell} inCell 
	 * @param:
	 * 		{number} inRowIndex
	 * @example:
	 * |function fn(cell,index){}
	 * |<div dojoType='unieap.grid.Grid' views="{onCellDblClick:fn}"></div>
	 */
    onCellDblClick: function(inCell, inRowIndex) {
    },
    
	/**
	 * @summary:
	 * 		鼠标滑过Grid表头事件
	 * @param:
	 * 		{event} evt
	 * @example:
	 * |function fn(evt){unieap.debug(evt)}
	 * |<div dojoType='unieap.grid.Grid' views="{onHeaderMouseOver:fn}"></div>
	 */
    onHeaderMouseOver: function(evt) {
    },
    
	/**
	 * @summary:
	 * 		鼠标移出Grid表头事件
	 * @param:
	 * 		{event} evt
	 * @example:
	 * |function fn(evt){unieap.debug(evt)}
	 * |<div dojoType='unieap.grid.Grid' views="{onHeaderMouseOut:fn}"></div>
	 */
    onHeaderMouseOut: function(evt) {
    },
    

	/**
	 * @summary:
	 * 		鼠标滑过Grid的某一行事件
	 * @param:
	 * 		{event} evt
	 * @example:
	 * |function fn(evt){unieap.debug(evt)}
	 * |<div dojoType='unieap.grid.Grid' views="{onRowMouseOver:fn}"></div>
	 */
    onRowMouseOver: function(evt) {
    },
    
	/**
	 * @summary:
	 * 		鼠标移出Grid的某一行事件
	 * @param:
	 * 		{event} evt
	 * @example:
	 * |function fn(evt){unieap.debug(evt)}
	 * |<div dojoType='unieap.grid.Grid' views="{onRowMouseOut:fn}"></div>
	 */
    onRowMouseOut: function(evt) {
    },
    
	/**
	 * @summary:
	 * 		在Grid的某一行上鼠标按下事件
	 * @param:
	 * 		{event} evt
	 * @example:
	 * |function fn(evt){unieap.debug(evt)}
	 * |<div dojoType='unieap.grid.Grid' views="{onRowMousedown:fn}"></div>
	 */
    onRowMousedown: function(evt) {
    },
	
	/**
	 * @summary:
	 * 		在Grid的某一行上鼠标释放事件
	 * @param:
	 * 		{event} evt
	 * @example:
	 * |function fn(evt){unieap.debug(evt)}
	 * |<div dojoType='unieap.grid.Grid' views="{onRowMouseup:fn}"></div>
	 */
    onRowMouseup: function(evt) {
    },
    
	/**
	 * @summary:
	 * 		在Grid的某一行上鼠标点击事件
	 * @param:
	 * 		{event} evt
	 * @example:
	 * |function fn(evt){unieap.debug(evt)}
	 * |<div dojoType='unieap.grid.Grid' views="{onRowClick:fn}"></div>
	 */
    onRowClick: function(evt) {
    },
    
	/**
	 * @summary:
	 * 		在Grid的某一行上鼠标双击事件
	 * @param:
	 * 		{event} evt
	 * @example:
	 * |function fn(evt){unieap.debug(evt)}
	 * |<div dojoType='unieap.grid.Grid' views="{onRowDblClick:fn}"></div>
	 */
    onRowDblClick: function(evt) {
    },
    
	/**
	 * @summary:
	 * 		列表头鼠标点击事件
	 * @param:
	 * 		{unieap.grid.Cell} inCell 列对象
	 * @example:
	 * |function fn(inCell){unieap.debug(inCell)}
	 * |<div dojoType='unieap.grid.Grid' views="{onHeaderCellClick:fn}"></div>
	 */
    onHeaderCellClick: function(inCell) {
    },
    
	/**
	 * @summary:
	 * 		表头鼠标点击事件
	 * @description:
	 * 		如果同时配置了onHeaderCellClick和onHeaderClick,会先执行前者再执行后者
	 * @param:
	 * 		{event} evt 
	 * @example:
	 * |function fn(inCell){unieap.debug(inCell)}
	 * |<div dojoType='unieap.grid.Grid' views="{onHeaderClick:fn}"></div>
	 */
    onHeaderClick: function(evt) {
    },
	
	/**
	 * @summary:
	 * 		列表头鼠标按下事件
	 * @param:
	 * 		{unieap.grid.Cell} inCell 列对象
	 * @example:
	 * |function fn(inCell){unieap.debug(inCell)}
	 * |<div dojoType='unieap.grid.Grid' views="{onHeaderCellMousedown:fn}"></div>
	 */
    onHeaderCellMousedown: function(inCell) {
    },
	
	/**
	 * @summary:
	 * 		表头鼠标按下事件
	 * @param:
	 * 		{event} evt 
	 * @example:
	 * |function fn(inCell){unieap.debug(inCell)}
	 * |<div dojoType='unieap.grid.Grid' views="{onHeaderMousedown:fn}"></div>
	 */
    onHeaderMousedown: function(e) {
    },
    
    /**
	 * @summary:
	 * 		渲染表头的回调方法
	 * @param:
	 * 		{HTMLDomNode} node 标头结点
	 * @param:
	 * 		{unieap.grid.View} inView 视图对象
	 * @example:
	 * |function fn(node ,view){unieap.debug(inCell)}
	 * |<div dojoType='unieap.grid.Grid' views="{onHeaderRender:fn}"></div>
	 */
    onHeaderRender : function(node ,inView){
    	
    },

    /**
     * @summary:
     * 		在单元格上点击右键时触发
     * @summary:
     * 		对于合并单元格，请在unitedCell属性上设置onContextMenu属性
     * @param:
     * 		{unieap.grid.Cell} cell
     * @param:
     * 		{domNode} cellNode
     * @param:
     * 		{number} inRowIndex
     * @example:
     * |<div dojoType="unieap.grid.Grid" views="{onContextMenu:fn}">
     * |	...
     * |</div>
     * |<script type="text/javascript">
     * |	var menu;
     * |	function fn(cell,cellNode,inRowIndex){
     * |		if(!menu){
     * |			menu=new unieap.menu.Menu({style:'display:none'});
     * |			menu.addChild(new unieap.menu.MenuItem({label:'你好'});
     * |			menu.addChild(new unieap.menu.MenuItem({label:'基础软件'});
     * |			menu.startup();
     * |		}
     * |		menu.bindDomNode(cellNode);
     * |	}
     * |</script>
     * @img:
     * 		images/grid/views/contextmenu.png
     */
	onContextMenu:function(cell,cellNode,inRowIndex){}
	
	
});
