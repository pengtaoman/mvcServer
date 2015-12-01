(function page(){
	
		function pageInit(){
			dojo.connect(unieap.byId('btnQuery'),"onClick",query);
			dojo.connect(unieap.byId('btnReset'),"onClick",reset);
			dojo.connect(unieap.byId('btnAdd'),"onClick",addEmp);
			dojo.connect(unieap.byId('btnDelete'),"onClick",deleteEmp);
			dojo.connect(unieap.byId('btnSubmit'),"onClick",sumbit);
			dojo.connect(unieap.byId('empGrid').getManager("RowManager"), "onUpdateCurrentRow", bindForm);
		}
		dojo.addOnLoad(pageInit);
		
		function query(){
			var queryStore = new unieap.ds.DataStore("queryStore");
			queryStore.setRowSetName("emp");
			queryStore.setPageSize(30);
			var filter = [] ;
			var attr_empno = unieap.byId("attr_empno").getValue();
			var attr_ename = unieap.byId("attr_ename").getValue();
			var attr_job = unieap.byId("attr_job").getValue();
			attr_empno&&filter.push("[attr_empno] = '"+attr_empno+"'");
			attr_ename&&filter.push("[attr_ename] = '"+attr_ename+"'");
			attr_job&&filter.push("[attr_job] = '"+attr_job+"'");
			if(filter.length>0){
				queryStore.setCondition(filter.join(" and "));
			}
			unieap.Action.doQuery(queryStore,{load:querySuccess});
		}
		
		function reset(){
			unieap.byId("formQuery").reset();
		}
		
		function addEmp(){
			var empGrid = unieap.byId('empGrid');
			var data = {
				"attr_empno" : "111",
				"attr_ename" : "新加人员",
				"attr_hiredate" : (new Date()).getTime().toString(),
				"attr_job" : "业务员",
				"attr_sal" : "3000",
				"attr_deptno" : "20"
			};
			empGrid.getBinding().insertRow(data,0); 
			empGrid.getManager("RowManager").updateCurrnetRow(0);
		}
		
		function deleteEmp(){
			var empGrid = unieap.byId('empGrid');
			var form = unieap.byId("infoForm");
			var currentRowIndex = empGrid.getRowManager().getCurrentRowIndex();
			if(currentRowIndex >= 0 ){
				empGrid.getBinding().deleteRow(currentRowIndex);
				form.clear();
				form.getBinding().unbind();
			}	
		}
		
		function sumbit(){
			var empGrid = unieap.byId('empGrid');
			var form = unieap.byId("infoForm");
			unieap.Action.doUpdate(empGrid.getBinding().getDataStore(),{load:function(){
			    var currentRowIndex = empGrid.getRowManager().getCurrentRowIndex();
			    form.getBinding().bind(empGrid.getBinding().getRowSet().getRow(currentRowIndex))
				dojo.require("unieap.dialog.MessageBox");
			}});
		}
		
		function bindForm(rowIndex){
			var form = unieap.byId("infoForm");
			var empGrid = unieap.byId('empGrid');
			form.getBinding().bind(empGrid.getBinding().getRowSet().getRow(rowIndex));
		}
		
		function querySuccess(empDataStore){
			var form = unieap.byId("infoForm");
			form.clear();
			form.getBinding().unbind();
			unieap.byId('empGrid').setDataStore(empDataStore);
		}

})();