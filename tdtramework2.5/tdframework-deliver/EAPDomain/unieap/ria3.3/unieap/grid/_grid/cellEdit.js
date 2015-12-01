dojo.provide('unieap.grid._grid.cellEdit');

dojo.declare("unieap.grid.cellEdit", null, {
	
	constructor: function(inCell) {
		this.editors = {
			current: null
		};
		this.connects = [];
		this.cell = inCell;
		this.edit = inCell.grid.managers.get("EditManager");
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
			this.edit.onEditorTab(this.cell, evt);
		}));
		//控件Blur事件
		this.connects.push(dojo.connect(editor, "onBlur", this,function(evt) {
			this.edit.onEditorBlur(this.cell, evt);
		}));
		
		//cascad事件绑定,监听主ComboBox的onChange事件，刷新从combobox或者配置了cascade属性的单元格
		var cells=this.cell.grid.getManager("LayoutManager").getCells(),
			cellEditor,childCells=[];
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
	//修改控件的值后更新Grid绑定的datastore中的值,同时销毁控件的domNode,但不销毁控件内存对象
	//在整个编辑中,只存在一个编辑器副本
	applyEdit: function(inRowIndex) {
		var editor = this.getEditor();
		if (!editor) return;
		var node = editor.domNode.parentNode;
		node && node.removeChild(editor.domNode);
		//刷新单元格的内容，显示成静态文本
		this.cell.grid.getManager("ViewManager").refreshCell(inRowIndex,this.cell);
	},
	//解除绑定
	unbind : function(){
		var editor = this.getEditor();
		if (!editor) return;
		editor.binding && editor.getBinding().unbind();
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