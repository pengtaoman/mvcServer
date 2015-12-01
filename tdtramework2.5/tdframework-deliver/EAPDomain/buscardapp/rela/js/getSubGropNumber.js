BusCard.define('/buscardapp/rela/js/getSubGropNumber.js',function(_buscard,cardParam){ 
	var Me = this;
	var a = arguments[0];
	var b= arguments[1];
	//for compatibility
	var executeRequest = _buscard.executeRequest;
	Me.cityCode = b.cityCode;
	Me.productId = b.productId;
	Me.getChooseNumber = function () {
		var parameter = "productId=" + Me.productId;
		var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "getSubGropNumber", parameter);
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
		var oServiceId = Me.$("serviceId");
		oServiceId.value = result;
		oServiceId.readOnly = true;
	};
	Me.returnBlank = function () {
	var A = (navigator.appname == "Netscape") ? event.which : event.keyCode;
	if (A != 32) {
		return true;
	} else {
		return false;
	}
};
	Me.$("link_serviceId").onclick = function () {
		Me.getChooseNumber();
	};
	Me.$("serviceId").onkeypress = function () {
	return Me.returnBlank();
};
});
