dojo.addOnLoad(function(){
	dp.SyntaxHighlighter.HighlightAll('code');
	var store = new unieap.ds.DataStore("empDataStore");
    store.setRowSetName("emp");
	store.setPageSize(5);
    unieap.Action.doQuery(store);
    unieap.byId('grid').getBinding().setDataStore(dataCenter.getDataStore("empDataStore"));
});
			
function getFunc(inRowIndex) {
	return "第"+ (inRowIndex+1) + "行";
}

function imgFormatter(inValue, inRowIndex) {
	return "<img onclick='alert("+(inRowIndex+1)+")' src='" + unieap.appPath + "/pages/samples/grid/images/detail.gif'></img>";
}

function linkFormatter(inValue, inRowIndex) {
	return "<a href='"+unieap.appPath + "/pages/samples/grid/basic/grid_binding.jsp' target='_blank'>"+inValue+"</a>";
}