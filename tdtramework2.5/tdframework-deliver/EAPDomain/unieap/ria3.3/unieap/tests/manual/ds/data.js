function initData(){
   var dcs= 	{header:{code:0,message:{title:"null",detail:"null"}},body:{parameters:{},
			   dataStores:{    empDataStore:
			   {metaData:{attr_empno:{dataType:4},NAME:{dataType:12},attr_hiredate:{dataType:93}},
			   pageSize:30,pageNumber:1,recordCount:5,dataSetName:"ria.empDataStore",name:"empDataStore",order:"",condition:"",   
			   rowSet:[{attr_empno:"250",NAME:"杨作仲",attr_job:"项目经理",attr_sal:"1080",attr_deptno:"10"},
			   {attr_empno:"319",NAME:"赵斌",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
			   {attr_empno:"216",NAME:"陈旭杰",attr_job:"软件工程师",attr_hiredate:"1205917947270", attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
			   {attr_empno:"100",NAME:"张卫滨",attr_job:"RIA主架构师", attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10000",NAME:"赵磊",attr_job:"产品经理",  attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"}]}
			   }
   }};
	var dc = new unieap.ds.DataCenter(dcs);
	dataCenter.addDataStore(dc.getDataStore("empDataStore"));
//	
}
initData();
function forminit(){
	var row=dataCenter.getDataStore("empDataStore").getRowSet().getRow(0);   
	form.getBinding().bind(row);
}
dojo.addOnLoad(forminit);
function reset(){
	initData();
	forminit();
	grid.getBinding().setDataStore(dataCenter.getDataStore("empDataStore"));
}
function replaceTest(){
	var dcs = {header:{code:0,message:{title:"null",detail:"null"}},body:{parameters:{},
		   dataStores:{ empDataStore:
		   {metaData:{attr_empno:{dataType:4},NAME:{dataType:12},attr_hiredate:{dataType:93}},
		   pageSize:10,pageNumber:1,recordCount:10,dataSetName:"ria.empFilterDataStore",name:"empDataStore",order:"",condition:"",
		   rowSet:[{attr_empno:"250",NAME:"大白",attr_job:"项目经理",attr_sal:"1080",attr_deptno:"10"},
					{attr_empno:"319",NAME:"二白",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
					{attr_empno:"216",NAME:"三白",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
					{attr_empno:"100",NAME:"四白",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
					{attr_empno:"10000",NAME:"小五",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
					{attr_empno:"250",NAME:"杨作仲2号",attr_job:"项目经理",attr_sal:"1080",attr_deptno:"10"},
					{attr_empno:"319",NAME:"赵斌2号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
					{attr_empno:"216",NAME:"陈旭杰2号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
					{attr_empno:"100",NAME:"张卫滨2号",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
					{attr_empno:"10000",NAME:"赵磊2号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"}]}
		   }
   }};
   var dc = new unieap.ds.DataCenter(dcs);
  dataCenter.append(dc,"replace");
 
}
function connectTest(){
	var dcs = {header:{code:0,message:{title:"null",detail:"null"}},body:{parameters:{},
		   dataStores:{ empDataStore:
		   {metaData:{attr_empno:{dataType:4},NAME:{dataType:12},attr_hiredate:{dataType:93}},
		   pageSize:10,pageNumber:1,recordCount:10,dataSetName:"ria.empFilterDataStore",name:"empDataStore",order:"",condition:"",
		   rowSet:[{attr_empno:"250",NAME:"大白",attr_job:"项目经理",attr_sal:"1080",attr_deptno:"10"},
					{attr_empno:"319",NAME:"二白",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
					{attr_empno:"216",NAME:"三白",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
					{attr_empno:"100",NAME:"四白",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
					{attr_empno:"10000",NAME:"小五",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
					{attr_empno:"250",NAME:"杨作仲2号",attr_job:"项目经理",attr_sal:"1080",attr_deptno:"10"},
					{attr_empno:"319",NAME:"赵斌2号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
					{attr_empno:"216",NAME:"陈旭杰2号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
					{attr_empno:"100",NAME:"张卫滨2号",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
					{attr_empno:"10000",NAME:"赵磊2号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"}]}
		   }
   }};
   var dc = new unieap.ds.DataCenter(dcs);
  dataCenter.append(dc,"append");
}
function unionTest(){
	  var dcs1 = {header:{code:0,message:{title:"null",detail:"null"}},body:{parameters:{},
		   dataStores:{ empDataStore:
		   {metaData:{attr_empno:{dataType:4},NAME:{dataType:12},attr_hiredate:{dataType:93}},
		   pageSize:10,pageNumber:1,recordCount:5,dataSetName:"ria.empFilterDataStore",name:"empDataStore",order:"",condition:"",
		   rowSet:[{name:'dd1a'},
					{name:'d2da'},
					{name:'d3da'},
					{name:'d4da'},
					{name:'dd5a'}],
				statistics:{attr_empno:{max: '1999',min: '272'}}}
		   }
   }};
   var dc1 = new unieap.ds.DataCenter(dcs1);
   dataCenter.append(dc1,"union");
}
function statisticTest(){
	  var dcs1 = {header:{code:0,message:{title:"null",detail:"null"}},body:{parameters:{},
		   dataStores:{ empDataStore:
		   {metaData:{attr_empno:{dataType:4},NAME:{dataType:12},attr_hiredate:{dataType:93}},
		   pageSize:10,pageNumber:1,recordCount:0,dataSetName:"ria.empFilterDataStore",name:"empDataStore",order:"",condition:"",
		   rowSet:[],
				statistics:{attr_empno:{max: '1999',min: '272'}}}
		   }
   }};
   var dc1 = new unieap.ds.DataCenter(dcs1);
   dataCenter.append(dc1,"updateProps");
}
