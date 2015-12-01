
dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
});
var deptDs = new unieap.ds.DataStore('deptDs', [{
    CODEVALUE: '10',
    CODENAME: '开发部'
}, {
    CODEVALUE: '20',
    CODENAME: '产品部'
}, {
    CODEVALUE: '30',
    CODENAME: '测试部'
}, {
    CODEVALUE: '40',
    CODENAME: '客户部'
}, {
    CODEVALUE: '50',
    CODENAME: '后勤部'
}]);
dataCenter.addDataStore(deptDs)

var ds = new unieap.ds.DataStore('empDataStore');
ds.setPageSize(50);
ds.setRowSetName('emp');
dataCenter.addDataStore(ds)
unieap.Action.doQuery(ds, {
    load: function(ds){
        dataCenter.addDataStore(ds)
    }
})

var getLockedRow = function(){
    return [{
        NAME: '用户1',
        attr_empno: 251,
        attr_job: '职位1',
        attr_sal: '25555'
    }, {
        NAME: '用户2',
        attr_empno: 252,
        attr_job: '职位2',
        attr_sal: '25555'
    }];
}


