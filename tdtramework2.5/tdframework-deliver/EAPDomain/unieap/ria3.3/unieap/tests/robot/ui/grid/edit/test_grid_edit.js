dojo.addOnLoad(function() {
	var store = unieap.getDataStore('empDataStore', 'dataCenter', false);
	store.getRowSet().getData()[1]["_s"] = true;
	//logger.profile("grid");
	dojo.parser.parse();
	//logger.profile("grid");
	//dp.SyntaxHighlighter.HighlightAll('code');
	testUtil.markNode(grid.domNode);
});

function mybe(inRowIndex) {
	//console.log("cellBeforeEdit called!");
	return true;
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
	testUtil.markNode(grid.domNode);
}