dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
	var store = new unieap.ds.DataStore("empDataStore");
    store.setRowSetName("emp");
	store.setPageSize(20);
    unieap.Action.doQuery(store);
    unieap.byId('grid').getBinding().setDataStore(dataCenter.getDataStore("empDataStore"));
});

var cells = new unieap.ds.DataStore('cells', [{
    CODEVALUE: 'NAME',
    CODENAME: '姓名'
}, {
    CODEVALUE: 'attr_empno',
    CODENAME: '部门'
}, {
    CODEVALUE: 'attr_job',
    CODENAME: '职位'
}, {
    CODEVALUE: 'attr_sal',
    CODENAME: '工资'
}]);
dataCenter.addDataStore(cells);

function hideCell(){
    var values = unieap.byId("nameCombo").getValue();
    if (values == null || values == "") {
        alert("请选择要隐藏的列");
        return;
    }
    var layout = unieap.byId("grid").getManager("LayoutManager");
    var names = values.split(",");
    if (dojo.isArray(names)) {
        if (names.length > 3) {
            alert("不可以同时隐藏所有的列");
            return;
        }
        layout.hideCell(names);
    }
}

function showCell(){
    var values = unieap.byId("nameCombo").getValue();
    if (values == null || values == "") {
        alert("请选择要显示的列");
        return;
    }
    var layout = unieap.byId("grid").getManager("LayoutManager");
    var names = values.split(",");
    if (dojo.isArray(names)) {
        layout.showCell(names);
    }
}

function sortCell(){

    var layout = unieap.byId("grid").getManager("LayoutManager");
    var value = String(dojo.byId("cellList").value);
    value = value.split(",");
    if (dojo.isArray(value)) {
        layout.sortCell(value);
    }
}

function lockCell(){
    var values = unieap.byId("nameCombo").getValue();
    if (values == null || values == "") {
        alert("请选择要锁定的列");
        return;
    }
    var layout = unieap.byId("grid").getManager("LayoutManager");
    var names = values.split(",");
    if (dojo.isArray(names)) {
        layout.lockCell(names, true);
    }
}

function unlockCell(){
    var values = unieap.byId("nameCombo").getValue();
    if (values == null || values == "") {
        alert("请选择要解锁的列");
        return;
    }
    var layout = unieap.byId("grid").getManager("LayoutManager");
    var names = values.split(",");
    if (dojo.isArray(names)) {
        layout.lockCell(names, false);
    }
}
