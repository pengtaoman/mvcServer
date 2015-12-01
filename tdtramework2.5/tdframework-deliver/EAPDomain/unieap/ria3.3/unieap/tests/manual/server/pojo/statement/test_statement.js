function query(){
	var ds = new unieap.ds.DataStore("empDataStore");
	ds.setPageSize(10);
	ds.setStatementName("emp");
	ds.addStatistic("EMPNO","max");
	ds.addStatistic("HIREDATE","min");
	ds.addStatistic("SAL","avg");
	ds.addStatistic("SAL","sum");
	var dc = new unieap.ds.DataCenter();
	dc.addDataStore(ds);
	var ddc=unieap.Action.requestData({
			url:unieap.WEB_APP_NAME+ "/DCTest.do?method=testLoadPoJo", 
			parameters:{"asynLoadStatistics":true},
			sync:true,
			load:function(dc){
			}
		},dc);
	grid.getBinding().setDataStore(ddc.getDataStore("empDataStore"));
}
dojo.addOnLoad(query);





