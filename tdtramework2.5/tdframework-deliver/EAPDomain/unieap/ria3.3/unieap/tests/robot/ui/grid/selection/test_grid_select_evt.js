dojo.addOnLoad(function() {
	var store = unieap.getDataStore('empDataStore', 'dataCenter', false);

	dojo.parser.parse();
	testUtil.markNode(grid.domNode);
});
function setSelect() {
	grid.getManager("SelectionManager").setSelectType("m");
	var value = dojo.byId("selectInput").value;
	if (isNaN(value)) {
		alert("请输入数字");
	} else {
		value = Number(value);
		grid.getManager("SelectionManager").setSelect(value, true);
	}
	 testUtil.markNode(grid.domNode);
}
function setSelectType() {
	var type = dojo.byId("selectType").value;
	grid.getManager("SelectionManager").setSelectType(type);
	 testUtil.markNode(grid.domNode);
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
grid.getManager("SelectionManager").setSelectType("m");
	var value = dojo.byId("setcheckable").value;
	if (isNaN(value)) {
		alert("请输入数字");
	} else {
		value = Number(value);
		grid.getManager("SelectionManager").setCheckabled(value, true);	
	}
	 testUtil.markNode(grid.domNode);
}
function setUncheckedabled() {
grid.getManager("SelectionManager").setSelectType("m");
	var value = dojo.byId("setuncheckable").value;
	if (isNaN(value)) {
		alert("请输入数字");
	} else {
		value = Number(value);
		grid.getManager("SelectionManager").setCheckabled(value, false);	
	}
	 testUtil.markNode(grid.domNode);
}
