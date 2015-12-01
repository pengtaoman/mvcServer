dojo.addOnLoad(function(){
	dp.SyntaxHighlighter.HighlightAll('code');
	var store = new unieap.ds.DataStore("empDataStore");
    store.setRowSetName("emp");
	store.setPageSize(20);
    unieap.Action.doQuery(store);
});

function setRender() {
	unieap.byId("grid").getManager("ViewManager").setAutoRender(true);
}

function setNorender() {
	unieap.byId("grid").getManager("ViewManager").setAutoRender(false);
}