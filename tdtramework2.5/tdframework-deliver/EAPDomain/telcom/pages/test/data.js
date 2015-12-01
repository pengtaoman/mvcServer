dojo.require("unieap.rpc");
function initData(){
   var ds= 	{header:{code:0,message:{title:"null",detail:"null"}},body:{parameters:{},
   dataStores:{
   	largedata:
   {metaData:{attr_empno:{dataType:2,scale:3},NAME:{dataType:12,defaultValue:"吴乃超"},attr_hiredate:{dataType:93}},
   pageSize:20,pageNumber:1,recordCount:2101,dataSetName:"ria.largeDataStore",name:"largeDataStore",order:"",condition:"", "statistics":{"attr_sal":0,"_BAR":"测试","attr_empno":0},
   rowSet:[
   {attr_empno:"5",_o:{NAME:"ddd"},NAME:"上官无几0",attr_job:"工程师3",
   attr_hiredate:"1205917947270",attr_sal:"9999",attr_deptno:"10"},{attr_empno:-11,NAME:"康康",attr_job:"开发人员",
   attr_hiredate:"1205917947270",attr_sal:"111",attr_deptno:"30"},{attr_empno:"14",NAME:"张飞",attr_job:"总经理",
   attr_hiredate:"1205917947270",attr_sal:"45",attr_deptno:"20"},{attr_empno:"878",NAME:"82",attr_job:"88",
   attr_hiredate:"1205917947270",attr_sal:"222",attr_deptno:"20"},{attr_empno:"986",NAME:"111",attr_job:"ssss",
   attr_hiredate:"1205917947270",attr_sal:"111",attr_deptno:"30"},{attr_empno:"987",NAME:"111",
   attr_hiredate:"1205917947270",attr_sal:"1111",attr_deptno:"20"}
   ]}}
   }};
	dataCenter = new unieap.ds.DataCenter(ds);

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

initData();

