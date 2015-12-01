dojo.provide('unieap.xgrid.manager.ViewManager');
dojo.require("unieap.xgrid.manager.Manager");
dojo.require("unieap.xgrid.core.view");
dojo.require("unieap.xgrid.core.scroller");
dojo.declare("unieap.xgrid.manager.ViewManager", unieap.xgrid.manager.Manager, {
    
    /**
     * @type:
     * 		{boolean}
     * @summary:
     * 		是否在初始化时渲染
     * @example:
     * |<div dojoType="unieap.xgrid.Grid" binding="{store:'empDataStore'}" views="{autoRender:true}">
     * |	...
     * |</div>
     */
    autoRender: true,
    
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
	 * |<div dojoType="unieap.xgrid.Grid" id="grid" views="{enableTooltip:true}">
	 * |	<header>
	 * |		<cell name="attr_empno" label="编号"></cell>
	 * |		<cell name="attr_ename" label="姓名"></cell>
	 * |	</header>
	 * |</div>
	 */
	enableTooltip:false,
    
	/**
     * @type:
     * 		{boolean}
     * @summary:
     * 		是否显示rowBar
     * @example:
     * |<div dojoType="unieap.xgrid.Grid" binding="{store:'empDataStore'}" views="{rowBar:true}">
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
     * |<div dojoType="unieap.xgrid.Grid" binding="{store:'empDataStore'}" views="{rowNumber:true}">
     * |	...
     * |</div>
     * @img:
     * 		images/grid/rownumber.png
     */
    rowNumber: false,
    /**
     * @type:
     * 		{string}
     * @summary:
     * 		设置点击Grid表头的排序方式
     * @enum:
     * 		{client|server|none}
     * @example:
     * |<div dojoType="unieap.xgrid.Grid" binding="{store:'empDataStore'}" views="{orderType:'none'}">
     * |	...
     * |</div>
     * |上述代码表明点击Grid表头时不排序
     */
    orderType: 'client',
    create: function() {
		this.views = [];
        this.subscribe("structureChanged",this,"structureChanged");
    },
    
    doContentEvent : function(e){
    	var node = e.target;
    	while(node && node!=this.grid.viewsNode){
    		if(dojo.hasClass(node,"u-xgrid-view")){
    			var view = this.grid.ViewManager.views[dojo.query(">.u-xgrid-view",this.grid.viewsNode).indexOf(node)];
    			view.doContentEvent(e);
    			return;
    		}
    		node = node.parentNode;
    	}
    },
    
    doHeaderEvent : function(e){
    	var node = e.target;
    	while(node && node!=this.grid.headersNode){
    		if(dojo.hasClass(node,"u-xgrid-header")){
    			var view = this.grid.ViewManager.views[dojo.query(">.u-xgrid-header",this.grid.headersNode).indexOf(node)];
    			view.doHeaderEvent(e);
    			return;
    		}
    		node = node.parentNode;
    	}
    },
        
    startup: function(){
    	var rowManager = this.grid.RowManager;
    	this.scroller = new unieap.xgrid.Scroller(this);
    },
    structureChanged: function(flag) {
		this.destroyViews();
		this.buildViews();
		this.scroller && (this.scroller.scrollView = this.getScrollView());
        this.render();
     	if(!flag){
    		this.refreshPage();
        }
    },
    buildViews: function() {
        var nodes = [], layout = this.grid.LayoutManager;
        for (var i = 0, vs; (vs = layout.structure[i]); i++) {
            var v = this.createView(vs.type || "unieap.xgrid.View");
            v.isRowBar && (v.rowNumber = this.rowNumber);
            v.setStructure(vs);
            nodes.push(v.contentNode);
        }
    },
    createView: function(inClass) {
        var clazz = dojo.getObject(inClass);
        var view = new clazz({
            grid: this.grid
        });
        this.addView(view);
        unieap.xgrid.addObserver(view, this);
        return view;
    },
    addView: function(inView) {
        inView.idx = this.views.length;
        this.views.push(inView);
        this.grid.headersNode.appendChild(inView.headerNode);
        this.grid.viewsNode.appendChild(inView.viewNode);
    },
	
	//根据cell对象来获得该cell所在的view
    getViewByCell: function(inCell) {
        for (var i = 0, v; v = this.views[i]; i++) {
			if(v.hasCell && v.hasCell(inCell)){
				return v;
			}
        }
        return null;
    },
 	render: function(){
    	var layout = this.grid.LayoutManager,
		storeList = [];
		for (var i=0, c; c=layout.cells[i]; i++) {
        	if (c.decoder&&c.decoder.store) {
        		//首先从dataCenter中取数据,取不到再从缓存中读取
        		unieap.getDataStore(c.decoder.store,dataCenter,true) || (storeList.push(c.decoder.store));
        	}
        }
        var self = this;
        if(0 == storeList.length){
        	dojo.forEach(self.views,function(view){
	    		view.render();
	    	});
        }else{
        	unieap.Action.getMultiCodeList(storeList,function(dc){
				dojo.forEach(self.views,function(view){
		    		view.render();
		    	});
			});
        }
    },
    renderLockedRow: function(flag){
    	var data = this.grid.getBinding().getLockedRowData();
        if (!data || data.length == 0) {
        	this.scroller.resize();
            return;
        }
    	this.forEach(function(view){
    		view.renderLockedRow(data,flag);
    	});
    	this.scroller.updateContentHeight(data.length,flag);
    },
    destroyViews: function() {
  		for (var i = 0, v; v = this.views[i]; i++) 
            v.destroy();
        this.views = [];
    },
    destroy: function(){
    	this.destroyViews();
    },
    
    getHeaderHeight: function(){
    	return this.grid.getManager("RowManager").defaultHeaderHeight * this.getScrollView().structure.rows.length;
    },
    
    resize: function(width,height){
    	var toolHeight = 0;
		if (this.grid.toolBar) {
			toolHeight = this.grid.getToolBar().getHeight();
		}
    	var scrollView = this.getScrollView(),
    		hh = this.getHeaderHeight(),
    		vh = height -  hh - toolHeight +1;
    		
    	if(vh < 1){
    		return;
    	}
    	//在非锁定视图中存储Grid的宽度和高度	
    	scrollView.snapshot.gridWidth = width;
    	scrollView.snapshot.gridHeight = height;
    	//设置表头和视图区域的高度
    	dojo.style(this.grid.headersNode,"height",hh + "px");
    	dojo.style(this.grid.viewsNode,"height",vh + "px");
    	//调整各视图中的记录
    	for (var i = 0,left = 0, view; view = this.views[i]; i++) {
    		view.setViewLeftPosition(left);
    		if(view.noscroll){
    			var vw = view.getRealWidth();
    			left += vw;    			
    			width= width - vw;
    			dojo.style(view.headerNode,"width",vw+"px");
    			dojo.style(view.contentNode,{"width": vw+"px","height": vh+"px"});
    			continue;
    		}
    		view.resize(width,vh);
    	}
    	for (var i = 0, view; view = this.views[i]; i++) {
    		if(view.noscroll){
    			dojo.style(view.contentNode,"height",scrollView.snapshot.viewContentHeight +"px");
    		}
    	}
    	this.renderLockedRow(true);
    	//如果有行编辑，并且窗口可显示的列数比原来的多，则关闭编辑器，并重新渲染,如果是移动滚动横向滚动条不重新渲染
    	if(this.grid.rowEdit && this.grid.rowEdit.clickScroll != true){
    		var	snaphotCells = scrollView.snapshot.showCells,
    			rowEdit = this.grid.rowEdit;
    		//关于锁定列解锁锁定、调整列位置
    		var notifyEdit = this.grid.notifyEdit;
    		if(!notifyEdit || 1 != notifyEdit){
	    		if((rowEdit.editShowCells != snaphotCells ) || (notifyEdit && 2 == notifyEdit)){
	    		    this.grid.notifyEdit = 0;
	    		    rowEdit.editShowCells = snaphotCells;
	    		    var setIndex = rowEdit.styleIndex;
	    		    //var editIndex = setIndex+rowEdit.beginRowIndex;
	    		    var editIndex = rowEdit.index;
	    		    if(editIndex >= scrollView.snapshot.rowCount) editIndex = scrollView.snapshot.rowCount-1;
	    			rowEdit.refreshEditTextBox(editIndex);
	    		    rowEdit.applyEdit();
	    		    scrollView.contentBuilder.getRowEdit(editIndex);
	    		}else{
	   				var tempIndex = rowEdit.index;
	    			if(rowEdit.updateCellWidth){
	    				rowEdit.refreshEditTextBox(rowEdit.index);
	    				rowEdit.updateCellWidth = false;
	    			}
	    			!rowEdit.noRefreshEdit && rowEdit.initEdit();
	    			//如果用TAB/Enter快捷键换行时，重新initEdit这时index变回原来的，需要重新设置回原来的index
	    			tempIndex != rowEdit.index && rowEdit.setEdit(tempIndex);
	    		}
    		}
		}
    	this.publish("resize");
    },
   
	forEach: function(inCallback) {
	    for (var i = 0, v; v = this.views[i]; i++) {
	        inCallback(v, i);
	    }
    },
    getScrollView: function(){
    	return this.views[this.views.length-1];
    },
    doYScroll: function(){
    	var scrollView = this.getScrollView(),
    		snapshot = scrollView.snapshot;
    	dojo.forEach(this.views,function(view){
    		view.snapshot.beginRowIndex = snapshot.beginRowIndex;
    		view.snapshot.viewContentHeight = snapshot.viewContentHeight;
    		view.snapshot.showRows = snapshot.showRows;
    		view.snapshot.lastRow = snapshot.lastRow;
    		view.renderContent();
    	});
    },
    
    /**
     * @summary:
     * 		刷新某一行
     * @description:
     * 		刷新一行,行号为可显示行的第index行
     * @param:
     * 		{number} index
     * @example:
     * |var grid=dijit.byId('grid');
     * |grid.getManager('ViewManager').refreshRow(0) //刷新grid中的第一行
     */
    refreshRow: function(index){
    	var snapshot = this.getScrollView().snapshot;
    		realIndex = index+snapshot.beginRowIndex;
		var viewName = "",
			temp = 0,
		 	cellInnerHTMLList = [];
		for(var i = 0 ; i<this.views.length; ++i){
			if(this.views[i].isRowBar) continue;
			temp = this.views[i].noscroll?1:0;
			viewName = this.views[i].id;
			var trNodeList = dojo.query("tr",viewName);
			cellInnerHTMLList = dojo.query("div.u-xgrid-cell",trNodeList[index]);
			var unShowNow = 0;
			for(var j = 0; j<cellInnerHTMLList.length;j++){
				var rowsRealIndex = temp?j + unShowNow:j + snapshot.beginCellIndex + unShowNow;
				if(this.views[i].contentStructure.rows[0][rowsRealIndex].hidden){
					j--;
					unShowNow++;
					continue;
				}
				cellInnerHTMLList[j].innerHTML = this.views[i].contentStructure.rows[0][rowsRealIndex]._format(this.views[i].contentStructure.rows[0][rowsRealIndex].get(realIndex),realIndex);
			}
		}
	},
	
	/**
     * @summary:
     * 		刷新某个单元格
     * @param:
     * 		{number} index
     * @param:
     * 		{unieap.grid.Cell} cell
     * @example:
     * |var grid=dijit.byId('grid');
     * |grid.getManager('ViewManager').refreshCell(0,cell) //刷新第一列第一行的cell
     */
	refreshCell: function(index,cell){
		var snapshot = this.getScrollView().snapshot;
    		realIndex = index+snapshot.beginRowIndex;
		var viewName = "",
		 	cells = [],
		 	cellIndex = cell.mulTitleIndex,
		 	lockingColNo = 0;
		for(var i = 0 ; i<this.views.length; ++i){
			if(this.views[i].isRowBar) continue;
			viewName = this.views[i].id;
			var trNodeList = dojo.query("tr",viewName);
			cells = dojo.query("div.u-xgrid-cell",trNodeList[index]);
			if(cellIndex<lockingColNo){
				cells[cellIndex].innerHTML = this.views[i].contentStructure.rows[0][cellIndex]._format(this.views[i].contentStructure.rows[0][cellIndex].get(realIndex),realIndex);
				return;
			}else 
			if(this.views[i].noscroll){
				continue;
			}else{
				cells[cellIndex-lockingColNo].innerHTML = this.views[i].contentStructure.rows[0][cellIndex-lockingColNo]._format(this.views[i].contentStructure.rows[0][cellIndex-lockingColNo].get(realIndex),realIndex);
			}
		}
	},
    
    /**
     * @summary:
     * 		刷新表格可视区域，不改变滚动条的位置
     * @description:
     * 		本方法会重新渲染Grid控件
     * @example:
     * |var grid=dijit.byId('grid');
     * |grid.getManager('ViewManager').refresh()
     */
    refreshPage: function(){
		var rowCount = this.grid.getBinding().getRowCount();
		var scrollView = this.getScrollView();
		scrollView.snapshot.rowCount = rowCount;
		dojo.forEach(this.views,function(view){
	    	view.renderHeader();
	    });
		this.grid.resizeContainer();
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
    	dojo.forEach(this.views,function(view){
    		delete view.snapshot;
    		view.snapshot = {
    			beginRowIndex : 0,
    			beginCellIndex : 0,
    			viewHeight : this.yScrollHeight,
    			gridWidth : this.xScrollWidth
    		};
    	});
    	this.grid.resizeContainer();
    },
    
    /**
     * @summary:
     * 		设置表格是否自动渲染
     * @param:
     * 		{boolean} render
     * @example:
     * |<div dojoType="unieap.xgrid.Grid" id="grid" views="{autoRender:false}">
     * |	...
     * |</div>
     * |var viewMan=unieap.byId("grid").getManager("ViewManager");
     * |viewMan.setAutoRender(true);
     */
    setAutoRender: function(render) {
        this.autoRender = render;
        if(!render){
        	dojo.forEach(this.views,function(view){
	    		view.contentNode.innerHTML = "";
	    	});
        }
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
		var cell = this.grid.getLayoutManager().getCell(inCell);
		if (!cell) {
			return;
		};
		var n = dojo.isString(customName)?customName:cell.name,
			th = dojo.query("TH", this.getViewByCell(cell).headerNode)[cell.layoutIndex],
		 	headerDiv = th.firstChild;
//		 	divInnerHTML = headerDiv.innerHTML,
//			headerDivIndex = divInnerHTML.indexOf("<div");
//		if(-1 == headerDivIndex){
//			headerDivIndex = divInnerHTML.indexOf("<DIV");
//		}
//		var oldName = divInnerHTML.slice(0,headerDivIndex);
//		if(oldName){
//			headerDiv.innerHTML = headerDiv.innerHTML.replace(oldName,n);
//		}else{
//			return;
//		}
		if (dojo.isIE) {
			headerDiv.innerText = n;
		} else {
			headerDiv.textContent = n;
		}
		 cell.label = n;
		 this.publish("headerNameChanged");
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
	getHeaderName: function(inCell){
		var cell = this.grid.getLayoutManager().getCell(inCell);
		return cell?cell.label:null;
		
	},
    
    /**
     * @summary:
     * 		将指定行滚动到可显示页面
     * @param:
     * 		{number} inRowIndex
     * @example:
     * |var grid=dijit.byId('grid');
     * |grid.getViewManager().scrollToRow(30); //第30行滚动到可显示区域
     */
    scrollToRow: function(inRowIndex) {
    	if (isNaN(inRowIndex) || inRowIndex<0) return;
    	this.scroller.visualizeRow(inRowIndex);
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
			inCell=this.grid.getLayoutManager().getCell(inCell);
		}
    	if (!inCell) {
    		return null;
    	}
    	var value = inCell.get(inRowIndex);
		isOrigin!=true && (value=inCell._format(value,inRowIndex));
    	return value;
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
	 * |viewMan.setCellStyles(0,"attr_sal",{"color":"red","text-align":"left"});
	 */
	setCellStyles: function(inRowIndex, inCell, styles) {
		if(typeof(inRowIndex)!="number") return;
		var rowDatas=this.grid.getBinding().getRowData(),
			cell = this.grid.getLayoutManager().getCell(inCell);
		if(inRowIndex>rowDatas.length||!cell) return;
		var style,
			tempStyles = '',
			cellIndex = cell.mulTitleIndex,
			rowNodes = [];
		if(!cellIndex && 0 != cellIndex) return;
		cell.changeStyle = true;
		rowDatas[inRowIndex].identifierNO = rowDatas[inRowIndex].identifierNO || [];
		rowDatas[inRowIndex]._styles = 	rowDatas[inRowIndex]._styles || [];
		for(style in styles) {
			if("undefined" != typeof(style) ){
				tempStyles += style+":"+styles[style]+";";
			}
		}
		rowDatas[inRowIndex]._styles[cellIndex] = tempStyles;
		rowDatas[inRowIndex].identifierNO[cellIndex] = cellIndex;
		//刷新行样式
		var scrollView = this.getScrollView();
		if(scrollView.snapshot.beginRowIndex > inRowIndex) return;
		inRowIndex -= scrollView.snapshot.beginRowIndex; 
		for (var i=0,view; view = this.views[i]; i++) {
			if (view.isRowBar) continue;
			var rowNode = view.getRowNode(inRowIndex);
			dojo.forEach(rowNode.childNodes,function(cellNode){
				rowNodes.push(cellNode);
			});
		}
		if (rowNodes.length==0) return;
		var cellNode = rowNodes[cellIndex];
		if(!cell.hidden){
			for(style in styles) {
				if("undefined" != typeof(style) ){
					if(!dojo.isIE){
						cellNode.attributes.style.value += ";"+style+":"+styles[style];
					}else{
						cellNode.style.cssText += ";"+style+":"+styles[style];
					}
				}
			}
		}
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
	 * |viewMan.setRowStyles(0,{"color":"red","text-align":"left"});
	 */

	setRowStyles: function(inRowIndex, styles) {
		if(typeof(inRowIndex)!="number") return;
		var rowNodes = [],
			rowDatas=this.grid.getBinding().getRowData();
		rowDatas[inRowIndex].identifierNO = rowDatas[inRowIndex].identifierNO || [];
		rowDatas[inRowIndex]._styles = 	rowDatas[inRowIndex]._styles || [];
		//保存样式
		var tempStyles = '';
		for(style in styles) {
			if("undefined" != typeof(style) ){
				tempStyles += ";"+style+":"+styles[style];
			}
		}
		if(inRowIndex>rowDatas.length) return;
		for (var i=0,view; view = this.views[i]; i++) {
			if (view.isRowBar) continue;
			var rows = view.contentStructure.rows;
			var row = rows[0];
			for(var j=0, cell; (cell=row[j]); j++) {
				cell.changeStyle = true;
				rowDatas[inRowIndex].identifierNO[cell.mulTitleIndex] = cell.mulTitleIndex;
				rowDatas[inRowIndex]._styles[cell.mulTitleIndex] = tempStyles;
			}
		}
		//刷新行样式
		var scrollView = this.getScrollView();
		if(scrollView.snapshot.beginRowIndex > inRowIndex) return;
		inRowIndex -= scrollView.snapshot.beginRowIndex; 
		for (var i=0,view; view = this.views[i]; i++) {
			if (view.isRowBar) continue;
			var rowNode = view.getRowNode(inRowIndex);
			rowNode && rowNodes.push(rowNode);
		}
		if (rowNodes.length==0) return;
		dojo.forEach(rowNodes,function(node){
			dojo.forEach(node.childNodes,function(cellNode){
				for(style in styles) {
					if("undefined" != typeof(style) ){
						if(!dojo.isIE){
							cellNode.attributes.style.value += ";"+style+":"+styles[style];
						}else{
							cellNode.style.cssText += ";"+style+":"+styles[style];
						}
					}
				}
			});
		});
	},
    
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
        var sm = this.grid.SelectionManager;
        return this.rowBar || this.rowNumber || sm && sm.getSelectType();
    },
  	/**   
   	 * @summary:
     * 		grid视图刷新前事件
     * @example:
     * |function fn(){}
     * |<div dojoType='unieap.xgrid.Grid' views="{onBeforeRefresh:fn}"></div>
     */
	onBeforeRefresh: function() {
	},
	/**
	 * @summary:
	 * 		在单元格上鼠标释放事件
	 * @param:
	 * 		{unieap.xgrid.Cell} inCell 
	 * @param:
	 * 		{number} inRowIndex
	 * @example:
	 * |function fn(cell,index){}
	 * |<div dojoType='unieap.xgrid.Grid' views="{onCellMouseup:fn}"></div>
	 */
    onCellMouseup: function(inCell, inRowIndex) {
    },
    _doHeaderClick: function(e) {
    	if (e.cell) {
    		if (this.canSort(e.cell)) {
                this.grid.rowEdit && this.grid.rowEdit.applyEdit();
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
     /**
	 * @summary:
	 * 		设置表格是否可排序
	 */
    canSort: function(inCell) {
        return this.orderType != "none" && inCell.canSort != false && inCell.isMulTitle != true;
    },
    
    onMouseOverRow: function(e) {
        var rows = this.grid.RowManager;
        if (!rows.isOver(e.rowIndex)) {
            rows.setOverRow(e.rowIndex);
            e.rowIndex == -1 ? this.onHeaderMouseOver(e) : this.onRowMouseOver(e);
        }
    },
    
    onMouseOutRow: function(e) {
        var rows = this.grid.RowManager;
        if (rows.isOver(-1)) {
            this.onHeaderMouseOut(e);
        } else if (!rows.isOver(-2)) {
            this.onRowMouseOut(e);
        }
    },
    
	onMouseOver: function(e){
    	if (e.rowIndex==null || !e.cell) return;
    	if (e.rowIndex >= 0) {
			this.enableTooltip&&this._enableTooltip(e);
    		this.onCellMouseOver(e.cell, e.rowIndex);
    	}
    },
    
    _enableTooltip: function(e){
		this._toolTipTimer=setTimeout(dojo.hitch(this,function(){
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
				tooltipHTML = innerHTML = cellNode.childNodes[0].innerHTML;
			innerHTML=cellNode.childNodes[0].innerHTML;
			innerHTML = "<DIV class=\"u-grid-text\">" +innerHTML+ "</DIV>";
			this._globalSpan.innerHTML = innerHTML;
			paddingRight=parseInt(dojo.getComputedStyle(cellNode.childNodes[0]).paddingRight);//火狐下tooltip报脚本错误问题 见U_EAP00008619
			var cellNodeWidth = dojo.contentBox(cellNode).w;
			var showToolTip = dojo.contentBox(this._globalSpan).w-paddingRight>cellNodeWidth;
			//解决IE6下显示tooltip出现滚动条的问题 见U_EAP00008377
			dojo.isIE==6&&dojo.style(this._globalSpan,"display","none");
			//判断cellNodeWidth是否为0，解决新表格在滚动鼠标滑轮时cellNode宽度为0出现toolTip的bug 见U_EAP00021303
			if(showToolTip && 0 != cellNodeWidth){
				tooltipHTML = "<DIV style='padding: 0 5px 0 5px;vertical-align: middle;word-wrap: break-word;overflow: hidden;height:100%;'>" +tooltipHTML+ "</DIV>";
				unieap.showTooltip(tooltipHTML,cellNode);
			}
			
		}),150);
	},
	
	_doContextMenu: function(e){
		if(isNaN(e.rowIndex) || null == e.rowIndex) return;
		this.onContextMenu(e.cell,e.cellNode,e.rowIndex);
		if(dojo.isIE){
			e.cellNode.oncontextmenu&&e.cellNode.fireEvent('oncontextmenu');
		}else{
			var evt=document.createEvent('HTMLEvents');
			evt.initEvent("contextmenu", false, false);
			e.cellNode.dispatchEvent(evt);
		}
	},
    
	onMouseOut: function(e){
    	if (e.rowIndex==null || !e.cell) return;
    	if (e.rowIndex >= 0) {
			this.enableTooltip&&this._disableTooltip(e);
    		this.onCellMouseOut(e.cell, e.rowIndex);
    	}
    	var rowManager = this.grid.RowManager;
    	rowManager.updateStyles(-1);
    },
    
    _disableTooltip: function(e){
		clearTimeout(this._toolTipTimer);
		this._globalSpan&&unieap.hideTooltip(e.cellNode);
	},
    
	//鼠标按下事件
	_onMousedown: function(e) {
		if (e.cell) {
			this.onCellMousedown(e.cell, e.rowIndex);
		}
		if (isNaN(e.rowIndex)) {
			return;
		}
		this.onRowMousedown(e);
		var rowManager = this.grid.RowManager;
		rowManager.updateCurrentRow(Number(e.rowIndex));
	},
	//鼠标释放事件
	_onMouseup: function(e) {
		if (e.cell) {
			this.onCellMouseup(e.cell, e.rowIndex);
		}
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
		var rowManager = this.grid.RowManager;
		if (isNaN(e.rowIndex)) {
			return;
		}
		this.onRowClick(e);
		rowManager.updateCurrentRow(Number(e.rowIndex));
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
	/**
	 * @summary:
	 * 		在单元格上点击事件
	 * @description:
	 * 		对于合并单元格，请在unitedCell属性上设置onCellClick属性
	 * @param:
	 * 		{unieap.xgrid.Cell} inCell 
	 * @param:
	 * 		{number} inRowIndex
	 * @example:
	 * |function fn(cell,index){}
	 * |<div dojoType='unieap.xgrid.Grid' views="{onCellClick:fn}"></div>
	 */
    onCellClick: function(inCell, inRowIndex) {
    },
	/**
	 * @summary:
	 * 		在单元格上双击事件
	 * @description:
	 * 		对于合并单元格，请在unitedCell属性上设置onCellDblClick属性
	 * @param:
	 * 		{unieap.xgrid.Cell} inCell 
	 * @param:
	 * 		{number} inRowIndex
	 * @example:
	 * |function fn(cell,index){}
	 * |<div dojoType='unieap.xgrid.Grid' views="{onCellDblClick:fn}"></div>
	 */
    onCellDblClick: function(inCell, inRowIndex) {
    },
	 /**
     * @summary:
     * 		单元格上鼠标按下事件
     * @param:
     * 		{unieap.xgrid.Cell} inCell 单元格对象
     * @param:
     * 		{number} rowIndex 行索引号
     * @example:
     * |function fn(cell,index){}
     * |<div dojoType='unieap.xgrid.Grid' views="{onCellMousedown:fn}"></div>
     */
    onCellMousedown: function(inCell, inRowIndex) {
    },
     /**
     * @summary:
     * 		单元格上鼠标经过事件
     * @param:
     * 		{unieap.xgrid.Cell} inCell 单元格对象
     * @param:
     * 		{number} rowIndex 行索引号
     * @example:
     * |function fn(cell,index){}
     * |<div dojoType='unieap.xgrid.Grid' views="{onCellMouseOver:fn}"></div>
     */
    onCellMouseOver: function(inCell,rowIndex) {
    },
    /**
     * @summary:
     * 		单元格上鼠标移出事件
     * @param:
     * 		{unieap.xgrid.Cell} inCell 单元格对象
     * @param:
     * 		{number} rowIndex 行索引号
     * @example:
     * |function fn(cell,index){}
     * |<div dojoType='unieap.xgrid.Grid' views="{onCellMouseOut:fn}"></div>
     */
    onCellMouseOut: function(inCell,rowIndex) {
    },
    /**
	 * @summary:
	 * 		鼠标移出Grid表头事件
	 * @param:
	 * 		{event} evt
	 * @example:
	 * |function fn(evt){unieap.debug(evt)}
	 * |<div dojoType='unieap.xgrid.Grid' views="{onHeaderMouseOut:fn}"></div>
	 */
    onHeaderMouseOut: function(evt) {
    },
    /**
	 * @summary:
	 * 		鼠标移出Grid的某一行事件
	 * @param:
	 * 		{event} evt
	 * @example:
	 * |function fn(evt){unieap.debug(evt)}
	 * |<div dojoType='unieap.xgrid.Grid' views="{onRowMouseOut:fn}"></div>
	 */
    onRowMouseOut: function(evt) {
    },
    /**
	 * @summary:
	 * 		鼠标滑过Grid的某一行事件
	 * @param:
	 * 		{event} evt
	 * @example:
	 * |function fn(evt){unieap.debug(evt)}
	 * |<div dojoType='unieap.xgrid.Grid' views="{onRowMouseOver:fn}"></div>
	 */
    onRowMouseOver: function(evt) {
    },
    /**
	 * @summary:
	 * 		在Grid的某一行上鼠标按下事件
	 * @param:
	 * 		{event} evt
	 * @example:
	 * |function fn(evt){unieap.debug(evt)}
	 * |<div dojoType='unieap.xgrid.Grid' views="{onRowMousedown:fn}"></div>
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
	 * |<div dojoType='unieap.xgrid.Grid' views="{onRowMouseup:fn}"></div>
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
	 * |<div dojoType='unieap.xgrid.Grid' views="{onRowClick:fn}"></div>
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
	 * |<div dojoType='unieap.xgrid.Grid' views="{onRowDblClick:fn}"></div>
	 */
    onRowDblClick: function(evt) {
    },
	/**
	 * @summary:
	 * 		列表头鼠标点击事件
	 * @param:
	 * 		{unieap.xgrid.Cell} inCell 列对象
	 * @example:
	 * |function fn(inCell){unieap.debug(inCell)}
	 * |<div dojoType='unieap.xgrid.Grid' views="{onHeaderCellClick:fn}"></div>
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
	 * |<div dojoType='unieap.xgrid.Grid' views="{onHeaderClick:fn}"></div>
	 */
    onHeaderClick: function(evt) {
    },
	/**
	 * @summary:
	 * 		列表头鼠标按下事件
	 * @param:
	 * 		{unieap.xgrid.Cell} inCell 列对象
	 * @example:
	 * |function fn(inCell){unieap.debug(inCell)}
	 * |<div dojoType='unieap.xgrid.Grid' views="{onHeaderCellMousedown:fn}"></div>
	 */
    onHeaderCellMousedown: function(inCell) {
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
	 * |<div dojoType='unieap.xgrid.Grid' views="{onHeaderRender:fn}"></div>
	 */
    onHeaderRender : function(node ,inView){
    },
	/**
	 * @summary:
	 * 		表头鼠标按下事件
	 * @param:
	 * 		{event} evt 
	 * @example:
	 * |function fn(inCell){unieap.debug(inCell)}
	 * |<div dojoType='unieap.xgrid.Grid' views="{onHeaderMousedown:fn}"></div>
	 */
    onHeaderMousedown: function(e) {
    },
    /**
     * @summary:
     * 		在单元格上点击右键时触发
     * @param:
     * 		{unieap.grid.Cell} cell
     * @param:
     * 		{domNode} cellNode
     * @param:
     * 		{number} inRowIndex
     * @example:
     * |<div dojoType="unieap.xgrid.Grid" views="{onContextMenu:fn}">
     * |	...
     * |</div>
     * |<script type="text/javascript">
     * |	var menu;
     * |	function fn(cell,cellNode,inRowIndex){
     * |		if(!menu){
     * |			menu=new unieap.menu.Menu({style:'display:none'});
     * |			menu.addChild(new unieap.menu.MenuItem({label:'你好'}));
     * |			menu.addChild(new unieap.menu.MenuItem({label:'基础软件'}));
     * |			menu.startup();
     * |			menu.popup();
     * |		}
     * |		menu.bindDomNode(cellNode);
     * |	}
     * |</script>
     * @img:
     * 		images/grid/views/contextmenu.png
     */
	onContextMenu:function(cell,cellNode,inRowIndex){
	}
});