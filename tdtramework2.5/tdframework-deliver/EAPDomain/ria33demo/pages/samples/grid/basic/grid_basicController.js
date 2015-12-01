function init(){
	var store = new unieap.ds.DataStore("empDataStore-sever");
	store.setRowSetName("emp");
	store.setPageSize(15);
	unieap.Action.doQuery(store);
}
init();
dojo.addOnLoad(function(){
	dp.SyntaxHighlighter.HighlightAll('code');
});
function setRowStyles(){
	var vm = unieap.byId("grid").getViewManager();
	vm.setRowStyles(0,{"color":"red","textAlign":"center"});
}
function setCellStyles(){
	var vm = unieap.byId("grid1").getViewManager();
	vm.setCellStyles(0,"attr_empno",{"color":"blue","textAlign":"right"});
}
function setDefaultHeight(){
	unieap.byId("grid").getRowManager().defaultRowHeight = 40;
	unieap.byId("grid").refresh();
}
function setFilter(){
	var layoutManager=unieap.byId("grid").getManager('LayoutManager');
		var filterManager=unieap.byId("grid").getManager('FilterManager');
		var filter={
			condition:{
			A:{name:'attr_job',relation:"=",value:'项目经理'},
			B:{name:'NAME',relation:"!=",value:'杨作仲'}
			},
		pattern:" ${A} && ${B} "
		}
		var cell=layoutManager.getCell('NAME');
		filterManager.setFilter(cell,filter);
		filterManager.doFilter();
}

function cancelFilter(){
	var filterManager=unieap.byId("grid").getManager('FilterManager');
	filterManager.cancelFilter();
}
function getIndex(){
	var sm = unieap.byId("grid").getManager("SelectionManager");
	var index = sm.getSelectedRowIndexs();
	alert(index);
}
function setAllSelect(){
	var sm = unieap.byId("grid").getManager("SelectionManager");
	sm.setAllSelect(true);
}
function cancelAllSelect(){
	var sm = unieap.byId("grid").getManager("SelectionManager");
	sm.setAllSelect(false);
}
function refreshCell(){
	var data=unieap.byId("grid1").getBinding().getRowData()[0],
		orginNo=data['attr_empno'];
	data['_o']={attr_empno:orginNo};
	data['attr_empno']=3;
	var cell = unieap.byId("grid1").getCell('attr_empno');
	unieap.byId("grid1").getManager('ViewManager').refreshCell(0,cell);

}
function changeRowStyle(){
	var rowIndex = unieap.byId("grid1").getRowManager().getCurrentRowIndex();
	if(rowIndex<0){
		alert("请选中一行");
	}
	var vm = unieap.byId("grid1").getViewManager();
	vm.setRowStyles(rowIndex,{"color":"red","textAlign":"center"});
}