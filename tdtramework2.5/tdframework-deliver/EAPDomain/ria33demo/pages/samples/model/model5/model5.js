//在页面加载后执行
dojo.addOnLoad( function() {
	initialize();
});

function init() {	
	var empStore = new unieap.ds.DataStore("empDataStore");
	empStore.setPageSize(20);
	empStore.setRowSetName("emp");
	dataCenter.addDataStore(empStore);
}

//页面加载前执行
init();

function initialize() {
	dojo.connect(unieap.byId("query_dept"), "onIconClick", this, openQueryDialog);
	dojo.connect(unieap.byId("empGrid").getManager("ViewManager"), "onRowDblClick", this, openEditDialog);
	dojo.connect(unieap.byId("btnUpdate"), "onClick", this, doUpdate);
	dojo.connect(unieap.byId("emp_add"), "onClick", this, insertRow);
	dojo.connect(unieap.byId("emp_del"), "onClick", this, deleteRow);
}

function openEditDialog(inRowIndex) {
	var row = unieap.byId("empGrid").getBinding().getRow(inRowIndex);
	var dialog = DialogUtil.showDialog(
		{
			url: unieap.appPath+"/pages/samples/model/model5/model5_edit_dialog.jsp",
			height: 350,
			width: 500,
			dialogData: {store:unieap.byId("empGrid").getBinding().getDataStore(),rowIndex:inRowIndex},
			onComplete: editReturn
		}
	);
}
function editReturn(value) {
	unieap.byId("empGrid").getManager("ViewManager").refreshRow(value.rowIndex);
}

function openQueryDialog() {
	var dialog = DialogUtil.showDialog(
		{
			url: unieap.appPath+"/pages/samples/model/model5/model5_query_dialog.jsp",
			height: 550,
			width: 700,
			onComplete: confirmReturn
		},
		unieap.byId("query_dept").domNode
	);
}
function confirmReturn(data) {
	var dataStore = dataCenter.getDataStore("empDataStore");
	dataStore.resetCondition();
	unieap.byId("deptInfoForm").clear();
	var sql = "attr_deptno==?";
    dataStore.insertConditionValue(data['attr_deptno'],unieap.DATATYPES.INTEGER);
	dataStore.setCondition(sql);
	unieap.Action.doQuery(dataStore,{
		load:function(ds,dc){
		dataStore = dc.getDataStore("empDataStore");
	}});
	unieap.byId("empGrid").setDataStore(dataStore);
	unieap.byId("query_dept").setValue(data['attr_dname']);
	unieap.byId("attr_deptno").setValue(data['attr_deptno']);
	unieap.byId("attr_dname").setValue(data['attr_dname']);
	unieap.byId("attr_dloc").setValue(data['attr_loc']);
}
function doUpdate() {
	if (unieap.byId("empGrid").getBinding().getRowSet().isModified()) {
		unieap.Action.doUpdate(unieap.byId("empGrid").getBinding().getDataStore(),{
			load: function(){
			},
			error:function(e){
				unieap.debug(e);
			}
		});
	}
}
function insertRow() {
	if (unieap.byId("empGrid").getBinding().getDataStore().getName() != "empDataStore") {
		dojo.require("unieap.dialog.MessageBox");
		MessageBox.alert({message :"请先查询后再增加数据!"});
		return;
	}
	unieap.byId("empGrid").getBinding().insertRow({},0);
	var rowIndex = 0;
	var row = unieap.byId("empGrid").getBinding().getRow(rowIndex);
	var dialog = DialogUtil.showDialog(
		{
			url: unieap.appPath+"/pages/samples/model/model5/model5_edit_dialog.jsp",
			height: 350,
			width: 500,
			dialogData: {store:unieap.byId("empGrid").getBinding().getDataStore(),rowIndex:rowIndex,newRow:true},
			onComplete: editReturn
		}
	);
}
function deleteRow() {
	var rows = unieap.byId("empGrid").getManager("SelectionManager").getSelectedRowIndexs();
	if(rows==""){
		dojo.require("unieap.dialog.MessageBox");
		MessageBox.alert({message :"请选择一条数据后再删除!"});
		return;
	}
	unieap.byId("empGrid").getBinding().deleteRows(rows);
}