function testExp(){
	var dc = unieap.Action.requestData({
		url:unieap.appPath + "/exception.do?method=testHandleException",
		load:function(a){
		},
		error:function(a){
			 dojo.byId("showExp").style.display='';
			 unieap.byId("text").setValue(a.getDetail());
		}
		
	});
}
function showExp(){
	dojo.require("unieap.dialog.DialogUtil");
	 DialogUtil.showDialog({
	 		width:"668", 
            height:"480", 
            title:"异常信息", 
            div:true, 
            inner:dojo.byId("dialog")
		});
}
function testFormSubmit(){
	var form = dojo.byId("form");
    form.action = unieap.appPath + "/exception.do?method=testHandleException";
    form.submit();	
}
function testSuccess(){
	var dc = unieap.Action.requestData({
		url:unieap.appPath + "/exception.do?method=testSuccessInfo",
		load:function(a){
		}
	});
}