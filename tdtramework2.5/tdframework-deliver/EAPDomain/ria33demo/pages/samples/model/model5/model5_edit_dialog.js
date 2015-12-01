var currentRowIndex;
var newRow;
function init(){
	currentRowIndex = unieap.getDialog().getObject().rowIndex;
	newRow = unieap.getDialog().getObject().newRow;
	var deptDataStore = unieap.getDialog().getObject().store;
	var store = unieap.revDS(deptDataStore);
	dataCenter.addDataStore(store);
}
init();

dojo.addOnLoad(function() {
	initialize();
});

function initialize() {
	var store = dataCenter.getDataStore("empDataStore");
	unieap.byId("editForm").getBinding().bind(store.getRowSet().getRow(currentRowIndex));
	dojo.connect(unieap.byId("btnCommit"), "onClick", this, fetch);
	if (newRow) {
		unieap.byId("attr_empno").setDisabled(false);
	} else {
		unieap.byId("attr_empno").setDisabled(true);
	}
}

function fetch() {
	var row =dataCenter.getDataStore("empDataStore").getRowSet().getRow(currentRowIndex);
	row.setItemValue('attr_deptno',20);
	var value = {
		row: row,
		rowIndex: currentRowIndex
	}
	unieap.getDialog().setReturn(value);
	unieap.getDialog().close();
	
}