	dojo.addOnLoad(function(){
		dojo.connect(unieap.byId('btnQuery'),'onClick',queryWithCondition);
		dojo.connect(unieap.byId('btnReset'),'onClick',queryReset);
		
		dojo.connect(unieap.byId('btnAdd'),'onClick',add);
		dojo.connect(unieap.byId('btnDelete'),'onClick',del);
		dojo.connect(unieap.byId('btnSubmit'),'onClick',save);
		query();
	});
	
	function bindForm(rowIndex) {
		setEmpNoEditable(rowIndex);
		var row = unieap.byId("empGrid").getBinding().getRowSet().getRow(rowIndex);
		unieap.byId("empForm").getBinding().bind(row);
	}
	
	function add() {
	    var data = {
	    	attr_empno:null,
	    	attr_ename:null,
	    	attr_job:null,
	    	attr_sal:null,
	        attr_hiredate: null
	    };
	    var rowIndex = unieap.byId("empGrid").getManager("EditManager").insertRow(data);
		unieap.byId("empForm").getBinding().bind(unieap.byId("empGrid").getBinding().getRowSet().getRow(rowIndex));
		setRowSelected(rowIndex);
	}
	
	function save() { 
		//Grid校验方法 
		var bool = unieap.byId("empGrid").getBinding().isValid();
		if(bool) {
			var dc = new unieap.ds.DataCenter();
			dc.addDataStore(unieap.byId("empGrid").getBinding().getDataStore());
			unieap.Action.requestData({
				url:unieap.WEB_APP_NAME+ "/drmTest.do?method=save", 
				sync:false,
				load:function(dc){
					unieap.byId("empGrid").getBinding().getRowSet().resetUpdate();
					unieap.byId('empNo4Check').setDisabled(true);
				}
			},dc.collect({dataStores : "auto"}));
		}else{
			showMessage('必填项不能为空');
		}
	}
	
	function del() {
		var rowIndexs = unieap.byId("empGrid").getManager("SelectionManager").getSelectedRowIndexs();
		if(rowIndexs == null || rowIndexs.length == 0) {
			showMessage('请选择要删除的记录。');
			return;
		} 
		unieap.byId("empGrid").getManager("EditManager").deleteRow(rowIndexs[0]);
		unieap.byId("empForm").clear();
		unieap.byId("empForm").getBinding().unbind();
		setFirstRowSelected();
	}
	
	function query(){
		var dc = new unieap.ds.DataCenter();
		var store = unieap.byId("empGrid").getBinding().getDataStore();
		store.setRowSetName("emp");
		store.setPageSize(10);
		dc.addDataStore(store);
		
		unieap.Action.requestData({
			url:unieap.WEB_APP_NAME+ "/drmTest.do?method=queryAll", 
			sync:true,
			load:function(dc){
				var ds=dc.getDataStore("empDataStore");
				dataCenter.addDataStore(ds);
				unieap.byId("empGrid").getBinding().setDataStore(ds);
				setFirstRowSelected();
			}
		},dc);
	}
	
	function queryWithCondition() {
		
		var empNo = unieap.byId('attr_empno').getValue();
		var empName = unieap.byId('attr_ename').getValue();
		//ComboBox为空，取出的值为null,null在json解析时出错
		var deptNo = unieap.byId('attr_deptno').getValue();
		if (deptNo == null) {
			deptNo = "";
		}
		
		var bool = empNo || empName || deptNo;
		
		if(!bool) {
			showMessage('请输入查询条件。');
			return;
		}
		
		var dc = new unieap.ds.DataCenter();
		dc.addParameter('empNo',empNo);
		dc.addParameter('empName',empName);
		dc.addParameter('deptNo',deptNo);
		
		var store = new unieap.ds.DataStore("empDataStore");
		store.setRowSetName("emp");
		store.setPageSize("10");
		dc.addDataStore(store);
		
		unieap.Action.requestData({
			url:unieap.WEB_APP_NAME+ "/drmTest.do?method=queryWithCondition", 
			sync:true,
			load:function(dc){
				var ds=dc.getDataStore("empDataStore");
				unieap.byId("empGrid").getBinding().setDataStore(ds);
				setFirstRowSelected();
			}
		},dc);
	}
	
	function checkExist() {
		var empNo = unieap.byId('empNo4Check').getValue();
		if(empNo == null || empNo == "") {
			showMessage('员工编号不能为空。');
			return;
		}
		var dc = new unieap.ds.DataCenter();
		dc.addParameter('empNo',empNo);
		var store = new unieap.ds.DataStore("empDataStore");
		store.setRowSetName("emp");
		dc.addDataStore(store);
		unieap.Action.requestData({
			url:unieap.WEB_APP_NAME+ "/drmTest.do?method=checkExist", 
			sync:true,
			load:function(dc){
			}
		},dc);
	}
	
	function queryReset() {
		unieap.byId('queryForm').clear();
		query();
	}
	
	function setRowSelected(i) {
		var row = unieap.byId("empGrid").getBinding().getRowSet().getRow(i);
		unieap.byId("empGrid").getManager('SelectionManager').setSelect(i,true);
		setEmpNoEditable(i);
		//会自动调用onAfterSelect事件绑定的bindForm方法
		//unieap.byId("empForm").getBinding().bind(row);
	}
	
	//设置Grid首行选中
	function setFirstRowSelected() {
		var count = unieap.byId("empGrid").getBinding().getRowSet().getRowCount();
		if(count == 0) {
			return;
		} else {
			setRowSelected(0);
		}
	}
	
	function setEmpNoEditable(param) {
		var row;
		if(!isNaN(param)) {
			row = unieap.byId("empGrid").getBinding().getRowSet().getRow(param);
		} else {
			row = param;
		} 
		if(row.getRowStatus() == unieap.ds.Status.NEWMODIFIED) {
			unieap.byId('empNo4Check').setDisabled(false);
		} else {
			unieap.byId('empNo4Check').setDisabled(true);
		}
	}
	//Grid翻页后事件
	function onAfterPaging() {
		setFirstRowSelected();
	}
	
	function showMessage(message) {
		MessageBox.alert({
			title:'提示框',
			message:message,
			type:'info'
		});
	}
