dojo.addOnLoad(function() {
	var store = unieap.getDataStore('empDataStore', 'dataCenter', false);
//	store.getRowSet().getData()[1]["_s"] = true;
	logger.profile("grid");
	dojo.parser.parse();
	logger.profile("grid");
	dp.SyntaxHighlighter.HighlightAll('code');
});

function commit() {
	var empno = dojo.byId("attr_empno").value;
	var job = dojo.byId("attr_job").value;
	var name = dojo.byId("attr_name").value;
	var deptno = dojo.byId("attr_deptno").value;
	var sal = dojo.byId("attr_sal").value;
	
	var row = dojo.byId("rowIndex").value;
	if (row == "" || isNaN(row)) {
		alert("请输入数字");
		return
	} else {
		row = Number(row);
	}
	
	var rowData = {
		attr_empno: empno,
		attr_job: job,
		NAME: name,
		attr_deptno: deptno,
		attr_sal: sal
	}
	grid.getManager("EditManager").insertRow(rowData, row);
}
function deleteRow() {
	var row = dojo.byId("deleteRowIndex").value;
	if (row == "" || isNaN(row)) {
		alert("请输入数字");
		return
	} else {
		row = Number(row);
	}
	grid.getManager("EditManager").deleteRow(row);
}
function getSelectedRows() {
	var rows = grid.getManager("SelectionManager").getSelectedRowIndexs();
	console.log(rows);
}
function deleteSelectedRows() {
	var rows = grid.getManager("SelectionManager").getSelectedRowIndexs();
	var edit = grid.getManager("EditManager").deleteRows(rows);
	console.log(grid.getManager("SelectionManager").getSelectedRowIndexs());
}