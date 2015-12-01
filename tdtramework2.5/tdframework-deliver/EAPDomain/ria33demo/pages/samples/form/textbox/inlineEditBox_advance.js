
dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
});

var store = new unieap.ds.DataStore("empDataStore");
store.setRowSetName("emp");
store.setPageSize(10);
unieap.Action.doQuery(store);
store = dataCenter.getDataStore("empDataStore");

var city = new unieap.ds.DataStore('city_store', [{
    CODEVALUE: 1,
    CODENAME: '宁波'
}, {
    CODEVALUE: 2,
    CODENAME: '宁海'
}, {
    CODEVALUE: 3,
    CODENAME: '温州'
}, {
    CODEVALUE: 4,
    CODENAME: '沈阳'
}, {
    CODEVALUE: 15,
    CODENAME: '大连'
}, {
    CODEVALUE: 16,
    CODENAME: '金州'
}]);

dataCenter.addDataStore(city);
