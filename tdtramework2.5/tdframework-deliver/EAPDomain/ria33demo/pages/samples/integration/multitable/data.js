var bankStore = new unieap.ds.DataStore("bank");
bankStore.setRowSetName("bank");
unieap.Action.doQuery(bankStore)

//菜单数据
var menu = [{
	"id":"001",
	"parentId":"",
	"label":"单位开户"
},{
	"id":"002",
	"parentId":"",
	"label":"单位变更"
},{
	"id":"003",
	"parentId":"",
	"label":"印鉴卡打印"
}]
var menuStore = new unieap.ds.DataStore("menuTree", menu);
dataCenter.addDataStore(menuStore);

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