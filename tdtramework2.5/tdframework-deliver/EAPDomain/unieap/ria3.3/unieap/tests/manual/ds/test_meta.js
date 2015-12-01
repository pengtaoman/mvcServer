function test_setData(){
	var metaData={primaryKey:false,label:"姓名",dataType:12,nullable:true}
			var meta = new unieap.ds.MetaData("empname",{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4});
			meta.setData(metaData);
			unieap.debug(meta);
}
function test_getName(){
	var meta = new unieap.ds.MetaData("empname",{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4});
		 	alert(meta.getName());
}
function test_getLable(){
	var meta = new unieap.ds.MetaData("empname",{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4});
		alert(meta.getLabel());
}
function test_getDataType(){
	var meta = new unieap.ds.MetaData("empname",{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4});
		 	alert(meta.getDataType());
}
function test_isPrimaryKey(){
	var meta = new unieap.ds.MetaData("empname",{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4});
			alert(meta.isPrimaryKey());
}
function test_getDefaultValue(){
	var meta = new unieap.ds.MetaData("empno",{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4,defaultValue:111});
			alert(meta.getDefaultValue());
}
function test_getFormat(){
	var meta = new unieap.ds.MetaData("date",{primaryKey:false,label:"日期",dataType:97,nullable:true,format:"yyyy-MM-dd"});
		alert(meta.getFormat());
}
function test_getAttribute(){
	var meta = new unieap.ds.MetaData("empno",{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4});
			meta.setAttribute("attr","test");
			unieap.debug(meta);
			alert(meta.getAttribute("attr"));
}
function test_setName(){
	var meta = new unieap.ds.MetaData("empno",{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4});
		 	meta.setName("no");
		 	unieap.debug(meta);
}
function test_setLabel(){
	var meta = new unieap.ds.MetaData("empno",{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4});
			meta.setLabel("编号");
			unieap.debug(meta);
}
function test_setDataType(){
	var meta = new unieap.ds.MetaData("empno",{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4});
	 	meta.setDataType(8);
	 	unieap.debug(meta);
}
function test_setPrimaryKey(){
	var meta = new unieap.ds.MetaData("empno",{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4});
	 	meta.setPrimaryKey(false);
	 	unieap.debug(meta);
}
function test_setPricision(){
	var meta = new unieap.ds.MetaData("empno",{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4});
	 	meta.setPrecision(8);
	 	unieap.debug(meta);
}
function test_setScale(){
	var meta = new unieap.ds.MetaData("empno",{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4});
	 	 meta.setScale(2);
	 	unieap.debug(meta);
}
function test_setNullable(){
	var meta = new unieap.ds.MetaData("empno",{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4});
			meta.setNullable(true);
			unieap.debug(meta);
}
function test_setDefaultValue(){
	var meta = new unieap.ds.MetaData("empno",{primaryKey:true,label:"员工编号",dataType:4,nullable:false,precision:4});
		 	meta.setDefaultValue(111);
		 	unieap.debug(meta);
}
test_setDefaultValue();
