dojo.provide('unieap.xgrid.core.scroller');
dojo.declare('unieap.xgrid.Scroller', null, {
	//纵向滚动条控制器高度
	yScrollBarHandleHeight:null,
	//横向滚动条控制器长度
	xScrollBarHandleWidth:null,
	//纵向滚动条控制器
	yScrollHandle:null,
	//横向滚动条控制器
	xScrollHandle:null,
	constructor: function(viewManager) {
		this.connects = [];
		this.viewManager = viewManager;
		this.scrollView = viewManager.getScrollView();
		var grid = this.grid = viewManager.grid,wheelEvent;
		this.rowHeight = grid.getRowManager().defaultRowHeight;
		this.yScrollHandle = grid.yscrollerHandle;
		this.xScrollHandle = grid.xscrollerHandle;
		dojo.setSelectable(grid.yscrollerNode,false);
		dojo.setSelectable(grid.xscrollerNode,false);
		this.connects.push(dojo.connect(grid.yscrollerNode,"onmouseup",this,function(event){
			this._scrollBarMouseUp(event);
			dojo.stopEvent(event);
		}));
		this.connects.push(dojo.connect(grid.yscrollerNode,"onmousedown",this,function(event){
			var className = event.target.className;
			switch(className){
				case "y-scroller-up" :
					this._scrollBarClickUp(event);
					break;
				case "y-scroller-down" :
					this._scrollBarClickDown(event);
					break;
				default :
					if(/y-scroller-handle/.test(className)){
						this._forYMouseDown(event);
					}
			}
			dojo.stopEvent(event);
		}));
		dojo.isFF ? wheelEvent = "DOMMouseScroll" : wheelEvent = "onmousewheel";
		this.connects.push(dojo.connect(grid.viewsNode,wheelEvent,this,function(event){
				this._wheelListener(event);
				dojo.stopEvent(event);
			}));
		this.connects.push(dojo.connect(grid.xscrollerNode,"onmouseup",this,function(event){
			this._scrollBarMouseUp(event);
			dojo.stopEvent(event);
		}));
		this.connects.push(dojo.connect(grid.xscrollerNode,"onmousedown",this,function(event){
			var className = event.target.className;
			switch(className){
				case "x-scroller-up" : 
					this._scrollBarClickLeft(event);
					break;
				case "x-scroller-down" : 
					this._scrollBarClickRight(event);
					break;
				default : 
					if(/x-scroller-handle/.test(className)){
						this._forXMouseDown(event);
					}
			}
			dojo.stopEvent(event);
		}));
	},
	//计算纵向滚动条高度
	_calYScrollHeight : function(){
		var snapshot = this.scrollView.snapshot,
			h = snapshot.viewContentHeight,H = snapshot.totalRowHeight;
		return h*(h-2*16)/H; 
	},
	//计算横向滚动条宽度
	_calXScrollWidth : function(){
		var snapshot = this.scrollView.snapshot,
			w = snapshot.viewContentWidth,W = this._calHeaderWidth();
		return w*(w-2*16)/W;
	},
	//设置纵向滚动条的最小高度
	_setYScrollBarHandleHeight : function() {
		this.yScrollBarHandleHeight = this._calYScrollHeight();
		if(this.yScrollBarHandleHeight > 15) { 
			dojo.style(this.yScrollHandle,"height",this.yScrollBarHandleHeight + "px");
		}else { 
			this.yScrollBarHandleHeight = 15; 
			dojo.style(this.yScrollHandle,"height",15+"px");
		}
	},
	//设置横向滚动条的最小长度
	_setXScrollBarHandleWidth : function(){
		this.xScrollBarHandleWidth = this._calXScrollWidth();
		if(this.xScrollBarHandleWidth > 15) { 
			dojo.style(this.xScrollHandle,"width",this.xScrollBarHandleWidth + "px");
		}else { 
			this.xScrollBarHandleWidth = 15; 
			dojo.style(this.xScrollHandle,"width",15+"px");
		}
	},
	//计算纵向滚动条步长
	_calYScrollStep : function(){
		var snapshot = this.scrollView.snapshot;
		if(snapshot.rowCount>snapshot.showRows){
			var step = (snapshot.viewContentHeight + this.lockedHeight-2*16-this.yScrollBarHandleHeight)/(snapshot.rowCount-snapshot.showRows);
			return step;
		}
		return null;
	},
	//计算表头header的总长度
	_calHeaderWidth : function(){
		return this.scrollView.getRealWidth();
	},
	_moveYScroll:null,
	//移动纵向滚动条
	_forYMouseDown : function(e){
		var snapshot = this.scrollView.snapshot,
			y_currentIndex = snapshot.beginRowIndex;
		this.yScrollHandle.setCapture && this.yScrollHandle.setCapture();
		var y =e.clientY;
		var _top = dojo.style(this.yScrollHandle,"top") || (this.yScrollHeight - 16 - this.yScrollBarHandleHeight);
		this.dcmhandle = dojo.connect(document,"onmousemove",this,function(e){
			this._yHandleMove(e,y,_top,y_currentIndex);
		});
		this.dcuhandle = dojo.connect(document,"onmouseup",this,function(e){
			this.yScrollHandle.releaseCapture && this.yScrollHandle.releaseCapture();
			dojo.disconnect(this.dcmhandle);
			dojo.disconnect(this.dcuhandle);
		});
	},
	_yHandleMove : function(e,y,_top,y_currentIndex){
		clearTimeout(this._moveYScroll);
		var step =  this._calYScrollStep(),
			topValue=_top+ (e.clientY-y),
			view = this.scrollView,
			snapshot = view.snapshot;
		function calRowIndex(step){
			var yNow_top = dojo.style(this.yScrollHandle,"top") || (this.yScrollHeight - 16 - this.yScrollBarHandleHeight);
			var moveLength=yNow_top-_top;
			var moveIndex;
			if(step == null){
				moveIndex = 0;
			}else{
				moveIndex=Math.floor(moveLength/step);
			}
			dojo.style(this.yScrollHandle,"top",_top+(e.clientY-y)+"px");
			snapshot.beginRowIndex=y_currentIndex+moveIndex;
		};
		if(e.clientY > y){
			var h = snapshot.viewContentHeight + this.lockedHeight;
//			var h = snapshot.viewContentHeight;
			if(topValue>(h-16-this.yScrollBarHandleHeight)){
				dojo.style(this.yScrollHandle,"top","auto");
				dojo.style(this.yScrollHandle,"bottom","16px");
				snapshot.beginRowIndex=snapshot.rowCount-snapshot.showRows;
				var tableHeight = snapshot.showRows * (this.rowHeight+1);
				if(tableHeight > snapshot.viewContentHeight){
					snapshot.lastRow = true;
				}
			}else{
				calRowIndex.call(this,step);
			}
		}else{
			if(snapshot.lastRow){
				snapshot.lastRow = false;
			}
			if(topValue<=16){
				dojo.style(this.yScrollHandle,"top",16+"px");
				snapshot.beginRowIndex = 0;
			}else{
				calRowIndex.call(this,step);
			}
		}
		this._moveYScroll = setTimeout(dojo.hitch(this,function(){
			this.viewManager.doYScroll();
		}),10);
		this.doEditVerticalScroll();
	},
	//判断是否移动纵向滚动条位置
	calYStep:function(){
		var step;
		if(this.step){
			step = this.step;
		}else{
			step = this.step = parseFloat(this._calYScrollStep());
		}
		if(!this.ystep){
			this.ystep = step;
		}
	},
	_scrollBarMouseUp : function(e){
		this.handleDown && clearTimeout(this.handleDown);
		this.handleUp && clearTimeout(this.handleUp);
		this.handleLeft && clearTimeout(this.handleLeft);
		this.handleRight && clearTimeout(this.handleRight);
		this.yScrollHandle.releaseCapture && this.yScrollHandle.releaseCapture();
		this.xScrollHandle.releaseCapture && this.xScrollHandle.releaseCapture();
		this.dcmhandle && dojo.disconnect(this.dcmhandle);
		this.dcuhandle && dojo.disconnect(this.dcuhandle);
	},
	//点击纵向滚动条向下滚动
	_scrollBarClickDown : function(e) {
		var snapshot = this.scrollView.snapshot,
			h = snapshot.viewContentHeight + this.lockedHeight,
			self = this;
		if(e){
			this.step = null;
			this.calYStep();
			snapshot.beginRowIndex++;
			var documentUp = dojo.connect(document,"onmouseup",this,function(){
				clearTimeout(this.handleDown);
				dojo.disconnect(documentUp);
			});
			this.handleDown=setTimeout(dojo.hitch(self,function(){self._scrollBarClickDown(e);}),150);
		}
		if(snapshot.beginRowIndex+snapshot.showRows<=snapshot.rowCount){
			var yscrollBarHandleTop = dojo.style(this.yScrollHandle,"top");
			if(this.ystep >= 1){
				if(yscrollBarHandleTop+this.yScrollBarHandleHeight+16+this.ystep<h){
					dojo.style(this.yScrollHandle,"top",yscrollBarHandleTop+this.ystep+"px");
				}else{
					snapshot.beginRowIndex=snapshot.rowCount-snapshot.showRows;
					dojo.style(this.yScrollHandle,"top","auto");
					dojo.style(this.yScrollHandle,"bottom","16px");
					snapshot.lastRow = true;
				}
				this.ystep = null;
			}else{
				this.ystep += this.step;
			}
		}else{
			snapshot.beginRowIndex=snapshot.rowCount-snapshot.showRows;
			snapshot.lastRow = true;
			dojo.style(this.yScrollHandle,"top","auto");
			dojo.style(this.yScrollHandle,"bottom","16px");
		}
		this.viewManager.doYScroll();
		this.doEditVerticalScroll();
	},
	//点击纵向滚动条向上滚动
	_scrollBarClickUp : function(e){
		var self = this,
			snapshot = this.scrollView.snapshot;
		if(snapshot.lastRow){
			dojo.style(this.yScrollHandle,"bottom","auto");
			if(0 >= snapshot.beginRowIndex){
				dojo.style(this.yScrollHandle,"top","16px");
			}else{
				var ytop = dojo.style(this.yScrollHandle,"top") || (this.yScrollHeight - 16 - this.yScrollBarHandleHeight);
				dojo.style(this.yScrollHandle,"top",ytop+"px");
			}
			snapshot.lastRow = false;
		}
		if(0 == snapshot.beginRowIndex){
			dojo.style(this.yScrollHandle,"top","16px");
			return;
		}else if(snapshot.beginRowIndex < 0){
			this.scrollView.snapshot.beginRowIndex = 0;
			dojo.style(this.yScrollHandle,"top","16px");
		}	
		if(e){
			this.step = null;
			this.calYStep();
			snapshot.beginRowIndex--;
			var documentUp = dojo.connect(document,"onmouseup",this,function(){
				clearTimeout(this.handleUp);
				dojo.disconnect(documentUp);
			});
			this.handleUp=setTimeout(dojo.hitch(self,function(){self._scrollBarClickUp(e);}),150);
		}
		if(snapshot.beginRowIndex > 0){
			var yscrollBarHandleTop = parseFloat(dojo.style(this.yScrollHandle,"top"));
			if(this.ystep >= 1){
				if(yscrollBarHandleTop-16>this.ystep){
					dojo.style(this.yScrollHandle,"top",yscrollBarHandleTop-this.ystep+"px");
				}else{
					dojo.style(this.yScrollHandle,"top","16px");
				}
				this.ystep = null;
				this.step = null;
			}else{
				this.ystep += this.step;
			}
		}
		this.viewManager.doYScroll();
		this.doEditVerticalScroll();
	},
	//鼠标滚轮事件
	_wheelListener : function(e){
		var snapshot = this.scrollView.snapshot,wheelDelta;
		if(!snapshot.yscroller){return;}
		if(e.wheelDelta) { 
			wheelDelta = e.wheelDelta/120; 
		}else if(e.detail) { 
			wheelDelta = -e.detail/3; 
		}
		//步长设每次移动4行数据
		var step = this.step = 4 * this._calYScrollStep();
		if(!this.ystep){
			this.ystep = step;
		}
		if(wheelDelta > 0) { 
			this.scrollView.snapshot.beginRowIndex -= 4; 
			this._scrollBarClickUp();
		}else {
			this.scrollView.snapshot.beginRowIndex += 4; 
			this._scrollBarClickDown();
		}
	},
	//点击横向滚动条向右移动
	_scrollBarClickRight : function(edit){
		var self = this,
			view = this.scrollView,
			snapshot = view.snapshot;
		if(snapshot.lastCell){
			return;
		}
		snapshot.beginCellIndex++;
		while(view.structure.rows[0][snapshot.beginCellIndex] && view.structure.rows[0][snapshot.beginCellIndex].hidden){
			snapshot.beginCellIndex++;
		}
		var visibleWidth = this.calShowCells();
		//倒数第二个单元格宽度很大
		if(visibleWidth<=snapshot.viewContentWidth){
			snapshot.beginCellIndex--;
			snapshot.showCells++;
			snapshot.lastCell = true;
		}
		if(snapshot.lastCell){
			dojo.style(this.xScrollHandle,"left","auto");
			dojo.style(this.xScrollHandle,"right","16px");
		}else{
			this.posX();
		}
		view.renderContent();
		//add by zhengh 处理锁定行
		this.viewManager.renderLockedRow(false);
		this.doEditHorizontalScroll();
		if(1 == edit){
			this.grid.rowEdit.doLastTab();
			return;
		}
		var documentUp = dojo.connect(document,"onmouseup",this,function(){
			clearTimeout(this.handleRight);
			dojo.disconnect(documentUp);
		});
		this.handleRight = setTimeout(dojo.hitch(self,function(){self._scrollBarClickRight();}),150);
	},
	//点击横向滚动条向左移动
	_scrollBarClickLeft : function(){
		var self = this,
			view = this.scrollView,
			snapshot = view.snapshot;
		if(0==snapshot.beginCellIndex && !snapshot.lastCell){
			dojo.style(this.xScrollHandle,"left","16px"); 
			return;
		}
		if(snapshot.lastCell){
			dojo.style(this.xScrollHandle,"right","auto");
			snapshot.lastCell = false;
		}else{
			this.lastCell = false;
			snapshot.beginCellIndex--;
		}
		while(view.structure.rows[0][snapshot.beginCellIndex].hidden){
			snapshot.beginCellIndex--;
		}
		this.posX();
		this.calShowCells();
		view.renderContent();
		this.viewManager.renderLockedRow(false);
		this.doEditHorizontalScroll();
		var documentUp = dojo.connect(document,"onmouseup",this,function(){
			clearTimeout(this.handleLeft);
			dojo.disconnect(documentUp);
		});
		this.handleLeft = setTimeout(dojo.hitch(self,function(){self._scrollBarClickLeft();}),150);
	},
	//移动横向滚动条
	_forXMouseDown : function(e){
		var snapshot = this.scrollView.snapshot,
			x =e.clientX,
			_left = dojo.style(this.xScrollHandle,"left") || (this.xScrollWidth - 16 - this.xScrollBarHandleWidth);
		this.x_currentIndex = snapshot.beginCellIndex;
		this.x_lastCell = snapshot.lastCell;
		this.xScrollHandle.setCapture && this.xScrollHandle.setCapture();
		this.dcmhandle = dojo.connect(document,"onmousemove",this,function(e){
			this._xHandleMove(e,x,_left);
		});
		this.dcuhandle = dojo.connect(document,"onmouseup",this,function(e){
			this.xScrollHandle.releaseCapture && this.xScrollHandle.releaseCapture();
			dojo.disconnect(this.dcmhandle);
			dojo.disconnect(this.dcuhandle);
		});
	},
	_xHandleMove : function(e,x,_left){
		clearTimeout(this._moveXScroll);
		var leftValue=_left+ (e.clientX-x),
			view = this.scrollView,
			snapshot = this.scrollView.snapshot;
		if(leftValue>=(this.xScrollWidth - 16 - this.xScrollBarHandleWidth)){
			snapshot.lastCell = true;
			this.calCellIndex();
			dojo.style(this.xScrollHandle,"left",(this.xScrollWidth - 16 - this.xScrollBarHandleWidth)+"px");
		}else if(leftValue<=16){
			snapshot.lastCell = false;
			snapshot.beginCellIndex  = 0;
			dojo.style(this.xScrollHandle,"left","16px");
			dojo.style(this.xScrollHandle,"right","auto");
		}else{
			snapshot.lastCell = false;
			dojo.style(this.xScrollHandle,"left",leftValue+"px");
			var scrollWidth = (this._calHeaderWidth() - snapshot.viewContentWidth) * (leftValue - 16) / (this.xScrollWidth - 32 - this.xScrollBarHandleWidth),
				visibleWidth = 0;
			for(var i=0,cell;cell=view.cells[i];i++){
				visibleWidth+=cell.getPixelWidth();
				if(visibleWidth>=scrollWidth){
					snapshot.beginCellIndex  = i;
					break;
				}
			}
		}
		if(this.x_currentIndex==snapshot.beginCellIndex){ 
			if(this.x_lastCell == snapshot.lastCell){
				return;
			}
		}
		this.calShowCells();
		snapshot.scrollWidth =  this.getScrollWidth();
		this._moveXScroll = setTimeout(dojo.hitch(this,function(){	
			this.scrollView.renderContent();
			this.viewManager.renderLockedRow(false);
			this.doEditHorizontalScroll();
			this.x_currentIndex = snapshot.beginCellIndex;
			this.x_lastCell = snapshot.lastCell;
		}),10);
	},
	
	//点击纵向滚动条时关于编辑器的处理
	doEditVerticalScroll: function(){
		var gridRowEdit = this.grid.rowEdit;
		if(gridRowEdit){
			gridRowEdit.clickVerticalScroll();
		}
	},
	
	//点击横向滚动条时关于行编辑的处理
	doEditHorizontalScroll: function(){
		var snapshot = this.scrollView.snapshot,
			gridRowEdit = this.grid.rowEdit;
		if(gridRowEdit){
			gridRowEdit.clickScroll = true;
			var setIndex = gridRowEdit.styleIndex;
			gridRowEdit.applyEdit();
			this.viewManager.getScrollView().contentBuilder.getRowEdit(setIndex+snapshot.beginRowIndex);
			if(snapshot.lastCell){
				gridRowEdit.doLastCell();
			}
		}
	},
	
	//确保rowIndex行可见
	visualizeRow: function(rowIndex){
		var snapshot = this.scrollView.snapshot;
		if (isNaN(rowIndex))return;
		if((snapshot.beginRowIndex < rowIndex) && (rowIndex < (snapshot.beginRowIndex+snapshot.showRows-1)))	return ;
		if(rowIndex<snapshot.beginRowIndex){
			snapshot.beginRowIndex = rowIndex;
		}
		if(rowIndex>=(snapshot.beginRowIndex+snapshot.showRows-1)){
			snapshot.beginRowIndex += rowIndex-(snapshot.beginRowIndex+snapshot.showRows);
			snapshot.beginRowIndex += 2;
			if(snapshot.beginRowIndex>snapshot.rowCount)snapshot.beginRowIndex=0;
		}
		if(this.grid.rowEdit){
			this.grid.rowEdit.noRefreshEdit = true;
		}
		this.grid.getManager("ViewManager").refreshPage();
	},
	//计算表格横向滚动出去的长度
	getScrollWidth : function(){
		var scrollWidth = 0,
			snapshot = this.scrollView.snapshot,
		//多标题，后面有跨行的header，用contentStructure来计算移动的头部
			view = this.scrollView,
			row = [];
		if(view.contentStructure.rows){
			row = view.contentStructure.rows[0];
		}else{
			row = this.scrollView.cells;
		}
		for(var i=0;i<snapshot.beginCellIndex;i++){
			if(!row[i].hidden){
				scrollWidth+= row[i].getPixelWidth();
			}
		}
		return scrollWidth;
	},
	//计算横向滚动条left值
	posX : function(){
		var scrollWidth = this.getScrollWidth(),
			snapshot = this.scrollView.snapshot,
			headerWidth = this._calHeaderWidth(),
			xScrollWidth = this.xScrollWidth - 32 - this.xScrollBarHandleWidth,_left;
			if(headerWidth > snapshot.viewContentWidth){
		 		_left = scrollWidth * xScrollWidth / (headerWidth - snapshot.viewContentWidth) + 16;
			}else{
				_left = 16;
			}
		dojo.style(this.xScrollHandle,"left",_left+"px");
		snapshot.scrollWidth = scrollWidth;
	},
	resize : function(height){
		var snapshot = this.scrollView.snapshot,
			grid = this.grid;
		this.lockedHeight = height || 0;
		this.yScrollHeight = snapshot.viewHeight + this.lockedHeight;
		this.xScrollWidth = snapshot.gridWidth;
		dojo.style(grid.yscrollerNode,"display",snapshot.yscroller ? "block" : "none");
		dojo.style(grid.xscrollerNode,"display",snapshot.xscroller ? "block" : "none");
		dojo.style(grid.headerCorner,"display",snapshot.yscroller ? "block" : "none");
		dojo.style(grid.contentCorner,"display",(snapshot.xscroller  && snapshot.yscroller) ? "block" : "none");
		if(snapshot.yscroller && snapshot.xscroller){
			this.yScrollHeight = this.yScrollHeight - grid.scrollerOffset;
			this.xScrollWidth = this.xScrollWidth - grid.scrollerOffset;
		}
		dojo.style(grid.yscrollerNode,"height",this.yScrollHeight+"px");
		dojo.style(grid.xscrollerNode,"width",this.xScrollWidth+"px");
		if(snapshot.yscroller){
			this._setYScrollBarHandleHeight();
			if(snapshot.lastRow){
				dojo.style(this.yScrollHandle,"top","auto");
				dojo.style(this.yScrollHandle,"bottom","16px");
				snapshot.beginRowIndex = snapshot.rowCount - Math.ceil(snapshot.viewContentHeight / this.rowHeight);
			}else{
				var ystep = this._calYScrollStep();
				if(ystep != null){
					ystep *= snapshot.beginRowIndex;
				}else{
					ystep = 0;
				}
				var yOffSet = ystep+grid.scrollerOffset;
				dojo.style(this.yScrollHandle,"top",yOffSet+"px");
			}
		}else{
			snapshot.lastRow = false;
		}
		if(snapshot.xscroller){
			this._setXScrollBarHandleWidth();
			if(snapshot.lastCell){
				dojo.style(this.xScrollHandle,"left","auto");
				dojo.style(this.xScrollHandle,"right","16px");
				this.calCellIndex();
			}else{
				this.posX();
			}
		}else{
			snapshot.beginCellIndex = 0;
			snapshot.scrollWidth = 0;
			snapshot.lastCell = false;
		}
		this.viewManager.doYScroll();
	},
	//计算可以显示的列数
	calShowCells : function(){
		var snapshot = this.scrollView.snapshot,
			visibleWidth = 0,
			//用contentStructure.rows带顺序的cells来代替原来的cells（按照html里row，cell书写顺序）
			view = this.scrollView, 
			rows = view.contentStructure.rows,
			row = rows[0];
		snapshot.showCells = 0;
		for(var i=snapshot.beginCellIndex,cell;cell=row[i];i++){
			snapshot.showCells++;
			visibleWidth+=cell.getPixelWidth();
			if(visibleWidth>snapshot.viewContentWidth){
				break;
			}
		}
		if(snapshot.lastCell && snapshot.beginCellIndex < this.scrollView.cells.length-1){
			snapshot.showCells = this.scrollView.cells.length - snapshot.beginCellIndex;
		}
		return visibleWidth;
	},
	//计算列索引
	calCellIndex : function(){
		var visibleWidth = 0,
			snapshot = this.scrollView.snapshot,
			view = this.scrollView,
			rows = view.contentStructure.rows,
			row = rows[0];
		snapshot.beginCellIndex = view.cells.length ;
		for(;visibleWidth<snapshot.viewContentWidth;){
			snapshot.beginCellIndex --;
			if(row){
				visibleWidth+= row[snapshot.beginCellIndex].getPixelWidth();
			}else{
				visibleWidth+= view.cells[snapshot.beginCellIndex].getPixelWidth();
			}
		}
	},
	destory : function(){
		while(this.connects.length){
			dojo.disconnect(this.connects.pop());
		}
	},
	updateContentHeight: function(dataLength,flag){
		if(flag){
			var snapshot = this.scrollView.snapshot;
			snapshot.showRows -= dataLength;
			this.resize(this.rowHeight*dataLength);	
		}else{
			return;
		}
	}
});
