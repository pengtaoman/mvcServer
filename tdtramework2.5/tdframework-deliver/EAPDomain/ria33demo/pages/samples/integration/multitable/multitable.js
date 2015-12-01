function init(){
    var ds = new unieap.ds.DataStore("company");
    ds.setRowSetName("practise");
    unieap.Action.doQuery(ds);
}
init();

function query(){
	var dataStore = dataCenter.getDataStore("company");
	dataStore = dataStore.collect("none");
	dataStore.setPageNumber(1);
	dataStore.removeConditionValues();
	dataStore.setRecordCount(0);
	var no = unieap.byId("no").getValue();
	var name = unieap.byId("name").getValue();
    var state = unieap.byId("state").getValue();
	var method = unieap.byId("method").getValue();
	var sql = "";
    if (no != null && no != "") {
    	sql = sql + " [attr_no] = ? ";
    	dataStore.insertConditionValue(no,unieap.DATATYPES.INTEGER);
	}
	if (name != null && name != "") {
	   if(sql == "") {
			sql = sql + " [attr_name] like ? ";
		}
		else {
			sql = sql + " AND [attr_name] like  ? ";
		}
		
    	dataStore.insertConditionValue("%"+name+"%",unieap.DATATYPES.STRING);
	}
	 if (state != null && state != "") {
		if(sql == "") {
			sql = sql + " [attr_state] = ? ";
		}
		else {
			sql = sql + " AND [attr_state]  = ? ";
		}
		
    	dataStore.insertConditionValue(state,unieap.DATATYPES.INTEGER);
	}
	if (method != null && method != "") {
		if(sql == "") {
			sql = sql + " [attr_method] = ? ";
		}
		else {
			sql = sql + " AND [attr_method]  = ? ";
		}
    	dataStore.insertConditionValue(method,unieap.DATATYPES.INTEGER);
	}
	dataStore.setCondition(sql);
	unieap.Action.doQuery(dataStore,{load:function(ds){
		unieap.byId("grid").setDataStore(ds);
	}});
}

function save(){
	var ds = unieap.byId("grid").getBinding().getDataStore();
	ds.addParameter("key2","key2");
	ds.addParameter("name","nameParam");
	unieap.byId("grid").getBinding().save();
} 
function add(){
	dojo.require("unieap.dialog.DialogUtil");
	var dialog = DialogUtil.showDialog({
			url : unieap.appPath+"/pages/samples/integration/multitable/multitableDialog.jsp",
			height : 450,
			width: 600,
			onComplete : addComplete
		},dojo.byId("btnAdd"));
}
function addComplete(value){
	if (value) {
		unieap.byId("grid").getBinding().insertRow(value, 0);
	}
}


//修改数据
function modify(value){
	var rowindex = unieap.byId("grid").getManager("RowManager").getCurrentRowIndex();
	var row = unieap.byId("grid").getBinding().getRow(rowindex);
	dojo.require("unieap.dialog.DialogUtil");
	var dialog = DialogUtil.showDialog({
			url : unieap.appPath+"/pages/samples/integration/multitable/multitableDialog.jsp",
			height : 450,
			width: 600,
			dialogData:row,
			onComplete : modComplete
		},dojo.byId("btnMod"));
}
function modComplete(value){
	var rowindex = unieap.byId("grid").getManager("RowManager").getCurrentRowIndex();
	var row = unieap.byId("grid").getBinding().getRowSet()["primary"][rowindex] = value;
	unieap.byId("grid").refresh();
}
//删除数据
function deleteData() {
	dojo.require("unieap.dialog.MessageBox");
	var indexs = unieap.byId("grid").getManager("SelectionManager").getSelectedRowIndexs();
	if(indexs.length>0)
	  MessageBox.confirm({message:"确认要删除？",onComplete:finish},dojo.byId("btnSubmit"))
    else{
		 MessageBox.alert({message:"请选择记录"},dojo.byId("btnSubmit"))
	}
	
}
function finish(value){
	if(value){
		var rowIndex = unieap.byId("grid").getManager("SelectionManager").getSelectedRowIndexs()[0];
	    unieap.byId("grid").getBinding().deleteRow(rowIndex);
	}
}

// 清空查询表单
function reset() {
	unieap.byId("formQuery").clear();
}

