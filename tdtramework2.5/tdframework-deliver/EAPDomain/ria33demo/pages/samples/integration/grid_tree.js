
dojo.addOnLoad(function(){
	dp.SyntaxHighlighter.HighlightAll('code');
	dp.SyntaxHighlighter.HighlightAll('code2');
	unieap.byId('basicTree').expandAllNodes();
});

var ds={header:{code:0,message:{title:"null",detail:"null"}},body:{parameters:{},
dataStores:{
  empDataStore:{metaData:{attr_empno:{dataType:4},NAME:{dataType:12},attr_hiredate:{dataType:93}},
   pageSize:30,pageNumber:1,recordCount:30,dataSetName:"ria.empDataStore",name:"empDataStore",order:"",condition:"",   
   rowSet:[{attr_empno:"250",NAME:"杨作仲",attr_job:"项目经理",attr_sal:"1080",
   attr_deptno:"10"},{attr_empno:"319",NAME:"赵斌",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",
   attr_deptno:"10"},{attr_empno:"216",NAME:"陈旭杰",attr_job:"软件工程师",attr_hiredate:"1205917947270",
   attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},{attr_empno:"100",NAME:"张卫滨",attr_job:"RIA主架构师",
   attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},{attr_empno:"10000",NAME:"赵磊",attr_job:"产品经理",
   attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"}]},
   DEPT:{pageSize:-1,pageNo:1,count:4,metaData:{name:{dataType:1}},rowSet:[{CODEVALUE:"10",CODENAME:"财务部"},{CODEVALUE:"20",CODENAME:"采购部"},{CODEVALUE:"30",CODENAME:"销售部"},{CODEVALUE:"40",CODENAME:"开发部"}]},
   DEPT3:{pageSize:-1,pageNo:1,count:4,metaData:{name:{dataType:1}},rowSet:[{CODEVALUE:"10",CODENAME:"财务部3"},{CODEVALUE:"20",CODENAME:"采购部3"},{CODEVALUE:"30",CODENAME:"销售部3"},{CODEVALUE:"40",CODENAME:"开发部3"}]},
   DEPT2:{pageSize:-1,pageNo:1,count:4,metaData:{name:{dataType:1}},rowSet:[{CODEVALUE:"10",CODENAME:"财务部2"},{CODEVALUE:"20",CODENAME:"采购部2"},{CODEVALUE:"30",CODENAME:"销售部2"},{CODEVALUE:"40",CODENAME:"开发部2"}]}
   ,
empDataStore2:{metaData:{attr_empno:{dataType:4},NAME:{dataType:12},attr_hiredate:{dataType:93}},
   pageSize:30,pageNumber:1,recordCount:30,dataSetName:"ria.empDataStore",name:"empDataStore2",order:"",condition:"",   
   rowSet:[{attr_empno:"250",NAME:"人员1",attr_job:"经理",attr_sal:"1111",
   attr_deptno:"10"},{attr_empno:"319",NAME:"人员2",attr_job:"工程师",attr_hiredate:"1205917947270",attr_sal:"1111",
   attr_deptno:"10"},{attr_empno:"216",NAME:"人员3",attr_job:"工程师",attr_hiredate:"1205917947270",
   attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},{attr_empno:"100",NAME:"人员4",attr_job:"主架构师",
   attr_hiredate:"1205917947270",attr_sal:"1111",attr_deptno:"30",attr_unitid:"0711281110"},{attr_empno:"10000",NAME:"人员5",attr_job:"经理",
   attr_hiredate:"1205917947270",attr_sal:"1111",attr_deptno:"30",attr_unitid:"0711281110"}]},
   DEPT:{pageSize:-1,pageNo:1,count:4,metaData:{name:{dataType:1}},rowSet:[{CODEVALUE:"10",CODENAME:"财务部"},{CODEVALUE:"20",CODENAME:"采购部"},{CODEVALUE:"30",CODENAME:"销售部"},{CODEVALUE:"40",CODENAME:"开发部"}]},
   DEPT3:{pageSize:-1,pageNo:1,count:4,metaData:{name:{dataType:1}},rowSet:[{CODEVALUE:"10",CODENAME:"财务部3"},{CODEVALUE:"20",CODENAME:"采购部3"},{CODEVALUE:"30",CODENAME:"销售部3"},{CODEVALUE:"40",CODENAME:"开发部3"}]},
   DEPT2:{pageSize:-1,pageNo:1,count:4,metaData:{name:{dataType:1}},rowSet:[{CODEVALUE:"10",CODENAME:"财务部2"},{CODEVALUE:"20",CODENAME:"采购部2"},{CODEVALUE:"30",CODENAME:"销售部2"},{CODEVALUE:"40",CODENAME:"开发部2"}]}
	   }
	  }
	 };
dataCenter = new unieap.ds.DataCenter(ds);

function selfDefineLabelStyle(item,opened, isExpandable){
      return {fontSize: "13px"};
}

var treegrid = new unieap.ds.DataStore('treegrid', [{
	    id: '1',
	    label: '操作分类1',
	    parent: '',
	    leaf: false
	}, {
	    id: '11',
	    label: '切换Datastore',
	    parent: '1',
	    leaf: true
	}, {
	    id: '12',
	    label: '显示Grid',
	    parent: '1',
		leaf:true
	}, {
	    id: '13',
	    label: '隐藏Grid',
	    parent: '1',
		leaf:true
	}]);

dataCenter.addDataStore(treegrid);

var storeChanged = false;
function changeDataStore() {
	if (storeChanged) {
		unieap.byId("grid").getBinding().setDataStore(unieap.getDataStore("empDataStore"));
	} else {
		unieap.byId("grid").getBinding().setDataStore(unieap.getDataStore("empDataStore2"));
	}
	storeChanged = !storeChanged;
}

function treeNodeClick(treenode) {
	if(treenode.getLabel()=="切换Datastore") {
		changeDataStore();
	}
	else if(treenode.getLabel()=="显示Grid") {
		dojo.byId("gridContainer").style.display="block";
	}
	else if(treenode.getLabel()=="隐藏Grid") {
		dojo.byId("gridContainer").style.display="none"
	}
	else {
		
	}
	return true;
}