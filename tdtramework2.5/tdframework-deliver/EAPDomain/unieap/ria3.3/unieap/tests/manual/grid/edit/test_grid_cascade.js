dojo.addOnLoad(function() {
	var store = unieap.getDataStore('empDataStore', 'dataCenter', false);
//	store.getRowSet().getData()[1]["_s"] = true;
	logger.profile("grid");
	dojo.parser.parse();
	logger.profile("grid");
	dp.SyntaxHighlighter.HighlightAll('code');
});

function mybe(inRowIndex) {
	console.log("cellBeforeEdit called!");
	return true;
}
function getCascade(item) {
	if (item==11) {
		return "c2";
	} else if (item==12) {
		return "c1";
	}
	return null;
}
function doEdit() {
	var row = dojo.byId("rowInput").value;
	if (isNaN(row)) {
		alert("请输入数字");
		return
	} else {
		row = Number(row);
	}
	var cell = dojo.byId("cellInput").value;
	if (isNaN(cell)) {
		alert("请输入数字");
		return
	} else {
		cell = Number(cell);
	}
	grid.getManager("EditManager").setEdit(row, cell);
}