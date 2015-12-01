var ds_dept;
var ds;
function init(){
	//form绑定的store
	var queryForm = new unieap.ds.DataStore("queryForm");
	queryForm.getRowSet().addRow();
	//严格按照配置文件中参数的顺序
	queryForm.addMetaData("empNo",{dataType:4,precision:5});
	queryForm.addMetaData("deptno",{dataType:4});
    queryForm.addMetaData("hiredate",{dataType:93}); 
	queryForm.addMetaData("salary",{dataType:8,precision:6,scale:2});	
	
	dataCenter.addDataStore(queryForm);
	
	//部门的transcode("DEPT")中用到dataCenter所以此处一定用全局变量dataCenter，同时保证DEPT一定存在。
	ds_dept = new unieap.ds.DataStore("DEPT",[{CODEVALUE:"10",CODENAME:"财务部"},{CODEVALUE:"20",CODENAME:"采购部"},{CODEVALUE:"30",CODENAME:"销售部"},{CODEVALUE:"40",CODENAME:"开发部"}]);
	dataCenter.addDataStore(ds_dept);
	
    //empDataStore为grid使用的store保证其一定存在
	ds = new unieap.ds.DataStore("empDataStore");
	ds.setPageSize(10);
	ds.setStatementName("emp");
}

init();

function query(){
	var queryForm = dataCenter.getDataStore("queryForm");
	var meta = queryForm.getMetaData();
	var empValue=queryForm.getRowSet().getItemValue(0,"empNo");
	var deptValue=queryForm.getRowSet().getItemValue(0,"deptno");
	var salValue=queryForm.getRowSet().getItemValue(0,"salary");
	var hiredateValue = queryForm.getRowSet().getItemValue(0,"attr_hiredate");
    ds.removeAttributes();
	ds.removeConditionValues();
    if(empValue!=null&&empValue!=""){
		ds.addAttribute("emp","EMPNO",unieap.DATATYPES.INTEGER);
		ds.insertConditionValue(empValue,unieap.DATATYPES.INTEGER);
	}
	if(deptValue!=null&&deptValue!=""){
		ds.addAttribute("dept","DEPTNO",unieap.DATATYPES.INTEGER);
		ds.insertConditionValue(deptValue,unieap.DATATYPES.INTEGER);
	}
	if(hiredateValue!=null&&hiredateValue!=""){
		ds.addAttribute("hiredate","HIREDATE",unieap.DATATYPES.TIMESTAMP);
	 		ds.insertConditionValue(hiredateValue,unieap.DATATYPES.TIMESTAMP);
	}
	if(salValue!=null&&salValue!=""){
		ds.addAttribute("salary","SAL",unieap.DATATYPES.DOUBLE);
		var com=unieap.byId("compara").getValue();
		ds.addAttribute("comp",com,"12");
		ds.insertConditionValue(salValue,unieap.DATATYPES.DOUBLE);
	}
	var dc = new unieap.ds.DataCenter();
	dc.addDataStore(ds);
	var ddc=unieap.Action.requestData({
		url:unieap.WEB_APP_NAME+ "/RIATest.do?method=testLoadPoJo",
		parameters:{"asynLoadStatistics":true},
		sync:true,
		load:function(dc){}
		},dc);
	dataCenter.addDataStore(ddc.getDataStore("empDataStore"));
}

query();

function setStore(){
	query();
	unieap.byId("grid").getBinding().setDataStore(dataCenter.getDataStore("empDataStore"));
}

dojo.addOnLoad(function(){
	unieap.byId("grid").getBinding().setDataStore(dataCenter.getDataStore("empDataStore"));
	dp.SyntaxHighlighter.HighlightAll('code');
	dp.SyntaxHighlighter.HighlightAll('code2');
});