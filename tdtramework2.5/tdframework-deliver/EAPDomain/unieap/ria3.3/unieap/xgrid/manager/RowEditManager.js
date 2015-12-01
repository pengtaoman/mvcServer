dojo.provide('unieap.xgrid.manager.RowEditManager');
dojo.require("unieap.global");
dojo.declare("unieap.xgrid.manager.RowEditManager", unieap.xgrid.manager.Manager,  {
//	ui: {
//		setEdit:true,
//		insertRow:true,
//		deleteRow:true,
//		deleteRows:true,
//		getCurrentRowIndex:true,
//		getFocusCell:true,
//		apply:true,
//		events: {
//			onBeforeEdit:true
//		}
//	},
	/**
	 * @summary:
	 * 		往Grid中插入一行数据并使该行处于编辑状态
	 * @param:
	 * 		{object} inRowData 行数据
	 * @param:
	 * 		{number} inRowIndex 插入行位置
	 * 		
	 * @example:
	 * var rowData = {
	 * 	   attr_empno:111,
	 * 	   NAME:"XXX",
	 * 	   attr_deptno:10,
	 *     attr_job:"工程师",
	 *     attr_sal:5000
	 * }
	 * |//如果Grid控件为行编辑,编辑时光标位于第一行第一列上
	 * |grid.getRowEditManager().insertRow(rowData,0);
	 */
	insertRow: function(inRowData,inRowIndex) {
		inRowIndex = parseInt(inRowIndex,10);
		this.apply && this.apply();//确保之前的编辑关闭
		var rowCount = this.grid.getRowManager().getRowCount();
		var rowIndex = inRowIndex||0;
		if (rowIndex<0 || rowIndex>=rowCount) {
			rowIndex = 0;
		}
		this.grid.getBinding().insertRow(inRowData, rowIndex);
		//grid的onBeforeEdit方法
		if (!this.onBeforeEdit(rowIndex)) return rowIndex;
		this.setEdit(rowIndex);
		
		return rowIndex;
	},
	
	//确保rowIndex行可见
	_visualizeRow: function(rowIndex,tabbing){
		var scrollView = this.grid.getManager("ViewManager").getScrollView();
		var snapshot = scrollView.snapshot;
		if((snapshot.beginRowIndex < rowIndex) && (rowIndex < (snapshot.beginRowIndex+snapshot.showRows-1)))	return ;
		var rowEdit = this.grid.rowEdit;
		snapshot.beginRowIndex += 1;
		rowEdit.styleIndex--;
		if(rowEdit.styleIndex<0) rowEdit.styleIndex = 0;
		if(rowIndex == snapshot.rowCount-1){
			snapshot.lastRow=true;
		}
		rowEdit.noRefreshEdit = true;
		this.grid.getManager("ViewManager").refreshPage();
		//当用快捷键移动到最后一行，然后移动窗口，横向滚动条从无到有，这个时候需要将noRefreshEdit设为false
		rowEdit.noRefreshEdit = false;
	},
	
	refreshRowEdit: function(){
		var rowEdit = this.grid.rowEdit,
		    setIndex = rowEdit.index,
		    scrollView = this.grid.getViewManager().getScrollView();
	    rowEdit.applyEdit();
	    scrollView.contentBuilder.getRowEdit(setIndex+1);
	},
	
	/**
	 * @summary:
	 * 		打开编辑器，焦点设置在inRowIndex对应的编辑器的第一个单元格上。
	 * @param:
	 * 		{number} inRowIndex 编辑的行号
	 * @example:
	 * |xgrid.setEdit(2); //编辑第3行
	 * @example:
	 * |  var rowIndex = parseInt(value,10);
     * |  editManaer.setEdit(rowIndex);
	 */
	setEdit: function(/*number*/inRowIndex) {
		if(inRowIndex < 0)return;
		if(!this.onBeforeEdit(inRowIndex)) return inRowIndex;
		if(!this.grid.rowEdit){
			var views = this.grid.getManager("ViewManager").views;
			var view = views[views.length-1];
			dojo.require("unieap.xgrid.core.RowEdit");
			this.grid.rowEdit = new unieap.xgrid.RowEdit({view:view,setEditting:true});
		}
		//确保编辑行可见
		//this._visualizeRow(inRowIndex);
		this.grid.getManager("ViewManager").scroller.visualizeRow(inRowIndex);
		this.grid.rowEdit.setEdit(inRowIndex);
		
	},
	
	
	/**
	 * @summary:
	 * 	 获取当前编辑的行号
	 * @return:
	 * 	{number} 如果不处在编辑状态下，则返回-1
	 * @example:
	 * |var grid=unieap.byId("grid");
	 * |var currentIndex=grid.getManager("EditManager").getCurrentRowIndex();
	 */
	getCurrentRowIndex:function(){
		return this.grid.rowEdit?this.grid.rowEdit.index:-1;
	},
	
	/**
	 * @summary:
	 * 		完成编辑，让编辑器消失处于非编辑状态
	 * @example:
	 * |var editMan=grid.getManager("EditManager");
	 * |editMan.apply(); //如果有单元格处于编辑状态,让编辑器消失
	 */
	apply: function() {
		if(this.grid.rowEdit){
			this.grid.rowEdit.applyEdit();
		}
	},
	
	/**
	 * @summary:
	 * 		删除一行
	 * @param:
	 * 		{number} inRowIndex 行索引,从0开始计算
	 * @example:
	 * |unieap.byId("grid").getManager("EditManager").deleteRow(1);
	 */
	deleteRow: function(inRowIndex) {
		if(this.grid.rowEdit){
			this.grid.rowEdit.applyEdit();
		}
		return this.grid.getBinding().deleteRow(inRowIndex);
	},
	
	/**
	 * @summary:
	 * 		删除多行数据
	 * @param:
	 * 		{array} rows
	 * @example:
	 *|//获取选中行的行索引数组
	 *|var selectedRowIndexs = grid.getBinding().getRowSet().getSelectedRowIndexs();
	 *|//删除选中行
	 *|grid.getManager("EditManager").deleteRows(selectedRowIndexs);
	 */
	deleteRows: function(rows) {
		if(this.grid.rowEdit){
			this.grid.rowEdit.applyEdit();
		}
		this.grid.getBinding().deleteRows(rows);
	},
	
	/**
	 * @summary:
	 * 		编辑前触发事件
	 * @description:
	 * 		覆盖此方法，并返回false时，编辑操作将被取消
	 * @param:
	 * 		{number} inRowIndex
	 * 		将要触发编辑的行
	 * @param:
	 * 		{unieap.grid.Cell} inCell
	 * @return:
	 * 		{boolean}
	 * @example:
	 *|<div dojoType="unieap.grid.Grid" id="grid" width="80%" height="250px" binding="{store:'empDataStore'}" views="{rowNumber:true}" 
     *|     edit="{editType:'rowEdit',singleClickEdit:true,onBeforeEdit:test}">
	 *|</div>
	 */
	onBeforeEdit: function(inRowIndex, inCell) {
		return true;
	},
	
	/**
	 * @summary:
	 *    返回当前正在编辑的cell对象
	 * @return:
	 * 		{unieap.grid.Cell}
	 * @example:
	 * |var cell = grid.getRowEditManager().getFocusCell();
	 */
	getFocusCell : function(){
		if(this.grid.rowEdit){
			var node = document.activeElement;
			var widget = dijit.getEnclosingWidget(node);
		    var cells = this.grid.rowEdit.editedCell;
			for(var i=0,l=cells.length;i<l;i++){
				if(cells[i].getEditor()==widget){
					return cells[i];
				}
			}
		}else{
			return null;
		}
	}
});