
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

function getText(){
    var value = unieap.byId('RadioGroup').getText();
    if (value == "") {
        alert("请选择一个城市");
    }
    else {
        alert(value);
    }
}

function setAllDisabled(b){
    unieap.byId('RadioGroup').setDisabled(b);
}

function setDisabled(b){
    unieap.byId('RadioGroup').setDisabled(b, [0, 1, 4]);
}
