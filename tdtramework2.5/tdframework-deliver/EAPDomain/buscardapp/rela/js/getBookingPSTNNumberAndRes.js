BusCard.define('/buscardapp/rela/js/getPSTNNumberAndRes.js',function(_buscard,cardParam){ 
try{
var Me = this;
var a = arguments[0];
var b = arguments[1];   
//for compatibility   
var executeRequest = _buscard.executeRequest;
Me.productId = b.productId;
Me.serviceOfferId = b.serviceOfferId;
if(Me.$("lanId")){
	Me.cityCode = Me.$("lanId").value;
}else{
	Me.cityCode = b.cityCode;
}
if(Me.$("bureauId")){
	Me.bureauId = Me.$("bureauId").value;
}else{
	Me.bureauId = b.serviceRelation.branchNo;
}
Me.getChooseNumber = function () {
	var productId = Me.productId;
	var parameter = "productId=" + productId;
	var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "getFixedNumber", parameter);
	var result = "-1";
	try {
		var jsonResultObj = (typeof resultJsonStr == "string") ? eval("(" + resultJsonStr + ")") : resultJsonStr;
		if (jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1") {
			result = jsonResultObj.message;
		}
	}
	catch (e) {
		alert("\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u53d6\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u5931\u951f\u6770\uff4f\u62f7\u539f\u951f\u65a4\u62f7\u4e3a\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u6377\u65a4\u62f7\u951f\u65a4\u62f7\u5931\u951f\u6770\uff4f\u62f7");
		return false;
	}
	if (result == "-1") {
    	var cdmaServiceIdElemList = null; 
    	try{cdmaServiceIdElemList =ordermgr.accept.compnew._pstn_number_elem_list_; }catch(e){}
		var B = {"ServiceIdInterface":new ServiceIdInterface({"$" : function(id) {return Me.$(id)}}),"cdmaServiceIdElemList":cdmaServiceIdElemList};
		var container2 = BusCard.$session.container2;
		var workNo = BusCard.$session.workNo;
		var endpassword = BusCard.$session.PASSWORD;
		var noDept = BusCard.$session.acceptDealer;
		
		var bureauId 
		if(Me.$("bureauId")){
			bureauId= Me.$("bureauId").value;
		}else{
			bureauId = Me.bureauId;
		}
		if(Me.$("lanId")){
			Me.cityCode = Me.$("lanId").value;
		}else{
			Me.cityCode = b.cityCode;
		}
		var webPath = container2 + "resource/interfacemanage/selectno/SelectNoMain.jsp?STAFFNO=" + workNo + "&PASSWORD=" + endpassword + "&noDept=" + noDept+ "&cityCode=" + Me.cityCode + "&productId=" + Me.productId + "&sortId=2&bureauId=" + bureauId;
		Me.windowResourceServiceId = window.showModalDialog(webPath, B, "DialogWidth:1000px;DialogHeight:600px;status:no;location:no");
	} else {
		var oServiceId = Me.$("serviceId");
		oServiceId.value = result;
		oServiceId.onblur();
		oServiceId.readOnly = true;
	}
};

Me.checkResource = function () {
	var E = Me.$("serviceId");
	var A = Me.$("serviceId").value;
	if (!A) {
		return true;
	}
	var C = "serviceId=" + A + "&serviceOfferId=" + Me.serviceOfferId + "&productId=" + Me.productId + "&bureauId=" + Me.bureauId + "&cityCode=" + Me.cityCode;
	var D = executeRequest("prodOfferSaleAjaxAction", "checkResource", C);
	var B = executeAjaxResult(D);
	if (B == false) {
		Me.resetServiceId();
		return;
	}
	
	//提示靓号信息
    B = B.split("&");
	if(B[1]){
		if(B[1]!="false") {
			alert(B[1]);
		}
	}
	
	Me.$("resInstId").value = B[0];
};
Me.returnBlank = function () {
	var A = (navigator.appname == "Netscape") ? event.which : event.keyCode;
	if (A != 32) {
		return true;
	} else {
		return false;
	}
};
Me.checkSameServiceId = function(){
    var pstnServiceIdElemList = null; 
    try{pstnServiceIdElemList =ordermgr.accept.compnew._pstn_number_elem_list_; }catch(e){}
    var chooseServiceId = Me.$("serviceId").value;
    if(pstnServiceIdElemList){
        var len = pstnServiceIdElemList.length;
        var count = 0;
        while(len--){
            var current = pstnServiceIdElemList[len].service.value;
            if(current.length>0&&chooseServiceId == current){
                count++;
            }
        }
        if(count>1){
            alert("\u8be5\u4e1a\u52a1\u53f7\u7801\u5df2\u9009\uff0c\u8bf7\u91cd\u65b0\u9009\u62e9\uff01");
            Me.$("serviceId").value = "";
            Me.$("resInstId").value = "";
        }
    }
};
Me.resetServiceId = function () {
	Me.$("serviceId").value = "";
};

Me.$("link_serviceId").onclick = function () {
	Me.getChooseNumber();
};

Me.$("serviceId").onblur = function () {
	Me.checkResource();
};
Me.$("serviceId").onkeypress = function () {
	return Me.returnBlank();
};
Me.$("serviceId").onpropertychange = function(){
    Me.checkSameServiceId();
};

/*handle same addr */
BusCard.Namespace.create("ordermgr.accept.compnew");
ordermgr.accept.compnew._pstn_number_elem_list_ = ordermgr.accept.compnew._pstn_number_elem_list_ || [];
var serviceObj = {};
serviceObj.service = Me.$("serviceId");
serviceObj.productId = Me.productId;
ordermgr.accept.compnew._pstn_number_elem_list_ .push(serviceObj);
}catch(e){
alert(e.message);
}
});
