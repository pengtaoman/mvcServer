
dojo.addOnLoad( function() {
	initialize();
});

//初始化化dataCenter
function init() {
	var dataStore = new unieap.ds.DataStore("empDataStore");
	dataStore.setPageSize(20);
	dataStore.setRowSetName("com.neusoft.unieap.ria33demo.pojo.entities.Emp");
	var dc = new unieap.ds.DataCenter();
	dc.addDataStore(dataStore);
	var newdc = unieap.Action.requestData( {
			url : unieap.WEB_APP_NAME + "/modelpojo.do?method=loadPojo",
			sync : true,
			load : function(dc) {}
		}, dc);
	dataCenter.addDataStore(newdc.getDataStore("empDataStore"));
}

init();

function initialize() {
	var selection = unieap.byId("grid").getManager("SelectionManager");
	selection.setSelect(0);
	dojo.connect(unieap.byId("btnQuery"), "onClick", this, btnQuery);
	dojo.connect(unieap.byId("btnReset"), "onClick", this, reset);
	dojo.connect(unieap.byId("btnSubmit"), "onClick", this, save);
	dojo.connect(unieap.byId("btnAdd"), "onClick", this, add);
	dojo.connect(unieap.byId("btnDelGrid"), "onClick", this, del);
	dojo.connect(unieap.byId("insertSelected"), "onClick", this, insertSelected);
	dojo.connect(unieap.byId("insertAll"), "onClick", this, insertAll);
}

// 选中行整列插入
function insertSelected(){
	var hiredate = unieap.byId("insert_hiredate").getValue();
	var job = unieap.byId("insert_job").getValue();
	var deptno = unieap.byId("insert_deptno").getValue();
	var selection = unieap.byId("grid").getManager("SelectionManager");
	var rowIndex = unieap.byId("grid").getManager("SelectionManager").getSelectedRowIndexs();
	for(var i=0;i<rowIndex.length;i++){
		var index = rowIndex[i];
		var row = unieap.byId("grid").getBinding().getRowSet().getRow(index);		
		row.setItemValue("hiredate",hiredate);
		row.setItemValue("job",job);
		row.setItemValue("deptno",deptno);	
	}
	unieap.byId("grid").refresh();
}

// 全部行整列插入
function insertAll(){
	var rc = unieap.byId("grid").getBinding().getRowSet().getRowCount();
	if (rc > 0) {
		var hiredate = unieap.byId("insert_hiredate").getValue();
		var job = unieap.byId("insert_job").getValue();
		var deptno = unieap.byId("insert_deptno").getValue();
		
		for (var i = 0; i < rc; i++) {
			var row = unieap.byId("grid").getBinding().getRowSet().getRow(i);		
				row.setItemValue("hiredate",hiredate);
				row.setItemValue("job",job);
				row.setItemValue("deptno",deptno);	
		}
	}
}

//在unieap.byId("grid")中增加一条数据
function add() {
	
	var attr_empno = unieap.byId("attr_empno").getValue();
	var attr_ename = unieap.byId("attr_ename").getValue();
	var attr_job = unieap.byId("attr_job").getValue();
	var attr_sal = unieap.byId("attr_sal").getValue();
	var attr_hiredate = unieap.byId("attr_hiredate").getValue();
	var attr_deptno = unieap.byId("attr_deptno").getValue();
	var data = {
		empno : attr_empno,
		ename : attr_ename,
		job : attr_job,
		sal : attr_sal,
		deptno : attr_deptno,
		hiredate : attr_hiredate
	};
	unieap.byId("grid").getManager("EditManager").insertRow(data);
	unieap.byId("formQuery").getBinding().unbind();
	unieap.byId("formQuery").clear();
	unieap.byId("grid").getManager("SelectionManager").setSelect(0);
}

//保存数据
function save() {
	var dc = new unieap.ds.DataCenter();
	dc.addDataStore(dataCenter.getDataStore("empDataStore"));
	unieap.Action.requestData( {
		url : unieap.WEB_APP_NAME + "/modelpojo.do?method=savePojo",
		sync : true,
		load : function(dc) {
			dataCenter.getDataStore("empDataStore").getRowSet().resetUpdate();
			dojo.require("unieap.dialog.MessageBox");
			MessageBox.alert({message :"保存成功!"});
		}
	}, dc);
}

//删除数据
function del() {
	var rowIndex = unieap.byId("grid").getManager("SelectionManager").getSelectedRowIndexs()[0];
	unieap.byId("grid").getManager("EditManager").deleteRow(rowIndex);
}

//执行查询操作
function btnQuery(){
	var results = [unieap.byId("attr_empno").getValue(), unieap.byId("attr_ename").getValue(), 
				  unieap.byId("attr_job").getValue(), unieap.byId("attr_sal").getValue(),
				  unieap.byId("attr_deptno").getValue(), unieap.byId("attr_hiredate").getValue()];
	confirmReturn(results);
}

function confirmReturn(value) {
	var dataStore = dataCenter.getDataStore("empDataStore");
	dataStore = dataStore.collect("none");
	dataStore.setPageNumber(1);
	dataStore.setCondition("");
	dataStore.removeConditionValues();
	dataStore.setRecordCount(0);
	
	var sql = "";
    if (value[0] != null && value[0] != "") {
    	sql = sql + " EMPNO = ? ";
    	dataStore.insertConditionValue(value[0],unieap.DATATYPES.DECIMAL);
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

	if (value[3] != null && value[3] != "") {
		if(sql == "") {
			sql = sql + " SAL = ? ";
		}
		else {
			sql = sql + " AND SAL = ? ";
		}
		dataStore.insertConditionValue(value[3], unieap.DATATYPES.DOUBLE);
	}

	if (value[4] != null && value[4] != "") {
		if(sql == "") {
			sql = sql + " DEPTNO = ? ";
		}
		else {
			sql = sql + " AND DEPTNO = ? ";
		}
		dataStore.insertConditionValue(value[4], unieap.DATATYPES.DECIMAL);
	}

	if (value[5] != null && value[5] != "") {
		if(sql == "") {
			sql = sql + " HIREDATE = ? ";
		}
		else {
			sql = sql + " AND HIREDATE = ? ";
		}
		dataStore.insertConditionValue(value[5], unieap.DATATYPES.TIMESTAMP);
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
function onPM(store,binding){
	if(confirm("保存修改？")){
		binding.save({url:'/modelpojo.do?method=savePojo'});
	}
}

// 清空查询表单
function reset() {
	unieap.byId("formQuery").clear();
}
