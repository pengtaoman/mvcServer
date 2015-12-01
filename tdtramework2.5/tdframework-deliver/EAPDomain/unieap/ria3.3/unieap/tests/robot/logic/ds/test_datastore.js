dojo.provide("unieap.tests.robot.logic.ds.test_datastore");
dojo.require("unieap.ds");
function test(){
	doh.register("DataStore方法测试",[
	  function test_resetCondition(){
	  	var ds = new unieap.ds.DataStore("test");
		ds.setCondition("attr_empno = ?");
		ds.insertConditionValue(0,1117,unieap.DATATYPES.VARCHAR);
		ds.setPageNumber(2);
		ds.setRecordCount(11111);
		ds.resetCondition();
		
		doh.is("",ds.getCondition());
		doh.is(null,ds.getConditionValues());
		
		doh.is(1,ds.getPageNumber());
		doh.is(0,ds.getRecordCount());
	  }  
	]);
	doh.run();
}

test();
