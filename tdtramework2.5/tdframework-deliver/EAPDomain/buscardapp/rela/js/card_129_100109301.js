BusCard.define('/buscardapp/rela/js/card_129_100109301.js',function(_buscard,cardParam){ 
var Me = this;
var a = arguments[0];
var b = arguments[1];
Me.productId = b.productId;
Me.cityCode = b.cityCode;
Me.serviceOfferId = b.serviceOfferId;
//for compatibility
var executeRequest = _buscard.executeRequest;
var fasf = 1;
Me.checkUim = function () {
	var E = Me.$("uimId");
	var A = Me.$("uimId").value;
	var serviceId = Me.$("serviceId").value;
	if (!A) {
		return true;
	}
	var C = "uimId=" + A + "&serviceOfferId=" + Me.serviceOfferId + "&productId=" + Me.productId + "&cityCode=" + Me.cityCode+"&serviceId="+serviceId;
	var D = executeRequest("prodOfferSaleAjaxAction", "checkUimResource", C);
	var B = executeAjaxResult(D);
	if (B == false) {
		Me.$("uimId").value="";
		if(Me.$("serviceId").disabled == true){
			Me.$("serviceId").value = "";
			Me.$("serviceId").disabled = false;
		}
		return;
	}
	Me.$("uimResInstId").value = B;
	if(Me.$("serviceId")){
		var parameter = "objectId=" + A + "&serviceOfferId=" + Me.serviceOfferId + "&productId=" + Me.productId + "&cityCode=" + Me.cityCode + "&getCoopFlag=UIM_COOP_FLAG";
		var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "getCoopNumInfo", parameter);
		var resultJson = dojo.fromJson(resultJsonStr);
		if (!resultJson || resultJson.flag <= 0) {
			return;
		}
		if(!!Me.$("ifPreCoop")){
			Me.$("ifPreCoop").value = !!resultJson.OPEN_STATUS?resultJson.OPEN_STATUS:"";
		}
		if(resultJson.NUMBER != "-1"){//Ô¤Åä¿¨
			if(Me.$("serviceId").value == "" || Me.$("serviceId").value != resultJson.NUMBER){
				Me.$("serviceId").value = resultJson.NUMBER;
				Me.$("serviceId").onblur();
				Me.$("serviceId").disabled = true;
			}
		}else{//·ÇÔ¤Åä¿¨
			if(Me.$("serviceId").disabled == true){
				Me.$("serviceId").value = "";
				Me.$("serviceId").disabled = false;
			}
		}
	}
};

Me.$("uimId").onblur = function () {
	Me.checkUim();
};
});
