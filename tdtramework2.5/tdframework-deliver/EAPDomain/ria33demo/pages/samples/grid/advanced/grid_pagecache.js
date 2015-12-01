
dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
    
    var store = new unieap.ds.DataStore("empDataStore");
    store.setRowSetName("emp");
    unieap.Action.doQuery(store);
    unieap.byId('grid').getBinding().setDataStore(dataCenter.getDataStore("empDataStore"));
});

function getPagedData(){
    var data = unieap.byId('grid').getManager("PagingManager").getSelectedCachedData();
    unieap.debug(data);
}
