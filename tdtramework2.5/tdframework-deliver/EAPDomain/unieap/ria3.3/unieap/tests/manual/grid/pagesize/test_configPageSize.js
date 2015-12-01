function showbar(){
	var toolbar =unieap.byId("grid1").getManager("PagingManager");
	if(toolbar.displayPagingBar==true){
		unieap.byId("grid1").getManager("PagingManager").hidePagingBar();
	}else{
		unieap.byId("grid1").getManager("PagingManager").showPagingBar();
	}
	
}
function dogridfilter(){
	var mgr=unieap.byId("grid2").getManager("FilterManager");
	var filter={
		condition:{
			A:{name:'attr_loc',relation:"like",value:"%neu"}
		},
		pattern:"${A} || ${A}"
	}
	mgr.setFilter('attr_loc',filter);
	mgr.doFilter();
}
function cancelfilter(){
	var mgr=unieap.byId("grid2").getManager("FilterManager");
	mgr.cancelFilter();
}
function dofilter(){
	var ds = dataCenter.getDataStore("deptDataStore");
	 var filter={
		condition:{
			A:{name:'attr_loc',relation:"like",value:"china"}
		},
		pattern:"${A}"
	}
	ds.getRowSet().doFilter(filter);
}
function init(){
	var ds = new unieap.ds.DataStore("empDataStore");
	ds.setPageSize(-1);
	ds.addStatistic("attr_sal","max");
	ds.addStatistic("attr_sal","min");
	ds.setRowSetName("emp");
	unieap.Action.doQuery(ds,{sync:true});
	var deptds = new unieap.ds.DataStore("deptDataStore");
	deptds.setPageSize(4);
	deptds.setRowSetName("dept");
	unieap.Action.doQuery(deptds,{sync:true});
	var ds3 = new unieap.ds.DataStore("empStore");
	ds3.setPageSize(20);
	ds3.setRowSetName("emp");
	unieap.Action.doQuery(ds3,{sync:true});
}
init();
function changeStore(){
	var ds = new unieap.ds.DataStore("newStore");
	ds.setPageSize(20);
	ds.addStatistic("attr_sal","max");
	ds.addStatistic("attr_sal","min");
	ds.setRowSetName("emp");
	unieap.Action.doQuery(ds,{sync:true});
	unieap.byId("grid1").getBinding().setDataStore(dataCenter.getDataStore("newStore"));
}
