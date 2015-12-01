dojo.provide('unieap.grid.manager.EditManager');
dojo.require("unieap.global");
dojo.declare("unieap.grid.manager.EditManager", null, {
	/**
	 * @declaredClass:
	 * 		unieap.grid.manager.EditManager
	 * @summary:
	 * 		编辑控制器
	 * @description:
	 * 		在Grid标签上配置编辑模块(edit)，启动表格的编辑功能。
	 * 		配置editType指定表格的编辑类型为行编辑或单元格编辑，默认编辑类型为只读；
	 * 		配置singleClickEdit指定编辑是否单击触发，默认为false。
	 * 		此编辑模块支持动态改变编辑类型，支持以编码方式打开指定编辑器。
	 * @example:
	 * |<div dojoType="unieap.grid.Grid" width="500px" height="300px"
	 * |	 binding="{store:'empDataStore'}"
	 * |	 views="{rowNumber:true}"
	 * |	 edit="{editType:'rowEdit',singleClickEdit:false}">
	 * |	 <fixed>
	 * |		 <cell label="员工编号" name="attr_empno" width="10%" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}"></cell>
	 * |	 </fixed>
	 * |	 <header>
	 * |		<cell width="150px" label="姓名" name="NAME" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}"></cell>
	 * |		<cell width="150px" label="部门" name="attr_deptno" editor="{editorClass:'unieap.form.ComboBox',editorProps:{dataProvider:{store: 'DEPT'},decoder:{valueAttr:'CODEVALUE',displayAttr:'CODENAME'}}}"></cell>
	 * |		<cell width="150px" label="工资" name="attr_sal" headerStyles="text-align: left;"></cell>
	 * |	 </header>
	 * |</div>
	 * @img:
	 * 		images/grid/grid_edit.png
	 */
	
	ui: {
		setType:true,
		getType:true,
		setEdit:true,
		insertRow:true,
		deleteRow:true,
		deleteRows:true,
		isSingleClickEdit:true,
		setSingleClickEdit:true,
		getCurrentRowIndex:true,
		getFocusCell:true,
		shift : true,
		unshift : true,
		validate : true,
		apply:true,
		events: {
			onBeforeEdit:true
		}
	},
	
	_patch: "unieap.grid.manager.EditPatch",
	
	types : {
		cellEdit: "cellEdit",
		rowEdit: "rowEdit",
		readonly: "readonly"
	},
	/**
	 * @summary:
	 * 		默认情况下输入域验证不合法焦点是否转移
	 * @type:
	 * 		{boolean}
	 * @example:
	 *|<div dojoType="unieap.grid.Grid"  binding="{store:'empDataStore'}" edit="{focusShift:false}">  
	 *|	...
	 *|</div> 
	 */
	focusShift: true,
	/**
	 * @summary:
	 * 		编辑类型
	 * @type:
	 * 		{string}
	 * @enum:
	 * 		{"rowEdit"|"cellEdit"|"readonly"}
	 * @description:
	 * 		编辑类型,可在global.js中全局配置默认值
	 * @default:
	 * 		"none"
	 * @example:
	 *|<div dojoType="unieap.grid.Grid"  binding="{store:'empDataStore'}" edit="{editType:'rowEdit'}">  
	 *|	...
	 *|</div> 		
	 */
	editType: null,
	
	/**
	 * @summary:
	 * 		设置是否单击触发编辑
	 * @type:
	 * 		{boolean}
	 * @description:
	 * 		设置是否单击触发编辑,可在global.js中全局配置默认值
	 * @default:
	 * 		false
	 * @example:
	 *|<div dojoType="unieap.grid.Grid"  binding="{store:'empDataStore'}"
     *|		edit="{editType:'cellEdit',singleClickEdit:true}">  
     *| 	 ......
	 *|</div>
	 */
	singleClickEdit: unieap.widget.grid.singleClickEdit,
	
	
	constructor: function(param) {
		dojo.mixin(this, param);
		this.editType = param.editType||unieap.widget.grid.editType;
		this.switchType(this);
		this.doPatch(this.grid);
		this.connects = [];
		this.connects.push(dojo.connect(dojo.body(),"onmousedown",this,"applyEditing"));
	},
	applyEditing : function(evt){
		if(this.getType()==this.types.readonly || !this.isEditing()) {
			return;
		}
		var target = evt.target,
			node = target,
			x = evt.x || evt.pageX,
			y = evt.y || evt.pageY,
			obj = null,targetInView = false, path = [];
		dojo.require("unieap.form.Popup");
		while(node){
			path.push(node);
			if(node == this.grid.viewsNode){
				targetInView = true;
				break;
			}
			if(node.getAttribute && (obj =  dijit.byNode(node)) && obj instanceof unieap.form.Popup){
				node = obj.widget.domNode ;
				path = [];
			}
			node = node.parentNode;
		}
		//如果不在Grid编辑视图内消失
		if(!targetInView){
			this._apply();
			return;
		}
		
		var rowIndex,view,idx,cell;
		
		view = dijit.byNode(path[path.length-2]);
		var attachNode = path[path.length-4];
		if(attachNode==view.scrollboxNode){
			if(path.length < 5){
				if( attachNode.clientWidth> x &&
					attachNode.clientHeight > y 
					){
					this._apply(target);
				}
				return;
			}
		}
		else{
			//锁定行
			this._apply(target);
			return;
		}
		
		for(var i = path.length-1,obj;obj = path[i];i--){
			if((rowIndex = obj.getAttribute("gridRowIndex"))!=null){
				for(;path[i] && (idx = path[i].getAttribute("idx"))==null;i--);
				if(idx!=null){
					var layout = this.grid.managers.get("LayoutManager"); 
					cell = layout.getCell(Number(idx));
				}
				break;
			}
		}
	
		rowIndex = Number(rowIndex);
		
		//如果是双击编辑时
		if(!this.isSingleClickEdit()){
			//行编辑
			if(this.currentRowIndex != rowIndex){
				this._apply(target);
				return;
			}
			if(this.getType()==this.types.cellEdit ){
				if(this.focusCell != cell && cell!=null){
					this._apply(target);
					return;
				}
			}
		}
		else{
			if(this.currentRowIndex != rowIndex && cell==null){
				this._apply(target);
				return;
			}
		}
	},
	_apply : function(target){
		//点击的节点不能聚焦，主动让其失去焦点
		target && !target.focus && unieap.blurWidget(); 
		if(this.accesskeyHandle==false) return;
		this.tabHandler= setTimeout(dojo.hitch(this,function(){
			if(this.shiftCell){ this.apply(); }
		}),50);
	},
	switchType: function(inComponent) {
		switch(this.editType) {
			case this.types.cellEdit:
			case this.types.rowEdit: {
				this.doPatch(inComponent);
				this.doPatch(this.grid.managers.get("ViewManager"));
				this.doPatch(this.grid.managers.get("RowManager"));
//				this.autoApply = true;
			}
		}
	},
	
	/**
	 * @summary:
	 * 		取得编辑类型
	 * @return:
	 * 		{"cellEdit"|"rowEdit"|"readonly"}
	 * @example:
	 * |<div dojoType="unieap.grid.Grid" id="grid" edit="{editType:'rowEdit'}">
	 * |</div>
	 * |unieap.byId("grid").getManager('EditManager').getType(); //得到的值为"rowEdit"
	 */
	getType: function() {
		return this.editType;
	},
	
	/**
	 * @summary:
	 * 		设置编辑类型
	 * @param:
	 * 		{"cellEdit"|"rowEdit"|"readonly"} inEditType
	 * @example:
	 * |//设置编辑类型为单元格编辑
	 * |unieap.byId("grid").getManager("EditManager").setType("cellEdit");
	 */
	setType: function(inEditType) {
		this.editType = inEditType;
//		this.switchType(this);
//		this.grid.managers.reloadManager("EditManager");
//		this.grid.refresh();
	},
	
	/**
	 * @summary:
	 * 		往Grid中插入一行数据并使该行处于编辑状态
	 * @description:
	 * 		在为单元格编辑的情况下,不传入inCell参数,Grid不会编辑单元格
	 * @param:
	 * 		{object} inRowData 行数据
	 * @param:
	 * 		{number} inRowIndex 插入行位置
	 * @param:
	 * 		{number|string} inCell 设置光标落于哪一列的编辑器上
	 * 		
	 * @example:
	 * |var rowData = {
	 * |	attr_name: "somebody",
	 * |	attr_deptno: "开发部",
	 * |	attr_empno: 20095724
	 * |};
	 * |//如果Grid控件为行编辑,编辑时光标位于第一行第一列上
	 * |grid.getManager("EditManager").insertRow(rowData,0);
	 * |//编辑时光标落在第二行、第二列的单元格上
	 * |grid.getManager("EditManager").insertRow(rowData,1,1);
	 */
	insertRow: function(inRowData,inRowIndex,inCell) {
		inRowIndex = parseInt(inRowIndex,10);
		this.apply && this.apply();//确保之前的编辑关闭
		var rowCount = this.grid.managers.get("RowManager").getRowCount();
		var rowIndex = inRowIndex||0;
		if (rowIndex<0 || rowIndex>=rowCount) {
			rowIndex = rowCount;
		}
		
		this.grid.getBinding().insertRow(inRowData, rowIndex);
		//scroll to inserted row
		
		//active editor or editors
		//this.setEdit && this.setEdit(rowIndex);
		if (rowIndex >= this.grid.getManager("RowManager").getRowCount() || rowIndex < 0) {
			this.apply();
			return;
		}
		//确保编辑行可见
       var views = this.grid.managers.get("ViewManager");
		views.visualizeRow(rowIndex);
		//grid的onBeforeEdit方法
		if (!this.onBeforeEdit(rowIndex)) return;
	    inCell=typeof(inCell)!='undefined'&&this.grid.getManager('LayoutManager').getCell(inCell);
		var type=this.getType();
		switch(type){
			case 'cellEdit':
				inCell&&this.start(rowIndex,inCell);
				break;
			case 'rowEdit':
				inCell?this.start(rowIndex,inCell):this.start(rowIndex);
				break;
		}
		return rowIndex;
	},
	
	/**
	 * @summary:
	 * 		打开编辑器，焦点设置在inCell对应得编辑器上。
	 * @description:
	 *		如果行编辑时inCell不可编辑则编辑时焦点设置在第一个单元格上。
	 * @param:
	 * 		{number} inRowIndex 编辑的行号
	 * @param:
	 * 		{number|string} inCell 编辑的列序号、或名称
	 * @example:
	 * |grid.setEdit(2,"salary"); //编辑第3行、单元格列名为salary的单元格
	 * @example:
	 * |<cell width="150px" label="职位" editor="{editorClass:'unieap.form.TextBox',editorProps:{id:'geteditor',onBlur:blur}}" name="attr_job"></cell>
	 * |function blur(evt){
	 * |  var value = unieap.byId("geteditor").getValue();
	 * |  var grid=unieap.byId("grid");
	 * |  var editManaer = grid.getManager("EditManager");
	 * |  //如果根据条件跳转到指定的行
	 * |  var rowIndex = parseInt(value,10);
     * |  editManaer.setEdit(rowIndex,'attr_job');
	 * |}
	 * @example:
	 * |<cell width="150px" label="职位" editor="{editorClass:'unieap.form.TextBox',editorProps:{id:'geteditor',onBlur:blur}}" name="attr_job"></cell>
	 * |function blur(evt){
	 * |   var value = unieap.byId("geteditor").getValue();
	 * |   var editManager = grid.getManager("EditManager");
	 * |   //允许跳转，包括快捷键及点击其他地方让编辑器消失
	 * |   editManager.shift();
	 * |   //如果满足某条件不进行跳转
	 * |   if(value=="aaa"){
	 * |      //不允许允许跳转，包括快捷键及点击其他地方让编辑器消失
	 * |      editManager.unshift(this);
	 * |   }
	 * |}
	 */
	setEdit: function(/*number*/inRowIndex, /*number|name*/inCell) {
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
	},
	
	/**
	 * @summary:
	 * 		允许进行快捷键操作（如回车换行等），或点击其他地方让编辑器消失
	 * @example:
	 * |<cell label="姓名" editor="{editorClass:'unieap.form.TextBox',editorProps:{id:'geteditor',onBlur:doBlur}}" name="attr_name"></cell>
	 * |function doBlur(){
	 * |	var name = unieap.byId("geteditor").getValue(),
	 * |		editMan=grid.getManager("EditManager");
	 * |	//性能为非jackjones才可以编辑其他单元格
	 * |	editManager.shift();
	 * |	name=='jackjones'&&editMan.unshift(this);
	 * |}
	 */
	shift : function(){
	},
	/**
	 * @summary:
	 * 		不允许进行快捷键操作（如回车换行等），或点击其他地方时编辑器始终存在不消失
	 * @param:
	 * 		{unieap.form.FormWidget} editor cell中配置的editor对象
	 * @example:
	 * |<cell label="姓名" editor="{editorClass:'unieap.form.TextBox',editorProps:{id:'geteditor',onBlur:doBlur}}" name="attr_name"></cell>
	 * |function doBlur(){
	 * |	var name = unieap.byId("geteditor").getValue(),
	 * |		editMan=grid.getManager("EditManager");
	 * |	editManager.shift();
	 * |	//不允许输入姓名为jackjones
	 * |	name=='jackjones'&&editMan.unshift(this);
	 * |}
	 */
	unshift : function(editor){
	},
	
	/**
	 * @summary:
	 * 		完成编辑，让编辑器消失处于非编辑状态
	 * @example:
	 * |var editMan=grid.getManager("EditManager");
	 * |editMan.apply(); //如果有单元格处于编辑状态,让编辑器消失
	 */
	apply: function() {
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
		this.apply && this.apply();
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
		this.apply && this.apply();
		this.grid.getBinding().deleteRows(rows);
	},
	
	/**
	 * @summary:
	 * 		是否单击触发编辑
	 * @description:
	 * 		判断编辑的触发方式，默认情况下是false，即双击表格某处打开编辑器。
	 * @return:
	 * 		{boolean}
	 * @example:
	 *|var bool=grid.getManager("EditManager").isSingleClickEdit();
	 */
	isSingleClickEdit: function() {
		return this.singleClickEdit;
	},
	
	/**
	 * @summary:
	 * 		设置编辑触发方式
	 * @description:
	 * 		判断编辑的触发方式，默认情况下是false，即双击表格某处打开编辑器。
	 * @param:
	 * 		{boolean} isSingle
	 * @example:
	 * |grid.getManager("EditManager").setSingleClickEdit(true);
	 */
	setSingleClickEdit: function(isSingle) {
		this.singleClickEdit = isSingle==true;
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
	
	doPatch: function(inComponent) {
		if (!this.patcher) {
			dojo.require(this._patch);
			var clazz = dojo.getObject(this._patch);
			this.patcher = new clazz(this.grid);
		}
		this.patcher.doPatch(inComponent);
	},
	destroy : function(){
		while(this.connects.length){
			dojo.disconnect(this.connects.pop());
		}
	},
	
	/**
	 * @summary:
	 *    返回当前正在编辑的cell对象
	 * @return:
	 * 		{unieap.grid.Cell}
	 * @example:
	 * |var cell = grid.getManager("EditManager").getFocusCell();
	 */
	getFocusCell : function(){
		if(this.isEditing()){
			var node = document.activeElement;
			var widget = dijit.getEnclosingWidget(node);
		    var cells = this.editCells;
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