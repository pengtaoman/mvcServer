dojo.require("unieap.rpc");
function initData(){
   var ds= 	{header:{code:0,message:{title:"null",detail:"null"}},body:{parameters:{},
   dataStores:{
	   largeDataStore:
   {metaData:{attr_empno:{dataType:2,scale:3},NAME:{dataType:12,defaultValue:"吴乃超"},attr_hiredate:{dataType:93}},
   pageSize:30,pageNumber:1,recordCount:200,dataSetName:"ria.largeDataStore",name:"largeDataStore",order:"",condition:"", "statistics":{"attr_sal":0,"_BAR":"测试","attr_empno":0},
   rowSet:[
	{attr_empno:"1",NAME:"陈旭杰",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
	{attr_empno:"2",NAME:"张卫滨",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"3",NAME:"赵磊",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"4",NAME:"杨作仲2号",attr_job:"项目经理",attr_hiredate:"1205917947270",attr_sal:"1080",attr_deptno:"10"},
	{attr_empno:"5",NAME:"赵斌2号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
	{attr_empno:"6",NAME:"陈旭杰2号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
	{attr_empno:"7",NAME:"张卫滨2号",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"8",NAME:"赵磊2号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"9",NAME:"杨作仲3号",attr_job:"项目经理",attr_sal:"1080",attr_hiredate:"1205917947270",attr_deptno:"10"},
	{attr_empno:"10",NAME:"赵斌3号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
	{attr_empno:"11",NAME:"陈旭杰3号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
	{attr_empno:"12",NAME:"张卫滨3号",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"13",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"14",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"15",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"16",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"17",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"18",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"19",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"20",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"21",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"22",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"23",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"24",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"25",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"26",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"27",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"28",NAME:"赵斌",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
	{attr_empno:"29",NAME:"陈旭杰",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
	{attr_empno:"30",NAME:"张卫滨",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"31",NAME:"赵磊",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"32",NAME:"杨作仲2号",attr_job:"项目经理",attr_sal:"1080",attr_hiredate:"1205917947270",attr_deptno:"10"},
	{attr_empno:"33",NAME:"赵斌2号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
	{attr_empno:"34",NAME:"陈旭杰2号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
	{attr_empno:"35",NAME:"张卫滨2号",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"36",NAME:"赵磊2号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"37",NAME:"杨作仲3号",attr_job:"项目经理",attr_sal:"1080",attr_hiredate:"1205917947270",attr_deptno:"10"},
	{attr_empno:"38",NAME:"赵斌3号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
	{attr_empno:"39",NAME:"陈旭杰3号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
	{attr_empno:"40",NAME:"张卫滨3号",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"41",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"42",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"43",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"44",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"45",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"46",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"47",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"48",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"49",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"50",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"51",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"52",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"53",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"54",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"55",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"56",NAME:"赵斌",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
	{attr_empno:"57",NAME:"陈旭杰",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
	{attr_empno:"58",NAME:"张卫滨",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"59",NAME:"赵磊",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"60",NAME:"杨作仲2号",attr_job:"项目经理",attr_sal:"1080",attr_hiredate:"1205917947270",attr_deptno:"10"},
	{attr_empno:"61",NAME:"赵斌2号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
	{attr_empno:"62",NAME:"陈旭杰2号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
	{attr_empno:"63",NAME:"张卫滨2号",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"64",NAME:"赵磊2号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"65",NAME:"杨作仲3号",attr_job:"项目经理",attr_sal:"1080",attr_hiredate:"1205917947270",attr_deptno:"10"},
	{attr_empno:"66",NAME:"赵斌3号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
	{attr_empno:"67",NAME:"陈旭杰3号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
	{attr_empno:"68",NAME:"张卫滨3号",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"69",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"70",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"71",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"72",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"73",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"74",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"75",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"76",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"77",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"78",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"79",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"80",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"81",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"82",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"83",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"84",NAME:"赵斌",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
	{attr_empno:"85",NAME:"陈旭杰",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
	{attr_empno:"86",NAME:"张卫滨",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"87",NAME:"赵磊",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"88",NAME:"杨作仲2号",attr_job:"项目经理",attr_sal:"1080",attr_hiredate:"1205917947270",attr_deptno:"10"},
	{attr_empno:"89",NAME:"赵斌2号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
	{attr_empno:"90",NAME:"陈旭杰2号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
	{attr_empno:"91",NAME:"张卫滨2号",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"92",NAME:"赵磊2号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"93",NAME:"杨作仲3号",attr_job:"项目经理",attr_sal:"1080",attr_hiredate:"1205917947270",attr_deptno:"10"},
	{attr_empno:"94",NAME:"赵斌3号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
	{attr_empno:"95",NAME:"陈旭杰3号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
	{attr_empno:"96",NAME:"张卫滨3号",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"97",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"98",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"99",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"100",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	
	{attr_empno:"101",NAME:"陈旭杰",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
	{attr_empno:"102",NAME:"张卫滨",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"103",NAME:"赵磊",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"104",NAME:"杨作仲2号",attr_job:"项目经理",attr_hiredate:"1205917947270",attr_sal:"1080",attr_deptno:"10"},
	{attr_empno:"5",NAME:"赵斌2号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
	{attr_empno:"6",NAME:"陈旭杰2号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
	{attr_empno:"7",NAME:"张卫滨2号",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"8",NAME:"赵磊2号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"9",NAME:"杨作仲3号",attr_job:"项目经理",attr_sal:"1080",attr_hiredate:"1205917947270",attr_deptno:"10"},
	{attr_empno:"10",NAME:"赵斌3号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
	{attr_empno:"11",NAME:"陈旭杰3号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
	{attr_empno:"12",NAME:"张卫滨3号",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"13",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"14",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"15",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"16",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"17",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"18",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"19",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"20",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"21",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"22",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"23",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"24",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"25",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"26",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"27",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"28",NAME:"赵斌",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
	{attr_empno:"29",NAME:"陈旭杰",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
	{attr_empno:"30",NAME:"张卫滨",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"31",NAME:"赵磊",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"32",NAME:"杨作仲2号",attr_job:"项目经理",attr_sal:"1080",attr_hiredate:"1205917947270",attr_deptno:"10"},
	{attr_empno:"33",NAME:"赵斌2号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
	{attr_empno:"34",NAME:"陈旭杰2号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
	{attr_empno:"35",NAME:"张卫滨2号",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"36",NAME:"赵磊2号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"37",NAME:"杨作仲3号",attr_job:"项目经理",attr_sal:"1080",attr_hiredate:"1205917947270",attr_deptno:"10"},
	{attr_empno:"38",NAME:"赵斌3号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
	{attr_empno:"39",NAME:"陈旭杰3号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
	{attr_empno:"40",NAME:"张卫滨3号",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"41",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"42",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"43",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"44",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"45",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"46",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"47",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"48",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"49",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"50",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"51",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"52",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"53",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"54",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"55",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"56",NAME:"赵斌",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
	{attr_empno:"57",NAME:"陈旭杰",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
	{attr_empno:"58",NAME:"张卫滨",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"59",NAME:"赵磊",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"60",NAME:"杨作仲2号",attr_job:"项目经理",attr_sal:"1080",attr_hiredate:"1205917947270",attr_deptno:"10"},
	{attr_empno:"61",NAME:"赵斌2号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
	{attr_empno:"62",NAME:"陈旭杰2号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
	{attr_empno:"63",NAME:"张卫滨2号",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"64",NAME:"赵磊2号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"65",NAME:"杨作仲3号",attr_job:"项目经理",attr_sal:"1080",attr_hiredate:"1205917947270",attr_deptno:"10"},
	{attr_empno:"66",NAME:"赵斌3号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
	{attr_empno:"67",NAME:"陈旭杰3号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
	{attr_empno:"68",NAME:"张卫滨3号",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"69",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"70",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"71",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"72",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"73",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"74",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"75",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"76",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"77",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"78",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"79",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"80",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"81",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"82",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"83",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"84",NAME:"赵斌",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
	{attr_empno:"85",NAME:"陈旭杰",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
	{attr_empno:"86",NAME:"张卫滨",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"87",NAME:"赵磊",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"88",NAME:"杨作仲2号",attr_job:"项目经理",attr_sal:"1080",attr_hiredate:"1205917947270",attr_deptno:"10"},
	{attr_empno:"89",NAME:"赵斌2号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
	{attr_empno:"90",NAME:"陈旭杰2号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
	{attr_empno:"91",NAME:"张卫滨2号",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"92",NAME:"赵磊2号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"93",NAME:"杨作仲3号",attr_job:"项目经理",attr_sal:"1080",attr_hiredate:"1205917947270",attr_deptno:"10"},
	{attr_empno:"94",NAME:"赵斌3号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
	{attr_empno:"95",NAME:"陈旭杰3号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
	{attr_empno:"96",NAME:"张卫滨3号",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"97",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"98",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"99",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
	{attr_empno:"100",NAME:"赵磊3号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"}
   ]},
   anathorStore:
   {metaData:{attr_empno:{dataType:4},NAME:{dataType:12},attr_hiredate:{dataType:93}},
   pageSize:30,pageNumber:1,recordCount:30,dataSetName:"ria.empDataStore",name:"empDataStore",order:"",condition:"",
   statistics:{attr_sal:{max:'50000',min:'2222'}},
   rowSet:[
           	{attr_empno:"250",NAME:"杨作仲",attr_job:"项目经理",attr_sal:"1080",attr_deptno:"10"},
            {attr_empno:"0",NAME:"赵斌",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
			{attr_empno:"1",NAME:"陈旭杰",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
			{attr_empno:"2",NAME:"张卫滨",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
			{attr_empno:"3",NAME:"赵磊",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			{attr_empno:"4",NAME:"杨作仲2号",attr_job:"项目经理",attr_sal:"1080",attr_deptno:"10"},
			{attr_empno:"5",NAME:"赵斌2号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"},
			{attr_empno:"6",NAME:"陈旭杰2号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
			{attr_empno:"7",NAME:"张卫滨2号",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
			{attr_empno:"8",NAME:"赵磊2号",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"},
			{attr_empno:"9",NAME:"杨作仲3号",attr_job:"项目经理",attr_sal:"1080",attr_deptno:"10"},
			{attr_empno:"10",NAME:"赵斌3号",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000",attr_deptno:"10"}
			]
   }
   }
   }};
	dataCenter = new unieap.ds.DataCenter(ds);

}


initData();
function fn(inValue,inRowIndex){
	if ((inRowIndex-1)%2==0){
		inValue = "<label style='color:blue'>" + inValue + "</label>";
	}
	return inValue;
}
function fn1(inRowIndex){
	return "第"+(inRowIndex+1)+"行";
}
dojo.addOnLoad(function(){
	var binding = unieap.byId("grid").getBinding();
	dojo.connect(unieap.byId("test"),"onClick",function(){
		var data = {attr_empno:"111111111",NAME:"郑海",attr_job:"项目经理",attr_sal:"1080",attr_deptno:"10"};
		var time = new Date().getTime();
		data.attr_job += time;
		var rowset = binding.getRowSet();
		//rowset.addRow(data);
		rowset.insertRow(data,0);
	});
	dojo.connect(unieap.byId("deleteRow"),"onClick",function(){
		binding.deleteRow(0);
	});
	dojo.connect(unieap.byId("clearDataStore"),"onClick",function(){
		binding.clear();
	});
	dojo.connect(unieap.byId("deleteRows"),"onClick",function(){
		binding.deleteRows([0,1,2]);
	});
	dojo.connect(unieap.byId("changeStore"),"onClick",function(){
		binding.setDataStore(dataCenter.getDataStore("anathorStore"));
	});
	dojo.connect(unieap.byId("max"),"onClick",function(){
		var max = binding.max("attr_sal");
		alert("attr_sal最大值为："+max);
	});
	dojo.connect(unieap.byId("min"),"onClick",function(){
		var min = binding.min("attr_sal");
		alert("attr_sal最小值为："+min);
	});
	dojo.connect(unieap.byId("sum"),"onClick",function(){
		var sum = binding.sum("attr_sal");
		alert("attr_sal总和为："+sum);
	});
	dojo.connect(unieap.byId("avg"),"onClick",function(){
		var avg = binding.avg("attr_sal");
		alert("attr_sal平均值为："+avg);
	});
	dojo.connect(unieap.byId("cloneStore"),"onClick","cloneDataStore");
});
function linkFormatter(inValue, inRowIndex) {
	return "<a href='"+unieap.appPath + "/pages/samples/grid/basic/grid_binding.jsp' target='_blank'>"+inValue+"</a>";
}
function save(){ 
	unieap.Action.persist(dataCenter,["empDataStore"], {
		action:"ria_psn",
		method:"submit",
		parameter: {
            dataStoreId: "empDataStore"
        },
		load: function(responseText) {
			alert(responseText);
		}
	});
}
function fn2(evt){
	var index = parseInt(evt.rowIndex)+1;
	alert("第"+index+"行"+":"+evt.type);
}
//initData();

function cloneDataStore(){
	var oldStore = dataCenter.getDataStore("anathorStore");
	var newStore = oldStore.clone("newStore");
	oldStore.getRowSet().setRowSelected(0,true);
	unieap.debug(newStore);
	unieap.debug(oldStore);
}

function setSelect(){
    var value = unieap.byId("selectInput").getValue();
    if (isNaN(value)) {
        alert("请输入数字");
    }
    else {
        value = Number(value);
        if (value >= unieap.getDataStore("empLockDataStore").getRecordCount()) {
            alert("您输入的数字大于总记录数。");
        } 
        else{
	        unieap.byId('grid').getManager("selectionManager").setSelect(value, true);
	        if(!unieap.byId('grid').getManager("selectionManager").isSelected(value)){
	    		alert("此数据被禁止选中！");
			}
        }
    }
}

function setSelectType(){
    var type = unieap.byId("selectType").getValue();
    unieap.byId('grid').getManager("selectionManager").setSelectType(type);
}

function getSelected(){
    var c = unieap.byId('grid').getManager("selectionManager").getSelectedRowIndexs();
    if (c <= 0) {
        alert("当前没有数据被选中。");
    }
    else 
        if (c > 0 && c < 50) {
            alert(unieap.byId('grid').getManager("selectionManager").getSelectedRowIndexs());
        }
        else {
            var rows = unieap.byId('grid').getManager("selectionManager").getSelectedRowIndexs();
            var indexs = [];
            for (var i = 0; i < rows.length; i++) {
                indexs.push(rows[i]);
                if (i >= 20) {
                    indexs.push("...");
                    indexs.push("共" + rows.length + "条记录被选中");
                    break;
                }
            }
            alert(indexs)
        }
}

function setCheckedabled(){
    var value = unieap.byId("setcheckable").getValue();
    if (isNaN(value)) {
        alert("请输入数字");
    }
    else {
        value = Number(value);
        if (value >= unieap.getDataStore("empLockDataStore").getRecordCount()) {
            alert("您输入的数字大于总记录数。");
        }
        else {
            unieap.byId('grid').getManager("selectionManager").setCheckabled(value, true);
        }
    }
}

function setUncheckedabled(){
    var value = unieap.byId("setuncheckable").getValue();
    if (isNaN(value)) {
        alert("请输入数字");
    }
    else {
        value = Number(value);
        if (value >= unieap.getDataStore("empLockDataStore").getRecordCount()) {
            alert("您输入的数字大于总记录数。");
        }
        else {
            unieap.byId('grid').getManager("selectionManager").setCheckabled(value, false);
        }
        
    }
}
