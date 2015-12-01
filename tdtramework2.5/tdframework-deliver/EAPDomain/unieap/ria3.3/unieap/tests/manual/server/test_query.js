function init(){
		var dataStore = new unieap.ds.DataStore("empDataStore");
		dataStore.setPageSize(10);
		dataStore.setRowSetName("com.neusoft.unieap.ria33demo.pojo.entities.Emp");
		var dc = new unieap.ds.DataCenter();
		dc.addDataStore(dataStore);
		var newdc = unieap.Action.requestData({
			url:unieap.WEB_APP_NAME+ "/DCTest.do?method=testLoadPoJo", 
			sync:true,
			load:function(dc){
			}
		},dc);
		dataCenter.addDataStore(newdc.getDataStore("empDataStore"));
		var ds = new unieap.ds.DataStore("DEPT",[{CODEVALUE:"10",CODENAME:"财务部"},{CODEVALUE:"20",CODENAME:"人力资源部"},{CODEVALUE:"30",CODENAME:"会计部"},{CODEVALUE:"40",CODENAME:"文体部"}]);
		dataCenter.addDataStore(ds);
	}
	init();
	function query(){
		var ds = dataCenter.getDataStore("empDataStore");
		var dc = new unieap.ds.DataCenter();
		dc.addDataStore(ds);
		var newdc = unieap.Action.requestData({
			url:unieap.WEB_APP_NAME+ "/DCTest.do?method=testLoadPoJo", 
			sync:true,
			load:function(a){
				var count = a.getDataStore("empDataStore").getRowSet().getRowCount();
				alert("带有数据的DataStore传到后台将数据清空后查询的记录数是："+count);
			}
		},dc);
	}
	
	function testCommonException() {
		var ds = dataCenter.getDataStore("empDataStore");
		var dc = new unieap.ds.DataCenter();
		dc.addDataStore(ds);
		var newdc = unieap.Action.requestData({
			url:unieap.WEB_APP_NAME+ "/DCTest.do?method=testCommonException", 
			sync:true,
			load:function(rdc){
				unieap.debug(rdc);
			}
		},dc);
	}
	
	function testOutArrayException() {
		var ds = dataCenter.getDataStore("empDataStore");
		var dc = new unieap.ds.DataCenter();
		dc.addDataStore(ds);
		var newdc = unieap.Action.requestData({
			url:unieap.WEB_APP_NAME+ "/DCTest.do?method=testOutArrayException", 
			sync:true,
			load:function(rdc){
				unieap.debug(rdc);
			}
		},dc);
	}
	
	function testAppException() {
		var ds = dataCenter.getDataStore("empDataStore");
		var dc = new unieap.ds.DataCenter();
		dc.addDataStore(ds);
		var newdc = unieap.Action.requestData({
			url:unieap.WEB_APP_NAME+ "/DCTest.do?method=testAppException", 
			sync:true,
			load:function(rdc){
				unieap.debug(rdc);
			}
		},dc);
	}
