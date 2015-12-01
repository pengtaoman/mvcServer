function init() {
	logger.profile("grid");
	dojo.parser.parse();
	logger.profile("grid");
	dp.SyntaxHighlighter.HighlightAll('code');
}
dojo.addOnLoad(function(){
	init();
})
function newGrid() {
	var vm = {rowNumber: true};
	var s = buildStructure();
	var lm = {structure: s};
	var binding = {store:'empDataStore'};
	var grid = new unieap.grid.Grid({
		views: vm,
		layout: lm,
		binding: binding,
		width: 700,
		height: 250
	});
	var button = dojo.byId("btn_newGrid");
	var td = button.parentNode;
	td.appendChild(grid.domNode);
	td.removeChild(button);
}

function buildStructure() {
	var fixed={noscroll: true};
	fixed["rows"] = buildFixedRows();
	var header={};
	header["rows"] = buildRows();
	var layout = [fixed, header];
	return layout;
}
function buildFixedRows() {
	var rows = [];
	rows.push(buildFixedColumns());
	return rows;
}
function buildFixedColumns() {
	var row = [];
	var column = {
		label: "员工编号",
		name: "attr_empno",
		width: "150px"
	};
	row.push(column);
	return row;
}
function buildRows() {
	var rows = [];
	rows.push(buildColumns());
	return rows;
}
function buildColumns() {
	var row = [];
	var column = {
		label: "姓名",
		name: "NAME",
		width: "100px"
	};
	row.push(column);
	
	column = {
		label: "职位",
		name: "attr_job",
		width: "150px"
	};
	row.push(column);
	
	column = {
		label: "工资",
		name : "attr_sal",
		width : "150px"
	};
	row.push(column);
	return row;
}
