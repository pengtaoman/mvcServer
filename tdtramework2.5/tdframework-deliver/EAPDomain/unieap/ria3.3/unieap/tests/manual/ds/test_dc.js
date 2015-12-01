function test_getAttribute(){
	var dc = new unieap.ds.DataCenter();
	dc.addHeaderAttribute('age',22);
	alert(dc.getHeaderAttribute('age'));
}
function test_addAttribute(){
	var dc = new unieap.ds.DataCenter();
		 dc.addHeaderAttribute('age',22);
		 unieap.debug(dc);
}
function test_getParameter(){
	var ds= {
		 		body:{
		 			parameters:{'key1':'value1'},
		 			dataStores:{}
		 		}
		 	}
		 	var dc=new unieap.ds.DataCenter(ds);
		 	alert(dc.getParameter('key1'));
}
function test_setParameter(){
	var dc = new unieap.ds.DataCenter();
		 	dc.setParameter('addps1',['neusoft1']);
		  	dc.setParameter('addps2','neusoft2');
		 	dc.setParameter('addps3',333);
		 	unieap.debug(dc);
}
function test_getDataStores(){
	var dcdata = {header:{code:1,message:{title:"test",detail:"This is a test!"}},body:{parameters:{},
		   		dataStores:{ ds1:
		   			{metaData:{attr_empno:{dataType:4},NAME:{dataType:12},attr_hiredate:{dataType:93}},
	     			pageSize:10,pageNumber:1,recordCount:0,dataSetName:"ds1",name:"ds1",order:"",condition:"",
		   			rowSet:[],statistics:{attr_empno:{max: '1999',min: '272'}}}
		 	 		},ds2:{pageSize:10,pageNumber:1,recordCount:0,dataSetName:"ds2",name:"ds2",order:"",condition:"",rowSet:[]}
         	}};
         	var dc = new unieap.ds.DataCenter(dcdata);
         	unieap.debug(dc.getDataStores());
}
function test_addDataStore(){
	var dc = new unieap.ds.DataCenter();
	var ds = new unieap.ds.DataStore("store1");
	dc.addDataStore('store1',ds)
	unieap.debug(dc);
}
function test_clear(){
	var dcdata = {header:{code:1,message:{title:"test",detail:"This is a test!"}},body:{parameters:{},
		   		dataStores:{ ds1:
		   			{metaData:{attr_empno:{dataType:4},NAME:{dataType:12},attr_hiredate:{dataType:93}},
	     			pageSize:10,pageNumber:1,recordCount:0,dataSetName:"ds1",name:"ds1",order:"",condition:"",
		   			rowSet:[],statistics:{attr_empno:{max: '1999',min: '272'}}}
		 	 		},ds2:{pageSize:10,pageNumber:1,recordCount:0,dataSetName:"ds2",name:"ds2",order:"",condition:"",rowSet:[]}
         	}};
         	var dc = new unieap.ds.DataCenter(dcdata);
			dc.clear()	
			unieap.debug(dc);
}
function test_toJson(){
	var dcdata = {header:{code:1,message:{title:"test",detail:"This is a test!"}},body:{parameters:{},
		   		dataStores:{ ds1:
		   			{metaData:{attr_empno:{dataType:4},NAME:{dataType:12},attr_hiredate:{dataType:93}},
	     			pageSize:10,pageNumber:1,recordCount:0,dataSetName:"ds1",name:"ds1",order:"",condition:"",
		   			rowSet:[],statistics:{attr_empno:{max: '1999',min: '272'}}}
		 	 		},ds2:{pageSize:10,pageNumber:1,recordCount:0,dataSetName:"ds2",name:"ds2",order:"",condition:"",rowSet:[]}
         	}};
         	var dc = new unieap.ds.DataCenter(dcdata);
			alert(dc.toJson());
}
function test_isEmpty(){
	var dcdata = {header:{code:1,message:{title:"test",detail:"This is a test!"}},body:{parameters:{},
		  		dataStores:{}
        	}};
        	var dc = new unieap.ds.DataCenter(dcdata);
        	alert(dc.isEmpty());
}
function test_containRowSet(){
	var dcdata = {header:{code:1,message:{title:"test",detail:"This is a test!"}},body:{parameters:{},
		   		dataStores:{ ds1:
		   			{metaData:{attr_empno:{dataType:4},NAME:{dataType:12},attr_hiredate:{dataType:93}},
	     			pageSize:10,pageNumber:1,recordCount:0,dataSetName:"ds1",name:"ds1",order:"",condition:"",
		   			rowSet:[],statistics:{attr_empno:{max: '1999',min: '272'}}}
		 	 		},ds2:{pageSize:10,pageNumber:1,recordCount:0,dataSetName:"ds2",name:"ds2",order:"",condition:"",rowSet:[]}
         	}};
         	var dc = new unieap.ds.DataCenter(dcdata);	
         	alert(dc.containRowSet("ds1"));
}
function test_append(){
	var dcs= 	{header:{code:0,message:{title:"null",detail:"null"}},body:{parameters:{},
			   	dataStores:{    empDataStore:
			   		{ pageSize:30,pageNumber:1,recordCount:5,dataSetName:"ria.empDataStore",name:"empDataStore",order:"",condition:"",   
			  		 rowSet:[{attr_empno:"250",NAME:"杨作仲",attr_job:"项目经理",attr_sal:"1080",attr_deptno:"10"},
			  		 {attr_empno:"319",NAME:"赵斌",attr_job:"软件工程师",attr_sal:"50000",attr_deptno:"10"},
			  		 {attr_empno:"216",NAME:"陈旭杰",attr_job:"软件工程师",attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},
			  		 {attr_empno:"100",NAME:"张卫滨",attr_job:"RIA主架构师", attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},
			 		 {attr_empno:"10000",NAME:"赵磊",attr_job:"产品经理", attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"}]}
			 	  }
     		}};
			var dc = new unieap.ds.DataCenter(dcs);
		var dcs2 = {header:{code:0,message:{title:"test",detail:"This is a test!"},age:66},body:{parameters:{},
		   		dataStores:{ empDataStore:
		   			{metaData:{attr_empno:{dataType:4},NAME:{dataType:12},attr_hiredate:{dataType:93}},
		   			pageSize:10,pageNumber:1,recordCount:0,dataSetName:"ria.empFilterDataStore",name:"empDataStore",order:"",condition:"",
		  			 rowSet:[],
         			 statistics:{attr_empno:{max: '1999',min: '272'}}}
		   		}
		 	 }};
	 	  	var dc2 = new unieap.ds.DataCenter(dcs2);
 		  	dc.append(dc2,"updateProps",["code","age"]);	
			unieap.debug(dc);
}
function test_collect(){
		var dcs = {header:{code:1,message:{title:"test",detail:"This is a test!"}},body: {
			parameters: {parameter1:"para1",parameter2:"para2"},
			dataStores: {
				ds1: {
					metaData: {
						attr_empno: {
							dataType: 4
						},
						NAME: {
							dataType: 12
						},
						attr_hiredate: {
							dataType: 93
						}
					},
					pageSize: 10,
					pageNumber: 1,
					recordCount: 0,
					dataSetName: "ds1",
					name: "ds1",
					order: "",
					condition: "",
					rowSet: [{
						attr_empno: "250",
						NAME: "杨作仲",
						attr_job: "项目经理",
						attr_sal: "1080",
						attr_deptno: "10",
						_t:1
					}],
					statistics: {
						attr_empno: {
							max: '1999',
							min: '272'
						}
					}
				},
				ds2: {
					pageSize: 10,
					pageNumber: 1,
					recordCount: 0,
					dataSetName: "ds2",
					name: "ds2",
					order: "",
					condition: "",
					rowSet: {primary:[{
						attr_empno: "250",
						NAME: "大白",
						attr_job: "项目经理",
						attr_sal: "1080",
						attr_deptno: "10"
					}]}
				}
			}
		}};
	 	  	var dc = new unieap.ds.DataCenter(dcs);
			dc.getDataStore("ds2").getRowSet().deleteRow(0);
			unieap.debug(dc);
//	 	 	var pattern=null;
//		 	unieap.debug(dc.collect(pattern));	
//		 	pattern="all"
//		 	unieap.debug(dc.collect(pattern));	
//		 	pattern={parameters:"",dataStores:""}
//		 	unieap.debug(dc.collect(pattern));		
//		 	pattern={parameters:"all",dataStores:"all"}
//			 unieap.debug(dc.collect(pattern));	;
//		 	pattern={
//		 		parameters:"all",
//		 		exclude:{
//		 			parameters:['parameter2']
//		 			}
//		 	}
//		 	unieap.debug(dc.collect(pattern));	
//		 	pattern={
//		 		dataStores:"delete",
//		 		exclude:{
//		 			dataStores:['ds1']
//		 		}
//		 	}
//		 	unieap.debug(dc.collect(pattern));	
//		 	pattern={
//		 		dataStores:{
//		 			ds1:'auto',
//		 			ds2:'delete'
//		 		}
//		 	}
//		 	unieap.debug(dc.collect(pattern));	
		 	pattern={
		 		dataStores:['ds1','ds2']
		 	}
		 	unieap.debug(dc.collect(pattern));	
}
test_collect();
