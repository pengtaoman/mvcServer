dojo.addOnLoad(function(){
	dp.SyntaxHighlighter.HighlightAll('code');
});

function select(){
	if(unieap.byId('grid').getManager("SelectionManager").getSelectedRowIndexs().length>0){
		var dialog = unieap.getDialog();
		dialog.setReturn(unieap.byId('grid').getBinding().getDataStore().toData());
		dialog.close();
	}
	else{
         MessageBox.alert({message:"请选择一条记录",type:"info"},unieap.byId("confirmButton").domNode);
	}				
}

function close(){
		var dialog = unieap.getDialog();
		dialog.close();
}