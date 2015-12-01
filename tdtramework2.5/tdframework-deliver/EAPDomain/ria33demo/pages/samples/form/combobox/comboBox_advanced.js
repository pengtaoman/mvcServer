
var store = new unieap.ds.DataStore("empDataStore");
store.setRowSetName("emp");
store.setPageNumber(10);
store.setPageSize(5);
unieap.Action.doQuery(store);
store = dataCenter.getDataStore("empDataStore");

dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
});

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

function fn_onchange(){
    var value = unieap.byId('staticComboBox').getValue();
    var text = unieap.byId('staticComboBox').getText();
    alert('onChange触发了,当前控件的值为' + value + ",显示值为" + text)
}

function fn_SetValue(){
    unieap.byId("combobox2").setValue("psd_ria");
}

function fn_GetValue(){
    var value = unieap.byId("combobox2").getValue();
    alert("在combobox取得的值为" + value)
}

function fn(){
    var ds = new unieap.ds.DataStore("customData", [{
        CODEVALUE: 1,
        CODENAME: '工程师'
    }, {
        CODEVALUE: 2,
        CODENAME: '销售人员'
    }, {
        CODEVALUE: 3,
        CODENAME: '技术总监'
    }]);
    return ds;
}
