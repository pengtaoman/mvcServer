
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
    CODEVALUE: 5,
    CODENAME: '大连'
}, {
    CODEVALUE: 6,
    CODENAME: '金州'
}]);


dataCenter.addDataStore(city);


function fn_GetValue(){
    var group = unieap.byId("CheckboxGroup");
    alert('当前选中的实际值为' + group.getValue() + ",显示值为" + group.getText());
}

function fn_ShowReverse(){
    unieap.byId('CheckboxGroup1').checkReverse();
}

function fn_OnChange(){
    dojo.connect(unieap.byId('CheckboxGroup'), 'onChange', this._change);
}

function _change(){
    var group = unieap.byId("CheckboxGroup");
    alert('当前选中的实际值为' + group.getValue() + ",显示值为" + group.getText());
}

function fn_ToRight(){
    unieap.byId("CheckboxGroup").labelAlign = "top";
}

function fn_setValue(){
    unieap.byId("CheckboxGroup").setValue("1");
}
