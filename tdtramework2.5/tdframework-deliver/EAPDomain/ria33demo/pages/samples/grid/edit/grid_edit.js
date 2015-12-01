dojo.addOnLoad(function(){
    dp.SyntaxHighlighter.HighlightAll('code');
    
    var store = new unieap.ds.DataStore("empDataStore");
    store.setRowSetName("emp");
	store.setPageSize(20);
    unieap.Action.doQuery(store);
    unieap.byId('grid').getBinding().setDataStore(dataCenter.getDataStore("empDataStore"));
});
function setRowEdit() {
	var edit = unieap.byId('grid').getManager("EditManager");
	edit.setType("rowEdit");
}
function setCellEdit() {
	var edit = unieap.byId('grid').getManager("EditManager");
	edit.setType("cellEdit");
}
function setReadOnly() {
	var edit = unieap.byId('grid').getManager("EditManager");
	edit.setType("readonly");
}
function changeEditor() {
	var edit = unieap.byId('grid').getManager("EditManager");
	if(edit.getType()=='readonly'){
		edit.setType("rowEdit");
	}
	var layout = unieap.byId('grid').getManager("LayoutManager")
	var cell = layout.getCell("attr_deptno");
	cell.setEditor('unieap.form.TextBox', {textAlign:'left'})
}