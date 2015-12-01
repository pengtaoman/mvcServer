dojo.addOnLoad(function(){
	dp.SyntaxHighlighter.HighlightAll('code');
	var store = new unieap.ds.DataStore("empDataStore");
    store.setRowSetName("emp");
	store.setPageSize(20);
    unieap.Action.doQuery(store);
    unieap.byId('grid').getBinding().setDataStore(dataCenter.getDataStore("empDataStore"));
	unieap.byId('grid1').getBinding().setDataStore(dataCenter.getDataStore("empDataStore"));
});
			
function getFunc(inRowIndex) {
	return "第"+ (inRowIndex+1) + "行";
}

function formatterFunc(inValue, inRowIndex){
	if ((inRowIndex-1)%2==0) {
		inValue = "<label style='color:red'>" + inValue + "</label>"
	}
	return inValue;
}