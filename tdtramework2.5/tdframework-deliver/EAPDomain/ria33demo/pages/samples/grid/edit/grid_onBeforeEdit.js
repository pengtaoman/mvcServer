dojo.addOnLoad(function(){
	dp.SyntaxHighlighter.HighlightAll('code');	
    var store = new unieap.ds.DataStore("empDataStore");
    store.setRowSetName("emp");
	store.setPageSize(20);
    unieap.Action.doQuery(store);
    unieap.byId('grid').getBinding().setDataStore(dataCenter.getDataStore("empDataStore"));
});


function beforeEdit(inRowIndex) {
	if (inRowIndex%2==1) {
		return false;
	} else {
		return true;
	}
}
