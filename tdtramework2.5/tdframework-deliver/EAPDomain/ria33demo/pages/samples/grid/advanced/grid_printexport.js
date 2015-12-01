dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
    
    var store = new unieap.ds.DataStore("empDataStore");
    store.setRowSetName("emp");
    unieap.Action.doQuery(store);
    unieap.byId('grid').getBinding().setDataStore(dataCenter.getDataStore("empDataStore"));
});
function init(){
    var dataStore = new unieap.ds.DataStore("pojoDS");
    dataStore.setPageSize(20);
    dataStore.setRowSetName("com.neusoft.unieap.ria33demo.pojo.entities.Emp");
    var dc = new unieap.ds.DataCenter();
    dc.addDataStore(dataStore);
    var newdc = unieap.Action.requestData({
        url: unieap.WEB_APP_NAME + "/RIATest.do?method=testLoadPoJo",
        sync: true,
        load: function(dc){
        }
    }, dc);
    dataCenter.addDataStore(newdc.getDataStore("pojoDS"));
}

init();
