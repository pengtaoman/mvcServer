function query(){
	var ds = new unieap.ds.DataStore("empDS");
	ds.setPageSize(10);
	ds.setRowSetName("com.neusoft.unieap.ria33demo.pojo.entities.Emp");
	if(unieap.byId("empno").getValue()){
		ds.addParameter("empno",[unieap.byId("noCom").getValue(),unieap.byId("empno").getValue()]);
	}
	if(unieap.byId("ename").getValue()){
		ds.addParameter("ename",[unieap.byId("nameCom").getValue(),unieap.byId("ename").getValue()]);
	}
	if(unieap.byId("job").getValue()){
		ds.addParameter("job",[unieap.byId("jobCom").getValue(),unieap.byId("job").getValue()]);
	}
	if(unieap.byId("sal").getValue()){
		ds.addParameter("sal",[unieap.byId("salCom").getValue(),unieap.byId("sal").getValue()]);
	}
	if(unieap.byId("hiredate").getValue()){
		ds.addParameter("hiredate",[unieap.byId("dateCom").getValue(),unieap.byId("hiredate").getValue()]);
	}
	if(unieap.byId("deptno").getValue()){
		ds.addParameter("deptno",["=",unieap.byId("deptno").getValue()]);
	}
	
	dataCenter.addDataStore(ds);
	unieap.Action.requestData({
		url:unieap.WEB_APP_NAME+ "/pojoTest.do?method=empQuery",
		sync:true,
		load:function(backDC){
			unieap.byId("grid").getBinding().setDataStore(backDC.getDataStore("empDS"));
		}
	},dataCenter);
}
function reset(){
	unieap.byId("formQuery").clear();
	unieap.byId("noCom").setValue("=");
	unieap.byId("nameCom").setValue("=");
	unieap.byId("jobCom").setValue("=");
	unieap.byId("salCom").setValue("=");
	unieap.byId("dateCom").setValue("=");
}
dojo.addOnLoad(function(){
	var ds = new unieap.ds.DataStore("empDS");
	ds.setRowSetName("com.neusoft.unieap.ria33demo.pojo.entities.Emp");
	ds.setPageSize(10);
	var dc = new unieap.ds.DataCenter();
	dc.addDataStore(ds);
	unieap.Action.requestData({
		url:unieap.WEB_APP_NAME+ "/pojoTest.do?method=empQuery",
		sync:true,
		load:function(backDC){
			unieap.byId("grid").getBinding().setDataStore(backDC.getDataStore("empDS"));
		}
	},dc);

});
