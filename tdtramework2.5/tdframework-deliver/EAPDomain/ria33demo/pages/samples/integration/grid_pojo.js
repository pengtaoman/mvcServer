dojo.addOnLoad( function() {
	initialize();
	dp.SyntaxHighlighter.HighlightAll('code');
	dp.SyntaxHighlighter.HighlightAll('code2');
});

function init() {
	var dataStore = new unieap.ds.DataStore("empDataStore");
	dataStore.setPageSize(20);
	dataStore.setRowSetName("com.neusoft.unieap.ria33demo.pojo.entities.Emp");
	var dc = new unieap.ds.DataCenter();
	dc.addDataStore(dataStore);
	var newdc = unieap.Action.requestData( {
			url : unieap.WEB_APP_NAME + "/RIATest.do?method=testLoadPoJo",
			parameters : {
				"asynLoadStatistics" : true
			},
			sync : true,
			load : function(dc) {}
		}, dc);
	dataCenter.addDataStore(newdc.getDataStore("empDataStore"));
	var ds = new unieap.ds.DataStore("DEPT", [ {
		CODEVALUE : "10",
		CODENAME : "财务部"
	}, {
		CODEVALUE : "20",
		CODENAME : "人力资源部"
	}, {
		CODEVALUE : "30",
		CODENAME : "会计部"
	}, {
		CODEVALUE : "40",
		CODENAME : "文体部"
	} ]);
	dataCenter.addDataStore(ds);
}

init();

function initialize() {
	var selection = unieap.byId("grid").getManager("SelectionManager");
	selection.setSelect(0);
	dojo.connect(selection, "onAfterSelect", afterSelected);
	dojo.connect(unieap.byId("form_save"), "onClick", this, save);
	dojo.connect(unieap.byId("form_add"), "onClick", this, add);
	dojo.connect(unieap.byId("form_del"), "onClick", this, del);
	dojo.connect(unieap.byId("form_refresh"), "onClick", this, refresh);
	dojo.connect(unieap.byId("open_query_dialog"), "onClick", this, openQueryDialog);
}

function afterSelected() {
	var rowIndex = unieap.byId("grid").getManager("SelectionManager")
			.getSelectedRowIndexs()[0];
	var row = unieap.byId("grid").getBinding().getRowSet().getRow(rowIndex);
	unieap.byId("form").getBinding().bind(row);
	return true;
}

function add() {
	var attr_empno = dojo.byId("attr_empno").value;
	var attr_ename = dojo.byId("attr_ename").value;
	var attr_job = dojo.byId("attr_job").value;
	var attr_sal = dojo.byId("attr_sal").value;
	var attr_hiredate = unieap.byId("attr_hiredate").getValue();

	var data = {
		attr_empno : attr_empno,
		attr_ename : attr_ename,
		attr_job : attr_job,
		attr_sal : attr_sal,
		attr_hiredate : attr_hiredate
	};
	unieap.byId("grid").getManager("EditManager").insertRow(data);

	unieap.byId("form").getBinding().unbind();
	unieap.byId("form").clear();

	unieap.byId("grid").getManager("SelectionManager").setSelect(0);
}

function save() {
	var dc = new unieap.ds.DataCenter();
	dc.addDataStore(dataCenter.getDataStore("empDataStore"));
	unieap.Action.requestData( {
		url : unieap.WEB_APP_NAME + "/RIATest.do?method=testSavePoJo",
		parameters : {
			"asynLoadStatistics" : false
		},
		sync : true,
		load : function(dc) {
			dataCenter.getDataStore("empDataStore").getRowSet().resetUpdate();
			dojo.require("unieap.dialog.MessageBox");
			MessageBox.alert({message :"保存成功!"});
		}
	}, dc);
}

function del() {
	var rowIndex = unieap.byId("grid").getManager("SelectionManager").getSelectedRowIndexs()[0];
	unieap.byId("grid").getManager("EditManager").deleteRow(rowIndex);
	unieap.byId("form").clear();
}

