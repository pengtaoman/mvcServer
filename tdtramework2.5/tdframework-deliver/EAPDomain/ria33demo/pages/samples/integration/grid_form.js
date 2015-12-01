var store = new unieap.ds.DataStore("empDataStore");
store.setRowSetName("emp");
store.addStatistic("attr_sal", "sum");
store.addStatistic("attr_sal", "avg");
store.addStatistic("attr_sal", "min");
store.addStatistic("attr_sal", "max");
unieap.Action.doQuery(store);
store = dataCenter.getDataStore("empDataStore");

var getLockedRow = function(){
	var sal = dataCenter.getDataStore("empDataStore").getRowSet().sum("attr_sal");
	sal= "小计值: " + (sal||0).toFixed(2);
    return [{attr_ename:'杨作仲',attr_hiredate:new Date().getTime(),attr_sal:sal,attr_job:'不job'}];
}
function getData(){
	return '自定义数据';
}
var myContext={
	testContext:'上下文'
};
function doSumbit(){
	unieap.byId("grid").getBinding().save();
}
function doDelete(){
	var rowIndex = unieap.byId("grid").getManager("RowManager").getCurrentRowIndex();
	if(rowIndex<0) return ;
	unieap.byId("grid").getManager("EditManager").deleteRow(rowIndex);
}
function doInsert(){
	var no = unieap.byId("grid").getBinding().getDataStore().getRecordCount()+3000;
	unieap.byId("grid").getBinding().insertRow({attr_empno:no,attr_ename:"新增记录"},0);
	unieap.byId("grid").getManager("SelectionManager").setSelect(0);
	unieap.byId("grid").getManager("ViewManager").scrollToRow(0);
	
}

dojo.addOnLoad(function(){
	dp.SyntaxHighlighter.HighlightAll('code');
	dojo.connect(unieap.byId("grid").getManager("SelectionManager"),"onAfterSelect",function(rowIndex){
		unieap.byId("form").getBinding().setDataStore(dataCenter.getDataStore("empDataStore"),rowIndex);
	});
});