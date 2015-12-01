if(unieap.isEncrypt==false){
	unieap.isEncrypt=true;
}
dojo.addOnLoad(function(){
	dp.SyntaxHighlighter.HighlightAll('code');
	getInitValue();
	getPreDigest();
});	
var dc;	
function getInitValue(){
	dc = new unieap.ds.DataCenter();
	var ds = new unieap.ds.DataStore("emp");
	ds.setRowSetName("emp");//dataset名称，提供表名等信息
	ds.setPageSize(2);
	ds.addParameter("test","这是个测试，全角的逗号");
	unieap.Action.doQuery(ds);//从表中查询数据，放到ds里
	dc.addDataStore(ds);//把ds放到dc对象里
	
	var json = dc.toJson();//把dc转为string对象
	unieap.byId("initText").setValue(json);
}
function getPreDigest(){
	dojo.require("unieap.util.encrypt");//引用文件
	var str = escape(dc.toJson());
	var digest =  hex_sha1(str.toLowerCase());
	unieap.byId("preText").setValue(digest);
}
function getAftDigest(){
	if(unieap.byId("modText").getValue()){
		dc.addParameter("changedigest",unieap.byId("modText").getValue());
	}
	dc =unieap.Action.requestData({
		url:unieap.WEB_APP_NAME+ "/encrypt.do?method=encrypt", 
		sync:true,
		load:function(dc){
		}
	},dc);	
	var aftDigest =  dc.getParameter("digest");
	unieap.byId("aftText").setValue(aftDigest);
}
function compare(){
	var pretext =unieap.byId("preText").getValue();
	var afttext =unieap.byId("aftText").getValue();
	if(pretext != afttext){
		alert("前后台摘要不一致，数据已被修改");
	}
	else{
		alert("前后台数据一致，数据未被修改");
	}
}
