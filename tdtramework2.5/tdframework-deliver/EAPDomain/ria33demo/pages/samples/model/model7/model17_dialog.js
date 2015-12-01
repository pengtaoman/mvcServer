
var dept_ds=new unieap.ds.DataStore("deptDS");
dept_ds.setRowSetName("dept");
dept_ds.setPageSize(20);
dataCenter.addDataStore(dept_ds);

//执行查询操作
function query(){
	var ds=dataCenter.getDataStore('deptDS');
	ds.setPageNumber(1);
	ds.removeConditionValues(); //清空查询值
	ds.setCondition(null); //清空查询条件
	ds.setRecordCount(0); //清空原始记录数
	var no = unieap.byId("deptNo").getValue();
	var name = unieap.byId("deptName").getValue();
	var sql="";
	if (no != "" && no != null) {
		dept_ds.insertConditionValue(no, unieap.DATATYPES.INTEGER);
		sql="attr_deptno==?"; //注意有两个等号,attr_deptno为别名,在dept.xml文件中配置
	}
	if (name != "" && name != null) {
		dept_ds.insertConditionValue(name, unieap.DATATYPES.VARCHAR);
		sql==""?(sql="attr_dname==?"):(sql=sql+" and attr_dname==?")
	}
	sql&&(dept_ds.setCondition(sql));
	
	//调用rpc.js中的unieap.Action.doQuery方法,向服务端发送请求获得数据
	unieap.Action.doQuery(ds, {
		load: bindGrid
	});
}

//重置

function reset(){
	unieap.byId("deptNo").setValue("");
	unieap.byId("deptName").setValue("")
}


//绑定数据表格
function bindGrid(ds){
	unieap.byId("grid").getBinding().setDataStore(ds);
}

//点击确定按钮并关闭dialog
function confirm(){
	var index=unieap.byId("grid").getManager("RowManager").getCurrentRowIndex();
	if(index<0){
		dojo.require("unieap.dialog.MessageBox");
		MessageBox.alert({message :"请选择一条记录!"});
		return;
	}
	var dialog=unieap.getDialog();
	dialog.setReturn(unieap.byId("grid").getBinding().getRow(index));
	dialog.close();
	
}





