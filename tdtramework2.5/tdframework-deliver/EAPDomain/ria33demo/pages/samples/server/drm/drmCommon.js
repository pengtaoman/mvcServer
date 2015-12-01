	function add(){
		 
	    var data = {
	    	attr_empno:null,
	    	attr_ename:null,
	    	attr_job:null,
	    	attr_sal:null,
	        attr_hiredate: null
	    };
	    unieap.byId("grid").getManager("EditManager").insertRow(data);
	}
	function save(){ 
		var dc =new unieap.ds.DataCenter();
		dc.addDataStore(dataCenter.getDataStore("empDataStore"));
		unieap.Action.requestData({
				url:unieap.WEB_APP_NAME+ "/drmTest.do?method=save", 
				sync:false,
				load:function(dc){
					unieap.byId("grid").getBinding().getRowSet().resetUpdate();
				}
			},dc);
	}
	function del(){
		var rowIndex = unieap.byId("grid").getManager("SelectionManager").getSelectedRowIndexs()[0];
		if(rowIndex==undefined||rowIndex<0){
			alert("请选择要删除行");
			return;
		}
	    unieap.byId("grid").getManager("EditManager").deleteRow(rowIndex);
	}
	
	function query(){
		var dc = new unieap.ds.DataCenter();
		var store = new unieap.ds.DataStore("empDataStore");
		store.setRowSetName("emp");
		store.setPageSize("10");
		dc.addDataStore(store);
		unieap.Action.requestData({
			url:unieap.WEB_APP_NAME+ "/drmTest.do?method=query", 
			sync:true,
			load:function(dc){
				var ds=dc.getDataStore("empDataStore");
				unieap.byId("grid").getBinding().setDataStore(ds);
			}
		},dc);
	}