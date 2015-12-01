
dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
});

var province = new unieap.ds.DataStore('province_store', [{
    CODEVALUE: 11,
    CODENAME: '浙江'
}, {
    CODEVALUE: 12,
    CODENAME: '辽宁'
}]);

var city = new unieap.ds.DataStore('city_store', [{
    CODEVALUE: 1,
    CODENAME: '宁波',
    filter: 11
}, {
    CODEVALUE: 2,
    CODENAME: '宁海',
    filter: 11
}, {
    CODEVALUE: 3,
    CODENAME: '温州',
    filter: 11
}, {
    CODEVALUE: 4,
    CODENAME: '沈阳',
    filter: 12
}, {
    CODEVALUE: 15,
    CODENAME: '大连',
    filter: 12
}, {
    CODEVALUE: 16,
    CODENAME: '金州',
    filter: 12
}]);

var city1 = new unieap.ds.DataStore('city_store1', [{
    CODEVALUE: 1,
    CODENAME: '宁波'
}, {
    CODEVALUE: 2,
    CODENAME: '宁海'
}, {
    CODEVALUE: 3,
    CODENAME: '温州'
}]);

var city2 = new unieap.ds.DataStore('city_store2', [{
    CODEVALUE: 4,
    CODENAME: '沈阳'
}, {
    CODEVALUE: 15,
    CODENAME: '大连'
}, {
    CODEVALUE: 16,
    CODENAME: '金州'
}]);

function getCascadeStore(item){
    if (item == 11) {
        return 'city_store1'
    }
    else 
        if (item == 12) {
            return 'city_store2'
        }
}

dataCenter.addDataStore(province);
dataCenter.addDataStore(city);
dataCenter.addDataStore(city1);
dataCenter.addDataStore(city2);
