
	function init(){
		var dataStore = new unieap.ds.DataStore("empDataStore");
		dataStore.setPageSize(20);
		dataStore.setRowSetName("com.neusoft.unieap.ria33demo.pojo.entities.Emp");
		dataStore.addStatistic("empno","max");
		dataStore.addStatistic("hiredate","min");
		dataStore.addStatistic("sal","avg");
		dataStore.addStatistic("sal","sum");
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
	
	function initialize(){
		var selection = grid.getManager("SelectionManager");
		dojo.connect(selection, "onAfterSelect", afterSelected);
	    dojo.connect(dijit.byId("form_save"), "onClick", this, save);
	    dojo.connect(dijit.byId("form_add"), "onClick", this, add);
	    dojo.connect(dijit.byId("form_del"), "onClick", this, del);
	    dojo.connect(dijit.byId("form_refresh"), "onClick", this, refresh);
	}
	dojo.addOnLoad(initialize); 
	
	function afterSelected(){
		var rowIndex = dijit.byId("grid").getManager("SelectionManager").getSelectedRowIndexs()[0];
		var row = dijit.byId("grid").getBinding().getRowSet().getRow(rowIndex);
	    dijit.byId("org.form").getBinding().bind(row);
		return true;
	}
	
	function add(){
		var attr_empno = dojo.byId("attr_empno").value;
		var attr_ename = dojo.byId("attr_ename").value;
		var attr_job = dojo.byId("attr_job").value;
		var attr_sal = dojo.byId("attr_sal").value;
		var attr_hiredate = dijit.byId("attr_hiredate").getValue();
	   
	    var data = {
	    	attr_empno:attr_empno,
	    	attr_ename:attr_ename,
	    	attr_job:attr_job,
	    	attr_sal:attr_sal,
	        attr_hiredate: attr_hiredate
	    };
	    grid.getManager("EditManager").insertRow(data);
	}
	function save(){ 
	if(!orgForm.validate()){
		alert("验证不通过");
	}
	var dc =new unieap.ds.DataCenter();
	dc.addDataStore(dataCenter.getDataStore("empDataStore"));
	unieap.Action.requestData({
			url:unieap.WEB_APP_NAME+ "/DCTest.do?method=testSavePoJo", 
			parameters:{"asynLoadStatistics":true},
			sync:true,
			load:function(dc){
				dataCenter.getDataStore("empDataStore").getRowSet().resetUpdate();
				alert("保存成功");
			}
		},dc);
}
	function del(){
		var rowIndex = dijit.byId("grid").getManager("SelectionManager").getSelectedRowIndexs()[0];
	    grid.getManager("EditManager").deleteRow(rowIndex);
	}
	
	function query(){
	
	}
	
	function refresh(){
	    grid.update();
	}
	