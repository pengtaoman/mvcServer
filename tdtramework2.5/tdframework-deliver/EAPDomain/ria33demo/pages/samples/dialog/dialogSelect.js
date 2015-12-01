dojo.addOnLoad(function(){
	dp.SyntaxHighlighter.HighlightAll('code');
});
function select(){
    DialogUtil.showDialog({url:unieap.appPath + "/pages/samples/dialog/innerSelect.jsp",onComplete:bindDataToForm,width:"500",height:"400"},
    unieap.byId("select").domNode);
}
function bindDataToForm(store){
	if(store){
	//重新生成一个含有相同数据的store
		var newStore = new unieap.ds.DataStore(store);
		var rows = newStore.getRowSet().getSelectedRows();
		unieap.byId("form").getBinding().bind(rows[0])
	}
}
