dojo.addOnLoad(function() {
	var store = unieap.getDataStore('empDataStore', 'dataCenter', false);
//	store.getRowSet().getData()[1]["_s"] = true;
	logger.profile("grid");
	dojo.parser.parse();
	logger.profile("grid");
	dp.SyntaxHighlighter.HighlightAll('code');
});

function doSort() {
	var arr = dojo.byId("sequence").value.split(",");
	if (dojo.byId("sequence").value=="") {
		grid.getManager("LayoutManager").sortCell();
		return;
	}
	var sequence = [];
	for (var i=0; i<arr.length; i++) {
		sequence.push(Number(arr[i]));
	}
	var fixedNum = Number(dojo.byId("fixedNum").value);
	if (isNaN(fixedNum)) {
		alert("输入有误！");
		return;
	}
	
	grid.getManager("LayoutManager").sortCell(sequence, fixedNum);
	
}

function doLock() {
	var arr = dojo.byId("cols").value.split(",");
	var sequence = [];
	for (var i=0; i<arr.length; i++) {
		sequence.push(Number(arr[i]));
	}
	var isLock = dojo.byId("sel").value.toLowerCase()=="lock" ;
	grid.getManager("LayoutManager").lockCell(sequence, isLock);
}

function hide() {
	var arr = dojo.byId("cols2").value.split(",");
	var sequence = [];
	for (var i=0; i<arr.length; i++) {
		sequence.push(Number(arr[i]));
	}
	grid.getManager("LayoutManager").hideCell(sequence);
}

function show() {
	var arr = dojo.byId("cols2").value.split(",");
	var sequence = [];
	for (var i=0; i<arr.length; i++) {
		sequence.push(Number(arr[i]));
	}
	grid.getManager("LayoutManager").showCell(sequence);
}