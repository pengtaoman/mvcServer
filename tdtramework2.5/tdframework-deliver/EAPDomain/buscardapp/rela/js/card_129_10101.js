BusCard.define('/buscardapp/rela/js/card_129_10101.js',function(_buscard,cardParam){ 
try{
	var Me = this;
	var b = arguments[1];
	Me.productId = b.productId;
	Me.cityCode = b.cityCode;
	Me.serviceOfferId = b.serviceOfferId;
	//for compatibility
	var executeRequest = _buscard.executeRequest;
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
			var noDept = BusCard.$session.acceptDealer;
			var webPath = container2 + "resource/interfacemanage/selectno/SelectNoMain.jsp?STAFFNO=" + workNo + "&PASSWORD=" + endpassword + "&noDept=" + noDept+ "&cityCode=" + Me.cityCode + "&productId=" + Me.productId + "&sortId=1";
			Me.windowResourceServiceId = window.showModalDialog(webPath, B, "DialogWidth:1024px;DialogHeight:768px;status:no;location:no");
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
		var C = "serviceId=" + A + "&serviceOfferId=" + "301" + "&productId=" + Me.productId ;
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
		Me.checkResource();
	};
	Me.$("serviceId").onkeypress = function () {
		return Me.returnBlank();
	};
	Me.$("deviceNo").onblur = function(){
		var deviceNo = Me.$("deviceNo").value;
		var serviceOfferId = Me.serviceOfferId;
		if(deviceNo == ""){
			return true;
		}
		var param = "deviceNo="+deviceNo+"&serviceOfferId="+serviceOfferId+"&checkSaleMobile=1";
		var checkJsonStr = executeRequest("practicalitySaleAcceptAction","queryDeviceInfo",param);
		var checkResult = executeAjaxResult(checkJsonStr);
		if (checkResult == false) {
			Me.$("deviceNo").value = "";
			Me.$("deviceNo").focus();
			return false;
		}
	};
} catch(e) {
	alert(e.message);
}
});
