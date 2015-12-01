function initData(){
   var ds= 	{header:{code:0,message:{title:"null",detail:"null"}},body:{parameters:{},
   dataStores:{
   booleanDataStore:
	   {
		   metaData:{attr_deptname:{dataType:12}},
		   pageSize:30,pageNumber:1,recordCount:30,dataSetName:"ria.booleanDataStore",name:"booleanDataStore",order:"",condition:"",
		   rowSet:[
		           {CODEVALUE:'true',CODENAME:"是"},
		           {CODEVALUE:'false',CODENAME:"否"}]},
   deptDataStore:
   {
	   metaData:{attr_deptno:{dataType:4},attr_deptname:{dataType:12}},
	   pageSize:30,pageNumber:1,recordCount:30,dataSetName:"ria.deptDataStore",name:"deptDataStore",order:"",condition:"",
	   rowSet:[
	           {attr_deptno:"10",attr_deptname:"开发部"},
	           {attr_deptno:"20",attr_deptname:"实施部"},
	           {attr_deptno:"30",attr_deptname:"财务部"},
	           {attr_deptno:"40",attr_deptname:"总裁办公室"}]},
   empDataStore:
   {metaData:{attr_empno:{dataType:4},NAME:{dataType:12},attr_hiredate:{dataType:93}},
   pageSize:30,pageNumber:1,recordCount:30,dataSetName:"ria.empDataStore",name:"empDataStore",order:"",condition:"",   
   rowSet:[
   {attr_empno:"250",NAME:"欧阳",attr_job:"项目经理",attr_sal:"1080",attr_deptno:"10",attr_address:"中国 辽宁省 大连市 黄浦路901-4"},
   {attr_empno:"319",NAME:"冷冰凝",attr_job:"实施经理",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10",attr_address:"中华人民共和国 辽宁省 大连市 甘井子区 黄浦路 901-4 D1座 219"},
   {attr_empno:"216",NAME:"东方龙傲",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110",attr_address:"中华人民共和国 辽宁省 大连市 甘井子区 黄浦路 901-4 D1座 219"},
   {attr_empno:"100",NAME:"尉迟兰心",attr_job:"测试经理",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110",attr_address:"中华人民共和国 辽宁省 大连市 甘井子区 黄浦路 901-4 D1座 219"},
   {attr_empno:"10000",NAME:"龙天翔",attr_job:"测试助理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110",attr_address:"中华人民共和国 辽宁省 大连市 甘井子区 黄浦路 901-4 D1座 219"}]},
   DEPT:{pageSize:-1,pageNo:1,count:4,metaData:{name:{dataType:1}},rowSet:[{CODEVALUE:"10",CODENAME:"财务部"},{CODEVALUE:"20",CODENAME:"采购部"},{CODEVALUE:"30",CODENAME:"销售部"},{CODEVALUE:"40",CODENAME:"开发部"}]},
   DEPT3:{pageSize:-1,pageNo:1,count:4,metaData:{name:{dataType:1}},rowSet:[{CODEVALUE:"10",CODENAME:"财务部3"},{CODEVALUE:"20",CODENAME:"采购部3"},{CODEVALUE:"30",CODENAME:"销售部3"},{CODEVALUE:"40",CODENAME:"开发部3"}]},
   DEPT2:{pageSize:-1,pageNo:1,count:4,metaData:{name:{dataType:1}},rowSet:[{CODEVALUE:"10",CODENAME:"财务部2"},{CODEVALUE:"20",CODENAME:"采购部2"},{CODEVALUE:"30",CODENAME:"销售部2"},{CODEVALUE:"40",CODENAME:"开发部2"}]},
   
   
   empFilterDataStore:
   {metaData:{attr_empno:{dataType:4},NAME:{dataType:12},attr_hiredate:{dataType:93}},
   pageSize:10,pageNumber:1,recordCount:10,dataSetName:"ria.empFilterDataStore",name:"empFilterDataStore",order:"",condition:"",
   rowSet:[{attr_empno:"250",NAME:"杨作仲",attr_job:"项目经理",attr_sal:"1080",attr_deptno:"10"},
			{attr_empno:"319",NAME:"赵斌",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
			{attr_empno:"216",NAME:"陈旭杰",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
			{attr_empno:"100",NAME:"张卫滨",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
			{attr_empno:"10000",NAME:"赵磊",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			{attr_empno:"250",NAME:"杨作仲2号",attr_job:"项目经理",attr_sal:"1080",attr_deptno:"10"},
			{attr_empno:"319",NAME:"赵斌2号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
			{attr_empno:"216",NAME:"陈旭杰2号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
			{attr_empno:"100",NAME:"张卫滨2号",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
			{attr_empno:"10000",NAME:"赵磊2号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			{attr_empno:"10002",NAME:"东方龙傲",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"20",attr_unitid:"0711281110"},
			   {attr_empno:"10003",NAME:"欧阳",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10004",NAME:"奥里萨贝苏",attr_job:"测试经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10005",NAME:"罗宁",attr_job:"销售经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"40",attr_unitid:"0711281110"},
			   {attr_empno:"10006",NAME:"安洁丽塔",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"40",attr_unitid:"0711281110"},
			   {attr_empno:"10007",NAME:"约西亚",attr_job:"主架构师",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"20",attr_unitid:"0711281110"},
			   {attr_empno:"10008",NAME:"维恩",attr_job:"市场经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"10",attr_unitid:"0711281110"},
			   {attr_empno:"10009",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10010",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10011",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10012",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10013",NAME:"约西亚",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10014",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10015",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10016",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10017",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10018",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10019",NAME:"东方龙傲",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10020",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10021",NAME:"约西亚",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10022",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10023",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10024",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10025",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10026",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10027",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10028",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10029",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10030",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10031",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10032",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10033",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10034",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10035",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10036",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10037",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10038",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10039",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"}]},
   
   empLockDataStore:
   {metaData:{attr_empno:{dataType:4},NAME:{dataType:12},attr_hiredate:{dataType:93}},
   pageSize:30,pageNumber:1,recordCount:30,dataSetName:"ria.empDataStore",name:"empDataStore",order:"",condition:"",
   statistics:{attr_sal:{max:'50000',min:'2222'}},
   rowSet:[{attr_empno:"250",NAME:"杨作仲",attr_job:"项目经理",attr_sal:"1080",attr_deptno:"10"},
			{attr_empno:"319",NAME:"赵斌",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
			{attr_empno:"216",NAME:"陈旭杰",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
			{attr_empno:"100",NAME:"张卫滨",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
			{attr_empno:"10000",NAME:"赵磊",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			{attr_empno:"250",NAME:"杨作仲2号",attr_job:"项目经理",attr_sal:"1080",attr_deptno:"10"},
			{attr_empno:"319",NAME:"赵斌2号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
			{attr_empno:"216",NAME:"陈旭杰2号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
			{attr_empno:"100",NAME:"张卫滨2号",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
			{attr_empno:"10000",NAME:"赵磊2号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			{attr_empno:"250",NAME:"杨作仲3号",attr_job:"项目经理",attr_sal:"1080",attr_deptno:"10"},
			{attr_empno:"319",NAME:"赵斌3号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
			{attr_empno:"216",NAME:"陈旭杰3号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
			{attr_empno:"100",NAME:"张卫滨3号",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
			{attr_empno:"10000",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			{attr_empno:"10002",NAME:"东方龙傲",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"20",attr_unitid:"0711281110"},
			   {attr_empno:"10003",NAME:"欧阳",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10004",NAME:"奥里萨贝苏",attr_job:"测试经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10005",NAME:"罗宁",attr_job:"销售经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"40",attr_unitid:"0711281110"},
			   {attr_empno:"10006",NAME:"安洁丽塔",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"40",attr_unitid:"0711281110"},
			   {attr_empno:"10007",NAME:"约西亚",attr_job:"主架构师",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"20",attr_unitid:"0711281110"},
			   {attr_empno:"10008",NAME:"维恩",attr_job:"市场经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"10",attr_unitid:"0711281110"},
			   {attr_empno:"10009",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10010",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10011",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10012",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10013",NAME:"约西亚",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10014",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10015",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10016",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10017",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10018",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10019",NAME:"东方龙傲",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10020",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10021",NAME:"约西亚",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10022",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10023",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10024",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10025",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10026",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10027",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10028",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10029",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10030",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10031",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10032",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10033",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10034",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10035",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10036",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10037",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10038",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			   {attr_empno:"10039",NAME:"克罗诺木",attr_job:"人事经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"}]}
   
   }
   }};
	//unieap.debug(ds,true);
	dataCenter = new unieap.ds.DataCenter(ds);

}

//function save(){ 
//	unieap.Action.persist(dataCenter,["empDataStore"], {
//		action:"ria_psn",
//		method:"submit",
//		parameter: {
//            dataStoreId: "empDataStore"
//        },
//		load: function(responseText) {
//			alert(responseText);
//		}
//	});
//}

initData();