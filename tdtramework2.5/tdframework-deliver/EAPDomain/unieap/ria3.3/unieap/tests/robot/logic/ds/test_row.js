dojo.provide("unieap.tests.robot.logic.ds.test_row");
dojo.require("unieap.ds");
test_Row();
function test_Row(){
	var testRowSet=null;
	var row =new unieap.ds.Row(testRowSet,{CODEVALUE:1,CODENAME:'test1'});
	test(row);
//	var row1=new unieap.ds.Row(testRowSet,{CODEVALUE:"2",CODENAME:"test2"},0);
//	test(row1);
//	var row2=new unieap.ds.Row(testRowSet,{CODEVALUE:3,CODENAME:'null'},0);
//	test(row2);
//	var row3=new unieap.ds.Row(testRowSet,{CODEVALUE:3,CODENAME:null},0);
//	test(row3);
}
function test(row){
	doh.register("Row方法测试",[
	  
	  function test_clear(){
	  	//测试clear方法
		row.setItemValue('CODEVALUE',2);
		row.setItemValue('CODENAME','test2');
		row.clear();
		doh.is(1,row.getItemOrigValue('CODEVALUE'));
		doh.is('test1',row.getItemOrigValue('CODENAME'));
		row.setItemValue('CODEVALUE',1);
		row.setItemValue('CODENAME','test1');
	  },
	  
	  function test_discardUpdate(){
	  	//测试discardUpdate方法
	  	row.setItemValue('CODEVALUE',2);
		row.setItemValue('CODENAME','test2');
	  	row.discardUpdate();
		doh.is(1,row.getItemValue('CODEVALUE'));
		doh.is('test1',row.getItemValue('CODENAME'));
		doh.is(unieap.ds.Status.NOTMODIFIED,row.getRowStatus());
		row.setItemValue('CODEVALUE',1);
		row.setItemValue('CODENAME','test1');
	  },
	  function test_getItemValue(){
	  	//测试getItemValue方法
		doh.is(1,row.getItemValue('CODEVALUE'));
		doh.is('test1',row.getItemValue('CODENAME'));
	  },
	  function test_getRowSet(){
	  	var rowset=row.getRowSet();
		doh.is(null,rowset);
	  },
	  function test_getRowStatus(){
	  	doh.is(unieap.ds.Status.NOTMODIFIED,row.getRowStatus());
		var newr=new unieap.ds.Row(null,{'CODEVALUE':1,'CODENAME':'test1'});
		newr.setItemValue('CODEVALUE','22');
		doh.is(unieap.ds.Status.DATAMODIFIED,newr.getRowStatus());
	  }
//	  function test_Row(){
//	  	doh.t(row instanceof unieap.ds.Row);
//	  	doh.is(1,row.data.CODEVALUE );
//	  	doh.is('test1',row.data.CODENAME);
//	  	doh.is(0,row.index );
//	  },
//	  function test_setRowStatus(){
//	  	row.setRowStatus(unieap.ds.Status.NEWMODIFIED);
//	  	doh.is(1,row._t);
//	  },
//	  function test_getRowStatus(){
//	  	doh.is(1,row.getRowStatus());
//	  },
//	  function test_isRowSelected(){
//	  	doh.f(row._s);
//	  	doh.f(row.isRowSelected());
//	  },
//	  function test_setRowSelected(){
//	  	row.setRowSelected();
//	  	doh.t(row._s);
//	  },
//	  function test_getData(){
//	  	doh.is(row.data.CODEVALUE,row.getData().CODEVALUE);
//	  	doh.is(row.data.CODENAME,row.getData().CODENAME);
//	  },
////	  function test_getRowSet(){
////	  	
////	  },
//	  function test_getIndex(){
//	  	doh.is(0,row.getIndex());
//	  },
//	  function test_getItemValue(){
//	  	
//	  },
//	  function test_getItemOrigValue(){
//	  	
//	  },
//	  function test_setItemValue(){
//	  	
//	  },
//	  function test_isItemChanged(){
//	  	
//	  },
//	  function test_isModified(){
//	  	
//	  },
//	  function test_resetUpdate(){
//	  	
//	  },
//	  function test_discardUpdate(){
//	  	
//	  },
//	  function test_clear(){
//	  	
//	  },
//	  function test__raiseItemEvent(){//可在rowset里测
//	  }
	]);
	doh.run();
}
