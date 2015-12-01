dojo.addOnLoad(function(){
	dp.SyntaxHighlighter.HighlightAll('code');
	dp.SyntaxHighlighter.HighlightAll('code1');
	dp.SyntaxHighlighter.HighlightAll('code2');
});
			
var storeChanged = false;
			
function setDataStore() {
	if (storeChanged) {
		unieap.byId("grid").getBinding().setDataStore(unieap.getDataStore("largedata"));
	} else {
		unieap.byId("grid").getBinding().setDataStore(unieap.getDataStore("empDataStore"));
	}
		storeChanged = !storeChanged;
}
			
function getRowCount() {
	alert("表格共有 " + unieap.byId("grid").getBinding().getRowCount() + " 行数据。");
}
