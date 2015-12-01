BusCard.define('/buscardapp/rela/js/card_129_10044.js',function(_buscard,cardParam){ 

var Me = this;
var a = arguments[0];
var b = arguments[1]; 
Me.productId = b.productId;
Me.cityCode = b.cityCode;
Me.serviceOfferId = b.serviceOfferId;
//for compatibility
var executeRequest = _buscard.executeRequest;
Me.checkResource = function () {
	var E = Me.$("serviceId");
	var A = Me.$("serviceId").value;
	if (!A) {
		return true;
	}
	var C = "serviceId=" + A + "&serviceOfferId=" + Me.serviceOfferId + "&productId=" + Me.productId + "&cityCode=" + Me.cityCode;
	var D = executeRequest("prodOfferSaleAjaxAction", "checkResource", C);
	var B = executeAjaxResult(D);
	if (B == false) {
		Me.resetServiceId();
		return;
	}
	Me.$("resInstId").value = B.split("&")[0];
	
};
Me.resetServiceId = function () {
	Me.$("serviceId").value = "";
};
Me.returnBlank = function () {
	var A = (navigator.appname == "Netscape") ? event.which : event.keyCode;
	if (A != 32) {
		return true;
	} else {
		return false;
	}
};

Me.$("serviceId").onblur = function () {
	Me.checkResource();
};
Me.$("serviceId").onkeypress = function () {
	return Me.returnBlank();
}

});
