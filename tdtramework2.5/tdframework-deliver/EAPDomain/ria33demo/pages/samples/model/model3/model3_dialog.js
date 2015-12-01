var data;
dojo.addOnLoad(function(){
	if(unieap.getDialog().getObject()){
		var rowData=unieap.getDialog().getObject();
		data = dojo.fromJson(rowData);
		var ds = new unieap.ds.DataStore("formStore",[data]);
		unieap.byId("form").getBinding().setDataStore(ds);
	}	
});
function complete(){
	if (unieap.byId("form").getBinding().getRow()) {
		unieap.getDialog().setReturn(dojo.toJson(data));
	}
	else {
		var formRow = unieap.byId("form").getHelper().collectData();
		unieap.getDialog().setReturn(dojo.toJson(formRow));
	}
	unieap.getDialog().close();
}
function close(){
	unieap.getDialog().close(false);
}
