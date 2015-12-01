
var store = new unieap.ds.DataStore("empDataStore");
store.setRowSetName("emp");
unieap.Action.doQuery(store);
dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
});

function fn(value){
    var value = unieap.byId("empnameCondition").getValue();
    if (value == "null") {
        unieap.byId("empname").setDisabled(true);
        unieap.byId("empname").setRequired(false);
        unieap.byId("empname").getValidator().validate();
    }
    else {
        setTimeout(function(){
            unieap.byId("empname").setRequired(true);
            unieap.byId("empname").disabled && unieap.byId("empname").setDisabled(false);
        }, 0)
    }
}

function query(){
    //用户名
    var name = unieap.byId("empname").getValue();
    
    //用户编号
    var number = unieap.byId("empno").getValue();
    
    //用户名为空或者用户编号为空
    if ((name == "" && !unieap.byId("empname").disabled) || number == "") {
        alert('输入查询条件');
        return;
    }
    //用户名查询条件,是否是等于、like或者非空
    var nameCon = unieap.byId("empnameCondition").getValue();
    
    //用户编号查询条件,是否是大于、等于等
    var numberCon = unieap.byId("empnoCondition").getValue();
    
    var ds = dataCenter.getDataStore('empDataStore');
    
    if (nameCon == "null") { //如果用户过滤条件为空,即NULL
        ds.setCondition("[attr_ename] is NULL " + " and [attr_empno] " + numberCon + " ? ");
    }
    else {
        ds.setCondition("[attr_ename] " + nameCon + " ? and [attr_empno] " + numberCon + " ? ");
    }
    
    if (nameCon == 'like') { //如果用户名过滤条件为like
        name = '%' + name + '%';
    }
    
    ds.removeConditionValues();
    
    if (nameCon != "null") { //如果用户名过滤条件不为空
        ds.insertConditionValue(name, unieap.DATATYPES.STRING, 0);
    }
    ds.insertConditionValue(number, unieap.DATATYPES.INTEGER, 1);
    unieap.Action.doQuery(ds, {
        load: function(ds){
            unieap.byId("grid1").getBinding().setDataStore(ds);
        }
    });
}
