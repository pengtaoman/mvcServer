var beginTime = new Date().getTime();
function fn(inValue,inRowIndex){
	if ((inRowIndex-1)%2==0){
		inValue = "<label style='color:blue'>" + inValue + "</label>";
	}
	return inValue;
}
function fn1(inRowIndex){
	return "第"+(inRowIndex+1)+"行";
}
dojo.addOnLoad(function(){
	var store = new unieap.ds.DataStore("empDataStore");
    store.setRowSetName("emp");
	store.setPageSize(100);
    unieap.Action.doQuery(store);
    unieap.byId("grid").getBinding().setDataStore(dataCenter.getDataStore("empDataStore"));
    var endTime = new Date().getTime();
//    alert(endTime - beginTime);
    window.status = endTime - beginTime; 
//    setInterval(function(){
//    	location.reload();
//    },5000);
});
function linkFormatter(inValue, inRowIndex) {
	return "<a href='"+unieap.appPath + "/pages/samples/grid/basic/grid_binding.jsp' target='_blank'>"+inValue+"</a>";
}
function fn2(evt){
	var index = parseInt(evt.rowIndex)+1;
	alert("第"+index+"行"+":"+evt.type);
}


