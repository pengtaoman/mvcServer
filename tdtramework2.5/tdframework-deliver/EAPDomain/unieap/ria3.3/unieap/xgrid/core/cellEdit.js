dojo.provide('unieap.xgrid.core.cellEdit');

dojo.declare("unieap.xgrid.cellEdit", null, {
	
	constructor: function(inCell) {
		this.editors = {
			current: null
		},
		this.connects = [];
		this.cell = inCell;
		var editor = inCell.editor;
		if (editor) {
			this.setEditor(editor.editorClass, editor.editorProps);
		}
	},
	
	//创建编辑器并且给编辑器绑定上事件
	_createEditor: function(editorClass, editorProps) {
		dojo.require(editorClass);
		var clazz = dojo.getObject(editorClass);
		//修改了设置单元格宽度为auto时，单元格内编辑器不能自动撑开的问题。
		var editor = new clazz(dojo.mixin(editorProps, {width:"auto",style:"display:block;",binding:{name:this.cell.name}}));
		this.funnelEvents(editor);
		return editor;
	},
	
//	//给编辑器绑定上事件
	funnelEvents: function(editor) {
		//控件Tab键事件
		this.connects.push(dojo.connect(editor, "onTab", this,function(evt) {
			this.edit = this.cell.grid.rowEdit;
			this.edit.onEditorTab(this.cell, evt);
		}));
		//上下键up and down
//		this.connects.push(dojo.connect(editor, "onKeyDown", this,function(evt) {
//			//this.edit.onEditorBlur(this.cell, evt);
//			if("unieap.form.TextBox" == this.cell.editor.editorClass){
//				if(evt.keyCode == dojo.keys.DOWN_ARROW){
//					this.edit = this.cell.grid.rowEdit;
//					this.edit.onEditorDown(this.cell, evt);
//				}
//				if(evt.keyCode == dojo.keys.UP_ARROW){
//					this.edit = this.cell.grid.rowEdit;
//					this.edit.onEditorUp(this.cell, evt);
//				}
//			}
//		}));
		//cascad事件绑定,监听主ComboBox的onChange事件，刷新从combobox或者配置了cascade属性的单元格
		var cells=this.cell.grid.getManager("LayoutManager").getCells(),childCells=[];
		if(editor.declaredClass=="unieap.form.ComboBox"){
			dojo.forEach(cells,function(cell){
				if(this._checkCell(editor,cell)){
					childCells.push(cell);
				}
	
			},this);
		}
		
		if(childCells.length>0){
			this.connects.push(dojo.connect(editor,"onChange",this,function(){
				setTimeout(dojo.hitch(this,function(){
					var row = editor.getBinding().getRow();
					dojo.forEach(childCells,function(cell){
						//modified by zhengh 2011-05-27 解决Grid级联编辑中级联combo数据不正确。U_EAP00019773
						//取得主combobox值
						var index = row.getIndex();
						var primaryValue = editor.getBinding().getValue();
						//调用子combobox的getCascadeStore对应的方法 
						var cascadeStoreFun = cell.getEditor().getCascade().getCascadeStore;
						//获得第index行，子combobox的dataStore名字
						var cascadeStoreName = cascadeStoreFun(primaryValue);
						//给子combobox绑定store
						
						cell.getEditor().getDataProvider().setDataStore(cascadeStoreName);
						this.cell.grid.getManager("ViewManager").refreshCell(row.getIndex(),cell);
					},this)
					
				}),0);
			}));
		}

	},
	
	_checkCell:function(primaryEditor,cascadeCell){
		var cascadeEditor=cascadeCell.editor,
			primaryId=primaryEditor.id,
			cascadeId=(cascadeEditor&&cascadeEditor.cascade&&cascadeEditor.cascade.primary)||
					  (cascadeCell.cascade&&cascadeCell.cascade.primary);
		if(primaryId==cascadeId){
			return true;
		}
		return false;
	},
	
	//获得编辑器对象,如果传入which,比如'unieap.form.TextBox'就返回一个TextBox对象
	//否则返回当前编辑器对象
	getEditor: function(which) {
		if (!this.editors) return null;
		return which && this.editors[which] || this.editors[this.editors.current];
	},
	//设置编辑器,将编辑器对象保存为Map,其中key为decleredClass,value为控件对象
	//例如{'unieap.form.TextBox':obj
	setEditor: function(editorClass, editorProps) {
		this.editors.current = editorClass;
		if (!(editorClass in this.editors)){
			this.editors[editorClass] = this._createEditor(editorClass, editorProps);
		} else {
			var editor = this.editors[editorClass];
			editor && editor.destroy && editor.destroy();
			delete editor;
			this.editors[editorClass] = this._createEditor(editorClass, editorProps);
		}
	},
	//销毁控件及其事件
	destroy: function() {
		while(this.connects.length>0) {
			dojo.disconnect(this.connects.pop());
		}
		editors = this.editors;
		//销毁控件内存对象
		for (var which in editors) {
			editors[which] && editors[which].destroy && editors[which].destroy();
		}
		delete this.editors;
	}
	
});