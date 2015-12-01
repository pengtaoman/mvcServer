function init(){
	var empDataStore = unieap.getDialog().getObject();
	var store = unieap.revDS(empDataStore);
	dataCenter.addDataStore(store);
}
init();

dojo.addOnLoad( function() {
	initialize();
});

function initialize() {
	dojo.connect(unieap.byId("btnSelect"), "onClick", select);
	dojo.connect(unieap.byId("btnReset"), "onClick", this, reset);
	dojo.connect(unieap.byId("btnQuery"), "onClick", this, query);
	dojo.connect(unieap.byId("btnClose"), "onClick", this, close);
}
//执行查询
function query() {
	
	//查询条件数组
	var value = [unieap.byId("attr_empno").getValue(), unieap.byId("attr_ename").getValue(), unieap.byId("attr_job").getValue()];
	
	var dataStore = dataCenter.getDataStore("empDataStore");
	dataStore = dataStore.collect("none");
	dataStore.setPageNumber(1);
	dataStore.setCondition("");
	dataStore.removeConditionValues();
	dataStore.setRecordCount(0);
	
	var sql = "";
    if (value[0] != null && value[0] != "") {
    	sql = sql + " EMPNO = ? ";
    	dataStore.insertConditionValue(value[0], unieap.DATATYPES.INTEGER);
	}

	if (value[1] != null && value[1] != "") {
		if(sql == "") {
			sql = sql + " ENAME = ? ";
		}
		else {
			sql = sql + " AND ENAME = ? ";
		}
		dataStore.insertConditionValue(value[1], unieap.DATATYPES.VARCHAR);
	}

	if (value[2] != null && value[2] != "") {
		if(sql == "") {
			sql = sql + " JOB = ? ";
		}
		else {
			sql = sql + " AND JOB = ? ";
		}
		dataStore.insertConditionValue(value[2], unieap.DATATYPES.VARCHAR);
	}
	dataStore.setCondition(sql);
	var dc = new unieap.ds.DataCenter();
	dc.addDataStore(dataStore);
	var newdc = unieap.Action.requestData({
		url:unieap.WEB_APP_NAME+ "/modelpojo.do?method=loadPojo", 
		sync:true,
		load:function(dc){
		}
	}, dc);
	dataCenter.addDataStore(newdc.getDataStore("empDataStore"));
	unieap.byId("grid").getBinding().setDataStore(newdc.getDataStore("empDataStore"));
	unieap.byId("grid").getManager("SelectionManager").setSelect(0);
}

//选中要显示的grid数据，并关闭dialog
function select(){
	var indexs = unieap.byId("grid").getManager("SelectionManager").getSelectedRowIndexs();
	if (indexs.length==0){
		alert("请选择一条数据。");
		return;
	}
	dataCenter.getDataStore("empDataStore").setCondition("");
	dataCenter.getDataStore("empDataStore").removeConditionValues();
	var index = indexs[0];
	var row = unieap.byId("grid").getBinding().getRowSet().getRow(index);
	unieap.getDialog().setReturn(row);
	unieap.getDialog().close();
}

//重置查询form中的输入域
function reset(){
	unieap.byId("queryForm").clear();
}

function close(){
	dataCenter.getDataStore("empDataStore").setCondition("");
	dataCenter.getDataStore("empDataStore").removeConditionValues();
	unieap.getDialog().close();
}
