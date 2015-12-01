dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
});


function init(){
    var dataStore = new unieap.ds.DataStore("emp_store");
    dataStore.setRowSetName("form_test");
    dataStore.setPageSize(-1);
    var dc = new unieap.ds.DataCenter();
    dc.addDataStore(dataStore);
    var newdc = unieap.Action.requestData({
        url: unieap.WEB_APP_NAME + "/getFormData.do?method=getData",
        parameters: {
            "synLoadStatistics": true
        },
        sync: true,
        load: function(dc){
        }
    }, dc);
    dataCenter.addDataStore(newdc.getDataStore("emp_store"));
}

init();
