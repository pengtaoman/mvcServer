var comboValue;
Ext.onReady(function() {
	Ext.QuickTips.init();
	var WEB_APP_NAME = document.getElementById("path").value
	Ext.BLANK_IMAGE_URL = WEB_APP_NAME
			+ '/unieap/pages/workflow/webdesign/ext-1.1.1/resources/images/shared/s.gif';
	// 定义Grid中form域
	var idText = new Ext.form.TextField({
		allowBlank : true
	});
	var nameText = new Ext.form.TextField({
		allowBlank : false,
		regex : /^[^&@$!+-/()\#%*\s]+$/,
		regexText : "变量名称不允许出现@、#、$、%、*、&、！、（）、+、-、*、/、空格特殊字符",
		invalidText : "变量名称不可为空！"
	});
	var descriptionText = new Ext.form.TextField({
		allowBlank : true
	});
	var defaultValueText = new Ext.form.TextField({
		allowBlank : true
	});
	var javaAppText = new Ext.form.TextField({
		allowBlank : true
	});
	// 定义变量类型
	typeCombo = new Ext.form.ComboBox({
		typeAhead : true,
		triggerAction : 'all',
		// transform:'Change',
		lazyRender : true,
		editable : false,
		valueField : "id",
		displayField : "text",
		allowBlank : false,
		store : new Ext.data.SimpleStore({
			fields : ["id", "text"],
			data : [["0", "整数"], ["1", "字符串"], ["3", "浮点数"], ["4", "日期"],
					["10", "XML"]],
			emptyText : '请选择变量类型',
			triggerAction : 'all'
		}),
		mode : 'local'
	});
	typeCombo.onViewClick = onViewClick;
	// 定义变量合并类型
	combineTypeCombo = new Ext.form.ComboBox({
		typeAhead : true,
		triggerAction : 'all',
		editable : false,
		lazyRender : true,
		valueField : "id",
		displayField : "text",
		allowBlank : false,
		store : new Ext.data.SimpleStore({
			fields : ["id", "text"],
			data : [["0", "覆盖"], ["1", "追加"]]
		}),
		mode : 'local'
	});

	combineTypeCombo1 = new Ext.form.ComboBox({
		typeAhead : true,
		triggerAction : 'all',
		editable : false,
		lazyRender : true,
		valueField : "id",
		displayField : "text",
		allowBlank : false,
		store : new Ext.data.SimpleStore({
			fields : ["id", "text"],
			data : [["0", "覆盖"]]
		}),
		mode : 'local'
	});

	combineTypeCombo.onViewClick = onViewClick;
	combineTypeCombo1.onViewClick = onViewClick;

	var fm = Ext.form;
	var Ed = Ext.grid.GridEditor;
	var colModel = new Ext.grid.ColumnModel([{
		header : "ID",
		dataIndex : 'id',
		sortable : true,
		hidden : true,
		editor : new Ed(idText)
	}, {
		header : "名称",
		dataIndex : 'name',
		sortable : true,
		width : 100,
		tooltip : "变量的名称；同一流程内变量名称唯一",
		editor : new Ed(nameText)
	}, {
		header : "变量类型",
		dataIndex : 'typeName',
		sortable : true,
		width : 60,
		tooltip : "变量的类型；不同类型的变量在流程中的使用场景不同，如字符串类型的变量可以作为手动节点的参与人而数字类型的变量不可以",
		editor : new Ed(typeCombo)
	}, {
		header : "处理类",
		dataIndex : 'javaApp',
		sortable : true,
		width : 150,
		tooltip : "变量绑定的处理类全路径，如com.xxx.relData",
		editor : new Ed(javaAppText)
	}, {
		header : "合并方式",
		dataIndex : 'combineTypeName',
		sortable : true,
		width : 60,
		tooltip : "变量的合并方式；对于字符串类型变量有‘追加’方式，如当前变量值为‘123’，再次获取该变量值后返回值为‘123123’",
		editor : new Ed(combineTypeCombo)
	}, {
		header : "默认值",
		dataIndex : 'defaultValue',
		sortable : true,
		width : 120,
		tooltip : "变量的默认值；浮点数类型必须有整数部分，如0.23，不允许简写为.23；日期类型格式按照‘yyyy-MM-dd HH24:mm:ss’输入",
		editor : new Ed(defaultValueText)
	}, {
		header : "描述",
		dataIndex : 'description',
		sortable : true,
		width : 150,
		tooltip : "对该变量的描述",
		editor : new Ed(descriptionText)
	}

	]);
	var variableJson = Ext.decode(opener.document.procForm.variableJson.value);

	ds = new Ext.data.Store({
		proxy : new Ext.data.MemoryProxy(variableJson),
		reader : new Ext.data.JsonReader({
			id : 'id'
		}, [{
			name : 'id'
		}, {
			name : 'name'
		}, {
			name : 'description'
		}, {
			name : 'type'
		}, {
			name : 'combineType'
		}, {
			name : 'defaultValue'
		}, {
			name : 'javaApp'
		}, {
			name : 'typeName'
		}, {
			name : 'combineTypeName'
		}])
	});
	ds.load();

	var grid = new Ext.grid.EditorGrid('variableGrid', {
		ds : ds,
		cm : colModel,
		// autoSizeColumns: true,
		monitorWindowResize : false,
		enableColLock : false
	});

	grid.addListener('cellclick', cellclick);
	grid.addListener('afteredit', afteredit);
	
	function afteredit(e) {
		//编辑变量类型列才触发
		if(e.column == 2){
			var record = ds.getAt(e.row);
			record.set('defaultValue', "");
			record.set('combineType', "0");
		}
//		e.row;
//		e.column;
//		e.originalValue;
//		e.value;
	};

	function cellclick(grid, rowIndex, columnIndex, e) {
		var r = ds.getAt(rowIndex);
		if (r) {
			value = r.get('typeName');
		}
		grid.colModel.setEditor(4, getEditor(value));
	}

	var combineTypeEditor = new Ed(combineTypeCombo);

	var combineTypeEditor1 = new Ed(combineTypeCombo1);

	function getEditor(value) {
		if (value == "XML" || value == "字符串") {
			return combineTypeEditor;
		} else {
			return combineTypeEditor1;
		}
	}

	grid.onEditComplete = function(ed, value, startValue) {
		this.editing = false;
		this.activeEditor = null;
		ed.un("specialkey", this.selModel.onEditorKey, this.selModel);
		if (String(value) !== String(startValue)) {
			var r = ed.record;
			var field = this.colModel.getDataIndex(ed.col);
			var e = {
				grid : this,
				record : r,
				field : field,
				originalValue : startValue,
				value : value,
				row : ed.row,
				column : ed.col,
				cancel : false
			};
			if (this.fireEvent("validateedit", e) !== false && !e.cancel) {
				var isValid = true;
				if (field == "typeName") {
					r.set("type", comboValue);
					// 如果变量类型为数字，则合并方式必须为覆盖
					if (comboValue == "0") {
						r.set("combineType", "0");
						r.set("combineTypeName", "覆盖");
						grid.getView().refresh();
					}
				}// 如果类型为数字，则不允许设置追加
				else if (field == "combineTypeName") {
					var type = r.get("type");
					if (comboValue == "1" && type == "0")
						return;
					else
						r.set("combineType", comboValue);
				} else if (field == "defaultValue") {
					value = value.replace(/(^\s*)|(\s*$)/g, "");
					var type = r.get("type");
					var intPatrn = /^(-)?[0-9]{1,17}$/;
					var doublePattern = /^(-)?(\d+\.)?\d+$/;
					var datePattern = /^\d{4}-\d{2}-\d{2}(\s\d{2}:\d{2}:\d{2})?$/;
					var isInt = intPatrn.test(value);
					var isDouble = doublePattern.test(value);
					var isDate = datePattern.test(value);
					if (type == "0" && !isInt) {
						return;
					} else if (type == "3" && !isDouble) {
						return;
					} else if (type == "4" && !isDate) {
						return;
					}
				} else if (field == "name") {
					ds.each(function(record) {
						var name = record.get("name");
						if (name == value) {
							isValid = false;
							alert("变量名称存在重复，请重新输入");
						}
					});
				}
				if (isValid) {
					r.set(field, value);
					delete e.cancel;
					this.fireEvent("afteredit", e);
				}
			}
		}
		this.view.focusCell(ed.row, ed.col);
	}

	var layout = Ext.BorderLayout.create({
		center : {
			margins : {
				left : 3,
				top : 3,
				right : 3,
				bottom : 3
			},
			panels : [new Ext.GridPanel(grid)]
		}
	}, 'variableDiv');
	grid.render();

	var gridHeader = grid.getView().getHeaderPanel(true);
	var record = Ext.data.Record.create([]);
	var tb = new Ext.Toolbar(gridHeader, []);

	var addButton = new Ext.Toolbar.Button({
		text : '添加',
		handler : function() {
			var recordRow = new record({
				id : new UUID() + "",
				name : getNewName(),
				description : '',
				typeName : '整数',
				combineTypeName : '覆盖',
				defaultValue : '',
				javaApp : '',
				type : '0',
				combineType : '0'
			});
			grid.stopEditing();
			ds.insert(0, recordRow);
			grid.startEditing(0, 1);
		}
	});

	var removeButton = new Ext.Toolbar.Button({
		text : '删除',
		handler : function() {
			if (grid.selModel.getSelectedCell() == null) {
			} else {
				var record = ds.getAt(grid.selModel.getSelectedCell()[0]);
				ds.remove(record);
			}
		}
	});

	var removeAllButton = new Ext.Toolbar.Button({
		text : '全部删除',
		handler : function() {
			ds.removeAll();
		}
	});

	tb.addButton(addButton);
	tb.addSeparator();
	tb.addButton(removeButton);
	tb.addSeparator();
	tb.addButton(removeAllButton);
})

function getNewName() {
	var num = -1;
	ds.each(function(record) {
		var name = record.get("name").replace(/(^\s*)|(\s*$)/g, "");
		var patrn = /^Data[0-9]{1,5}$/;
		var isNumber = patrn.test(name);
		if (isNumber) {
			var number = parseInt(name.substring(4, 7));
			if (number > num)
				num = number;
		}
	});
	return "Data" + (num + 1).toString();
}

// grid提交
function submit_onclick() {
	var dataArray = new Array();
	var transitionVariables = '';
	var variableSelect = '';
	ds.each(function(record) {
		var id = record.get("id");
		var name = record.get("name");
		var type = record.get("type");
		var combineType = record.get("combineType");
		dataArray.push(record.data);
		transitionVariables += id + ',' + name + ',' + type + ';';
		if (type == 0) {
			variableSelect += id + ',' + name + ';';
		}
	});
	opener.document.procForm.variableJson.value = Ext.encode(dataArray);
	opener.document.getElementById('transitionVariables').value = transitionVariables;
	opener.document.getElementById('variableSelect').value = variableSelect;
	window.close();
}
// 验证grid
function vertify() {
	ds.each(function(record) {
		var name = record.get("name").replace(/(^\s*)|(\s*$)/g, "");
		var type = record.get("type");
		var combineType = record.get("combineType");
		if (name == "")
			return false;
	});

}
function onViewClick(doFocus) {
	var index = this.view.getSelectedIndexes()[0];
	var r = this.store.getAt(index);
	if (r) {
		this.onSelect(r, index);
		comboValue = r.json[0];
	}
	if (doFocus !== false) {
		this.el.focus();
	}
}
