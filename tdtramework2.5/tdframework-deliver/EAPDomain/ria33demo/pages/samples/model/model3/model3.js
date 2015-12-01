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
dojo.addOnLoad( function() {
	dojo.connect(unieap.byId("btnQuery"), "onClick", this, btnQuery);
	dojo.connect(unieap.byId("btnReset"), "onClick", this, reset);
	dojo.connect(unieap.byId("btnSubmit"), "onClick", this, save);
	dojo.connect(unieap.byId("btnAdd"), "onClick", this, add);
	dojo.connect(unieap.byId("btnDelGrid"), "onClick", this, del);
	dojo.connect(unieap.byId("btnMod"), "onClick", this, modify);
	dojo.connect(unieap.byId("grid"),"onDbClick",modify);
});

//在grid中增加一条数据
function add() {
	var dialog = DialogUtil.showDialog({
			url : unieap.appPath+"/pages/samples/model/model3/model3_dialog.jsp",
			height : 450,
			width: 600,
			onComplete : addComplete
		},dojo.byId("btnAdd"));
}
function addComplete(value){
	unieap.byId("grid").getBinding().insertRow(dojo.fromJson(value),0);
}
//修改数据
function modify(value){
	var rowindex = unieap.byId("grid").getManager("SelectionManager").getSelectedRowIndexs()[0];
	if(rowindex==undefined||rowindex<0){
		dojo.require("unieap.dialog.MessageBox");
		MessageBox.alert({message :"请选择要修改行!"});
		return;
	}
	var row = unieap.byId("grid").getBinding().getRow(rowindex);
	var dialog = DialogUtil.showDialog({
			url : unieap.appPath+"/pages/samples/model/model3/model3_dialog.jsp",
			height : 450,
			width: 600,
			dialogData:dojo.toJson(row),
			onComplete : modComplete
		},dojo.byId("btnMod"));
}
function modComplete(value){
	var rowindex = unieap.byId("grid").getManager("SelectionManager").getSelectedRowIndexs()[0];
	if(rowindex==undefined||rowindex<0){
		return;
	}
	unieap.byId("grid").getBinding().getRowSet()["primary"][rowindex] = dojo.fromJson(value);
	unieap.byId("grid").getManager("ViewManager").refreshRow(rowindex);
}
//保存数据
function save() {
	var dc = new unieap.ds.DataCenter();
	var ds = dataCenter.getDataStore("empDataStore").collect("auto");

	dc.addDataStore(dataCenter.getDataStore("empDataStore"));
	unieap.Action.requestData( {
		url : unieap.WEB_APP_NAME + "/modelpojo.do?method=savePojo",
		sync : true,
		load : function(dc) {
//			if(dc.getCode()<0){
//				alert("保存失败");
//			}
			dataCenter.getDataStore("empDataStore").getRowSet().resetUpdate();
			dojo.require("unieap.dialog.MessageBox");
			MessageBox.alert({type:"info",message:"保存成功！"});
		}
	}, dc);
}

//删除数据
function del() {
	var rowIndex = unieap.byId("grid").getManager("SelectionManager").getSelectedRowIndexs()[0];
	if(rowIndex==undefined||rowIndex<0){
		dojo.require("unieap.dialog.MessageBox");
		MessageBox.alert({message :"请选择要删除行!"});
		return;
	}
	unieap.byId("grid").getBinding().deleteRow(rowIndex);
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
