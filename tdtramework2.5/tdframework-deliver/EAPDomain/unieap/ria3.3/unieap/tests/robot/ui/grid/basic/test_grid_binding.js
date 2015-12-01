var storeChanged = false;
var asc = 1;
function init() {
	dojo.parser.parse();
}
function setDataStore() {
	if (storeChanged) {
		grid.getBinding().setDataStore(unieap.getDataStore("empDataStore"));
	} else {
		grid.getBinding().setDataStore(unieap.getDataStore("largedata"));
	}
	storeChanged = !storeChanged;
	
	testUtil.markNode(grid.domNode);
}
function getRowCount() {
	alert("表格共有 " + grid.getBinding().getRowCount() + " 行数据。");
}
dojo.addOnLoad(function(){
	init();
});