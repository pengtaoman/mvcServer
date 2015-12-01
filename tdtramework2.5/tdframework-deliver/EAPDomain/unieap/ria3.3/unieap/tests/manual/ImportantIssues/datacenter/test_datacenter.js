dojo.addOnLoad(function(){
	var ds = new unieap.ds.DataStore("demo");
//	unieap.debugger(ds,true);
	alert("新创建的ds的pageSize的大小为："+ds.getPageSize());
});