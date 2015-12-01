var storeChanged = false;
function init() {
	 
}
function grid_getBinding() {
	unieap.debug(grid.getBinding());
}
function grid_getManager() {
	var managerName = String(dojo.byId("mname").value);
	unieap.debug(grid.getManager(managerName));
}
function changeStore() {
	if (storeChanged) {
		grid.getBinding().setDataStore(unieap.getDataStore("empDataStore"));
	} else {
		grid.getBinding().setDataStore(unieap.getDataStore("largedata"));
	}
	storeChanged = !storeChanged;
}
function grid_refresh() {
	grid.refresh();
}
dojo.addOnLoad(function(){
	logger.profile("grid");
	dojo.parser.parse();
	logger.profile("grid");
	dp.SyntaxHighlighter.HighlightAll('code');
});