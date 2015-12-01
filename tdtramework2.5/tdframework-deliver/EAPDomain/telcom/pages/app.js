
dojo.addOnLoad( function() {
	initialize();
});


//初始化化dataCenter
function init() {
	var dataStore = new unieap.ds.DataStore("usersAndOrdersDataStore");
	dataStore.setPageSize(5);
	dataStore.setRowSetName("com.neusoft.tdframework.ibaguice.pot.domain.UsersAndOrders");

	var dc = new unieap.ds.DataCenter();
	dc.addDataStore(dataStore);
	var newdc = unieap.Action.requestData( {
			url : unieap.WEB_APP_NAME + "/test.do?method=query",
			sync : true,
			load : function(dc) {
			dataCenter.addDataStore(dc.getDataStore("usersAndOrdersDataStore"));
			}
		}, dc);
}

init();

function initialize() {
	var selection = grid.getManager("SelectionManager");
	selection.setSelect(0);
	dojo.connect(unieap.byId("btnQuery"), "onClick", this, btnQuery);
	dojo.connect(unieap.byId("btnReset"), "onClick", this, reset);
	dojo.connect(unieap.byId("btnSubmit"), "onClick", this, save);
	dojo.connect(unieap.byId("btnAdd"), "onClick", this, add);
	dojo.connect(unieap.byId("btnDelGrid"), "onClick", this, del);
	dojo.connect(unieap.byId("insertSelected"), "onClick", this, insertSelected);
	dojo.connect(unieap.byId("insertAll"), "onClick", this, insertAll);
}

// 选中行整列插入
function insertSelected(){
	var hiredate = unieap.byId("insert_hiredate").getValue();
	var job = unieap.byId("insert_job").getValue();
	//var deptno = unieap.byId("insert_deptno").getValue();
	var selection = grid.getManager("SelectionManager");
	var rowIndex = grid.getManager("SelectionManager").getSelectedRowIndexs();
	for(var i=0;i<rowIndex.length;i++){
		var index = rowIndex[i];
		var row = grid.getBinding().getRowSet().getRow(index);		
		row.setItemValue("hiredate",hiredate);
		row.setItemValue("job",job);
		//row.setItemValue("deptno",deptno);	
	}
	grid.refresh();
}

// 全部行整列插入
function insertAll(){
	var rc = unieap.byId("grid").getBinding().getRowSet().getRowCount();
	if (rc > 0) {
		var hiredate = unieap.byId("insert_hiredate").getValue();
		var job = unieap.byId("insert_job").getValue();
		//var deptno = unieap.byId("insert_deptno").getValue();
		
		for (var i = 0; i < rc; i++) {
			var row = grid.getBinding().getRowSet().getRow(i);		
				row.setItemValue("hiredate",hiredate);
				row.setItemValue("job",job);
				//row.setItemValue("deptno",deptno);	
		}
	}
}

//在grid中增加一条数据
function add() {	
	var attr_userId = unieap.byId("attr_userId").getValue();
	var attr_fullName = unieap.byId("attr_fullName").getValue();
	var attr_registerDate = unieap.byId("attr_registerDate").getValue();
	var attr_orderId = unieap.byId("attr_orderId").getValue();
	var attr_orderName = unieap.byId("attr_orderName").getValue();
	var attr_createDate = unieap.byId("attr_createDate").getValue();
	//var attr_deptNo = unieap.byId("attr_deptNo").getValue();
	var data = {
		userId : attr_userId,
		fullName : attr_fullName,
		registerDate : attr_registerDate,
		orderId : attr_orderId,
		orderName : attr_orderName,
		createDate : attr_createDate
		//deptNo : attr_deptNo
	};
	grid.getManager("EditManager").insertRow(data);
	form.getBinding().unbind();
	form.clear();
	grid.getManager("SelectionManager").setSelect(0);
}

//保存数据
function save() {
	var dc = new unieap.ds.DataCenter();
	var grid = unieap.byId('grid');
	var binding = grid.getBinding();
	
	var dataStore = binding.getDataStore();
	//unieap.debug(dataStore);
	dc.addDataStore(dataStore);
	unieap.Action.requestData( {
		url : unieap.WEB_APP_NAME + "/test.do?method=invokeRUD",
		sync : true,
		load : function(dc) {
			dataCenter.getDataStore("usersAndOrdersDataStore").getRowSet().resetUpdate();
			
		}
	}, dc);
}

//删除数据
function del() {
	var rowIndex = unieap.byId("grid").getManager("SelectionManager").getSelectedRowIndexs()[0];
	grid.getManager("EditManager").deleteRow(rowIndex);
}

//执行查询操作
function btnQuery(){
	unieap.showLoading(true);
	var dataStore = new unieap.ds.DataStore('usersAndOrdersDataStore');
	var data = {
			userId : unieap.byId("attr_userId").getValue(),
			fullName : unieap.byId("attr_fullName").getValue(),
			registerDate : unieap.byId("attr_registerDate").getValue(),
			orderId : unieap.byId("attr_orderId").getValue(),
			orderName : unieap.byId("attr_orderName").getValue(),
			createDate : unieap.byId("attr_createDate").getValue()
			//deptNo : unieap.byId("attr_deptNo").getValue()
	};
	dataStore.setParameter("condition",data);
	dataStore.setRowSetName("com.neusoft.tdframework.ibaguice.pot.domain.UsersAndOrders");
	dataStore.setPageSize(20);
	var dc = new unieap.ds.DataCenter();
	dc.setParameter('addps2', 'neusoft2');

	dc.addDataStore(dataStore);
	var newdc = unieap.Action.requestData( {
		url : unieap.WEB_APP_NAME + "/test.do?method=query",
		parameters : {
			"synLoadStatistics" : true
		},
		sync : true,
		load : function(dc) {
		}
	}, dc);
	dataCenter.addDataStore(newdc.getDataStore("usersAndOrdersDataStore"));

	grid.getBinding().setDataStore(newdc.getDataStore("usersAndOrdersDataStore"));
	grid.getManager("SelectionManager").setSelect(0);
	unieap.showLoading(false);
}


function onPM(store,binding){
	if(confirm("保存修改？")){
		binding.save({url:'/modelpojo.do?method=invokeRUD'});
	}
}

// 清空查询表单
function reset() {
	unieap.byId("formQuery").clear();
}
