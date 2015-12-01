dojo.addOnLoad(function(){
	dp.SyntaxHighlighter.HighlightAll('code');
	var store = new unieap.ds.DataStore("empDataStore");
    store.setRowSetName("emp");
	store.setPageSize(20);
    unieap.Action.doQuery(store);
    unieap.byId('grid').getBinding().setDataStore(dataCenter.getDataStore("empDataStore"));
});

function cellClick(inCell, inRowIndex) {
	alert("click in row:"+inRowIndex+", cell:"+inCell.label);
}

function headerCellClick(inCell) {
	alert("header: "+inCell.label+ " clicked");
}