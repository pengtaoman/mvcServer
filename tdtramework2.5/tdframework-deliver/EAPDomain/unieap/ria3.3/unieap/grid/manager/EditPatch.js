dojo.provide("unieap.grid.manager.EditPatch");

dojo.declare("unieap.grid.manager.EditPatch", null, {
	constructor: function(inGrid) {
		this.grid = inGrid;
	},
	doPatch: function(inComponent) {
		dojo.mixin(inComponent, this.patches[inComponent.declaredClass]);
		var detailManager= this.grid.managers.managers['DetailManager'];
	    if(detailManager){
			this.grid.connect(this.grid, 'dispatchContentEvent', dojo.hitch(detailManager, detailManager.dispatchContentEvent));		
		}
	},
	
	patches: {
		/*
		 * principle:
		 * 		尽量只修改自身及表格的基本模块，以免多个可选模块之间“交叉感染”。
		 * 
		 * list:
		 * 		unieap.grid.Grid
		 * 		unieap.grid.manager.EditManager
		 * 		unieap.grid.manager.ViewManager
		 * 		unieap.grid.manager.RowManager
		 */
		
		"unieap.grid.manager.EditManager": {
			/*
			 * 变量说明
			 * 
			 * this.currentRowIndex: 当前编辑行的行号，非编辑状态下值为-1。
			 * 
			 * this.currentRowIndex: 当前编辑的cell；行编辑时为默认焦点所在cell，为null时焦点设为第一个配有编辑器的cell。
			 * 
			 * this.editCells: 已打开编辑器的cell数组，在apply时会被关闭，不必再次检查一遍。
			 * 
			 * this.autoApply: 是否阻止编辑器失去焦点自动apply。
			 */
			dispatchEvent: function(m, e) {
			
				if (this.getType()==this.types.readonly) {
					return;
				} if (!e.cellNode) {
					//console.log("edit: cellNode not found!");
					return;
				} else if (m in this) {
					this[m](e);
				}
			},
			//是否支持快捷键操作
			shiftCell : true,
			doclick: function(e) {
				if(this._isExistEditor() == false){
                    return false;
                }
				if (this.isSingleClickEdit()) {
					//单元格编辑
					var cell=e.cell;
					if(this.getType()==this.types.cellEdit&&!this.isEditingCell(e.rowIndex,cell)){
						this.setEdit(e.rowIndex, cell.index);
					}else if(this.getType()==this.types.rowEdit&&this.currentRowIndex!=e.rowIndex){
						this.setEdit(e.rowIndex, cell.index);
					}
				}
			},
			dodblclick: function(e) {
				if(this._isExistEditor() == false){
                    return false;
                }
				if (!this.isSingleClickEdit()) {
					//start edit
					this.setEdit(e.rowIndex, e.cell.index);
				}
			},
			
			//wnc add
			//chenxujie 2011/3/1 check 当不存在可编辑按钮时返回  
			_isExistEditor:function(){
                var grid = this.grid;
                var result = false;
                var cells = grid.getManager("LayoutManager").getCells();
                for(var i=0; i<cells.length; i++){
                    if(cells[i].editor){
                        result = true;
                        break;
                    }
                }
                return result;
            },
			
			/**
			 * @summary:
			 * 		打开编辑器，焦点设置在inCell对应得编辑器上，如果行编辑时inCell不可编辑则编辑时焦点设置在第一个单元格上。
			 * @param:
			 * 		{number} inRowIndex
			 * 		编辑的行号
			 * @param:
			 * 		{number|string} inCell
			 * 		编辑的列序号、或名称
			 * @example:
			 * | grid.setEdit(2,"salary");
			 * @example:
			 * | <cell width="150px" label="职位" editor="{editorClass:'unieap.form.TextBox',editorProps:{id:'geteditor',textAlign:'left',onBlur:blur}}" name="attr_job" headerStyles="text-align: left;"></cell>
			 * | function blur(evt){
			 * |   var value = unieap.byId("geteditor").getValue();
			 * |   var editManaer = grid.getManager("EditManager");
			 * |   //如果根据条件跳转到指定的行
			 * |   var rowIndex = parseInt(value,10);
		     * |   editManaer.setEdit(rowIndex,'attr_job');
			 * | }
			 * @example:
			 * | <cell width="150px" label="职位" editor="{editorClass:'unieap.form.TextBox',editorProps:{id:'geteditor',textAlign:'left',onBlur:blur}}" name="attr_job" headerStyles="text-align: left;"></cell>
			 * | function blur(evt){
			 * |   var value = unieap.byId("geteditor").getValue();
			 * |   var editManaer = grid.getManager("EditManager");
			 * |   //允许跳转，包括快捷键及点击其他地方让编辑器消失
			 * |   editManager.shift();
			 * |   //如果满足某条件不进行跳转
			 * |   if(value=="aaa"){
			 * |      //不允许允许跳转，包括快捷键及点击其他地方让编辑器消失
			 * |      editManager.unshift(this);
			 * |   }
			 * | }
			 */
			setEdit: function(/*number*/inRowIndex, /*number|name*/inCell) {
				//如果存在校验不通过的editor，则能进行其他的编辑操作。该编辑器始终处于编辑状态而且置焦
				if(!this.shiftCell) return;
				
				if (inRowIndex >= this.grid.getManager("RowManager").getRowCount() || inRowIndex < 0) {
					this.apply();
					return;
				}
				
				//Grid失去焦点
				unieap.blurWidget();
				//FF在编辑器在onblur事件回调中执行setEdit时，阻止快捷键操作（回车换行等）
				this.accesskeyHandle = false;
				//IE下停止Enter2Tab后的快捷键操作，以便用户在blur或enter事件中调用setEdit方法不再执行系统本身的快捷键操作
				clearTimeout(this.tabHandler);
				
				//确保编辑行可见
				var views = this.grid.managers.get("ViewManager").visualizeRow(inRowIndex);
				//获取单元格对象
				var cell = this.grid.managers.get("LayoutManager").getCell(inCell);
				
				//grid的EditManager中的onBeforeEdit方法
				if (!this.onBeforeEdit(inRowIndex, cell)) return;
				//确保之前的编辑关闭
				this.apply();
				this.start(inRowIndex, cell);
				//恢复快捷键操作
				setTimeout(dojo.hitch(this,function(){
					this.accesskeyHandle = true;
				}),0);
			},
			
			//是否正在编辑
			isEditing: function() {
				return this.currentRowIndex >= 0;
			},
			
			//是否在单元格编辑
			isEditingCell:function(inRowIndex,inCell){
				if(this.currentRowIndex==inRowIndex){
					if(inCell.edit){
						var editor = inCell.edit.getEditor();
						if(editor){
							return editor.domNode.offsetHeight > 0;
						}
					}
				}
				return false;
			},
			/**
			 * @summary:
			 * 	 获取当前编辑的行号
			 * @return:
			 * 	{number} 如果不处在编辑状态下，则返回-1
			 */
			getCurrentRowIndex:function(){
				return this.currentRowIndex;
			},
		
		    //单元格绑定datastore
			_editorBind : function(inCell){
				var editor = this._getEnabledEditor(this.currentRowIndex,inCell);
				if(!editor) return;
				//绑定数据
				
				this.editCells.push(inCell);

			},
			
			//获得可用的编辑器
			_getEnabledEditor : function(inRowIndex,inCell){
				//inCell上配置的onBeforeEdit只应该执行一次!
				if (!inCell.enable || inCell.onBeforeEdit && !inCell.onBeforeEdit(inRowIndex,inCell)) return null;
				//获取当前编辑器对象
				var editor = inCell.getEditor();
			
				if (!editor || editor.disabled || !editor.binding) return null;
				//获得编辑器时,不显示校验的红圈,解决Bug U_EAP00011408
				editor.getValidator&&editor.getValidator().handleError(true);
				return editor;
			},
			
			//开始进入编辑
			start: function(inRowIndex,inCell) {
				this.editCells = [];
				if (this.currentRowIndex == inRowIndex && this.getType()==this.types.rowEdit) {
					return;
				}
				if(this.getType()==this.types.cellEdit){
					if(!this._getEnabledEditor(inRowIndex,inCell)) return;
				}
				//给所有editor绑定Row对象
				this.bindRow = this.bindRow || new unieap.ds.Row(this.grid.getBinding().getRowSet());
				this.bindRow.data = this.grid.getBinding().getRowData()[inRowIndex];
				this.bindRow.index = inRowIndex;
				this.currentRowIndex = inRowIndex;	
				
				//绑定,同时操作this.editCells
//				layout.forEachCell(dojo.hitch(this,"_editorBind"));
				//指定焦点单元格
				var focusCell = null;
				//单元格编辑
				if(this.getType()==this.types.cellEdit){
					this._setCellEditing(inCell) && this.editCells.push(inCell);
					focusCell = inCell;
					var layout = this.grid.managers.get("LayoutManager");
					layout.forEachCell(dojo.hitch(this, function(cell) {
						if (cell.getEditor()) {
							cell.getEditor().getBinding().bind(this.bindRow);
						}
					}));
				}
				//行编辑
				else if (this.getType()==this.types.rowEdit){
					var layout = this.grid.managers.get("LayoutManager");
					layout.forEachCell(dojo.hitch(this, function(cell) {
						this._setCellEditing(cell) && this.editCells.push(cell);
					}));
					focusCell = this.editCells[0];
//					for(var i=0,cell;cell = this.editCells[i];i++){
//						this._setCellEditing(cell);
//						if(inCell == cell) {
//							focusCell = cell;
//						}
//					}
					//设置enter2tab跳转
					this._enter2Tab();
					/**
					 * 解决IE7下grid中的单选按钮组初始化不能被选中的问题
					 * 原理：IE7下由于dom没有被添加到Document流中，进行了数据绑定，导致初始化不能被选中
					 * 解决方法:把_editorBind方法中的数据绑定放到这里最后执行，保证dom被加入文档流再绑定数据。
					 */
					for(var i =0 ,cell;cell=this.editCells[i];i++){
						cell.getEditor().getBinding().bind(this.bindRow);
					}
				}
				
				//设置焦点
				this.focusEditor(focusCell);
				
			},
			//给单元格编辑器设置焦点
			focusEditor : function(focusCell){
				if(!focusCell) 
					return;
				this.focusCell = focusCell;
				if(dojo.isIE){
					focusCell.getEditor().focus();
				}
				else{
					//FF下设置焦点必须需要延时处理，否则会出现设置不上焦点的现象
					setTimeout(function(){
						focusCell.getEditor().focus();
					},0);
				}
			},
			//设置某单元格编辑
			_setCellEditing: function(inCell) {
				var view = this.grid.managers.get("ViewManager").getViewByCell(inCell);
				if (view == null) return false;
				var rowNode = view.getRowNode(this.currentRowIndex);
				var cellNode = this.getCellNode(rowNode, inCell.index);
				var editor = this._getEnabledEditor(this.currentRowIndex, inCell);
				if (editor == null) return false;
				cellNode.innerHTML = "";
				cellNode.appendChild(editor.domNode);
				return true;
			},
//			_setCellEditing : function(inCell){
////				debugger;
//				var view = this.grid.managers.get("ViewManager").getViewByCell(inCell);
//				//获取当前DOM行对象
//				var rowNode = view.getRowNode(this.currentRowIndex);
//				var cellNode = this.getCellNode(rowNode, inCell.index);
//				cellNode.innerHTML = "";
//				cellNode.appendChild(this._getEnabledEditor(this.currentRowIndex,inCell).domNode);
////				unieap.debug(cellNode);
//			},
			//cell node
			getCellNodeIndex: function(inCellNode) {
				return inCellNode ? Number(inCellNode.getAttribute("idx")) : -1;
			},
			getCellNode: function(inRowNode, inCellIndex) {
				var table = inRowNode.firstChild;
				for(var i=0, row; row=unieap.grid.getTr(table, i); i++) {
					for(var j=0, cell; cell=row.cells[j]; j++) {
						if(this.getCellNodeIndex(cell) == inCellIndex) {
							return cell;
						}
					}
				}
			},
			//回车跳转和换行的快捷键处理
			//最后一个编辑器执行跳转（默认实现）
			//TODO： 允许用户自己定义回车跳转的编辑器
			//TODO： 如果是分组需要跳转到具体的数据行，而不是分组行而是下一行有效数据项（暂时不支持）
			onEditorTab : function(inCell, evt){
				var cells = this.editCells,
					cellIndex = 0;
				//查询是第几个编辑单元格
				for(var i=0,l= cells.length; i<l;i++){
					if(cells[i] == inCell){
						cellIndex = i;
						break;
					}
				}
				
				//ie和FF处理失去焦点的方式不一致
				//<input onkeydown='fn1()' onblur='fn2()'><input id='x'>
				//function fn1(){
				//	dojo.byId('x').focus();
				//  console.info('keydown');
				//}
				//function fn2(){
				//   console.info('blur')
				//}
				//在ie下输出的效果为 keydown blur
				//FF下输出的效果为  blur keydown
				
				//跳转到下一行
				if(this.getType()==this.types.rowEdit && cellIndex==cells.length -1){
					//防止在onblur事件中调用setEdit方法，阻止后续的快捷键或编辑器消失处理继续执行，原因如下：					
					//在FF中onkeydown事件中触发blur事件，立即执行blur方法，然后继续执行keydown的后续处理
					//在IE中onkeydown事件中触发blur事件，等keydown处理完后，在执行blur方法
					this.accesskeyHandle = true;
					//先让Grid聚焦
					unieap.blurWidget();
					//防止FF 立即执行focus事件，执行clearTimeout快捷键操作失效问题
					if(this.accesskeyHandle==false){
						return;
					}
					dojo.stopEvent(evt);
					this.tabHandler= setTimeout(dojo.hitch(this,function(){
						//编辑下一行
						this.setEdit(this.currentRowIndex +1,this.editCells[0].index);
					}),0);
				} else if (this.getType() == this.types.cellEdit) {
					this.accesskeyHandle = true;
					//先让Grid聚焦
					unieap.blurWidget();
					//防止FF 立即执行focus事件，执行clearTimeout快捷键操作失效问题
					if(this.accesskeyHandle==false){
						return;
					}
					dojo.stopEvent(evt);
					this.tabHandler= setTimeout(dojo.hitch(this,function(){
						inCell.getEdit().applyEdit(this.currentRowIndex);
						var layout = this.grid.managers.get("LayoutManager");
						cells = layout.getCells();
						var focusCell = null;
						for(var i=0, cursor=false,l= cells.length; i<l;i++){
							if(cells[i] == inCell){
								cursor=true;
								continue;
							}
							if (cursor && this._setCellEditing(cells[i])) {
								focusCell = cells[i];
								break;
							}
						}
						if (focusCell) {
							this.focusEditor(focusCell);
						} else {
							//编辑下一行
							this.setEdit(this.currentRowIndex+1, 0);
						}
					}),0);
					
				}
				
			},
			//焦点离开的验证判断，
			//如果校验不通过则不进行单元格编辑切换跳转，
			//并且该编辑器始终处于编辑和聚焦状态
			onEditorBlur : function(inCell, evt){
				//如果在onblur事件中已经调用了unshift操作，则不需要在进行验证操作
				var editor = inCell.getEditor();
				
				if(this._blockCell && this._blockCell!=inCell) return;
				if(this._blockCell ==inCell ){
					//阻止快捷键操作
					this.shiftCell = false;
					//先执行mousedown事件，然后再执行blur事件，
					//此时清除鼠标点击其他地方编辑器消失的处理
					clearTimeout(this.tabHandler);
					//设置焦点
					this.focusEditor(inCell);
				}
				else if(!this.focusShift && !editor.getValidator().validate()){
					if(!this._invalidatorCell || this._invalidatorCell == inCell){
						this._invalidatorCell = inCell;
						//阻止快捷键操作
						this.shiftCell = false;
						//先执行mousedown事件，然后再执行blur事件，
						//此时清除鼠标点击其他地方编辑器消失的处理
						clearTimeout(this.tabHandler);
						//设置焦点
						this.focusEditor(inCell);
					}
				}
				else{
					this._invalidatorCell = null;
					//验证成功
					this.shiftCell = true;
				}
			},
			/**
			 * @summary:
			 * 		可以进行快捷键操作（如回车换行等），或点击其他地方让编辑器消失
			 */
			shift : function(){
				this.shiftCell = true;
				this._blockCell = null;
			},
			/**
			 * @summary:
			 * 		不允许进行快捷键操作（如回车换行等），或点击其他地方让编辑器消失，编辑器始终存在不消失
			 * @param:
			 * 		{unieap.form.FormWidget} editor
			 * 		cell中配置的editor对象
			 */
			unshift : function(editor){
				this.shiftCell = false;
				for(var i = 0;i<this.editCells.length;i++){
					if(this.editCells[i].getEditor()==editor){
						this._blockCell = this.editCells[i];
						return;
					}
				}
			},
			//回车变成Tab切换焦点处理 
			//TODO： radio按钮及checkbox处理
			//TODO： 普通的编辑器（暂时不支持）
			_enter2Tab : function(){
				var cells = this.editCells, editPre ,editNext,lens= cells.length;
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
			
			//让编辑器消失，并且取消数据绑定
			applyEditors: function() {
//				for (var i=0, cell; cell=this.editCells[i]; i++) {
//					cell.getEdit().applyEdit(this.currentRowIndex);
//					cell.getEdit().unbind();
//				}
				var layout = this.grid.managers.get("LayoutManager");
				layout.forEachCell(dojo.hitch(this, function(cell) {
					cell.getEdit().applyEdit(this.currentRowIndex);
					cell.getEdit().unbind();
				}));
				this.editCells = [];
			},
			
			/**
			 * @summary:
			 * 		完成编辑，让编辑器消失处于非编辑状态
			 */
			apply: function() {
				if (this.isEditing()) {
					this.applyEditors();
					this.currentRowIndex = -1; 
					this.focusCell = null;
					this.shiftCell = true;
				}
			}
		},
		
		"unieap.grid.Grid": {
			dispatchContentEvent: function(e) {
				e.sourceView.dispatchContentEvent(e) || this._dispatch(e.dispatch, e);
				var edit = this.managers.get("EditManager");
				(edit&&edit.dispatchEvent) && edit.dispatchEvent(e.dispatch, e);
//				safari&FF中会无法对打开的编辑器聚焦
//				dojo.stopEvent(e);
			}
		},
		
		"unieap.grid.manager.ViewManager": {
			refreshRow: function(inRowIndex) {
				var edit = this.grid.managers.get("EditManager");
				if (edit.getType()!=edit.types.readonly
					&& edit.isEditing() 
					&& edit.currentRowIndex==inRowIndex) {
					edit.applyEditors();
				}
				this.forEach(function(inView, i) {
					inView.renderRow(inView.getRowNode(inRowIndex), inRowIndex);
				});
			},
			
			refreshPage: function() {
				var edit = this.grid.managers.get("EditManager"),
					rows = this.getCurrentRows(),
					rowIndex;
				if (edit.getType()!=edit.types.readonly && edit.isEditing()) {
					edit.applyEditors();
				}
				this.scroller.init(this.grid.managers.get("RowManager").getRowCount());
				// clear rows tyle cache
//		 		var rowDatas=this.grid.getBinding().getRowData();
//				if (rowDatas!=null && rowDatas.length>0) {
//					for (var i=0,len=rowDatas.length; i<len; i++) {
//						rowDatas[i]["_style"] && delete rowDatas[i]["_style"];
//					}
//				}
				this.grid.getBinding().getRowSet().forEach(function(row){
					row.removeIdentifier("_style");
				});
				
				this.renderLockedRow();
				this.setScrollTop(this.scrollTop);
				this.finishScrollJob();
//				for (rowIndex in rows) {
//					if (isNaN(rowIndex)) {
//						continue;
//					}
//					this.forEach(function(inView, i) {
//						inView.renderRow(inView.getRowNode(rows[rowIndex]), rows[rowIndex]);
//					});
//					this.grid.managers.get("RowManager").updateStyles(rowIndex);
//				}
			}
		},
		"unieap.grid.manager.RowManager": {
			rowRemoved: function(inRowIndex) {
				var edit = this.grid.managers.get("EditManager");
				if (edit.getType()!=edit.types.readonly 
					&& edit.isEditing() 
					&& edit.currentRowIndex==inRowIndex) {
					edit.applyEditors();
				}
				this.forEachView(function(inView) {
					var node = inView.rowNodes[inRowIndex];
					this.onRowRemoved(node,inRowIndex);
					delete inView.rowNodes[inRowIndex];
				});
			}
		}
	}
});