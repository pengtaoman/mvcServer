dojo.provide('unieap.xgrid.core.RowEdit');
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.declare('unieap.xgrid.RowEdit', [dijit._Widget, dijit._Templated], {
	//标记是否在编辑
	editing: false,
	//标记是否由外部来设置编辑行
	setEditting:false,
	
	templateString:
	 			 "<div class='xgrid-rowedit-container' dojoAttachPoint='firstNode' style='display:none'>"+
	 			 	"<div class='xgrid-rowedit-edit' dojoAttachPoint='editNode'>"+
	 			 		"<div class='xgrid-rowedit-lockedview' dojoAttachPoint='lockViewNode'>"+"</div>"+
	 			 		"<div class='xgrid-rowedit-unlockedviewcontent' dojoAttachPoint='unlockedviewcontentNode'>"+
	 			 			"<div class='xgrid-rowedit-unlockedview' dojoAttachPoint='unlockViewNode'>"+
	 			 			"</div>"+
	 			 		"</div>"+
	 			 	"</div>"+
	 			 "</div>",
	
	postCreate: function() {
		this.inherited(arguments);
		this.grid = this.view.grid;
		this.rowManager = this.grid.getRowManager();
		var gridDomNode = this.grid.domNode;
		dojo.place(this.domNode,gridDomNode);
		this.lockingColNo = 0;
		var wheelEvent = dojo.isFF ?"DOMMouseScroll":"onmousewheel";
		this.link = dojo.connect(this.firstNode,wheelEvent,this,function(event){
				this.grid.getManager("ViewManager").scroller._wheelListener(event);
				dojo.stopEvent(event);
			});
		if(!this.setEditting)this.initEdit();
	},
	
	//slide控制动画开关，在单击时候调用initEdit(1),tabbing为是否是tab键按下并到最后一个编辑格，如果是index加1
	//并且这个时候不需要再重新获取当前行。
	initEdit: function(slide,tabbing){
		this.unableEdit = false;
		this.noRefreshEdit = false;
		//用于IE8、9中最有一个cell在快捷键聚焦时位置移动情况，在改变窗口大小但显示列不变时，需要重新调整cell宽度
		this.adjustLastCellWidth = false;
		var snapshot = this.grid.getViewManager().getScrollView().snapshot,
			rowManager = this.rowManager,
			rowEditManager = this.grid.getRowEditManager();
		//editShowCells用于判断当调整窗口大小时，是否需要重新渲染编辑器
		this.editShowCells = snapshot.showCells;
		//如果有滚动条移动则不刷新Row，因为滚动条移动已经刷新page
		if(this.editing && !this.clickScroll && this.styleIndex>=0){
			//当窗口大小改变时，可能出现横向滚动条的有无，这样可能会影响到可显示的行数，有可能styleIndex超出可显示的行数导致错误
			if(this.styleIndex > snapshot.showRows-1){
				this.styleIndex = snapshot.showRows-1;
			}
			this.grid.getManager("ViewManager").refreshRow(this.styleIndex);
		}
		if(!tabbing){
			//如果this.setEditting为真，用setEdit中参数设置编辑的行index
			if(true != this.setEditting){
				this.index = rowManager.getCurrentRowIndex();
			}
			this.styleIndex = this.index - snapshot.beginRowIndex;
		}else{
			var rowNumber = rowManager.getRowCount();
			if((this.index+1) >= rowNumber) return;
			this.index++;
			this.styleIndex++;
			rowEditManager._visualizeRow(this.index,tabbing);
		}
		if(rowEditManager.onBeforeEdit && !rowEditManager.onBeforeEdit(this.index)){
			 this.unableEdit = true;
			 this.editing = false;
			 this._exit();
			 return;
		}
		var viewManager = this.grid.getManager("ViewManager"),
			headerHeight = viewManager.getHeaderHeight();
		var unlockedviewWidth = viewManager.getScrollView().getRealWidth(snapshot.beginCellIndex,snapshot.showCells);
			if("string" == typeof(unlockedviewWidth) && -1 != unlockedviewWidth.indexOf("%")){
				unlockedviewWidth = snapshot.viewContentWidth;
			}
		var	lockedviewWidth = this.getLockEditWidth(),
			editOffset=this.getLeft(),
			editOffsetTop = 0,
			//editNodeWidth = lockedviewWidth + unlockedviewWidth,
		    editNodeheight = rowManager.defaultRowHeight+9;
	    editOffsetTop += headerHeight;
		editOffsetTop += this.styleIndex * rowManager.defaultRowHeight;
		editOffsetTop -= 5;
		//slide = false;
		if(slide){
			if(true == snapshot.lastRow){
				dojo.style(this.firstNode,{
					"left": editOffset+"px",
					"height": editNodeheight+"px"
				});	
				this.doLastRow();
			}else{
				dojo.require("dojo.fx");
				var self=this;
				dojo.fx.slideTo({duration:100,node:this.firstNode,left:editOffset,top:editOffsetTop,onEnd:function(){
					if(!this.clickScroll){
						self._addInputNode(); 
					}
				}}).play();
			}
			if((this.styleIndex<0) || (this.styleIndex>snapshot.showRows)){
				this.flagDisplay = "none";
				//dojo.style(this.firstNode,"display","none");
			}else{
				this.flagDisplay = "block";
				//dojo.style(this.firstNode,"display","block");
				if(true == snapshot.lastCell){
					this.doLastCell();
				}
			}
		}else{
			//如果编辑器在移动纵向滚动条时隐藏起来，这个时候调整列宽后，应该继续隐藏
			if((this.styleIndex<0) || (this.styleIndex>snapshot.showRows)){
				this.flagDisplay = "none";
			}else{
				this.flagDisplay = "block";
				dojo.style(this.firstNode,{
						//"display": "block",
						"left": editOffset+"px",
						"top": editOffsetTop+"px",
						"height": editNodeheight+"px"
				});	
			}
			//初始化editNode宽、高
			var temp = Math.min(unlockedviewWidth,snapshot.viewContentWidth);
			temp += lockedviewWidth;
			dojo.style(this.editNode,{//SUN
					"width": temp+"px",
					"height": editNodeheight+"px"
			});	
			//解决锁定列分割线问题，将锁定列宽多1px,在view，renderContent方法中IE和其他浏览器生成锁定列不一样，
			if(dojo.isIE){
				if(lockedviewWidth > 0){
					dojo.style(this.lockViewNode,{
						"width": lockedviewWidth-1+"px",
						"height": editNodeheight+"px"
					});
				}
				dojo.style(this.unlockedviewcontentNode,{
					"left": lockedviewWidth+"px",
					"width": snapshot.viewContentWidth+"px",
					"height": editNodeheight+"px"
				});
			}else{
				dojo.style(this.lockViewNode,{
					"width": lockedviewWidth+"px",
					"height": editNodeheight+"px"
				});
				dojo.style(this.unlockedviewcontentNode,{
					"left": lockedviewWidth+1+"px",
					"width": snapshot.viewContentWidth+"px",
					"height": editNodeheight+"px"
				});
			}
			dojo.style(this.unlockViewNode,{
				"width": unlockedviewWidth+"px",
				"height": editNodeheight+"px"
			});
			if(true == snapshot.lastRow){
				this.doLastRow();
			}
			if(true == snapshot.lastCell){
				this.doLastCell();
			}
			//如果移动纵向滚动条时，不用重新再加入input节点
			if(!this.clickScroll){
				this._addInputNode();
			}
		}
		//添加关闭按钮 
		//判断是否横向滚动条在最右边改变样式right:0px;left:auto;TODO
		if(!this.editing){
			this.closeNode = dojo.create("div");
			dojo.addClass(this.closeNode,"xgrid-rowedit-closeNodeDiv");
			dojo.style(this.closeNode,{
						"left": "0px"
					   });	
			dojo.place(this.closeNode,this.firstNode); 
			dojo.connect(this.closeNode,"onclick",this,this.applyEdit);  
		}
		this.editing = true;
		//当setEdit或者insertRow以后在单击触发编辑器时需要将setEditting设为false，否则不重新计算this.index
		this.setEditting = false;
		this.clickScroll = false;
		if("none" == this.flagDisplay){
			dojo.style(this.firstNode,"display","none");
		}else{
			dojo.style(this.firstNode,"display","block");
		}
		this.editedNode[0] && this.editedNode[0].focus();
	},
	
	//获取edit的宽度，包括锁定列和非锁定列
	getLockEditWidth: function(){
		var viewManager = this.grid.getManager("ViewManager");
		var editNodeWidth = 0;
		for(var i = 0,len = viewManager.views.length ; i<len; ++i){
			if(viewManager.views[i].noscroll && !viewManager.views[i].isRowBar){
				editNodeWidth += viewManager.views[i].getRealWidth();
			}
		}
		return editNodeWidth;
	},
	
	//获取rowbar宽度
	getLeft: function(){
		var viewManager = this.grid.getManager("ViewManager");
		if(viewManager.hasRowBar()){
			var left = viewManager.views[0].getRealWidth();
		}else{
			return 0;
		}
		return left;
	},
	
	//添加各个inputDiv
	_addInputNode: function() {
		var height = 23,
		    divTopOffset = Math.max(((this.rowManager.defaultRowHeight-15)/2)+1,1),
			viewManager = this.grid.getManager("ViewManager"),
			isLcokedView = 0;
		//记录编辑单元格
		this.editedCell = [];
		if(!this.editing){
			this.editedNode = [];
			this.inputDivNodes = [];
		}
		for(var i = 0 ,len = viewManager.views.length; i<len; ++i){
			if(viewManager.views[i].isRowBar){
				continue;
			}
			var data = viewManager.views[i].grid.getBinding().getDataStore().getRowSet().getRowData(this.index);
			var left = 0;
			this.bindRow = this.bindRow || new unieap.ds.Row(viewManager.views[i].grid.getBinding().getDataStore().getRowSet());
			this.bindRow.index = this.index;
			this.bindRow.data = data;
			var rows = viewManager.views[i].contentStructure.rows[0];
			if(viewManager.views[i].noscroll && !viewManager.views[i].isRowBar){
				this.lockingColNo = viewManager.views[i].cells.length;
				//处理关于隐藏列
				for(var ln=0 ,inlen=viewManager.views[i].cells.length; ln<inlen; ++ln){
					if(viewManager.views[i].cells[ln].hidden){
						this.lockingColNo--;
					}
				}
				if(this.lockingColNo > 0){
					isLcokedView = 1;
					dojo.addClass(this.lockViewNode,"xgrid-rowedit-splitter");
				}else{
					isLcokedView = 0;
				}
			}else{
				isLcokedView = 0;
			}
			var snapshot = viewManager.views[i].snapshot;
			var showCells = snapshot.showCells || rows.length;
			var unShowNow = 0;
			for(var j = 0; j<showCells;++j){
				var cellIndex = snapshot.beginCellIndex?j+unShowNow+snapshot.beginCellIndex:j+unShowNow;
				if(cellIndex >= rows.length) break;
				if(rows[cellIndex].hidden){
					unShowNow++;
					j--;
					continue;
				}
				if(!this.editing){
					this.inputDivNode = dojo.create("div");
					dojo.addClass(this.inputDivNode,"xgrid-rowedit-inputDiv");
					if(1 == isLcokedView){
						dojo.place(this.inputDivNode,this.lockViewNode);
					}else{
						dojo.place(this.inputDivNode,this.unlockViewNode);
					}
					this.inputDivNodes.push(this.inputDivNode);
				}else{
					this.inputDivNode = viewManager.views[i].noscroll?this.inputDivNodes[j]:this.inputDivNodes[j+this.lockingColNo];
				}
				var width = rows[cellIndex].getRealWidth();
				dojo.style(this.inputDivNode,{
					"top": divTopOffset+"px",
					"height": height+"px",
					"width": width+"px",
					"left": left+"px"
				});	
				//浏览器IE8及IE9，并且不是最后一列的非锁定视图，在可见区域中的最后一个时，把edit cell宽度变小
				if(dojo.isIE>7 && !snapshot.lastCell && 0 == isLcokedView && j == showCells -1){
					var unlockedviewWidth = viewManager.getScrollView().getRealWidth(snapshot.beginCellIndex,snapshot.showCells);
					if("string" == typeof(unlockedviewWidth) && -1 != unlockedviewWidth.indexOf("%")){
						unlockedviewWidth = snapshot.viewContentWidth;
					}
					var	tempWidth = unlockedviewWidth-snapshot.viewContentWidth,
						lastInputWidth = tempWidth>0?width-(unlockedviewWidth-snapshot.viewContentWidth)+4:width;
					dojo.style(this.inputDivNode,"width",lastInputWidth+"px");
					this.adjustLastCellWidth = true;
				}
				left += width;
				//添加input节点
				this.editedCell.push(rows[cellIndex]);	
				//第一次进入编辑状态，或者cell上配有onBeforeEdit，或者cell上没有editor时，进入_addValue
				if((!this.editing) || rows[cellIndex].onBeforeEdit || !rows[cellIndex].editor){
					this.inputDivNode.innerHTML ="";
					if(this.editing && dojo.isIE){
						rows[cellIndex].destroy();
					}
					this._addValue(this.index,rows[cellIndex],viewManager.views[i]);
				}
			}//end for (j)
		}//end for(i)
		if(!dojo.isIE || dojo.isIE >= 9){
			this._enter2Tab();
		}
		for(var i =0 ,cell;cell=this.editedCell[i];++i){
			cell.getEditor().getBinding().bind(this.bindRow);
		}
		//this.editedNode[0] && this.editedNode[0].focus();
	},
	
	//add text-box 如果cell没配有editor,或者cell配有onBeforeEdit并返回false这不创建text-box直接将单元格内容显示
	_addValue: function(index,inCell,view){
		if(!inCell.editor || (inCell.onBeforeEdit && !inCell.onBeforeEdit(index,inCell))){
			//如果此单元格不可编辑，在this.editedCell中移除此节点，否则在TAB和ENTER快捷键是判断是否是最有一个节点出错
			this.editedCell.pop();
			//删除this.editedNode中对应的节点（用于cell上配有onBeforeEdit的）
			for(var i = 0,len = this.editedNode.length; i<len; ++i){
				if(this.editedNode[i].editIndex == inCell.index){
					this.editedNode.splice(i,1);
					break;
				}
			}
			var tempValue = inCell.get(index),
				result = inCell._format(tempValue,index);
			this.inputDivNode.innerHTML = "<div class = 'xgrid-rowedit-cannotEdit'>"+ result+"</div>";
			//inCell.destroy();//SUN11.21
			return ;
		}
		var editor = this._getEditor(index, inCell);
		if (editor == null) return false;
		editor.editIndex = inCell.index;
		dojo.place(editor.domNode,this.inputDivNode);
		if(this.editing){
			//找到editor对应的位置
			for(var i = 0,len = this.editedNode.length; i<len; ++i){
				if(inCell.index == this.editedNode[i].editIndex){
					return;
				}
				if(inCell.index < this.editedNode[i].editIndex){
					break;
				}
			}
			this.editedNode.splice(i,0,editor);
		}else{
			this.editedNode.push(editor);
		}
	},
	
	//获得编辑器
	_getEditor: function(inRowIndex,inCell){
		if (!inCell.enable) return null;
		//获取当前编辑器对象
		var editor = inCell.getEditor();
		if (!editor || editor.disabled || !editor.binding) return null;
		return editor;
	},
	
	//当滚动条移动到最下端时改变editor的样式
	doLastRow: function(){
		var snapshot = this.grid.getViewManager().getScrollView().snapshot;
		var editOffsetBottom = 0;
		//判断有没有toolbar
		if (this.grid.toolBar) {
			var toolHeight = this.grid.getToolBar().getHeight();
			editOffsetBottom = toolHeight;
		}
		//获取总行高
		editOffsetBottom += (snapshot.rowCount - this.index-1)*this.rowManager.defaultRowHeight;
		//判断横向滚动条是否显示
		if("none" != dojo.style(this.grid.xscrollerNode,"display")){
			editOffsetBottom += 10;
		}else{
			editOffsetBottom -= 5;
		}
		dojo.style(this.firstNode,{
			"top": "auto",
			"bottom": editOffsetBottom+"px"
		});	
	},
	
	//点击纵向滚动条
	clickVerticalScroll: function(){
		var snapshot = this.grid.getViewManager().getScrollView().snapshot;
			if((this.index < snapshot.beginRowIndex) || (this.index>= snapshot.beginRowIndex + snapshot.showRows)){
				dojo.style(this.firstNode,{
					"display": "none"
				});	
				return;
			}
			this.clickScroll = true;
			//当用快捷键TAB/Enter换行后，在点击纵向滚动条时，不能在重新计算index
			this.setEditting = true;
			this.initEdit();
	},
	
	doLastCell: function(){
		dojo.style(this.unlockViewNode,{
			"right": "0px",
			"left": "auto"
		});	
	},
	
	//Tab或者Enter时，判断是否是一行最后一个，如果是换行
	isLastEditCell: function(inCell, evt){
		var snapshot = this.grid.getViewManager().getScrollView().snapshot;
		if(this.index == snapshot.rowCount-1){
			dojo.stopEvent(evt);
			return false;
		}
		var viewManager = this.grid.getManager("ViewManager");
		var cells = this.editedCell;
		if(inCell == cells[cells.length-1]){
			//如果可以显示所有列，不需要移动滚动条
			var rows = viewManager.getScrollView().contentStructure.rows[0];
			//TODO 关于隐藏列
			if("none" == dojo.style(this.grid.xscrollerNode,"display")){
				return true;
			}
			if(!snapshot.lastCell){
				dojo.stopEvent(evt);
				viewManager.scroller._scrollBarClickRight(1);
				return false;
			}else{
				//这个时候是否应该刷新页面,但refresh中不应该刷新rowEdit
				this.noRefreshEdit = true;
				this.refreshCellPosition();
				this.grid.getRowEditManager().refreshRowEdit();
				dojo.stopEvent(evt);
				return false;
			}
		}else{
			return false;
		}
	},
	
	doLastTab: function(){
		var editedNodes = this.editedNode;
		//解决FF bug
		setTimeout(function(){
			editedNodes[0] && editedNodes[editedNodes.length-1].focus();
		},0);
	},
	
	setEdit: function(rowIndex){
		//如果this.setEditting为真，在initEdit中this.index为rowIndex
		this.setEditting = true;
		var rowCount = this.rowManager.getRowCount();
		if (rowIndex<0 || rowIndex>=rowCount) {
			rowIndex = 0;
		}
		this.index = rowIndex;
		if(!this.grid.noInitEdit) {
			this.initEdit();
		}else{
			this.editing = true;
			this.grid.noInitEdit = false;
		}
	},
	
	//回车变成Tab切换焦点处理 
	_enter2Tab : function(){
		var cells = this.editedCell, editPre ,editNext;
		var lens= cells.length;
		if(lens == 0) return;
		for(var i=0,l=lens-1; i<l;i++){
			editPre =  cells[i].getEditor();
			editNext =  cells[i+1].getEditor();
			editPre.setNextFocusId && editPre.setNextFocusId(editNext.id);
		}
		if(!editNext){
			editNext = cells[0].getEditor();
		}
		editNext.setNextFocusId && editNext.setNextFocusId('unieap_for_focus');
	},
	
//	//保留
//	onEditorDown: function(inCell, evt){
//		this.tabHandler= setTimeout(dojo.hitch(this,function(){
//			var tabbing = 1;
//			this.initEdit(0,tabbing);
//		}),0);
//	},
//	//保留
//	onEditorUp: function(inCell, evt){
//		this.tabHandler= setTimeout(dojo.hitch(this,function(){
//			this.initEdit(0,-1);
//		}),0);
//	},
	
	//Tab\Enter键快捷键，如果是最后一个，换行，否则什么都不做
	onEditorTab: function(inCell, evt){
		if(this.isLastEditCell(inCell, evt)){
			dojo.stopEvent(evt);
			var tabbing = 1;
			this.initEdit(0,tabbing);
		} 
	},
	
	//在ViewManager中的resize方法中调用，当窗口大小改变时为了防止已经输入的数据丢失。   
    refreshEditTextBox: function(index){
    	var editors= this.editedNode;
    	//插入行时，有时this.editedCell为空，这时不需要此操作
    	if(!this.editedCell) return;
    	var editedCells = this.editedCell;
    	for(var i = 0,len=editedCells.length;i<len; i++){
    		var value = editors[i].getValue();
    		var cellName = editedCells[i].name;
    		this.grid.getBinding().getRowSet().getRow(index).setItemValue(cellName,value);
    	}
    },
    
    //刷新grid，纵向滚动条位置不变，横向滚动条位置变化snapshot.beginCellIndex设为0；
    refreshCellPosition: function() {
   		var scrollView = this.grid.getViewManager().getScrollView();
   		var rowCount = this.grid.getBinding().getRowCount();
   		var views = this.grid.getManager("ViewManager").views;
   		scrollView.snapshot.rowCount = rowCount;
   		
    	dojo.forEach(views,function(view){
			view.snapshot.beginCellIndex = 0;
			view.snapshot.lastCell = false;
    	});
    	this.grid.resizeContainer();
    },
	
	_exit: function(){
		//SUN11.21
		dojo.forEach(this.editedNode,function(editor){
			editor.destroy();
			editor=null;
		});
		dojo.forEach(this.editedCell,function(cell){
			cell.destroy();
			cell.clearCellEdit();
		});
		dojo.disconnect(this.link);
		this.editedCell = [];
		this.editedNode = [];
		this.inputDivNodes = [];
		this.setEditting = false;
		this.grid.rowEdit = null;
	},
	
	applyEdit: function(){
		if(true == this.editing){
			dojo.destroy(this.firstNode);
			//this.editing = false放在这里当关闭编辑器时，不需要在ViewManager中在处理编辑器相关的逻辑
			this.editing = false;
			this.noRefreshEdit = true;
			this.grid.getManager("ViewManager").refreshPage();
			this._exit();
		}
	}
});