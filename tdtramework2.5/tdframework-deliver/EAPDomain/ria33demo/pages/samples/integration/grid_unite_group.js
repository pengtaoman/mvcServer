dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
    
    //部门信息
    var deptStore = new unieap.ds.DataStore("deptStore");
    deptStore.setRowSetName("dept");
    unieap.Action.doQuery(deptStore);
    
    //员工信息
    var empDataStore = new unieap.ds.DataStore("empDataStore");
    empDataStore.setRowSetName("emp");
    empDataStore.setPageSize(20);
    empDataStore.setOrder("[attr_deptno] desc,[attr_job] asc");
    unieap.Action.doQuery(empDataStore, {
        load: function(ds){
            unieap.byId("grid").getBinding().setDataStore(ds);
        }
    });
});
