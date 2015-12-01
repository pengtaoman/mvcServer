function init(){
	var deptStore = new unieap.ds.DataStore("deptDataStore");
	deptStore.setPageSize(10);
	deptStore.setRowSetName("dept");
	unieap.Action.doQuery(deptStore);
	deptStore = dataCenter.getDataStore("deptDataStore");
}
init();

dojo.addOnLoad(function() {
	initialize();
});

function initialize() {
	unieap.byId("query_grid").setDataStore(dataCenter.getDataStore("deptDataStore"));
	dojo.connect(unieap.byId("btnQuery"), "onClick", this, query);
	dojo.connect(unieap.byId("btnReset"), "onClick", this, reset);
	dojo.connect(unieap.byId("btnSelect"), "onClick", this, fetch);
}

//执行查询
function query() {
	//查询条件数组
	var value = [unieap.byId("deptno_box").getValue(),unieap.byId("dname_box").getValue()];
	var dataStore = dataCenter.getDataStore("deptDataStore");
	
	dataStore.setPageNumber(1);
	dataStore.setCondition("");
	dataStore.removeConditionValues();
	dataStore.setRecordCount(0);
	dataStore = dataStore.collect("none");
	
	var sql = "";
    if (value[0] != null && value[0] != "") {
    	sql = sql + " DEPTNO = ? ";
    	dataStore.insertConditionValue(value[0], unieap.DATATYPES.INTEGER);
	}
	
	if (value[1] != null && value[1] != "") {
		if(sql == "") {
			sql = sql + " DNAME = ? ";
		}
		else {
			sql = sql + " AND DNAME = ? ";
		}
		dataStore.insertConditionValue(value[1], unieap.DATATYPES.VARCHAR);
	}
	
	dataStore.setCondition(sql);
	unieap.Action.doQuery(dataStore,{
		load:function(ds,dc){
			dataStore = dc.getDataStore("deptDataStore");
		}
	});
	
	unieap.byId("query_grid").setDataStore(dataStore);
}

//重置查询form中的输入域
function reset() {
	unieap.byId("queryForm").clear();
}

function fetch() {
	var currentRowIndex = unieap.byId("query_grid").getManager("RowManager").getCurrentRowIndex();
	if (currentRowIndex>=0) {
		var row=unieap.byId("query_grid").getBinding().getRow(currentRowIndex);
		unieap.getDialog().setReturn(row);
		unieap.getDialog().close();
	} else {
		dojo.require("unieap.dialog.MessageBox");
		MessageBox.alert({message :"请选择一条数据!"});
	}
}