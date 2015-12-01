//缴存方式
var  methodData = [{
	CODEVALUE:"1",
	CODENAME :"单一缴率"
},{
	CODEVALUE:"2",
	CODENAME :"职工缴额"
}]
var methodStore = new unieap.ds.DataStore("method", methodData);
dataCenter.addDataStore(methodStore);
//单位状态
var stateData = [{
	CODEVALUE:"1",
	CODENAME :"开户中"
},{
	CODEVALUE:"2",
	CODENAME :"正常"
}]
var stateStore = new unieap.ds.DataStore("state", stateData);
dataCenter.addDataStore(stateStore);
//银行
var bankData=[{CODEVALUE:'1',CODENAME:'建设银行'},
			{CODEVALUE:'2',CODENAME:'工商银行'},
			{CODEVALUE:'3',CODENAME:'农业银行'},
			{CODEVALUE:'4',CODENAME:'招商银行'},
			{CODEVALUE:'5',CODENAME:'交通银行'}];
var bankStore = new unieap.ds.DataStore("bank", bankData);
dataCenter.addDataStore(bankStore);
function init(){
	var ds = new unieap.ds.DataStore("unionDS");
		ds.setPageSize(10);
	var dc = new unieap.ds.DataCenter();
	dc.addDataStore(ds);
	var backDC = unieap.Action.requestData({
		url:unieap.appPath+"/pojoCascadeTest.do?method=query",
		sync:true
	},dc);
	var bds = backDC.getDataStore("unionDS");
	unieap.byId("grid").getBinding().setDataStore(bds);
}
dojo.addOnLoad(init);
function add(){
	var data = {};
	    unieap.byId("grid").getManager("EditManager").insertRow(data);
}
function save(){
	var ds = unieap.byId("grid").getBinding().getDataStore().collect("auto");
	var dc = new unieap.ds.DataCenter();
	dc.addDataStore(ds);
	unieap.Action.requestData({
		url:unieap.appPath+"/pojoCascadeTest.do?method=update",
		sync:true,
		load:function(backDC){
			unieap.byId("grid").getBinding().getDataStore().getRowSet().resetUpdate();
		}
	},dc);
}
function del(){
	var rowIndex = dijit.byId("grid").getManager("SelectionManager").getSelectedRowIndexs()[0];
	if(rowIndex==undefined||rowIndex<0){
		alert("请选择要删除行");
		return;
	}
    unieap.byId("grid").getManager("EditManager").deleteRow(rowIndex);
}
function onPM(store,binding){
	if(confirm("保存修改？")){
		binding.save({url:'/pojoCascadeTest.do?method=save'});
	}
}
