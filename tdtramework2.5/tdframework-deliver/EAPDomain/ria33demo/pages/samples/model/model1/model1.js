//在页面加载后执行
dojo.addOnLoad( function() {
	initialize();
});

function init() {
	var dataStore = new unieap.ds.DataStore("empDataStore");
	dataStore.setPageSize(20);
	dataStore.setRowSetName("com.neusoft.unieap.ria33demo.pojo.entities.Emp");
	var dc = new unieap.ds.DataCenter();
	dc.addDataStore(dataStore);
	unieap.Action.requestData( {
			url : unieap.WEB_APP_NAME + "/modelpojo.do?method=loadPojo",
			sync : true,
			load : function(dc) {
				dataCenter.addDataStore(dc.getDataStore("empDataStore"));
			}
		}, dc);
	
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

//页面加载前执行
init();

//在addOnload中初始化
function initialize() {
	var row=dataCenter.getDataStore("empDataStore").getRowSet().getRow(0);   
	unieap.byId("inputForm").getBinding().bind(row);
	dojo.connect(unieap.byId("query_empno"), "onIconClick", this, openQueryDialog);
	dojo.connect(unieap.byId("btnReset"), "onClick", this, reset);
	dojo.connect(unieap.byId("btnSubmit"), "onClick", this, save);
	dojo.connect(unieap.byId("btnAdd"), "onClick", this, add);
	dojo.connect(unieap.byId("btnDelGrid"), "onClick", this, del);
}

//新增数据，清空form中的数据
function add() {
//	unieap.byId("inputForm").getBinding().unbind();
//	unieap.byId("inputForm").clear();
	var rs = dataCenter.getDataStore("empDataStore").getRowSet();
	var row = rs.addRow();
	unieap.byId("inputForm").getBinding().bind(row);
	unieap.byId("inputForm").clear();
}

//将新增的数据保存到数据库
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

//从数据库中删除unieap.byId("inputForm")中的数据
function del() {
	var index=unieap.byId("inputForm").getBinding().getRow().getIndex();
	var rowset=unieap.byId("inputForm").getBinding().getRow().getRowSet();
	rowset.deleteRow(index);
	var dc = new unieap.ds.DataCenter();
	dc.addDataStore(dataCenter.getDataStore("empDataStore"));
	unieap.Action.requestData( {
		url : unieap.WEB_APP_NAME + "/modelpojo.do?method=savePojo",
		sync : true,
		load : function(dc) {
			dataCenter.getDataStore("empDataStore").getRowSet().resetUpdate();
			dojo.require("unieap.dialog.MessageBox");
			MessageBox.alert({message :"删除成功!"});		
		}
	}, dc);
	var row=dataCenter.getDataStore("empDataStore").getRowSet().getRow(0);   
	unieap.byId("inputForm").getBinding().bind(row);
}

//打开查询对话框
function openQueryDialog() {
	var dialog = DialogUtil.showDialog({
		url : unieap.appPath+"/pages/samples/model/model1/model1_query_dialog.jsp",
		height : 550,
		width: 700,
		dialogData :dataCenter.getDataStore("empDataStore"),
		onComplete : confirmReturn
		},query_empno.iconNode);
}

//在form中显示dialog选中的数据
function confirmReturn(value) {
	if (value){
	    var index = value.getIndex();
	    var store = unieap.revDS(value.getRowSet().getDataStore());
	    dataCenter.addDataStore(store);
		unieap.byId("inputForm").getBinding().bind(store.getRowSet().getRow(index));
	}
}

// 清空查询表单
function reset() {
	unieap.byId("formQuery").clear();
}