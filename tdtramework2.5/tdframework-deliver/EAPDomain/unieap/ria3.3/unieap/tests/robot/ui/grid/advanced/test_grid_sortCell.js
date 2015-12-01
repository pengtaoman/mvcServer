dojo.addOnLoad(function() {
	var store = unieap.getDataStore('empDataStore', 'dataCenter', false);
	testUtil.markNode(unieap.byId("grid").domNode);
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
	testUtil.markNode(unieap.byId("grid").domNode);
}

function doLock() {
	var arr = dojo.byId("lockCols").value.split(",");
	var sequence = [];
	for (var i=0; i<arr.length; i++) {
		sequence.push(Number(arr[i]));
	}
	grid.getManager("LayoutManager").lockCell(sequence, true);
	
	testUtil.markNode(unieap.byId("grid").domNode);
}

function doUnLock() {
	var arr = dojo.byId("unLockCols").value.split(",");
	var sequence = [];
	for (var i=0; i<arr.length; i++) {
		sequence.push(Number(arr[i]));
	}
	grid.getManager("LayoutManager").lockCell(sequence, false);
	
	testUtil.markNode(unieap.byId("grid").domNode);
}

function hide() {
	var arr = dojo.byId("hiddenCol").value.split(",");
	var sequence = [];
	for (var i=0; i<arr.length; i++) {
		sequence.push(Number(arr[i]));
	}
	grid.getManager("LayoutManager").hideCell(sequence);
	testUtil.markNode(unieap.byId("grid").domNode);
}

function show() {
	var arr = dojo.byId("showCol").value.split(",");
	var sequence = [];
	for (var i=0; i<arr.length; i++) {
		sequence.push(Number(arr[i]));
	}
	grid.getManager("LayoutManager").showCell(sequence);
	testUtil.markNode(unieap.byId("grid").domNode);
}