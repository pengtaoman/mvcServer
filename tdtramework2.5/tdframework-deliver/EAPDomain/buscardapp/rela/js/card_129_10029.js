BusCard.define('/buscardapp/rela/js/card_129_10029.js',function(_buscard,cardParam){ 

var Me = this;
var a = arguments[0];
var b = arguments[1];
Me.productId = b.productId;
Me.serviceOfferId = b.serviceOfferId;
Me.cityCode = b.cityCode;
//for compatibility
var executeRequest = _buscard.executeRequest;
if(Me.$("bureauId")){
	Me.bureauId = Me.$("bureauId").value;
}else{
	Me.bureauId = b.serviceRelation.branchNo;
}
if(Me.$("acceptNumberCount")){
	Me.$("acceptNumberCount").readOnly = true;
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
		var B = {"ServiceIdInterface":new ServiceIdInterface({"$" : function(id) {return Me.$(id)}})};
		var container2 = BusCard.$session.container2;
		var workNo = BusCard.$session.workNo;
		var endpassword = BusCard.$session.PASSWORD;
		var noDept = BusCard.$session.departmentId;
		var webPath = container2 + "resource/interfacemanage/batchselectno/SelectNoMain.jsp?STAFFNO=" + workNo + "&PASSWORD=" + endpassword + "&noDept=" + noDept+ "&cityCode=" + Me.cityCode + "&productId=" + Me.productId + "&sortId=2&bureauId=" + Me.bureauId;
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
	var C = "serviceId=" + A + "&serviceOfferId=" + Me.serviceOfferId + "&productId=" + Me.productId + "&bureauId=" + Me.bureauId;
	var D = executeRequest("prodOfferSaleAjaxAction", "checkResource", C);
	var B = executeAjaxResult(D);
	if (B == false) {
		Me.resetServiceId();
		return;
	}
	Me.$("resInstId").value = B.split("&")[0];
};
Me.returnBlank = function () {
	var A = (navigator.appname == "Netscape") ? event.which : event.keyCode;
	if (A != 32) {
		return true;
	} else {
		return false;
	}
};
Me.resetServiceId = function () {
	Me.$("serviceId").value = "";
};

Me.$("link_serviceId").onclick = function () {
	Me.getChooseNumber();
};

Me.$("serviceId").onblur = function () {
	var serviceId = Me.$("serviceId").value;
	if(!serviceId){
		return false;
	}
	if(serviceId.indexOf("~") == -1){
		Me.checkResource();
		Me.$("acceptNumberCount").value = 1;
	}else{
		var serviceIdArray = serviceId.split("~");
		Me.$("acceptNumberCount").value = serviceIdArray.length;
	}
};

Me.$("serviceId").onkeypress = function () {
	return Me.returnBlank();
};

Me.$("acceptNumberCount").onkeypress = function () {
	return checkInputChar();
};

var checkInputChar = function(){
	if(!(event.keyCode>=47&&event.keyCode<=57)){
		return false;
	}
	return true;
}
/*handle same addr */
BusCard.Namespace.create("ordermgr.accept.compnew");
ordermgr.accept.compnew._pstn_number_elem_list_ = [];
var serviceObj = {};
serviceObj.service = Me.$("serviceId");
serviceObj.productId = Me.productId;
ordermgr.accept.compnew._pstn_number_elem_list_ .push(serviceObj);

});