function refresh() {
	var dc = new unieap.ds.DataCenter();
	var datastore = dataCenter.getDataStore("empDataStore");
	datastore.setCondition("");
	datastore.removeConditionValues();
	datastore.setRecordCount(0);
	dc.addDataStore(datastore.collect("none"));
	
	var newdc = unieap.Action.requestData( {
		url : unieap.WEB_APP_NAME + "/RIATest.do?method=testLoadPoJo",
		sync : true,
		load : function(dc) {
		}
	}, dc);

	dataCenter.addDataStore(newdc.getDataStore("empDataStore"));
	var ds = new unieap.ds.DataStore("DEPT", [ {
		CODEVALUE : "10",
		CODENAME : "财务部"
	}, {
		CODEVALUE : "20",
		CODENAME : "人力资源部"
	}, {
		CODEVALUE : "30",
		CODENAME : "会计部"
	}, {
		CODEVALUE : "40",
		CODENAME : "文体部"
	} ]);
	dataCenter.addDataStore(ds);
	//unieap.debug(newdc);
	unieap.byId("grid").getBinding().setDataStore(newdc.getDataStore("empDataStore"));
	unieap.byId("grid").getManager("SelectionManager").setSelect(0);
}

function openQueryDialog() {
	var dialog = new unieap.dialog.Dialog({
		url : unieap.appPath + "/pages/samples/integration/grid_pojo_query_dialog.jsp",
		height : 180,
		onComplete : confirmReturn});
	dialog.show(unieap.byId("open_query_dialog").domNode);
}

function confirmReturn(value) {
	var dataStore = dataCenter.getDataStore("empDataStore");
	dataStore = dataStore.collect("none");
	dataStore.setCondition("");
	dataStore.removeConditionValues();
	dataStore.setRecordCount(0);
	
	var sql = "";
    if (value[0] != null && value[0] != "") {
    	sql = sql + " EMPNO = ? ";
    	dataStore.insertConditionValue(value[0], "4", unieap.DATATYPES.INTEGER);
	}

	if (value[1] != null && value[1] != "") {
		if(sql == "") {
			sql = sql + " ENAME = ? ";
		}
		else {
			sql = sql + " AND ENAME = ? ";
		}
		dataStore.insertConditionValue(value[1], "100", unieap.DATATYPES.STRING);
	}

	if (value[2] != null && value[2] != "") {
		if(sql == "") {
			sql = sql + " JOB = ? ";
		}
		else {
			sql = sql + " AND JOB = ? ";
		}
		dataStore.insertConditionValue(value[2], "9", unieap.DATATYPES.TIMESTAMP);
	}

	if (value[3] != null && value[3] != "") {
		if(sql == "") {
			sql = sql + " SAL = ? ";
		}
		else {
			sql = sql + " AND SAL = ? ";
		}
		dataStore.insertConditionValue(value[3], "16", unieap.DATATYPES.DOUBLE);
	}

	dataStore.setCondition(sql);
	dataStore.setPageNumber(1);
	var dc = new unieap.ds.DataCenter();
	dc.addDataStore(dataStore);
	var newdc = unieap.Action.requestData({
		url:unieap.WEB_APP_NAME+ "/RIATest.do?method=testLoadPoJo", 
		parameters:{"asynLoadStatistics":true},
		sync:true,
		load:function(dc){
		}
	}, dc);
	dataCenter.addDataStore(newdc.getDataStore("empDataStore"));
	var ds = new unieap.ds.DataStore("DEPT",[{CODEVALUE:"10",CODENAME:"财务部"},{CODEVALUE:"20",CODENAME:"人力资源部"},{CODEVALUE:"30",CODENAME:"会计部"},{CODEVALUE:"40",CODENAME:"文体部"}]);
	dataCenter.addDataStore(ds);

	unieap.byId("grid").getBinding().setDataStore(newdc.getDataStore("empDataStore"));
	unieap.byId("grid").getManager("SelectionManager").setSelect(0);
}
function onPM(store,binding){
	if(confirm("保存修改？")){
		binding.save({url:'/RIATest.do?method=testSavePoJo'});
	}
}