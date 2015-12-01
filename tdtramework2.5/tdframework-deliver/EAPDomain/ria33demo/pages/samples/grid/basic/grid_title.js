dojo.addOnLoad(function(){
	dp.SyntaxHighlighter.HighlightAll('code');
	var store = new unieap.ds.DataStore("empDataStore");
    store.setRowSetName("emp");
	store.setPageSize(20);
    unieap.Action.doQuery(store);
    unieap.byId('grid').getBinding().setDataStore(dataCenter.getDataStore("empDataStore"));
});
			
var cells = new unieap.ds.DataStore('cells', [
	{
		CODEVALUE:'attr_ename',
		CODENAME: '姓名'
	},
	{
		CODEVALUE: 'attr_empno',
		CODENAME: '部门'
	},
	{
		CODEVALUE: 'attr_job',
		CODENAME: '职位'
	},
	{
		CODEVALUE: 'attr_sal',
		CODENAME: '工资'
	}
]);
dataCenter.addDataStore(cells);

function getTitle() {
		var value = unieap.byId("nameCombo").getValue();
		if(!value){
			alert('请在下拉框中选中一个值');
			return;
		}
		var layout = unieap.byId("grid").getManager("ViewManager");
		alert(layout.getHeaderName(value));
}
function setTitle() {
		var value = unieap.byId("nameCombo").getValue();
		var title = unieap.byId("myTitle").getValue();
		if(!value){
			alert('请在下拉框中选中一个值');
			return;
		}
		unieap.byId("grid").getManager("ViewManager").setHeaderName(value,title);
}
