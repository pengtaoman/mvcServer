function addData() {
	var name = unieap.byId('name').getValue();
	var job = unieap.byId('job').getValue();
	var sal = unieap.byId('sal').getValue();
	unieap.byId('grid').getManager("EditManager").insertRow({attr_empno:'',NAME:name,attr_job:job,attr_sal:sal});
	unieap.byId('form').clear();
}

function save() {
	var empDc = dataCenter.collect({dataStores :{ "empDataStore":"auto"}});
	unieap.Action.requestData({
		url:unieap.WEB_APP_NAME+ "/writeBackDemo.do?method=save", 
		sync:true,
		load:function(dc){
			//合并
			empDc.append(dc,"union");
			unieap.byId('grid').refresh();
			unieap.byId('grid').getBinding().getRowSet().resetUpdate();
		}
	},empDc);
}