function initData(){
   var dcs= 	{header:{code:0,message:{title:"null",detail:"null"}},body:{parameters:{},
			   dataStores:{    empDataStore:
			   { pageSize:5,pageNumber:1,recordCount:1,dataSetName:"ria.empDataStore",name:"empDataStore",order:"",condition:"",   
			   rowSet:[{attr_empno:"250",NAME:"杨作仲",attr_job:"项目经理",attr_sal:"1080",attr_deptno:"10",_t:3,_o:{NAME:"大白"}},
			   {attr_empno:"100",NAME:"张卫滨",attr_job:"RIA主架构师", attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10000",NAME:"赵磊",attr_job:"产品经理",  attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"}]}
			   }
   }};
	var dc = new unieap.ds.DataCenter(dcs);
	dataCenter.addDataStore(dc.getDataStore("empDataStore"));
}
initData();
function forminit(){
	var row=dataCenter.getDataStore("empDataStore").getRowSet().getRow(0);   
	form.getBinding().bind(row);
}
dojo.addOnLoad(forminit);
function resetUpdate(){
	var rs = dataCenter.getDataStore("empDataStore").getRowSet();
	rs.resetUpdate(0);
}
