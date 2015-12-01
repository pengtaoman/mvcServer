function click() {
	//debugger;
	if(unieap.byId("attr_empno").getValue() == "" && 
			unieap.byId("attr_ename").getValue() == "" &&
			unieap.byId("attr_job").getValue() == "" &&
			unieap.byId("attr_sal").getValue() == "") {
		alert("请输入查询条件。");
		return;
	}
	var results = [unieap.byId("attr_empno").getValue(), unieap.byId("attr_ename").getValue(), unieap.byId("attr_job").getValue(), unieap.byId("attr_sal").getValue()];
	unieap.getDialog().setReturn(results);
	unieap.getDialog().close();
}