var storeChanged = false;
var asc = 1;
function init() { 
	logger.profile("grid");
	dojo.parser.parse();
	logger.profile("grid");
	dp.SyntaxHighlighter.HighlightAll('code');
}
function setDataStore() {
	if (storeChanged) {
		grid.getBinding().setDataStore(unieap.getDataStore("empDataStore"));
	} else {
		grid.getBinding().setDataStore(unieap.getDataStore("largedata"));
	}
	storeChanged = !storeChanged;
}
function getRowCount() {
	alert("表格共有 " + grid.getBinding().getRowCount() + " 行数据。");
}
dojo.addOnLoad(function(){
	init();
});