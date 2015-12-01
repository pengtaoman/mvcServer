var rowData;
dojo.addOnLoad(function(){
	if(unieap.getDialog().getObject()){
		rowData=unieap.getDialog().getObject();
		var ds = new unieap.ds.DataStore("formStore",[rowData]);
		unieap.byId("form").getBinding().setDataStore(ds);
	}	
});
function complete(){
	if (unieap.byId("form").getBinding().getRow()) {
		unieap.getDialog().setReturn(rowData);
	}
	else {
		var formRow = unieap.byId("form").getHelper().collectData();
		unieap.getDialog().setReturn(formRow);
	}
	unieap.getDialog().close();
}
function close(){
	unieap.getDialog().close(false);
}