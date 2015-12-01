
dojo.addOnLoad(function(){
    var store = new unieap.ds.DataStore("empDataStore");
    store.setRowSetName("emp");
    unieap.Action.doQuery(store);
    unieap.byId("grid").getBinding().setDataStore(dataCenter.getDataStore("empDataStore"));
});
