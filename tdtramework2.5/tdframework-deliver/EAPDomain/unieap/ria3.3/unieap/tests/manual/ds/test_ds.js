function test_setName(){
	var ds = new unieap.ds.DataStore("test");
	ds.setName("helloStore");
	unieap.debug(ds);
}
function test_setRecordCount(){
	 var ds = new unieap.ds.DataStore("test");
		ds.setRecordCount(33);
		unieap.debug(ds);
}
function test_setCondition(){
		var ds = new unieap.ds.DataStore("test");
	 	var filter = "empno = ?";
	 	ds.setCondition(filter);
	 	unieap.debug(ds);
}
function test_order(){
	var ds = new unieap.ds.DataStore("test");
	ds.setOrder("[name] asc")
	unieap.debug(ds);
}
function test_setGroup(){
	var ds = new unieap.ds.DataStore("test");
		ds.setGroup("dept,hiredate");
		unieap.debug(ds);
}
function test_addMetaData(){
	var ds = new unieap.ds.DataStore("test");
 	var meta={primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4};
	ds.addMetaData("attr_empno",meta);
 	unieap.debug(ds);
}
function test_setCondition(){
	var ds = new unieap.ds.DataStore("test");
	ds.insertConditionValue("%王",unieap.DATATYPES.VARCHAR,0);
	unieap.debug(ds);
}
function test_resetConditionValues(){
	var ds = new unieap.ds.DataStore("test");
 	ds.insertConditionValue("%王",unieap.DATATYPES.VARCHAR,0);
 	ds.removeConditionValues();
 	unieap.debug(ds);
}
function test_resetCondition(){
	var ds = new unieap.ds.DataStore("test");
 	ds.setCondition("ename like ?");
 	ds.insertConditionValue("%王",unieap.DATATYPES.VARCHAR,0);
 	ds.setPageSize(10);
 	ds.setPageNumber(3);
 	ds.resetCondition();
 	unieap.debug(ds);
}
function test_addAttribute(){
	var ds = new unieap.ds.DataStore("test");
		ds.addAttribute("emp","EMPNO","8");
		 ds.addAttribute("comp","=","12");
		 	unieap.debug(ds);
}
function test_removeAttribute(){
	var ds = new unieap.ds.DataStore("test");
		 	ds.addAttribute("emp","EMPNO","8");
		 	ds.addAttribute("comp","=","12");
		 	ds.removeAttribute("emp");
		 	unieap.debug(ds);
}
function test_setAttribute(){
	var attributes={emp:["EMPNO",unieap.DATATYPES.DOUBLE],EMPNAME:["小白",unieap.DATATYPES.VARCHAR]};
	var ds = new unieap.ds.DataStore("test");
	ds.setAttributes(attributes);
	unieap.debug(ds);
}
function test_addStatistic(){
	var ds = new unieap.ds.DataStore("test");
		ds.addStatistic("attr_sal","max");
		unieap.debug(ds);
}
function test_removeStatistic(){
	var ds = new unieap.ds.DataStore("test");
	ds.addStatistic("attr_sal","max");
	ds.addStatistic("attr_sal","min");
	unieap.debug(ds);
	ds.removeStatistic("attr_sal","min");
	unieap.debug(ds); 
}
function test_setStatistic(){
	var ds = new unieap.ds.DataStore("test");
	var statistics = {"attr_sal":{"max":"","min":""},attr_empno: {"min": ""}};
	ds.setStatistics(statistics);
	unieap.debug(ds); 
}
function test_setRowSet(){
	var ds = new unieap.ds.DataStore("test",[{'key':'value','key1':'value1'},
										{'key':'value','key1':'value1'}]);
			var rowset = new unieap.ds.RowSet([{attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true}, 
											{attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500",_t:1} 
					]);
			ds.setRowSet(rowset);
			unieap.debug(ds);
}
function test_setDistinct(){
	var ds = new unieap.ds.DataStore("test");
		ds.setDistinct(false);
		unieap.debug(ds);
}
function test_getRecordCount(){
	var ds = new unieap.ds.DataStore("test");
	alert(ds.getRecordCount());
}
function test_getRowSetName(){
	var ds = new unieap.ds.DataStore("test");
	ds.setRowSetName("emp");
	alert(ds.getRowSetName());
}
function test_getGroup(){
	var ds = new unieap.ds.DataStore("test");
			ds.setGroup("dept,hiredate");
			alert(ds.getGroup());
}
function test_getMetaData(){
	var ds = new unieap.ds.DataStore("test");
			var meta={primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4};	
		 	ds.addMetaData("attr_empno",meta);
			unieap.debug(ds.getMetaData("attr_empno"));
}
function test_getStatementName(){
	var ds = new unieap.ds.DataStore("test");
			ds.setStatementName("emp");
			alert(ds.getStatementName());
}
function test_getConditionValues(){
	var ds = new unieap.ds.DataStore("test");
	ds.insertConditionValue("%王",unieap.DATATYPES.VARCHAR,0);
	unieap.debug(ds.getConditionValues());
}
function test_getAttribute(){
	var attributes={emp:["EMPNO",unieap.DATATYPES.DOUBLE],empname:["小白",unieap.DATATYPES.VARCHAR]};
		 	var ds = new unieap.ds.DataStore("test");
		 	ds.setAttributes(attributes);
		 	alert(ds.getAttribute("empname"));
			alert(ds.getAttribute("empname").getDataType());
}
function test_getAttributes(){
	var attributes={emp:["EMPNO",unieap.DATATYPES.DOUBLE],empname:["小白",unieap.DATATYPES.VARCHAR]};
 	var ds = new unieap.ds.DataStore("test");
 	ds.setAttributes(attributes);
 	unieap.debug(ds.getAttributes());
}
function test_getPool(){
	var ds = new unieap.ds.DataStore("test");
 	ds.setPool("UNIEAP");
 	alert(ds.getPool());
}
function test_getStatistic(){
	var ds = new unieap.ds.DataStore("test");
 	var statistics = {"attr_sal":{"max":"22","min":"33"},attr_empno: {"min": ""}};
 	ds.setStatistics(statistics);
 	alert(ds.getStatistic("attr_sal","max"));
}
function test_getStatistics(){
	var ds = new unieap.ds.DataStore("test");
		 	var statistics = {"attr_sal":{"max":"555","min":"111"},attr_empno: {"min": "22"}};
		 	ds.setStatistics(statistics);
		 	unieap.debug(ds.getStatistics());
}
function test_toData(){
	var ds = new unieap.ds.DataStore("test",[{'key':'value','key1':'value1'},
		 								{'key':'value','key1':'value1'}]);
		var rowset = new unieap.ds.RowSet([
	                {attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true},  
	                {attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",_t:3}, 
	                {attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500",_t:1}     
		]);
		ds.setRowSet(rowset);
		unieap.debug(rowset.toData());
}
function test_toJson(){
	var ds = new unieap.ds.DataStore("test");
			var rowset = new unieap.ds.RowSet([
					{attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true},  
					{attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",_t:3}, 
					{attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500",_t:1}     
			]);
			ds.setRowSet(rowset);
			alert(ds.toJson());
}
function test_collect(){
		var ds = new unieap.ds.DataStore("test");
			var rowset = new unieap.ds.RowSet([
					{attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true},  
					{attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",_t:3,_o:{attr_empno:"2003"}}, 
					{attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500",_t:1}     
			]);
		ds.setRowSet(rowset);	
 		var meta={primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4};
		ds.addMetaData("attr_empno",meta);
		 unieap.debug(ds.collect({metaData:true,policy:"all"}));  
		 unieap.debug(ds.collect("select"));
		 unieap.debug(ds.collect("insert"));
		 unieap.debug(ds.collect("update"));              
		 unieap.debug(ds.collect("delete")); 
		 unieap.debug(ds.collect("auto"));              
		 unieap.debug(ds.collect("none"));              
		 unieap.debug(ds.collect("all"));   
}
function test_append(){
			var ds = new unieap.ds.DataStore("test",[
		 			{attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true},  
		 			{attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",_t:3}, 
		 			{attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500",_t:1}     
		 	]);
		 	var ds1 = new unieap.ds.DataStore("test",[{no:"250",name:"大白",attr_sal:"1080",attr_deptno:"10"},
		 			{no:"319",name:"二白",attr_sal:"50000",attr_deptno:"10"},
		 			{no:"216",name:"三白",attr_sal:"3200",attr_deptno:"40"}]);
			ds1.addStatistic("attr_sal","max");
			ds.append(ds1,"replace")
		 	unieap.debug(ds);
			var ds = new unieap.ds.DataStore("test",[
		 			{attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true},  
		 			{attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",_t:3}, 
		 			{attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500",_t:1}     
		 	]);
			ds.append(ds1,"discard")
		 	unieap.debug(ds);
			var ds = new unieap.ds.DataStore("test",[
		 			{attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true},  
		 			{attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",_t:3}, 
		 			{attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500",_t:1}     
		 	]);
			ds.append(ds1,"append")
		 	unieap.debug(ds);
			var ds = new unieap.ds.DataStore("test",[
		 			{attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true},  
		 			{attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",_t:3}, 
		 			{attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500",_t:1}     
		 	]);
			ds.append(ds1,"union")
		 	unieap.debug(ds);
			var ds = new unieap.ds.DataStore("test",[
		 			{attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true},  
		 			{attr_empno:"1001",NAME:"齐衷斯",attr_job:"技术总监",attr_sal:"8800",_t:3}, 
		 			{attr_empno:"1002",NAME:"张韶涵",attr_job:"singer",attr_sal:"9500",_t:1}     
		 	]);
			ds.append(ds1,"updateProps")
	 		unieap.debug(ds);
}
function test_onRowSetChanged(){
	var ds = new unieap.ds.DataStore("test",[{attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true}]);
 	dojo.connect(ds,"onRowSetChanged",function(){
 		alert("onRowSetChanged");
 	});
 	var ds1 = new unieap.ds.DataStore("test",[{no:"250",name:"大白",attr_sal:"1080",attr_deptno:"10"}]);
		ds.append(ds1,"replace");
}
function test_onPropsChanged(){
	var ds = new unieap.ds.DataStore("test",[{attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true}]);
	 	dojo.connect(ds,"onPropsChanged",function(){
	 		alert("onPropsChanged");
	 	});
	 	var ds1 = new unieap.ds.DataStore("test");
	 	ds1.addStatistic("attr_sal","max");
	 	ds.append(ds1,"updateProps");
		unieap.debug(ds);
}
function test_addParameter(){
	var ds = new unieap.ds.DataStore("test",[{attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true}]);
 	ds.addParameter("param","param");
 	ds.addParameter("param1",[10,11]);
 	unieap.debug(ds);
}
function test_getParameter(){
	var ds = new unieap.ds.DataStore("test",[{attr_empno:"1000",NAME:"黄蓉",attr_job:"演员",attr_sal:"1001",_s:true}]);
	ds.setParameter("param",55);
	ds.setParameter("param1",[10,11]);
	alert(ds.getParameter("param"));
	alert(ds.getParameter("param1"));
}
function test_removeParameter(){
	var ds = new unieap.ds.DataStore("test");
		 	ds.addParameter("param","param");
		 	ds.addParameter("param1",[10,11]);
		 	ds.removeParameter("param1");
		 	unieap.debug(ds);
}

function test_setMetaData(){
	var meta=new unieap.ds.MetaData("empno",{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4});
	unieap.debug(meta);
}
function test_addMetaData2(){
	var metaData = new unieap.ds.MetaData("attr_emp");
 	metaData.setPrimaryKey(true);
 	metaData.setDataType(4);
 	metaData.setNullable(false);
 	var ds = new unieap.ds.DataStore("test");
 	ds.addMetaData(metaData);
 	unieap.debug(ds);
}
