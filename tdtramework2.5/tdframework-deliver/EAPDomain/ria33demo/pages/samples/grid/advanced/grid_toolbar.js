dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
	var store = new unieap.ds.DataStore("empDataStore");
    store.setRowSetName("emp");
	store.setPageSize(5);
    unieap.Action.doQuery(store);
    unieap.byId('grid').getBinding().setDataStore(dataCenter.getDataStore("empDataStore"));
});
function insertRow(){
    unieap.byId("grid").getBinding().insertRow({});
}

function deleteRow(){
    var rowIndex = unieap.byId("grid").getManager("RowManager").getCurrentRowIndex();
    unieap.byId("grid").getBinding().deleteRow(rowIndex);
}
