function init(){
	var store = new unieap.ds.DataStore("empDataStore");
    store.setRowSetName("emp");
	store.setPageSize(20);
    unieap.Action.doQuery(store);
}

init();

dojo.addOnLoad(function(){
	dp.SyntaxHighlighter.HighlightAll('code');	
});
