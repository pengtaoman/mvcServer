dojo.addOnLoad(function() {
	var store = unieap.getDataStore('empDataStore', 'dataCenter', false);
//	store.getRowSet().getData()[1]["_s"] = true;
	logger.profile("grid");
	dojo.parser.parse();
	logger.profile("grid");
	dp.SyntaxHighlighter.HighlightAll('code');
});
function setSelect() {
	var value = dojo.byId("selectInput").value;
	if (isNaN(value)) {
		alert("请输入数字");
	} else {
		value = Number(value);
		grid.getManager("SelectionManager").setSelect(value, true);
	}
	
}
function setSelectType() {
	
	var type = dojo.byId("selectType").value;
	grid.getManager("SelectionManager").setSelectType(type);
}
function getSelected() {
	if (grid.getManager("SelectionManager").getSelectedRowIndexs()<50) {
		alert(grid.getManager("SelectionManager").getSelectedRowIndexs());
	} else {
		var rows = grid.getManager("SelectionManager").getSelectedRowIndexs();
		var indexs = [];
		for (var i=0; i<rows.length; i++) {
			indexs.push(rows[i]);
			if (i>=20) {
				indexs.push("...");
				indexs.push("共" + rows.length +"条记录被选中");
				break;
			}
		}
		alert(indexs)
	}
}
function setCheckedabled() {
	var value = dojo.byId("setcheckable").value;
	if (isNaN(value)) {
		alert("请输入数字");
	} else {
		value = Number(value);
		grid.getManager("SelectionManager").setCheckabled(value, true);	
	}
}
function setUncheckedabled() {
	var value = dojo.byId("setuncheckable").value;
	if (isNaN(value)) {
		alert("请输入数字");
	} else {
		value = Number(value);
		grid.getManager("SelectionManager").setCheckabled(value, false);	
	}
}