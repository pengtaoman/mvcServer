dojo.addOnLoad(function() {
	var store = unieap.getDataStore('empDataStore', 'dataCenter', false);
//	store.getRowSet().getData()[1]["_s"] = true;
	logger.profile("grid");
	dojo.parser.parse();
	logger.profile("grid");
	dp.SyntaxHighlighter.HighlightAll('code');
});
function getCascade(item) {
	if (item.CODEVALUE==11) {
		return "c2";
	} else if (item.CODEVALUE==12) {
		return "c1";
	}
	return null;
}
function doGroup() {
	var group = grid.managers.get("GroupManager");
	group.setName(['attr_province','NAME']);
	group.commit();
}
function undoGroup() {
	var group = grid.managers.get("GroupManager");
	group.clear();
}
function getSelected() {
	var select = grid.managers.get("SelectionManager");
	console.log(select.getSelectedRowIndexs());
}
function getRowSetSelected() {
	var rs = grid.getBinding().getRowSet();
	console.log(rs.getSelectedRowIndexs());
	grid.managers.get("ViewManager").refreshPage();
}
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