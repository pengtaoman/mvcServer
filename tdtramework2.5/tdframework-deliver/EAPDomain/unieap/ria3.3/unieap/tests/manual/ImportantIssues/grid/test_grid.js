function init() {
	
}
function setStore(){
	
	grid.getBinding().setDataStore(unieap.getDataStore("empFilterDataStore"));
}

function validate(){
	edit_grid.getBinding().validate();
}

function change(){
	var k = combobox.getValue();
	if(k == '0'){
		t_grid.getBinding().setDataStore(unieap.getDataStore("empFilterDataStore"));
	}else{
		t_grid.getBinding().setDataStore(unieap.getDataStore("empLockDataStore"));
	}
}

function click(){
	DialogUtil.showDialog({url:"test_dialog_innergrid.jsp",width:'700px',height:'600px'},
			test_dialog_grid.domNode);
}

dojo.addOnLoad(function(){
	var ds = new unieap.ds.DataStore('demo',[{key:'0',value:'数据表格数据1'},{key:'1',value:'数据表格数据2'}]);
	dataCenter.addDataStore(ds);
});