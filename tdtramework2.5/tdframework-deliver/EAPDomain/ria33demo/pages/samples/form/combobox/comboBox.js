
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
var search = new unieap.ds.DataStore('mysearch', [{
    CODEVALUE: 'baidu',
    CODENAME: '百度'
}, {
    CODEVALUE: 'google',
    CODENAME: '谷歌'
}]);

dataCenter.addDataStore(city);
dataCenter.addDataStore(search);

var structure = {
    rows: [{
        field: "CODEVALUE",
        width: "30%"
    }, {
        "title": "代码标题",
        field: "CODENAME",
        width: "70%"
    }]
}
var imgPath = unieap.appPath + "/pages/samples/form/images/";
function getInnerHTML(value, item, field, text, matchReg){
    if (field == 'CODEVALUE') {
        if (item.CODEVALUE == "baidu") {
            return "<img style='display:block;height:16px;width:16px' src='" + imgPath + "baidu.bmp" + "' />"
        }
        else {
            return "<img style='display:block;height:16px;width:16px' src='" + imgPath + "google.bmp" + "' />"
        }
    }
    return "<span>" + value + "</span>";
}
