//在页面加载后执行
dojo.addOnLoad( function() {
	initialize();
});

function init() {
	var deptStore = new unieap.ds.DataStore("deptDataStore");
	deptStore.setPageSize(20);
	deptStore.setRowSetName("dept");
	unieap.Action.doQuery(deptStore,{
		sync:true
	});
	deptStore = dataCenter.getDataStore("deptDataStore");
	
	var empStore = new unieap.ds.DataStore("empDataStore");
	empStore.setPageSize(20);
	empStore.setRowSetName("emp");
	unieap.Action.doQuery(empStore,{
		load:function(ds,dc){
			dataCenter.addDataStore(ds);
		}
	});
	
}

//页面加载前执行
init();

function initialize() {
	dojo.connect(unieap.byId("query_dept"), "onIconClick", this, openQueryDialog);
	dojo.connect(unieap.byId("empGrid").getManager("ViewManager"), "onRowClick", this, select);
	dojo.connect(unieap.byId("btnUpdate"), "onClick", this, submit);
	dojo.connect(unieap.byId("btnInsert"), "onClick", this, doInsert);
	dojo.connect(unieap.byId("btnDelete"), "onClick", this, doDelete);
}

function openQueryDialog() {
	var dialog = DialogUtil.showDialog(
		{
			url: unieap.appPath+"/pages/samples/model/model8/model8_query_dialog.jsp",
			height: 550,
			width: 700,
			dialogData :dataCenter.getDataStore("deptDataStore"),
			onComplete : confirmReturn
		},
		unieap.byId("query_dept").iconNode
	);
}
function confirmReturn(value) {
	if (!value) return;
	
	var dataStore = dataCenter.getDataStore("empDataStore");
	dataStore = dataStore.collect("none");
	dataStore.resetCondition();
	
	var deptNo = value.attr_deptno, sql = "";
    sql += " DEPTNO = ? ";
    dataStore.insertConditionValue(deptNo,unieap.DATATYPES.INTEGER);
	dataStore.setCondition(sql);
	unieap.Action.doQuery(dataStore,{
		load:function(ds,dc){
			dataCenter.append(dc,"replace");
			dataStore = dataCenter.getDataStore("empDataStore");
		}
	});
	unieap.byId("empGrid").setDataStore(dataStore);
	unieap.byId("query_dept").setValue(value.attr_dname);
	unieap.byId("editForm").clear();
}

function select(inRowIndex) {
	unieap.byId("editForm").getBinding().bind(unieap.byId("empGrid").getBinding().getRowSet().getRow(inRowIndex));
}
function doInsert() {
	if (unieap.byId("empGrid").getBinding().getDataStore().getRowSetName()!="emp") {
		alert("请选择部门");
		return;
	}
	unieap.byId("empGrid").getBinding().insertRow({});
	unieap.byId("editForm").getBinding().bind(unieap.byId("empGrid").getBinding().getRowSet().getRow(0));
	
}
function doDelete() {
	var rowIndex = unieap.byId("empGrid").getManager("RowManager").getCurrentRowIndex();
	if (rowIndex>=0) {
		unieap.byId("empGrid").getBinding().deleteRow(rowIndex);
		unieap.byId("editForm").clear();
	}
}
function submit() {
	if (unieap.byId("empGrid").getBinding().getRowSet().isModified()) {
		unieap.Action.doUpdate(unieap.byId("empGrid").getBinding().getDataStore(),{load:function(){
//			dojo.require("unieap.dialog.MessageBox");
//		    MessageBox.alert({message :"数据更新成功!"})
		}});
	}
}